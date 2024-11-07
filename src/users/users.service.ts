import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { hashSync } from "@node-rs/argon2";
import { PrismaService } from "~/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const foundUser = await this.prismaService.user.findUnique({
			where: { username: createUserDto.username },
		});

		if (foundUser) {
			throw new BadRequestException("Username already exists");
		}

		if (createUserDto.password) {
			createUserDto.password = hashSync(createUserDto.password);
		}

		return this.prismaService.user.create({ data: createUserDto });
	}

	findAll() {
		return this.prismaService.user.findMany();
	}

	findOne(id: number) {
		const foundUser = this.prismaService.user.findUnique({
			where: { id },
			include: { bookmarks: true, comments: true },
		});

		if (!foundUser) {
			throw new NotFoundException(`User with Id ${id} not found`);
		}

		return foundUser;
	}

	async findOneByUsername(username: string) {
		const foundUser = await this.prismaService.user.findUnique({
			where: { username },
		});

		if (!foundUser) {
			throw new NotFoundException(`User with Username ${username} not found`);
		}

		return foundUser;
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const foundUser = await this.prismaService.user.findUnique({
			where: { id },
		});

		if (!foundUser) {
			throw new NotFoundException(`User with Id ${id} not found`);
		}

		if (updateUserDto.password) {
			updateUserDto.password = hashSync(updateUserDto.password);
		}

		return this.prismaService.user.update({
			where: { id },
			data: updateUserDto,
		});
	}

	async remove(id: number) {
		const foundUser = await this.prismaService.user.findUnique({
			where: { id },
		});

		if (!foundUser) {
			throw new NotFoundException(`User with Id ${id} not found`);
		}

		return this.prismaService.user.delete({ where: { id } });
	}
}
