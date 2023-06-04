import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { GoogleStrategy } from "./strategies/google.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../users/user.module";
import { SessionSerializer } from "./session-serializer";
import { FacebookStrategy } from "./strategies/facebook.strategy";
import { HashModule } from "../hash/hash.module";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule.register({ session: true, property: "user" }),
    HashModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    FacebookStrategy,
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
