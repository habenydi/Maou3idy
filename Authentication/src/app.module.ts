import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule,
      MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'forwork2yassir@gmail.com',
            pass: 'your-app-password',
          },
        },
        defaults: {
          from: '"Authentication App" <forwork2yassi  r@gmail.com>',
        },
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
