import { Injectable } from "@nestjs/common";
import { Profile } from "passport";
import { UserService } from "../users/user.service";
import { User } from "../users/user.entity";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { AuthStrategy } from "./auth-strategy.enum";
import { extractFieldsFromOAuthProfile } from "./utils/extractFieldsFromOAuthProfile";

export type OAuthProfile = {
  name: {
    givenName?: string;
    middleName?: string;
    familyName?: string;
  };
  email: string;
  profileUri?: string;
};

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateOAuth2(
    profile: Profile,
    strategy: AuthStrategy
  ): Promise<User> {
    const extractedFields = extractFieldsFromOAuthProfile(profile);

    let user = await this.userService.findUserByEmail(extractedFields.email);

    // if the user doesn't exist we will do an account creation on login.
    if (user === null) {
      const dto = new CreateUserDto();

      dto.firstName = extractedFields.name.givenName;
      dto.middleName = extractedFields.name.middleName;
      dto.lastName = extractedFields.name.familyName;
      dto.password = null;
      dto.email = extractedFields.email;

      user = await this.userService.createUser(dto, strategy);
    }

    return user;
  }
}
