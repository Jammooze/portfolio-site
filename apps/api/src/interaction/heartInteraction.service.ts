import { BaseEntity } from "typeorm";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { HeartItemResponse } from "./dtos/heartItem.dto";
import { User } from "src/users/user.entity";

class HeartedUsersColumnEntity extends BaseEntity {
  heartedUsers: User[];
}

@Injectable()
export class HeartInteractionService {
  private checkHeartedUsersColumnEntity(entity: HeartedUsersColumnEntity) {
    if (!("heartedUsers" in entity)) {
      throw new InternalServerErrorException(
        "heartedUsers field is missing in the entity."
      );
    }
  }

  private async saveEntityAndGetHeartCount(
    entity: HeartedUsersColumnEntity
  ): Promise<HeartItemResponse> {
    const updatedEntity = await entity.save();
    return {
      heartCount: updatedEntity.heartedUsers.length,
    };
  }

  async heartItem(
    entity: HeartedUsersColumnEntity,
    user: User
  ): Promise<HeartItemResponse> {
    this.checkHeartedUsersColumnEntity(entity);

    const isUserHearted = entity.heartedUsers.some(
      (heartedUser) => heartedUser.id === user.id
    );

    if (isUserHearted) {
      throw new BadRequestException("You have already hearted this item.");
    }

    entity.heartedUsers.push(user);
    return await this.saveEntityAndGetHeartCount(entity);
  }

  async unheartItem(
    entity: HeartedUsersColumnEntity,
    user: User
  ): Promise<HeartItemResponse> {
    this.checkHeartedUsersColumnEntity(entity);

    const isUserHearted = entity.heartedUsers.some(
      (heartedUser) => heartedUser.id === user.id
    );

    if (!isUserHearted) {
      throw new BadRequestException("You have not hearted this item.");
    }

    entity.heartedUsers = entity.heartedUsers.filter(
      (heartedUser) => heartedUser.id !== user.id
    );

    return await this.saveEntityAndGetHeartCount(entity);
  }
}
