import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class SubmitCommentVoteDto {
  @ApiProperty({ enum: ["like", "dislike"], default: "like" })
  @IsIn(["like", "dislike"], {
    message: "Invalid action. Only 'like' or 'dislike' are allowed.",
  })
  @IsString({
    message: "Action must be a string.",
  })
  @IsNotEmpty({
    message: "Action is a required field.",
  })
  action: "dislike" | "like";
}
