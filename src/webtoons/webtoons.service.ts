import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "~/prisma/prisma.service";
import { CreateWebtoonDto } from "./dto/create-webtoon.dto";
import { UpdateWebtoonDto } from "./dto/update-webtoon.dto";

@Injectable()
export class WebtoonsService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createWebtoonDto: CreateWebtoonDto) {
		return this.prismaService.webtoon.create({ data: createWebtoonDto });
	}

	async findAll() {
		return this.prismaService.webtoon.findMany();
	}

	async findOne(webtoonId: number) {
		const foundWebtoon = await this.prismaService.webtoon.findUnique({
			where: { id: webtoonId },
			include: { episodes: true },
		});

		if (!foundWebtoon) {
			throw new NotFoundException(`Webtoon with Id ${webtoonId} not found`);
		}

		return foundWebtoon;
	}

	async update(webtoonId: number, updateWebtoonDto: UpdateWebtoonDto) {
		const foundWebtoon = await this.prismaService.webtoon.findUnique({
			where: { id: webtoonId },
		});

		if (!foundWebtoon) {
			throw new NotFoundException(`Webtoon with Id ${webtoonId} not found`);
		}

		return this.prismaService.webtoon.update({
			where: { id: webtoonId },
			data: updateWebtoonDto,
		});
	}

	async remove(webtoonId: number) {
		const foundWebtoon = await this.prismaService.webtoon.findUnique({
			where: { id: webtoonId },
		});

		if (!foundWebtoon) {
			throw new NotFoundException(`Webtoon with Id ${webtoonId} not found`);
		}

		return this.prismaService.webtoon.delete({
			where: { id: webtoonId },
		});
	}
}
