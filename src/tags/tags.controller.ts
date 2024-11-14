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
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { TagEntity } from "./entities/tag.entity";
import { TagsService } from "./tags.service";

@Controller("tags")
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@ApiOperation({ summary: "태그 생성" })
	@ApiCreatedResponse({ type: TagEntity })
	@Post()
	create(@Body() createTagDto: CreateTagDto) {
		return this.tagsService.create(createTagDto);
	}

	@ApiOperation({ summary: "태그 목록 조회" })
	@ApiOkResponse({ type: TagEntity, isArray: true })
	@Public()
	@Get()
	findAll() {
		return this.tagsService.findAll();
	}

	@ApiOperation({ summary: "태그 조회" })
	@ApiParam({ name: "id", description: "태그 ID" })
	@ApiOkResponse({ type: TagEntity })
	@Public()
	@Get(":id")
	findOne(@Param("id") id: number) {
		return this.tagsService.findOne(+id);
	}

	@ApiOperation({ summary: "태그 수정" })
	@ApiParam({ name: "id", description: "태그 ID" })
	@Patch(":id")
	update(@Param("id") id: number, @Body() updateTagDto: UpdateTagDto) {
		return this.tagsService.update(+id, updateTagDto);
	}

	@ApiOperation({ summary: "태그 삭제" })
	@ApiParam({ name: "id", description: "태그 ID" })
	@Delete(":id")
	remove(@Param("id") id: number) {
		return this.tagsService.remove(+id);
	}
}
