import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
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

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch("profile-image")
  @UseInterceptors(FileInterceptor("image"))
  updateProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
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
  @Put(":id")
  Update(@Param("id") id: string, @Body() body: Partial<CreateUserDto>) {
    return this.usersService.update(id, body);
  }
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
