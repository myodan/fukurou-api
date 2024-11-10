import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { PrismaClientExceptionFilter } from "nestjs-prisma";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const { httpAdapter } = app.get(HttpAdapterHost);

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

	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

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
		.addCookieAuth("access-token")
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
