export class CreateReviewDto {
  doctorId: string;
  userId: string;
  rating: number;
  comment?: string;
}
