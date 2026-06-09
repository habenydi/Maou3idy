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
    return this.prisma.doctor.findMany({
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
}
