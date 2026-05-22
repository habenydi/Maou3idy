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
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { CreateDoctorDto } from "./dto/createDoctor.dto";
import { RolesGuard } from "src/auth/guards/roles.guard";

@UseGuards(JwtGuard)
@Controller("doctors")
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Post()
  create(@Body() body: CreateDoctorDto, @Param("id") id: string) {
    return this.doctorService.create(body, Number(id));
  }
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  findAll() {
    return this.doctorService.findAll();
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
