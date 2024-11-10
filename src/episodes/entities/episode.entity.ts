import { ApiProperty } from "@nestjs/swagger";
import { Episode } from "@prisma/client";

export class EpisodeEntity implements Episode {
	@ApiProperty()
	id!: number;

	@ApiProperty()
	episodeNumber!: number;

	@ApiProperty()
	thumbnailUrl!: string;

	@ApiProperty()
	subtitle!: string;

	@ApiProperty()
	webtoonId!: number;

	@ApiProperty()
	contents!: string[];

	@ApiProperty()
	createdAt!: Date;

	@ApiProperty()
	updatedAt!: Date;
}
