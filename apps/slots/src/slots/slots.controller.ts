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
  Query,
} from "@nestjs/common";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { SlotsService } from "./slots.service";
import { CreateSlotsDto } from "./dto/create-slots.dto";
import { UpdateSlotDto } from "./dto/update-slots.dto";
import { BookServiceSlotDto } from "./dto/book-service-slot.dto";
import { Public } from "src/auth/decorator/public.decorator";

@Controller("slots")
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get("me")
  findMySlots(@Req() req: { user: { sub: string } }) {
    return this.slotsService.findCurrentDoctorSlots(req.user.sub);
  }

  @Public()
  @Get("available")
  getAvailable(
    @Query("doctorId") doctorId: string,
    @Query("serviceId") serviceId: string,
    @Query("date") date: string,
  ) {
    return this.slotsService.getAvailableWindowsForService(
      doctorId,
      serviceId,
      date,
    );
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

  @Post("generate")
  generate(@Req() req: { user: { sub: string } }, @Body() dto: CreateSlotsDto) {
    return this.slotsService.generateSlotsForCurrentDoctor(req.user.sub, dto);
  }

  @Patch(":id")
  update(
    @Req() req: { user: { sub: string } },
    @Param("id") id: string,
    @Body() dto: UpdateSlotDto,
  ) {
    return this.slotsService.updateCurrentDoctorSlot(
      req.user.sub,
      String(id),
      dto,
    );
  }

  @UseGuards(JwtGuard)
  @Delete("me")
  clearDoctorSlots(@Req() req: { user: { sub: string } }) {
    return this.slotsService.clearCurrentDoctorSlots(req.user.sub);
  }

  @UseGuards(JwtGuard)
  @Get("me/bookings")
  findMyBookings(@Req() req: { user: { sub: string } }) {
    return this.slotsService.findCurrentUserBookings(req.user.sub);
  }

  @UseGuards(JwtGuard)
  @Get("doctor/me/bookings")
  findMyDoctorBookings(@Req() req: { user: { sub: string } }) {
    return this.slotsService.findCurrentDoctorBookings(req.user.sub);
  }

  @UseGuards(JwtGuard)
  @Post("me/bookings/:id/cancel")
  cancelMyBooking(
    @Req() req: { user: { sub: string } },
    @Param("id") id: string,
  ) {
    return this.slotsService.cancelCurrentUserBooking(req.user.sub, id);
  }

  @UseGuards(JwtGuard)
  @Post("doctor/me/bookings/:id/complete")
  completeDoctorBooking(
    @Req() req: { user: { sub: string } },
    @Param("id") id: string,
  ) {
    return this.slotsService.completeCurrentDoctorBooking(req.user.sub, id);
  }

  @UseGuards(JwtGuard)
  @Post("doctor/me/bookings/:id/cancel")
  cancelDoctorBooking(
    @Req() req: { user: { sub: string } },
    @Param("id") id: string,
  ) {
    return this.slotsService.cancelCurrentDoctorBooking(req.user.sub, id);
  }

  @UseGuards(JwtGuard)
  @Delete(":id")
  remove(@Req() req: { user: { sub: string } }, @Param("id") id: string) {
    return this.slotsService.deleteCurrentDoctorSlot(req.user.sub, String(id));
  }

  @UseGuards(JwtGuard)
  @Post(":id/release")
  release(@Req() req: { user: { sub: string } }, @Param("id") id: string) {
    return this.slotsService.releaseCurrentDoctorSlot(req.user.sub, String(id));
  }

  @Post(":id/book")
  book(@Param("id") id: string) {
    return this.slotsService.bookSlot(String(id));
  }

  @UseGuards(JwtGuard)
  @Post("book-service")
  bookService(
    @Req() req: { user: { sub: string } },
    @Body() dto: BookServiceSlotDto,
  ) {
    return this.slotsService.bookServiceSlot(req.user.sub, dto);
  }
}
