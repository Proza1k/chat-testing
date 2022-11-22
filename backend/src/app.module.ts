import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { User } from './entities/user.entity';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import { MessageModule } from './modules/message.module';
import { Message } from './entities/message.entity';
import { SocketProvider } from './providers/socket.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      entities: [User, Message],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketProvider],
})
export class AppModule {}
