import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "~/auth/types/payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		super({
			secretOrKey: configService.get("ACCESS_TOKEN_SECRET"),
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request.cookies["access-token"];
				},
			]),
		});
	}

	async validate(payload: Payload) {
		return payload;
	}
}
