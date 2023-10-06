import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('School Sphere API Documentation')
    .setDescription(
      'This is the official API documentation of the schoolsphere app',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('SCHOOLSPHERE')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
};
