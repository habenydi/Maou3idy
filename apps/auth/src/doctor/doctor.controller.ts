import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto } from "./dto/createDoctor.dto";

@Controller("doctors")
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Get("featured")
  findFeatured() {
    return this.doctorService.findFeatured();
  }
  @Get("search")
  search(
    @Param("specialty") specialty: string,
    @Param("location") location: string,
  ) {
    return this.doctorService.search(specialty, location);
  }
  @Post()
  create(@Body() body: CreateDoctorDto, @Param("id") id: string) {
    return this.doctorService.create(body, Number(id));
  }
  @Get()
  async findAll() {
    return await this.doctorService.findAll();
  }
  @Get(":id")
  findById(@Param("id") id: string) {
    return this.doctorService.findById(Number(id));
  }
  @Put(":id")
  Update(@Param(":id") id: string, @Body() body: Partial<CreateDoctorDto>) {
    return this.doctorService.update(Number(id), body);
  }
  @Delete(":id")
  remove(@Param(":id") id: string) {
    return this.doctorService.remove(Number(id));
  }
}
