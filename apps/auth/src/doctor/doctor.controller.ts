import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto } from "./dto/createDoctor.dto";
import { Role } from "@prisma/client";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorator/roles.decorator";

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
    return this.doctorService.create(body, id);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    return await this.doctorService.findAll();
  }
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
