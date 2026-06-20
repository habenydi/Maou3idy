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
import { UsersService } from "./users.service";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { CreateUserDto } from "./dto/createUser.dto";
import { Roles } from "src/auth/decorator/roles.decorator";
import { Role } from "@prisma/client";
import { RolesGuard } from "src/auth/guards/roles.guard";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }
  // Note: @Roles is enforced only when RolesGuard is included in @UseGuards
  // Role comes from JwtStrategy validate() -> request.user
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(":id")
  findById(@Param("id") id: string) {
    return this.usersService.findById(Number(id));
  }
  @Put(":id")
  Update(@Param("id") id: string, @Body() body: Partial<CreateUserDto>) {
    return this.usersService.update(Number(id), body);
  }
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(Number(id));
  }
}
