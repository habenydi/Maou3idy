import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDoctorDto } from "./dto/createDoctor.dto";
import { GetDoctorsDto } from "./dto/GetDoctorsDto.dto";

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateDoctorDto, id: string) {
    return this.prisma.doctor.create({
      data: {
        speciality: data.speciality,
        bio: data.bio,
        license_number: data.license_number,
        user: { connect: { id } },
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

  findById(id: string) {
    return this.prisma.doctor.findUnique({ where: { id } });
  }

  update(id: string, data: Partial<CreateDoctorDto>) {
    return this.prisma.doctor.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.doctor.delete({ where: { id } });
  }

  search(specialty: string, location: string) {
    return this.prisma.doctor.findMany({
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
      select: {
        id: true,
        location: true,
        verified: true,
        rating: true,
        speciality: true,

        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        },
      },
    });
  }
  approve(id: string) {
    return this.prisma.doctor.update({
      where: { id },
      data: { verified: true },
    });
  }

  async getDoctors(query: GetDoctorsDto) {
    const { search, location, page = 1 } = query;

    const limit = 12;
    const skip = (page - 1) * limit;

    const [doctors, total] = await Promise.all([
      this.prisma.doctor.findMany({
        where: {
          AND: [
            search
              ? {
                  OR: [
                    {
                      user: {
                        name: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                    },
                    {
                      speciality: {
                        contains: search,
                        mode: "insensitive",
                      },
                    },
                  ],
                }
              : {},
            location
              ? {
                  location: {
                    contains: location,
                    mode: "insensitive",
                  },
                }
              : {},
          ],
        },
        include: {
          user: true,
        },
        skip,
        take: limit,
      }),

      this.prisma.doctor.count({
        where: {
          AND: [
            search
              ? {
                  OR: [
                    {
                      user: {
                        name: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                    },
                    {
                      speciality: {
                        contains: search,
                        mode: "insensitive",
                      },
                    },
                  ],
                }
              : {},
            location
              ? {
                  location: {
                    contains: location,
                    mode: "insensitive",
                  },
                }
              : {},
          ],
        },
      }),
    ]);

    return {
      doctors: doctors.map((doctor) => ({
        id: doctor.id,
        name: doctor.user.name,
        image: doctor.user.image,
        speciality: doctor.speciality,
        experience: doctor.experience,
        rating: doctor.rating,
        location: doctor.location,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
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
