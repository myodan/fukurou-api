import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Injectable()
export class TagsService {
	constructor(private readonly prismaService: PrismaService) {}

	create(createTagDto: CreateTagDto) {
		return this.prismaService.tag.create({ data: createTagDto });
	}

	findAll() {
		return this.prismaService.tag.findMany();
	}

	findOne(id: number) {
		return this.prismaService.tag.findUniqueOrThrow({
			where: { id },
			include: { webtoons: true },
		});
	}

	update(id: number, updateTagDto: UpdateTagDto) {
		return this.prismaService.tag.update({
			where: { id },
			data: updateTagDto,
		});
	}

	remove(id: number) {
		return `This action removes a #${id} tag`;
	}
}
