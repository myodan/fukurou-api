import { ApiProperty } from "@nestjs/swagger";
import { DayOfWeek, Webtoon } from "@prisma/client";

export class WebtoonEntity implements Webtoon {
	@ApiProperty()
	id!: number;

	@ApiProperty()
	title!: string;

	@ApiProperty()
	synopsis!: string;

	@ApiProperty()
	thumbnailUrl!: string;

	@ApiProperty({ enum: DayOfWeek, isArray: true })
	daysOfWeek!: DayOfWeek[];

	@ApiProperty()
	isAdult!: boolean;

	@ApiProperty()
	isFinished!: boolean;

	@ApiProperty()
	createdAt!: Date;

	@ApiProperty()
	updatedAt!: Date;
}
