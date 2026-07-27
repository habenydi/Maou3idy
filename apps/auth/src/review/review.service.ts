import { Injectable } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createReviewDto: CreateReviewDto) {
    await this.prisma.review.create({
      data: {
        doctorId: createReviewDto.doctorId,
        userId: createReviewDto.userId,
        rating: createReviewDto.rating,
        comment: createReviewDto.comment,
      },
    });

    const doctor = await this.prisma.doctor.findUnique({
      where: {
        id: createReviewDto.doctorId,
      },
      select: {
        rating: true,
        reviewCount: true,
      },
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const newReviewCount = doctor.reviewCount + 1;

    const newRating =
      (doctor.rating * doctor.reviewCount + createReviewDto.rating) /
      newReviewCount;

    await this.prisma.doctor.update({
      where: {
        id: createReviewDto.doctorId,
      },
      data: {
        rating: Number(newRating.toFixed(1)),
        reviewCount: newReviewCount,
      },
    });

    return {
      message: "Review created successfully",
      status: 201,
    };
  }

  async getReview(doctorId: string) {
    return this.prisma.review.findMany({
      where: {
        doctorId: doctorId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  async findAll() {
    return this.prisma.review.findMany();
  }

  async findOne(id: string) {
    return this.prisma.review.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.prisma.review.update({
      where: {
        id,
      },
      data: {
        doctorId: updateReviewDto.doctorId,
        userId: updateReviewDto.userId,
        rating: updateReviewDto.rating,
        comment: updateReviewDto.comment,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
