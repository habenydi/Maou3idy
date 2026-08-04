import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @Transform(({ value }) => (value ? String(value).trim() : undefined))
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => {
    if (value === undefined || value === null) return undefined;
    return Number(value);
  })
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(15)
  @Max(480)
  @Transform(({ value }) => {
    if (value === undefined || value === null) return undefined;
    return Number(value);
  })
  duration?: number;

  @IsOptional()
  @IsString()
  category_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @Transform(({ value }) => (value ? String(value).trim() : undefined))
  description?: string;
  isActive?: boolean;
}
