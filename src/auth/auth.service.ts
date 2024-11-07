import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { verifySync } from "@node-rs/argon2";
import { User } from "@prisma/client";
import { PrismaService } from "~/prisma/prisma.service";
import { Payload } from "./types/payload";

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(username: string, password: string) {
		const foundUser = await this.prismaService.user.findUnique({
			where: { username },
		});

		if (!foundUser) {
			return null;
		}

		if (!verifySync(foundUser.password, password)) {
			return null;
		}

		return foundUser;
	}

	issueJwtToken(user: User) {
		const payload: Payload = {
			sub: user.id,
			username: user.username,
			role: user.role,
		};

		return this.jwtService.sign(payload);
	}
}
