import { Type } from "class-transformer";
import { IsInt, IsString, Min } from "class-validator";

export class CreateSlotsDto {
  doctor_id!: string;

  @IsString()
  start_date!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  number_of_days!: number;

  @IsString()
  start_hour!: string;

  @IsString()
  end_hour!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  duration!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  buffer_time!: number;
}
