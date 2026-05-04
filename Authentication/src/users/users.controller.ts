import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() body: any) {
        return this.usersService.create(body);
    }
    @UseGuards(JwtGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }
    @Get(':id')
    findById(@Param('id') id : string) {
        return this.usersService.findById(Number(id));
    }
    @Put(':id')
    Update(@Param(':id') id: string, @Body() body: any){
        return this.usersService.update(Number(id), body);
    }
    @Delete(':id')
    remove (@Param(':id') id : string) {
        return this.usersService.remove(Number(id));
    }
}
