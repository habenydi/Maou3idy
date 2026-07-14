// auth/google.strategy.ts

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { PrismaService } from "../prisma/prisma.service";

interface GoogleProfile {
  id: string;
  displayName: string;
  emails: Array<{ value: string }>;
  photos?: Array<{ value: string }>;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private prisma: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:1337/auth/google/callback",
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
  ) {
    const email = profile.emails[0].value;

    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name: profile.displayName,
          verified: true,
        },
      });
    }

    return user;
  }
}
