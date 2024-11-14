import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import Joi from "joi";
import { NestMinioModule } from "nestjs-minio";
import { PrismaModule } from "nestjs-prisma";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { EpisodesModule } from "./episodes/episodes.module";
import { TagsModule } from "./tags/tags.module";
import { UploadsModule } from "./uploads/uploads.module";
import { UsersModule } from "./users/users.module";
import { WebtoonsModule } from "./webtoons/webtoons.module";

@Module({
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: Joi.object({
				NODE_ENV: Joi.string()
					.valid("development", "production", "test")
					.default("development"),
				DATABASE_URL: Joi.string().required(),
				ACCESS_TOKEN_SECRET: Joi.string().required(),
				ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
				REFRESH_TOKEN_SECRET: Joi.string().required(),
				REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
			}),
		}),
		PrismaModule.forRoot({ isGlobal: true }),
		NestMinioModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				isGlobal: true,
				endPoint: configService.getOrThrow("MINIO_ENDPOINT"),
				port: +configService.getOrThrow("MINIO_PORT"),
				useSSL: configService.getOrThrow("MINIO_USE_SSL") === "true",
				accessKey: configService.getOrThrow("MINIO_ACCESS_KEY"),
				secretKey: configService.getOrThrow("MINIO_SECRET_KEY"),
			}),
		}),
		UsersModule,
		AuthModule,
		WebtoonsModule,
		EpisodesModule,
		TagsModule,
		UploadsModule,
	],
})
export class AppModule {}
