import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Strategy, Profile } from "passport-facebook";
import { AuthService } from "../auth.service";
import { AuthStrategy } from "../auth-strategy.enum";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      clientID: configService.getOrThrow("auth.facebook.clientID"),
      clientSecret: configService.getOrThrow("auth.facebook.clientSecret"),
      callbackURL:
        configService.getOrThrow("baseUrl") + "/auth/facebook/callback",
      scope: "email",
      profileFields: ["emails", "name"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateOAuth2User(
      profile,
      AuthStrategy.Facebook
    );

    return {
      id: user.id,
      email: user.email,
    };
  }
}
