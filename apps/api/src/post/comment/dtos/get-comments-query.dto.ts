import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsString } from "class-validator";

export class GetCommentsQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({
    message: "Cursor must be a string.",
  })
  cursor = "";

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @ApiPropertyOptional({ default: 10, enum: [10, 25] })
  @IsOptional()
  @IsIn([10, 25], {
    message: "Limit must be one of the following: 10, 25.",
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber(undefined, {
    message: "Limit must be a number.",
  })
  limit: number = 10;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @ApiPropertyOptional({
    default: "asc",
    description: "Sort comments by created date.",
    enum: ["asc", "desc"],
  })
  @IsOptional()
  @IsIn(["asc", "desc"], {
    // eslint-disable-next-line prettier/prettier
    message: "Sort must be either \"asc\" or \"desc\".",
  })
  @Transform(({ value }) => value.toLowerCase())
  @IsString({
    message: "Sort must be a string.",
  })
  sort: string = "asc";
}
