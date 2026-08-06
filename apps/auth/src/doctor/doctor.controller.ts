import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto } from "./dto/createDoctor.dto";
import { Role } from "@prisma/client";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorator/roles.decorator";
import { GetDoctorsDto } from "./dto/GetDoctorsDto.dto";
import { Public } from "src/auth/decorator/public.decorator";

@Controller("doctors")
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Public()
  @Get("specialities")
  async getSpecialities() {
    return {
      specialties: await this.doctorService.getSpecialties(),
    };
  }
  @Public()
  @Get("find")
  find(@Query() query: GetDoctorsDto) {
    return this.doctorService.getDoctors(query);
  }
  @Public()
  @Get("featured")
  findFeatured() {
    return this.doctorService.findFeatured();
  }
  @Public()
  @Get("search")
  search(
    @Query("specialty") specialty: string,
    @Query("city") city: string,
    @Query("state") state: string,
    @Query("country") country: string,
  ) {
    return this.doctorService.search(specialty, {
      city,
      state,
      country,
      address: "",
      zip_code: "",
    });
  }
  @Post()
  create(@Body() body: CreateDoctorDto, @Param("id") id: string) {
    return this.doctorService.create(body, id);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    return await this.doctorService.findAll();
  }
  @Public()
  @Get(":id")
  findById(@Param("id") id: string) {
    return this.doctorService.findById(id);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put(":id")
  Update(@Param(":id") id: string, @Body() body: Partial<CreateDoctorDto>) {
    return this.doctorService.update(id, body);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(":id")
  remove(@Param(":id") id: string) {
    return this.doctorService.remove(id);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put(":id/approve")
  approve(@Param(":id") id: string) {
    return this.doctorService.approve(id);
  }
}
