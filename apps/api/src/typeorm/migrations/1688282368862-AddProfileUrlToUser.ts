import { IsNull, MigrationInterface, QueryRunner, TableColumn } from "typeorm";
import { User } from "../../users/user.entity";

export class AddProfileUrlToUser1688282368862 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "profileUrl",
        type: "varchar",
        isNullable: true,
        default: null,
      })
    );

    const userRepository = queryRunner.manager.getRepository(User);
    const users = await userRepository.find({
      where: {
        profileUrl: IsNull(),
      },
    });

    users.forEach((user) => {
      user.profileUrl = `https://api.dicebear.com/6.x/adventurer-neutral/png?seed=${user.fullName}`;
    });

    await userRepository.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("user", "profileUrl");
  }
}
