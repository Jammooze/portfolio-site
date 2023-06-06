import { Injectable } from "@nestjs/common";
import * as slug from "slug";

@Injectable()
export class SlugService {
  slugify(string: string) {
    return slug(string);
  }
}
