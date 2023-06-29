/* eslint-disable @typescript-eslint/no-inferrable-types */

import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationQuery {
  @ApiPropertyOptional({
    default: 1,
    description: "The index of the page being accessed or queried.",
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsPositive({
    message: "pageIndex must be a positive number (greater than zero).",
  })
  @IsNumber(undefined, {
    message: "pageIndex must be a number.",
  })
  pageIndex: number = 1;

  @ApiPropertyOptional({
    default: 10,
    enum: [10, 25],
    description: "The number of items or results to be included in a page.",
  })
  @IsOptional()
  @IsIn([10, 25], {
    message: "pageSize must be one of the following: 10, 25.",
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsPositive({
    message: "pageSize must be a positive number (greater than zero).",
  })
  @IsNumber(undefined, {
    message: "pageSize must be a number.",
  })
  pageSize: number = 10;
}
