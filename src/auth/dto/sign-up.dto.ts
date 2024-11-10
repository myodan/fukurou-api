import { ApiProperty } from "@nestjs/swagger";
import {
	IsAlphanumeric,
	IsLowercase,
	IsStrongPassword,
	Length,
} from "class-validator";

export class SignUpDto {
	@ApiProperty({
		description: "사용자명은 알파벳 소문자와 숫자로 6~32자 사이여야 합니다.",
	})
	@IsAlphanumeric()
	@IsLowercase()
	@Length(6, 32)
	username!: string;

	@ApiProperty({
		description:
			"비밀번호는 대소문자, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.",
	})
	@IsStrongPassword()
	@Length(8, 64)
	password!: string;
}
