import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDoctorDto } from "./dto/createDoctor.dto";

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateDoctorDto, id: number) {
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
        Service: true,
      },
    });
  }

  findById(id: number) {
    return this.prisma.doctor.findUnique({ where: { id } });
  }

  update(id: number, data: Partial<CreateDoctorDto>) {
    return this.prisma.doctor.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
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
        Service: true,
      },
    });
  }

  findFeatured() {
    // return this.prisma.doctor.findMany({
    //   where: {
    //     verified: true,
    //   },
    //   include: {
    //     user: {
    //       select: {
    //         id: true,
    //         name: true,
    //         email: true,
    //         phone: true,
    //       },
    //     },
    //     Service: true,
    //   },
    // });
    return {
      featuredDoctors: [
        {
          id: "3",
          firstName: "Yassir",
          lastName: "Ait ammi",
          specialty: "jebbar",
          profileImage:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDQU9AIwklR8KSrtaM_AmCdBd0gjQmQt_J4Y3afU1m8_cbA_uaM34-tb-kZrDy75P793UTXX25NB4mTDJguy_oCkA7vE5r-pUg4RXujsWktrK7dmi_GBe1MaqnJw0c7oP72KIcqxQHQX8BQfEl9tTvBF9qgESHsa3Kn78TqkzNHGiEEgqQhvmquTPgRYEwVEi-gMF9rW51AdBczfHnoxBdsuGdKUs8ZMVQrbgwBsh1AZJBUoct64TYpZFD0sFukHxuPHr8inIUxUTQ",
          location: "agouim, Ouarzazate, Morocco",
          rating: 5.0,
          reviewCount: 756,
        },
      ],
      stats: {
        totalDoctors: 12000,
        totalPatients: 500000,
        totalSpecializedClinicians: 500,
      },
      specialties: ["Cardiology"],
      locations: ["New York, NY"],
    };
  }
  approve(id: number) {
    return this.prisma.doctor.update({
      where: { id },
      data: { verified: true },
    });
  }
}
