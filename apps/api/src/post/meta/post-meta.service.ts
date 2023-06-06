import { Injectable } from "@nestjs/common";

@Injectable()
export class PostMetaService {
  createMetaTitle(title: string, author: string) {
    // should probably save this as a function somewhere.
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    return `${title} | by ${author} | ${formattedDate} | Voyage`;
  }
}
