import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PlacesModule } from './places/places.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri = process.env.DB_CONNECTION_STRING as string;
        mongoose.connection.on("connected", () => {
          Logger.log("Database connected successfully", "Mongoose");
        });
        return { uri };
      }
    }),
    UsersModule,
    AuthModule,
    CloudinaryModule,
    PlacesModule,
    BookingsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
