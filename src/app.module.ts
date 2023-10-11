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
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
// import { RoleGuard } from './guards/role.guard';
// import { AuthGuard } from './guards/authguard.guard';
import { TicketController } from './controllers/ticket/ticket.controller';
import { TicketService } from './services/ticket/ticket.service';
import { NotificationService } from './services/notification/notification.service';

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
    CacheModule.register({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [
    AppController,
    AuthController,
    StudentsController,
    TicketController,
  ],
  providers: [
    AppService,
    DbconnectionService,
    AuthService,
    StudentsService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    TicketService,
    NotificationService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(...globalMiddlewares).forRoutes('*');
  }
}
