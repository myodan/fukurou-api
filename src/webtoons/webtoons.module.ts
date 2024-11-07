import { Module } from "@nestjs/common";
import { WebtoonsController } from "./webtoons.controller";
import { WebtoonsService } from "./webtoons.service";

@Module({
	controllers: [WebtoonsController],
	providers: [WebtoonsService],
})
export class WebtoonsModule {}
