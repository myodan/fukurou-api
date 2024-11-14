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
		for (const file of files) {
			this.minioService.putObject(
				this.configService.getOrThrow("MINIO_BUCKET"),
				`${path}/${uuid()}.${file.originalname.split(".").pop()}`,
				file.buffer,
				file.size,
				{
					"Content-Type": file.mimetype,
				},
			);
		}
	}
}
