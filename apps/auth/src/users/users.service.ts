import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

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

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: imageUrl,
      },
    });
  }
}
