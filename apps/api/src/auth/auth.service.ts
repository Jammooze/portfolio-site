import { Injectable } from "@nestjs/common";
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

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findUserByEmail(email);

    if (user === null) {
      return null;
    }

    // cannot log into oauth2 accounts using the local-strategy.
    if (user.passwordHash === null) {
      return null;
    }

    const isPasswordValid = await this.hashService.compare(
      password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async validateOAuth2User(
    profile: Profile,
    strategy: AuthStrategy
  ): Promise<User> {
    const extractedFields = extractFieldsFromOAuthProfile(profile);

    let user = await this.userService.findUserByEmail(extractedFields.email);

    // if the user doesn't exist we will do an account creation on login.
    if (user === null) {
      const dto = new CreateUserDto();

      dto.fullName = extractedFields.fullName;
      dto.password = null;
      dto.email = extractedFields.email;

      user = await this.userService.createUser(dto, strategy);
    }

    return user;
  }
}
