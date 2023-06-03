import { Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { User } from "../users/user.entity";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { GoogleProfile } from "./google-profile";
import { AuthStrategy } from "./auth-strategy.enum";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateGoogleAuth(profile: GoogleProfile): Promise<User> {
    let user = await this.userService.findUserByEmail(profile.email);

    // if the user doesn't exist we will do an account creation on login.
    if (user === null) {
      const dto = new CreateUserDto();

      dto.firstName = profile.name;
      dto.lastName = profile.family_name;
      dto.email = profile.email;

      user = await this.userService.createUser(dto, AuthStrategy.Google);
    }

    return user;
  }
}
