import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import {
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Response } from "express";
import { UserEntity } from "~/users/entities/user.entity";
import { UsersService } from "~/users/users.service";
import { AuthService } from "./auth.service";
import { Principal } from "./decorators/principal.decorator";
import { Public } from "./decorators/public.decorator";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Payload } from "./types/payload";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) {}

	@ApiOperation({ summary: "회원가입" })
	@ApiCreatedResponse({ type: UserEntity })
	@Public()
	@Post("sign-up")
	signUp(@Body() signUpDto: SignUpDto) {
		return this.usersService.create(signUpDto);
	}

	@ApiOperation({ summary: "로그인" })
	@ApiBody({ type: SignInDto })
	@ApiCreatedResponse({
		schema: { properties: { accessToken: { type: "string" } } },
	})
	@Public()
	@UseGuards(LocalAuthGuard)
	@Post("sign-in")
	signIn(
		@Principal() user: User,
		@Res({ passthrough: true }) response: Response,
	) {
		const accessToken = this.authService.issueJwtToken(user);
		response.cookie("access-token", accessToken);

		return { accessToken };
	}

	@ApiOperation({ summary: "인증 사용자 조회" })
	@ApiOkResponse({ type: UserEntity })
	@Get("profile")
	getProfile(@Principal() payload: Payload) {
		return this.usersService.findOneByUsername(payload.username);
	}
}
