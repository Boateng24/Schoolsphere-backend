import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './db-prisma/db-prisma/db-prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbconnectionService } from './config/dbconnection/dbconnection.service';
import { globalMiddlewares } from './middlewares/globals';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { StudentsService } from './services/students/students.service';
import { StudentsController } from './controllers/students/students.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, AuthController, StudentsController],
  providers: [AppService, DbconnectionService, AuthService, StudentsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(...globalMiddlewares).forRoutes('*');
  }
}
