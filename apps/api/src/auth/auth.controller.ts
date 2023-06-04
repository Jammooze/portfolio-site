import { Controller, Get, UseGuards, Res } from "@nestjs/common";
import { Response } from "express";
import { GoogleAuthGuard } from "./guards/google-auth.guard";
import { FacebookAuthGuard } from "./guards/facebook-auth.guard";

@Controller("auth")
export class AuthController {
  // Making a request to this route will redirect the client to the oauth page.
  @Get("google")
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin(): void {
    return;
  }

  @Get("facebook")
  @UseGuards(FacebookAuthGuard)
  handleFacebookLogin(): void {
    console.log("dqwe");
    return;
  }

  @Get("facebook/callback")
  @UseGuards(FacebookAuthGuard)
  handleFacebookCallback(@Res() res: Response): void {
    return res.redirect("http://localhost:3001/user/me");
  }

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  handleGoogleCallback(@Res() res: Response) {
    return res.redirect("http://localhost:3001/user/me");
  }
}
