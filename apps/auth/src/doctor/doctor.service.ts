import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDoctorDto } from "./dto/createDoctor.dto";
import { GetDoctorsDto } from "./dto/GetDoctorsDto.dto";

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateDoctorDto, userId: string) {
    return await this.prisma.doctor.create({
      data: {
        location: body.location,
        experience: Number(body.years_of_experience),
        languages: body.languages,
        speciality: body.speciality,
        bio: body.bio,
        license_number: body.license_number,
        medical_license_url: body.medical_license_url,

        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.doctor.findMany({
      where: {
        verified: true,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.doctor.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<CreateDoctorDto>) {
    await this.prisma.auditlog.create({
      data: {
        action: "Dr Profile Updated",
        user_id: id,
        timestamp: new Date(),
      },
    });
    return await this.prisma.doctor.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.prisma.auditlog.create({
      data: {
        action: "Dr Profile Deleted",
        user_id: id,
        timestamp: new Date(),
      },
    });
    return this.prisma.doctor.delete({ where: { id } });
  }

  async search(specialty: string, location: string) {
    return await this.prisma.doctor.findMany({
      where: {
        speciality: specialty,
        location: location,
        verified: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  async findFeatured() {
    return await this.prisma.doctor.findMany({
      where: {
        verified: true,
      },
      orderBy: {
        score: "desc",
      },
      select: {
        id: true,
        location: true,
        rating: true,
        score: true,
        speciality: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
  }
  async approve(id: string) {
    return await this.prisma.doctor.update({
      where: { id },
      data: { verified: true, user: { update: { verified: true } } },
    });
  }

  async getDoctors(query: GetDoctorsDto) {
    const { search, location, page = 1 } = query;

    const limit = 12;
    const skip = (page - 1) * limit;

    const where = {
      AND: [
        search
          ? {
              OR: [
                {
                  user: {
                    name: {
                      contains: search,
                      mode: "insensitive" as const,
                    },
                  },
                },
                {
                  speciality: {
                    contains: search,
                    mode: "insensitive" as const,
                  },
                },
              ],
            }
          : {},
        location
          ? {
              location: {
                contains: location,
                mode: "insensitive" as const,
              },
            }
          : {},
      ],
    };

    const [doctors, total] = await Promise.all([
      this.prisma.doctor.findMany({
        where,
        include: {
          user: true,
        },
        orderBy: [
          {
            score: "desc",
          },
          {
            rating: "desc",
          },
        ],
        skip,
        take: limit,
      }),

      this.prisma.doctor.count({
        where,
      }),
    ]);

    return {
      doctors: doctors.map((doctor) => ({
        id: doctor.id,
        name: doctor.user.name,
        image: doctor.user.image,
        speciality: doctor.speciality,
        experience: doctor.experience,
        rating: Number(doctor.rating.toFixed(1)),
        reviewCount: doctor.reviewCount,
        location: doctor.location,
        score: doctor.score,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateDoctorScore(doctorId: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: doctorId },
    });

    if (!doctor) {
      return;
    }

    const score =
      doctor.rating * 40 +
      Math.log10(doctor.totalPatients + 1) * 20 +
      Math.log10(doctor.totalAppointments + 1) * 30 +
      doctor.experience * 2;

    await this.prisma.doctor.update({
      where: { id: doctorId },
      data: {
        score,
      },
    });
  }

  async getSpecialties() {
    const specialties = await this.prisma.doctor.findMany({
      distinct: ["speciality"],
      select: {
        speciality: true,
      },
    });

    return specialties.map((s) => s.speciality);
  }
}
