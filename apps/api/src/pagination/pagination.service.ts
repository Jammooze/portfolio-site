import { BadRequestException, Injectable } from "@nestjs/common";
import { FindManyOptions, Repository } from "typeorm";
import { PaginationQuery } from "./paginationQuery";
import { PaginationResult } from "./paginationResult.interface";

export * from "./paginationQuery";
export * from "./paginationResult.interface";

export interface PaginateData<T, U> {
  repository: Repository<T>;
  query: PaginationQuery;
  options?: FindManyOptions<T>;
  transformFn?: (records: T[]) => U[] | Promise<U[]>;
}

@Injectable()
export class PaginationService {
  private async getTotalRecords<T>(repository: Repository<T>) {
    const totalRecords = await repository.count();
    return totalRecords;
  }

  async paginate<T, U>({
    repository,
    query,
    options,
    transformFn,
  }: PaginateData<T, U>): Promise<PaginationResult<U>> {
    const totalRecords = await this.getTotalRecords(repository);
    const skip = (query.pageIndex - 1) * query.pageSize;

    if (skip > totalRecords) {
      throw new BadRequestException(
        "Invalid pagination parameters: The requested page exceeds the total number of records in repository."
      );
    }

    const records = await repository.find({
      skip,
      take: query.pageSize,
      ...options,
    });

    const transformedResults = transformFn
      ? await transformFn(records)
      : (records as unknown as U[]);

    return {
      ...query,
      recordCount: totalRecords,
      totalPages: Math.ceil(totalRecords / query.pageSize),
      results: transformedResults,
    };
  }
}
