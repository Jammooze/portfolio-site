import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { LoginUserDto } from "../dtos/login-user.dto";

@Injectable()
export class ValidateLoginGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const loginDto = plainToClass(LoginUserDto, req.body);
    const errors = await validate(loginDto, { stopAtFirstError: true });

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints))
        .flat();

      throw new BadRequestException({
        statusCode: 400,
        message: errorMessages,
        error: "Bad Request",
      });
    }

    req.body = loginDto;
    return true;
  }
}
