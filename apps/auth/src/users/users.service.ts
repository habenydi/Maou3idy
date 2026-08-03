import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { Role, User } from "@prisma/client/edge";
import { UpdateUser } from "./users.controller";

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getStats(id: string) {
    return this.prisma.userStats.findUnique({ where: { user_id: id } });
  }
  create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findById(id: string): Promise<User | null> {
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

  async remove(id: string) {
    await this.prisma.auditlog.create({
      data: {
        action: "DELETE_USER",
        user_id: id,
        timestamp: new Date(),
      },
    });
    return this.prisma.user.delete({ where: { id } });
  }
  async updateProfileImage(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("No image provided");
    }

    const imageUrl = await this.cloudinaryService.uploadImage(file.buffer);

    await this.prisma.auditlog.create({
      data: {
        action: "UPDATE_PROFILE_IMAGE",
        user_id: userId,
        timestamp: new Date(),
      },
    });

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

  async updateMyData(userId: string, data: UpdateUser) {
    await this.prisma.auditlog.create({
      data: {
        user_id: userId,
        action: "UPDATE_MY_DATA",
        timestamp: new Date(),
      },
    });

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        name: data?.name,
        phone: data?.phone,
      },
    });
  }
}
