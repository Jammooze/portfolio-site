import { Injectable } from "@nestjs/common";
import { Post } from "../entities/post.entity";
import { User } from "../../users/user.entity";
import { ConfigService } from "@nestjs/config";

function formatMonthYear(date: Date): string {
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

  const formattedDateWithComma = formattedDate.replace(" ", ", ");
  return formattedDateWithComma;
}

@Injectable()
export class PostMetaHelperService {
  constructor(private readonly configService: ConfigService) {}

  createMetaTitle(title: string, author: string) {
    const date = formatMonthYear(new Date());
    return `${title} | by ${author} | ${date} | Voyage`;
  }

  createMetaDescription(content: string): string {
    const sentences = content.split(".");
    const openingSentences = sentences.splice(0, 2);
    let summary = openingSentences.join(". ");

    // Google will only show between 155 to 160 characters for meta description tags.
    if (summary.length > 155) {
      summary = summary.substring(0, 156) + "...";
    }

    return summary;
  }

  createMetaTags(post: Post, author: User): { key: string; content: string }[] {
    const authorPageUrl =
      this.configService.getOrThrow("baseUrl") + `/@${author.fullName}`;

    return [
      {
        key: "author",
        content: author.fullName, // author name
      },
      {
        key: "description",
        content: this.createMetaDescription(post.summary ?? post.content),
      },
      {
        key: "robots",
        content: "index,follow,max-image-preview:large",
      },
      {
        key: "og:title",
        content: post.title,
      },
      {
        key: "og:type",
        content: "article",
      },
      {
        key: "og:image",
        content: "", // should probably scrape for the first image in the content.
      },
      {
        key: "og:url",
        content: `${authorPageUrl}/${post.slug}`,
      },
      {
        key: "og:description",
        content: this.createMetaDescription(post.summary ?? post.content),
      },
      {
        key: "og:site_name",
        content: "Voyage",
      },
      {
        key: "og:modified_time",
        content: (post.updatedAt.getTime() ?? new Date().getTime()).toString(),
      },
      {
        key: "article:author", // url of the author page
        content: authorPageUrl,
      },
    ];
  }
}
