import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HashService } from "../hash/hash.service";
import { AuthStrategy } from "../auth/auth-strategy.enum";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    strategy: AuthStrategy
  ): Promise<User> {
    const user = new User();

    user.firstName = createUserDto.firstName;
    user.middleName = createUserDto.middleName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;

    // Third party services verifys the email address during the authentication process.
    user.isVerified = strategy !== AuthStrategy.Email;
    user.passwordHash = createUserDto.password
      ? await this.hashService.hash(createUserDto.password)
      : null;
    user.intro = createUserDto.intro;
    user.profile = createUserDto.profile;

    await user.save();
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}
