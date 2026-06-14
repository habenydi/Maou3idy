// auth/google.strategy.ts

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";

interface GoogleProfile {
  id: string;
  displayName: string;
  emails: Array<{ value: string }>;
  photos?: Array<{ value: string }>;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://127.0.0.1:1337/auth/google/callback",
      scope: ["email", "profile"],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: GoogleProfile) {
    return {
      email: profile.emails[0].value,
      name: profile.displayName,
      picture: profile.photos?.[0]?.value,
      googleId: profile.id,
    };
  }
}
