import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    create(data: any) {
        return this.prisma.user.create({ data });
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    findById(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    update(id: number, data: any) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    remove(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}
