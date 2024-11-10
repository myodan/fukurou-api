import { ApiProperty } from "@nestjs/swagger";
import { Role, User } from "@prisma/client";

export class UserEntity implements User {
	@ApiProperty()
	id!: number;

	@ApiProperty()
	username!: string;

	@ApiProperty()
	password!: string;

	@ApiProperty({ enum: Role, default: Role.USER })
	role: Role = Role.USER;

	@ApiProperty()
	avatarUrl!: string | null;

	@ApiProperty()
	createdAt!: Date;

	@ApiProperty()
	updatedAt!: Date;
}
