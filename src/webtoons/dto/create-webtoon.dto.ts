import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { DayOfWeek } from "@prisma/client";
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsOptional,
	IsString,
	IsUrl,
} from "class-validator";

export class CreateWebtoonDto {
	@ApiProperty({ description: "웹툰의 제목을 입력하세요." })
	@IsString()
	title!: string;

	@ApiProperty({ description: "웹툰의 줄거리나 설명을 입력하세요." })
	@IsString()
	synopsis!: string;

	@ApiProperty({ description: "웹툰의 썸네일 이미지 URL을 입력하세요." })
	@IsUrl()
	thumbnailUrl!: string;

	@ApiProperty({
		enum: DayOfWeek,
		isArray: true,
		description:
			"웹툰이 연재되는 요일을 입력하세요. 여러 요일을 입력할 수 있습니다. 배열이 비어 있을 경우 비정기 연재로 간주됩니다.",
	})
	@IsArray()
	@IsEnum(DayOfWeek, { each: true })
	daysOfWeek!: DayOfWeek[];

	@ApiPropertyOptional({ description: "성인 콘텐츠 여부를 입력하세요." })
	@IsOptional()
	@IsBoolean()
	isAdult: boolean = false;

	@ApiPropertyOptional({
		description: "웹툰이 완결되었는지 여부를 입력하세요.",
	})
	@IsOptional()
	@IsBoolean()
	isFinished: boolean = false;
}
