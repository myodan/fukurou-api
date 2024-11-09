import { PartialType } from "@nestjs/swagger";
import { CreateWebtoonDto } from "./create-webtoon.dto";

export class UpdateWebtoonDto extends PartialType(CreateWebtoonDto) {}
