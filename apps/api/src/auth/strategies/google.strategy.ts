import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-google-oauth20";
import { GoogleProfile } from "../google-profile";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      clientID: configService.getOrThrow("auth.google.clientID"),
      clientSecret: configService.getOrThrow("auth.google.clientSecret"),
      callbackURL:
        configService.getOrThrow("baseUrl") + "/auth/google/callback",
      scope: ["profile", "email"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: { _json: GoogleProfile }
  ) {
    const user = await this.authService.validateGoogleAuth(profile._json);
    return user;
  }
}
