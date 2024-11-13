import { Role } from "@prisma/client";

export type Payload = {
	sub: number;
	username: string;
	avatarUrl: string | null;
	role: Role;
};
