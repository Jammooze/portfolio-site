import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { User } from "src/users/user.entity";
import { FollowUserResponse } from "./dtos/followUser.dto";

@Injectable()
export class FollowInteractionService {
  private checkFollowingUserEntity(user: User) {
    if (!("followingUsers" in user)) {
      throw new InternalServerErrorException(
        "followingUsers field is missing in the following user entity."
      );
    }

    if (!("followedUsers" in user)) {
      throw new InternalServerErrorException(
        "followedUsers field is missing in the following user entity."
      );
    }
  }

  private async saveEntityAndGetFollowerCount(
    entity: User
  ): Promise<FollowUserResponse> {
    const updatedEntity = await entity.save();
    return {
      followerCount: updatedEntity.followedUsers.length,
    };
  }

  async followUser(
    follower: User,
    following: User
  ): Promise<FollowUserResponse> {
    this.checkFollowingUserEntity(following);

    const isAlreadyFollowing = following.followedUsers.some(
      (user) => user.id === follower.id
    );

    if (isAlreadyFollowing) {
      throw new BadRequestException("You are already following this user.");
    }

    following.followedUsers.push(follower);
    return this.saveEntityAndGetFollowerCount(following);
  }

  async unfollowUser(
    follower: User,
    following: User
  ): Promise<FollowUserResponse> {
    this.checkFollowingUserEntity(following);

    const isCurrentlyFollowing = following.followedUsers.some(
      (user) => user.id === follower.id
    );

    if (!isCurrentlyFollowing) {
      throw new BadRequestException("You are not following this user.");
    }

    following.followedUsers = following.followedUsers.filter(
      (user) => user.id !== follower.id
    );

    return this.saveEntityAndGetFollowerCount(following);
  }
}
