import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PaginationQuery } from "./paginationQuery";
import { PaginationResult } from "./paginationResult.interface";

export * from "./paginationQuery";
export * from "./paginationResult.interface";

export interface AliasProperty {
  alias?: string;
  property: string;
}

export interface OffsetPaginateData<T, U> {
  repository: Repository<T>;
  query: PaginationQuery;
  options?: {
    relations?: AliasProperty[];
    relationsCount?: AliasProperty[];
  };
  transformFn?: (records: T[]) => U[] | Promise<U[]>;
}

@Injectable()
export class PaginationService {
  private async getTotalRecords<T>(repository: Repository<T>) {
    const totalRecords = await repository.count();
    return totalRecords;
  }

  private async createWhereQueryString();

  // async cursorPaginate() {}

  async offsetPaginate<T, U>({
    repository,
    query,
    options,
    transformFn,
  }: OffsetPaginateData<T, U>): Promise<PaginationResult<U>> {
    const totalRecords = await this.getTotalRecords(repository);
    const skip = (query.pageIndex - 1) * query.pageSize;

    if (skip > totalRecords) {
      throw new BadRequestException(
        "Invalid pagination parameters: The requested page exceeds the total number of records in repository."
      );
    }

    const queryBuilder = repository.createQueryBuilder("repo");

    if (options && options.relations) {
      options.relations.forEach((relation) => {
        const joinProperty = `repo.${relation.alias ?? relation.property}`;

        queryBuilder.leftJoinAndSelect(joinProperty, relation.property);
      });
    }

    if (options && options.relationsCount) {
      options.relationsCount.forEach((relation) => {
        const joinProperty = `repo.${relation.alias ?? relation.property}`;
        queryBuilder.leftJoin(joinProperty, relation.property);
        queryBuilder.loadRelationCountAndMap(
          joinProperty,
          `repo.${relation.property}`
        );
      });
    }

    queryBuilder.skip(skip);
    queryBuilder.take(query.pageSize);

    const records = await queryBuilder.getMany();
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
