import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(":doctorId/:userId")
  async getReview(@Param("doctorId") doctorId: string) {
    return await this.reviewService.getReview(doctorId);
  }
  @Post(":doctorId/:userId")
  async createReview(
    @Param("doctorId") doctorId: string,
    @Param("userId") userId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    createReviewDto.doctorId = doctorId;
    createReviewDto.userId = userId;
    return await this.reviewService.create(createReviewDto);
  }

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(createReviewDto);
  }

  @Get()
  async findAll() {
    return await this.reviewService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.reviewService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewService.update(id, updateReviewDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.reviewService.remove(id);
  }
}
