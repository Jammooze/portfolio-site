import { Controller, Get, UseGuards, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { GoogleAuthGuard } from "./guards/google-auth.guard";

@Controller("auth")
export class AuthController {
  // Making a request to this route will redirect the client to the oauth page.
  @Get("google")
  @UseGuards(GoogleAuthGuard)
  googleLogin(): void {
    return;
  }

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Req() req: Request, @Res() res: Response) {
    return res.redirect("http://localhost:3001/user/me");
  }
}
