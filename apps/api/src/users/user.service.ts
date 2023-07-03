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
import { ProfileUser } from "./dtos/profileUser.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService
  ) {}

  async create(userData: CreateUserDto, strategy: AuthStrategy): Promise<User> {
    const isEmailTaken = await this.isEmailTaken(userData.email);

    if (isEmailTaken) {
      throw new ConflictException("Email has already been taken.");
    }

    const user = new User();

    user.fullName = userData.fullName;
    user.email = userData.email;
    user.profileUrl = `https://api.dicebear.com/6.x/adventurer-neutral/png?seed=${userData.fullName}`;

    // Third party services verifys the email address during the authentication process.
    user.isVerified = strategy !== AuthStrategy.Email;
    user.passwordHash = userData.password
      ? await this.hashService.hash(userData.password)
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

  async getById(userId: string, relations?: string[]): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations,
    });

    if (user === null) {
      throw new NotFoundException(`User with ID: ${userId} not found.`);
    }

    return user;
  }

  async getProfileById(userId: string) {
    const query = this.userRepository
      .createQueryBuilder("user")
      .leftJoin("user.followedUsers", "followedUsers")
      .leftJoin("user.followingUsers", "followingUsers")
      .loadRelationCountAndMap("user.followerCount", "user.followedUsers")
      .loadRelationCountAndMap("user.followingCount", "user.followingUsers")
      .where("user.id = :id", { id: userId });

    const user = await query.getOne();

    if (user === null) {
      throw new NotFoundException(`User with ID: ${userId} not found.`);
    }

    return ProfileUser.from(user);
  }
}
