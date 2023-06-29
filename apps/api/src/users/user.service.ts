import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./user.entity";
import { HashService } from "../hash/hash.service";
import { AuthStrategy } from "../auth/auth-strategy.enum";
import { censorEmail } from "../auth/utils/censorEmail";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService
  ) {}

  async create(
    createUserDto: CreateUserDto,
    strategy: AuthStrategy
  ): Promise<User> {
    const isEmailTaken = await this.isEmailTaken(createUserDto.email);

    if (isEmailTaken) {
      throw new ConflictException("Email has already been taken.");
    }

    const user = new User();

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

  async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });
    return !!user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (user === null) {
      throw new NotFoundException(
        `User with email: ${censorEmail(email)} not found.`
      );
    }

    return user;
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (user === null) {
      throw new NotFoundException(`User with ID: ${id} not found.`);
    }

    return user;
  }
}
