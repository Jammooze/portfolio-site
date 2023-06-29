import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PaginationQuery } from "./paginationQuery";
import { PaginationResult } from "./paginationResult.interface";

export * from "./paginationQuery";
export * from "./paginationResult.interface";

@Injectable()
export class PaginationService {
  private async getTotalRecords<T>(repository: Repository<T>) {
    const totalRecords = await repository.count();
    return totalRecords;
  }

  async paginate<T, U>(
    repository: Repository<T>,
    query: PaginationQuery,
    relations?: string[],
    transformFn?: (records: T[]) => U[] | Promise<U[]>
  ): Promise<PaginationResult<U>> {
    const totalRecords = await this.getTotalRecords(repository);
    const skip = (query.pageIndex - 1) * query.pageSize;

    if (skip > totalRecords) {
      const repositoryName = repository.constructor.name;
      throw new BadRequestException(
        `Invalid pagination parameters: The requested page exceeds the total number of records in ${repositoryName}.`
      );
    }

    const records = await repository.find({
      skip,
      take: query.pageSize,
      relations,
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
