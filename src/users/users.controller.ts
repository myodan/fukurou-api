import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiOperation, ApiParam } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: "사용자 생성" })
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@ApiOperation({ summary: "사용자 목록 조회" })
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@ApiOperation({ summary: "사용자 조회" })
	@ApiParam({ name: "id", description: "사용자 ID" })
	@Get(":id")
	findOne(@Param("id") id: number) {
		return this.usersService.findOne(id);
	}

	@ApiOperation({ summary: "사용자 수정" })
	@ApiParam({ name: "id", description: "사용자 ID" })
	@Patch(":id")
	update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@ApiOperation({ summary: "사용자 삭제" })
	@ApiParam({ name: "id", description: "사용자 ID" })
	@Delete(":id")
	remove(@Param("id") id: number) {
		return this.usersService.remove(id);
	}
}