import { Injectable } from "@nestjs/common";

function formatMonthYear(date: Date): string {
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

  const formattedDateWithComma = formattedDate.replace(" ", ", ");
  return formattedDateWithComma;
}

@Injectable()
export class PostMetaService {
  createMetaTitle(title: string, author: string) {
    const date = formatMonthYear(new Date());
    return `${title} | by ${author} | ${date} | Voyage`;
  }
}
