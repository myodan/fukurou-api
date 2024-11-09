import { Role } from "@prisma/client";

export type Payload = {
	sub: number;
	username: string;
	role: Role;
};
