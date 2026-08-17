import { Injectable } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { DoctorService } from "src/doctor/doctor.service";

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly doctorService: DoctorService,
  ) {}
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

    await this.prisma.$transaction(async (tx) => {
      await tx.doctor.update({
        where: {
          id: createReviewDto.doctorId,
        },
        data: {
          rating: Number(newRating.toFixed(1)),
          reviewCount: newReviewCount,
        },
      });

      await tx.auditlog.create({
        data: {
          user_id: createReviewDto.userId,
          action: `You reviewed Dr. ${createReviewDto.doctorId}`,
        },
      });

      await tx.auditlog.create({
        data: {
          user_id: createReviewDto.doctorId,
          action: `You got a new review`,
        },
      });

      await tx.notification.create({
        data: {
          user_id: createReviewDto.doctorId,
          message: `${createReviewDto.userId} has left you a review`,
          title: "New Review",
          isRead: false,
        },
      });

      await tx.userStats.upsert({
        where: {
          user_id: createReviewDto.userId,
        },
        update: {
          Reviews: {
            increment: 1,
          },
        },
        create: {
          user_id: createReviewDto.userId,
          Reviews: 1,
        },
      });

      await tx.userStats.upsert({
        where: {
          user_id: createReviewDto.doctorId,
        },
        update: {
          Reviews: {
            increment: 1,
          },
        },
        create: {
          user_id: createReviewDto.doctorId,
          Reviews: 1,
        },
      });

      await this.doctorService.updateDoctorScore(createReviewDto.doctorId);
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
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new Error("Review not found");
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.auditlog.create({
        data: {
          user_id: review.userId,
          action: `You updated your review for Dr. ${review.doctorId}`,
        },
      });

      await tx.notification.create({
        data: {
          user_id: review.doctorId,
          message: `${review.userId} has updated their review`,
          title: "Review Updated",
          isRead: false,
        },
      });

      await tx.notification.create({
        data: {
          user_id: review.userId,
          message: `Your review for Dr. ${review.doctorId} has been updated`,
          title: "Review Updated",
          isRead: false,
        },
      });

      await tx.userStats.upsert({
        where: {
          user_id: review.userId,
        },
        update: {
          Reviews: {
            increment: 1,
          },
        },
        create: {
          user_id: review.userId,
          Reviews: 1,
        },
      });

      await tx.userStats.upsert({
        where: {
          user_id: review.doctorId,
        },
        update: {
          Reviews: {
            increment: 1,
          },
        },
        create: {
          user_id: review.doctorId,
          Reviews: 1,
        },
      });

      await this.doctorService.updateDoctorScore(review.doctorId);
      return tx.review.update({
        where: {
          id,
        },
        data: {
          rating: updateReviewDto.rating,
          comment: updateReviewDto.comment,
        },
      });
    });
  }

  async remove(id: string) {
    await this.prisma.$transaction(async (tx) => {
      await tx.auditlog.create({
        data: {
          user_id: id,
          action: `You deleted your review`,
        },
      });

      await tx.notification.create({
        data: {
          user_id: id,
          message: `Your review has been deleted`,
          title: "Review Deleted",
          isRead: false,
        },
      });

      await tx.userStats.upsert({
        where: {
          user_id: id,
        },
        update: {
          Reviews: {
            decrement: 1,
          },
        },
        create: {
          user_id: id,
          Reviews: 0,
        },
      });

      await this.doctorService.updateDoctorScore(id);
      return tx.review.delete({
        where: {
          id,
        },
      });
    });
  }
}
