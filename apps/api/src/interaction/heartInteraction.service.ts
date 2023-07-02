import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { HeartItemResponse } from "./heartItem.dto";
import { User } from "src/users/user.entity";
import { HeartedUsersColumnEntity } from "./heartedColumn.entity";

@Injectable()
export class HeartInteractionService {
  async heartItem(
    entity: HeartedUsersColumnEntity,
    user: User
  ): Promise<HeartItemResponse> {
    if (!("heartedUsers" in entity)) {
      throw new InternalServerErrorException(
        "heartedUsers field is missing in the entity."
      );
    }

    const isUserHearted = entity.heartedUsers.some(
      (heartedUser) => heartedUser.id === user.id
    );

    if (!isUserHearted) {
      entity.heartedUsers.push(user);
    } else {
      entity.heartedUsers = entity.heartedUsers.filter(
        (heartedUser) => heartedUser.id !== user.id
      );
    }

    const updatedEntity = await entity.save();

    return {
      heartCount: updatedEntity.heartedUsers.length,
      isUserHearted: !isUserHearted,
    };
  }
}
