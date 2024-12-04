import { FindOptionsWhere, Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

export class RepositoryUtils
{
  static async findOrFail<T>(
    repository: Repository<T>,
    id: number,
    errorMessage: string,
    relations?: string[]
  ): Promise<T>
  {

    const where: FindOptionsWhere<T> = { id } as unknown as FindOptionsWhere<T>

    const entity = await repository.findOne({
      where,
      ...(relations?.length ? { relations } : {}),
    });

    if(!entity) {
      throw new NotFoundException(errorMessage);
    }

    return entity;

  }
}
