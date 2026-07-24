import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { Roles } from "src/auth/decorator/roles.decorator";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { SlotsService } from "./slots.service";
import { CreateSlotsDto } from "./dto/create-slots.dto";
import { UpdateSlotDto } from "./dto/update-slots.dto";

@Controller("slots")
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) { }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DOCTOR)
  @Get("me")
  findMySlots(@Req() req: { user: { sub: string } }) {
    return this.slotsService.findCurrentDoctorSlots(req.user.sub);
  }

  @Get()
  findAll() {
    return this.slotsService.findAll();
  }

  @Get("doctor/:doctorId")
  findByDoctor(@Param("doctorId") doctorId: string) {
    return this.slotsService.findByDoctorId(doctorId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.slotsService.findOneSlot(String(id));
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DOCTOR)
  @Post("generate")
  generate(@Req() req: { user: { sub: string } }, @Body() dto: CreateSlotsDto) {
    return this.slotsService.generateSlotsForCurrentDoctor(req.user.sub, dto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DOCTOR)
  @Patch(":id")
  update(
    @Req() req: { user: { sub: string } },
    @Param("id") id: string,
    @Body() dto: UpdateSlotDto,
  ) {
    return this.slotsService.updateCurrentDoctorSlot(req.user.sub, String(id), dto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DOCTOR)
  @Delete("me")
  clearDoctorSlots(@Req() req: { user: { sub: string } }) {
    return this.slotsService.clearCurrentDoctorSlots(req.user.sub);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DOCTOR)
  @Delete(":id")
  remove(@Req() req: { user: { sub: string } }, @Param("id") id: string) {
    return this.slotsService.deleteCurrentDoctorSlot(req.user.sub, String(id));
  }

  @Post(":id/book")
  book(@Param("id") id: string) {
    return this.slotsService.bookSlot(String(id));
  }
}
