import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../schemas/users.schema';
import { UserSchema } from '../schemas/users.schema';
import { PlacesService } from 'src/places/places.service';
import { PlacesModule } from 'src/places/places.module';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: User.name, schema: UserSchema }]),
    PlacesModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
