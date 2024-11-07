import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());

	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					scriptSrc: ["'self'", "cdn.jsdelivr.net"],
				},
			},
		}),
	);

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	const config = new DocumentBuilder()
		.setTitle("Fukurou API")
		.setDescription("Fukurou API documentation")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);

	app.use(
		"/reference",
		apiReference({
			theme: "default",
			spec: {
				content: document,
			},
		}),
	);

	await app.listen(3000);
}
bootstrap();
