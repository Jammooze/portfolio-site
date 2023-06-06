import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./user.entity";
import { HashService } from "../hash/hash.service";
import { AuthStrategy } from "../auth/auth-strategy.enum";
import { IdService } from "../id/id.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
    private readonly idService: IdService
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    strategy: AuthStrategy
  ): Promise<User> {
    const user = new User();

    user.id = this.idService.generateId();
    user.fullName = createUserDto.fullName;
    user.email = createUserDto.email;

    // Third party services verifys the email address during the authentication process.
    user.isVerified = strategy !== AuthStrategy.Email;
    user.passwordHash = createUserDto.password
      ? await this.hashService.hash(createUserDto.password)
      : null;

    const savedUser = await user.save();
    return savedUser;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
