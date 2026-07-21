import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { Role } from "@prisma/client/edge";

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  update(id: string, data: Partial<CreateUserDto>) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
  async updateProfileImage(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("No image provided");
    }

    const imageUrl = await this.cloudinaryService.uploadImage(file.buffer);

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: imageUrl,
      },
    });
  }

  async getLandingPageData() {
    const totalPatients = await this.prisma.user.count({
      where: {
        role: Role.USER,
      },
    });

    const specialties = await this.prisma.doctor.findMany({
      distinct: ["speciality"],
      select: {
        speciality: true,
      },
    });

    const featuredDoctors = await this.prisma.doctor.findMany({
      take: 3,
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        rating: "desc",
      },
    });

    return {
      totalPatients,
      totalSpecialists: specialties.length,
      featuredDoctors,
    };
  }

  getNextSession() {
    const imageUrl =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=account_circle";
    return {
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      doctor: {
        name: "Dr. John Doe",
        specialty: "Cardiologist",
        image: imageUrl,
      },
    };
  }
}
