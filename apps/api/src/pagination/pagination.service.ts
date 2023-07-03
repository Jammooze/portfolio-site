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

export interface Filter {
  field: string;
  operator: string;
  value: any;
}

export interface OffsetPaginateData<T, U> {
  repository: Repository<T>;
  query: PaginationQuery;
  options?: {
    relations?: AliasProperty[];
    relationsCount?: AliasProperty[];
    filters?: Filter[];
  };
  transformFn?: (records: T[]) => U[] | Promise<U[]>;
}

@Injectable()
export class PaginationService {
  private async getTotalRecords<T>(repository: Repository<T>) {
    const totalRecords = await repository.count();
    return totalRecords;
  }

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
        const property = `repo.${relation.property}`;

        queryBuilder.leftJoin(property, relation.property);
        queryBuilder.loadRelationCountAndMap(
          `repo.${relation.alias ?? relation.property}`,
          property
        );
      });
    }

    queryBuilder.skip(skip);
    queryBuilder.take(query.pageSize);

    // if (options && options.filters) {
    //   queryBuilder.where(
    //     options.filters
    //       .map((filter) => `repo.${filter.field} ${filter.operator} :value`)
    //       .join(" AND "),
    //     options.filters.reduce(
    //       (params, filter) => ({ ...params, value: filter.value }),
    //       {}
    //     )
    //   );
    // }

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
