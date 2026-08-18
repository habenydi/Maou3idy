import { Type } from "class-transformer";
import { IsInt, Min, IsString, IsArray, ValidateNested } from "class-validator";
class ShiftDto {
  @IsString()
  start_hour!: string;

  @IsString()
  end_hour!: string;
}

export class CreateSlotsDto {
  @IsString()
  start_date!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  number_of_days!: number;
<<<<<<< HEAD
=======

  // Without @Type here, class-transformer never instantiates array items as
  // ShiftDto — combined with the global ValidationPipe's whitelist: true,
  // every property on each shift (start_hour/end_hour) gets stripped as
  // "unrecognized" instead of validated, so every shift silently became {}
  // and start_hour/end_hour were undefined for every request, not just
  // malformed ones (see SlotsService.parseTimeToMinutes crash).
>>>>>>> e509639 (fix: the Cors and enabling the api-gateway)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShiftDto)
  shifts!: ShiftDto[];
}
