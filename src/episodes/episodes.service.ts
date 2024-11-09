import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CreateEpisodeDto } from "./dto/create-episode.dto";
import { UpdateEpisodeDto } from "./dto/update-episode.dto";

@Injectable()
export class EpisodesService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createEpisodeDto: CreateEpisodeDto) {
		const latestEpisode = await this.prismaService.episode.findFirst({
			where: { webtoonId: createEpisodeDto.webtoonId },
			orderBy: { episodeNumber: "desc" },
		});

		const nextEpisodeNumber = latestEpisode
			? latestEpisode.episodeNumber + 1
			: 1;

		return this.prismaService.episode.create({
			data: {
				...createEpisodeDto,
				episodeNumber: nextEpisodeNumber,
			},
		});
	}

	findAll() {
		return this.prismaService.episode.findMany();
	}

	findOne(id: number) {
		return this.prismaService.episode.findUniqueOrThrow({ where: { id } });
	}

	update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
		return this.prismaService.episode.update({
			where: { id },
			data: updateEpisodeDto,
		});
	}

	remove(id: number) {
		return this.prismaService.episode.delete({ where: { id } });
	}
}
