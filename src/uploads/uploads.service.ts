import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Client } from "minio";
import { InjectMinio } from "nestjs-minio";
import { PrismaService } from "nestjs-prisma";
import { v4 as uuid } from "uuid";

@Injectable()
export class UploadsService {
	constructor(
		private readonly configService: ConfigService,
		private readonly prismaService: PrismaService,
		@InjectMinio()
		private readonly minioService: Client,
	) {}

	uploadFiles(files: Express.Multer.File[], path: string = "uploads") {
		return Promise.all(
			files.map(async (file) => {
				const bucket = this.configService.getOrThrow("MINIO_BUCKET");
				const id = uuid();
				const extension = file.originalname.split(".").pop();

				await this.minioService.putObject(
					bucket,
					`${path}/${id}.${extension}`,
					file.buffer,
					file.size,
					{
						"Content-Type": file.mimetype,
					},
				);

				return this.getUrl(`${path}/${id}.${extension}`);
			}),
		);
	}

	getUrl(path: string) {
		const protocol =
			this.configService.getOrThrow("MINIO_USE_SSL") === "true"
				? "https"
				: "http";
		const host = this.configService.getOrThrow("MINIO_ENDPOINT");
		const port = this.configService.getOrThrow("MINIO_PORT");
		const bucket = this.configService.getOrThrow("MINIO_BUCKET");

		if (
			(port === "80" && protocol === "http") ||
			(port === "443" && protocol === "https")
		) {
			return `${protocol}://${host}/${bucket}/${path}`;
		}

		return `${protocol}://${host}:${port}/${bucket}/${path}`;
	}
}
