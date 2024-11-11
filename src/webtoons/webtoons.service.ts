import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CreateWebtoonDto } from "./dto/create-webtoon.dto";
import { UpdateWebtoonDto } from "./dto/update-webtoon.dto";

@Injectable()
export class WebtoonsService {
	constructor(private readonly prismaService: PrismaService) {}

	create(createWebtoonDto: CreateWebtoonDto) {
		return this.prismaService.webtoon.create({ data: createWebtoonDto });
	}

	findAll() {
		return this.prismaService.webtoon.findMany();
	}

	findOne(id: number) {
		return this.prismaService.webtoon.findUniqueOrThrow({ where: { id } });
	}

	findAllEpisodes(id: number) {
		return this.prismaService.episode.findMany({
			where: { webtoonId: id },
			orderBy: { episodeNumber: "asc" },
		});
	}

	update(id: number, updateWebtoonDto: UpdateWebtoonDto) {
		return this.prismaService.webtoon.update({
			where: { id },
			data: updateWebtoonDto,
		});
	}

	remove(id: number) {
		return this.prismaService.webtoon.delete({ where: { id } });
	}
}
