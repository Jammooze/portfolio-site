import { User } from "src/users/user.entity";
import { BaseEntity } from "typeorm";

export class HeartedUsersColumnEntity extends BaseEntity {
  heartedUsers: User[];
}
