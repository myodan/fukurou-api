import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { Public } from "~/auth/decorators/public.decorator";
import { CreateEpisodeDto } from "./dto/create-episode.dto";
import { UpdateEpisodeDto } from "./dto/update-episode.dto";
import { EpisodeEntity } from "./entities/episode.entity";
import { EpisodesService } from "./episodes.service";

@Controller("episodes")
export class EpisodesController {
	constructor(private readonly episodesService: EpisodesService) {}

	@ApiOperation({ summary: "에피소드 생성" })
	@ApiCreatedResponse({ type: EpisodeEntity })
	@Post()
	createEpisode(@Body() createEpisodeDto: CreateEpisodeDto) {
		return this.episodesService.create(createEpisodeDto);
	}

	@ApiOperation({ summary: "에피소드 목록 조회" })
	@ApiCreatedResponse({ type: EpisodeEntity, isArray: true })
	@Get()
	@Public()
	findAllEpisode() {
		return this.episodesService.findAll();
	}

	@ApiOperation({ summary: "에피소드 조회" })
	@ApiParam({ name: "id", description: "에피소드 ID" })
	@ApiCreatedResponse({ type: EpisodeEntity })
	@Public()
	@Get(":id")
	findOneEpisode(@Param("id") id: number) {
		return this.episodesService.findOne(id);
	}

	@ApiOperation({ summary: "에피소드 수정" })
	@ApiParam({ name: "id", description: "에피소드 ID" })
	@Patch(":id")
	updateEpisode(
		@Param("id") id: number,
		@Body() updateEpisodeDto: UpdateEpisodeDto,
	) {
		return this.episodesService.update(id, updateEpisodeDto);
	}

	@ApiOperation({ summary: "에피소드 삭제" })
	@ApiParam({ name: "id", description: "에피소드 ID" })
	@Delete(":id")
	removeEpisode(@Param("id") id: number) {
		return this.episodesService.remove(id);
	}
}
