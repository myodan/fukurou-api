import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
} from "@nestjs/swagger";
import { Public } from "~/auth/decorators/public.decorator";
import { EpisodeEntity } from "~/episodes/entities/episode.entity";
import { CreateWebtoonDto } from "./dto/create-webtoon.dto";
import { UpdateWebtoonDto } from "./dto/update-webtoon.dto";
import { WebtoonEntity } from "./entities/webtoon.entity";
import { WebtoonsService } from "./webtoons.service";

@Controller("webtoons")
export class WebtoonsController {
	constructor(private readonly webtoonsService: WebtoonsService) {}

	@ApiOperation({ summary: "웹툰 생성" })
	@ApiCreatedResponse({ type: WebtoonEntity })
	@Post()
	create(@Body() createWebtoonDto: CreateWebtoonDto) {
		return this.webtoonsService.create(createWebtoonDto);
	}

	@ApiOperation({ summary: "웹툰 목록 조회" })
	@ApiOkResponse({ type: WebtoonEntity, isArray: true })
	@Public()
	@Get()
	findAll() {
		return this.webtoonsService.findAll();
	}

	@ApiOperation({ summary: "웹툰 조회" })
	@ApiParam({ name: "id", description: "웹툰 ID" })
	@ApiOkResponse({ type: WebtoonEntity })
	@Public()
	@Get(":id")
	findOne(@Param("id") id: number) {
		return this.webtoonsService.findOne(id);
	}

	@ApiOperation({ summary: "웹툰 에피소드 목록 조회" })
	@ApiParam({ name: "id", description: "웹툰 ID" })
	@ApiOkResponse({ type: EpisodeEntity, isArray: true })
	@Public()
	@Get(":id/episodes")
	findAllEpisodes(@Param("id") id: number) {
		return this.webtoonsService.findAllEpisodes(id);
	}

	@ApiOperation({ summary: "웹툰 수정" })
	@ApiParam({ name: "id", description: "웹툰 ID" })
	@Patch(":id")
	update(@Param("id") id: number, @Body() updateWebtoonDto: UpdateWebtoonDto) {
		return this.webtoonsService.update(id, updateWebtoonDto);
	}

	@ApiOperation({ summary: "웹툰 삭제" })
	@ApiParam({ name: "id", description: "웹툰 ID" })
	@Delete(":id")
	remove(@Param("id") id: number) {
		return this.webtoonsService.remove(id);
	}
}
