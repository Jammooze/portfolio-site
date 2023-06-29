import { ApiProperty } from "@nestjs/swagger";

export class PaginationResult<T> {
  @ApiProperty()
  pageIndex: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  recordCount: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  results: T[];
}
