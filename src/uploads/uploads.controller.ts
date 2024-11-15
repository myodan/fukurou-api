import {
	Controller,
	FileTypeValidator,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	UploadedFiles,
	UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiOperation } from "@nestjs/swagger";
import { UploadsService } from "./uploads.service";

@Controller("uploads")
export class UploadsController {
	constructor(private readonly uploadsService: UploadsService) {}

	@ApiOperation({ summary: "이미지 업로드" })
	@Post()
	@UseInterceptors(FilesInterceptor("files", 10))
	uploadFiles(
		@UploadedFiles(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 26214400 }),
					new FileTypeValidator({ fileType: ".(png|jpeg|jpg|webp)" }),
				],
			}),
		)
		files: Express.Multer.File[],
	) {
		return this.uploadsService.uploadFiles(files);
	}
}
