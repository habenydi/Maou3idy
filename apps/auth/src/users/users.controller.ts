import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { Roles } from "src/auth/decorator/roles.decorator";
import { Role } from "@prisma/client";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { Public } from "src/auth/decorator/public.decorator";
import type { RequestWithUser } from "src/auth/guards/jwt.guard";
export type UpdateUser = {
  name?: string;
  email?: string;
  phone?: string;
};

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get("landing-page")
  getLandingPageData() {
    return this.usersService.getLandingPageData();
  }

  @Get("my-data")
  async getMyData(@Req() req: RequestWithUser) {
    const user = await this.usersService.findById(req.user.sub);

    const stats = await this.usersService.getStats(req.user.sub);

    return {
      ...user,
      stats,
    };
  }

  @Patch("my-data")
  UpdateMyData(@Req() req: RequestWithUser, @Body() body: UpdateUser) {
    return this.usersService.updateMyData(req.user.sub, body);
  }
  @Public()
  @Get("next-session")
  getNextSession() {
    return this.usersService.getNextSession();
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch("profile-image")
  @UseInterceptors(FileInterceptor("image"))
  updateProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    return this.usersService.updateProfileImage(req.user.sub, file);
  }
  // Note: @Roles is enforced only when RolesGuard is included in @UseGuards
  // Role comes from JwtStrategy validate() -> request.user
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(":id")
  findById(@Param("id") id: string) {
    return this.usersService.findById(id);
  }
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
