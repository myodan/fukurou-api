import { Injectable } from "@nestjs/common";
import { hashSync } from "@node-rs/argon2";
import { PrismaService } from "nestjs-prisma";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	create(createUserDto: CreateUserDto) {
		return this.prismaService.user.create({
			data: {
				...createUserDto,
				password: hashSync(createUserDto.password),
			},
			omit: { password: true },
		});
	}

	findAll() {
		return this.prismaService.user.findMany({ omit: { password: true } });
	}

	findOne(id: number) {
		return this.prismaService.user.findUniqueOrThrow({
			where: { id },
			omit: { password: true },
		});
	}

	findOneByUsername(username: string) {
		return this.prismaService.user.findUniqueOrThrow({
			where: { username },
			omit: { password: true },
		});
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return this.prismaService.user.update({
			where: { id },
			data: {
				...updateUserDto,
				password: updateUserDto.password && hashSync(updateUserDto.password),
			},
		});
	}

	remove(id: number) {
		return this.prismaService.user.delete({ where: { id } });
	}
}
