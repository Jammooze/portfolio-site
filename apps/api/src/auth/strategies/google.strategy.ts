import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Strategy, Profile } from "passport-google-oauth20";
import { AuthService } from "../auth.service";
import { AuthStrategy } from "../auth-strategy.enum";

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

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateOAuth2User(
      profile,
      AuthStrategy.Google
    );

    return user;
  }
}
