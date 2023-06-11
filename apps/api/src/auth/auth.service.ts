import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Profile } from "passport";
import { UserService } from "../users/user.service";
import { User } from "../users/user.entity";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { HashService } from "../hash/hash.service";
import { AuthStrategy } from "./auth-strategy.enum";
import { extractFieldsFromOAuthProfile } from "./utils/extractFieldsFromOAuthProfile";

export type OAuthProfile = {
  fullName: string;
  email: string;
  profileUri?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userService.getByEmail(email);

      if (user.passwordHash === null) {
        throw new UnauthorizedException("Invalid email or password.");
      }

      const isPasswordValid = await this.hashService.compare(
        password,
        user.passwordHash
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid email or password.");
      }

      return user;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new UnauthorizedException("Invalid email or password.");
      }

      throw e;
    }
  }

  async validateOAuth2User(
    profile: Profile,
    strategy: AuthStrategy
  ): Promise<User> {
    const extractedFields = extractFieldsFromOAuthProfile(profile);

    try {
      const user = await this.userService.getByEmail(extractedFields.email);
      return user;
    } catch (e) {
      // will throw an notfoundexception if a user with the email cannot be found.
      if (e instanceof NotFoundException) {
        const dto = new CreateUserDto();

        dto.fullName = extractedFields.fullName;
        dto.password = null;
        dto.email = extractedFields.email;

        const createdUser = await this.userService.create(dto, strategy);
        return createdUser;
      }

      throw e;
    }
  }
}
