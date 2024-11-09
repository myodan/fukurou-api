import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUrl } from "class-validator";

export class CreateEpisodeDto {
	@ApiProperty({ description: "에피소드의 부제목을 입력하세요." })
	@IsString()
	subtitle!: string;

	@ApiProperty({ description: "에피소드의 썸네일 이미지 URL을 입력하세요." })
	@IsUrl()
	thumbnailUrl!: string;

	@ApiProperty({ description: "에피소드가 속하는 웹툰의 ID를 입력하세요." })
	@IsNumber()
	webtoonId!: number;
}
