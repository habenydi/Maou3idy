import {
  Min,
  IsNumber,
  MinLength,
  IsPositive,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateServiceDto {
  @IsString()
  doctorId!: string;

  @IsString({ message: "name must be a string" })
  @MinLength(3, { message: "name must be at least 3 characters" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  name!: string;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsNumber({}, { message: "duration must be a valid number" })
  @Min(15, { message: "duration must be at least 15 minutes" })
  @IsPositive()
  @Transform(({ value }) => {
    const num = Number(value);
    if (isNaN(num)) throw new Error("duration must be a valid number");
    return num;
  })
  duration!: number;

  @IsString()
  category_id!: string;

  @IsOptional()
  @IsString({ message: "description must be a string" })
  @MaxLength(500, { message: "description must not exceed 500 characters" })
  @Transform(({ value }) => (value ? String(value).trim() : undefined))
  description?: string;
}
