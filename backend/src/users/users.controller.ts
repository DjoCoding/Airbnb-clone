import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, BadRequestException, UsePipes, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Private } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserDocument } from 'src/schemas/users.schema';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ParseObjectIDPipe } from 'src/common/pipes/parse-objectid.pipe';
import { PlacesService } from 'src/places/places.service';
import { PlaceDto } from 'src/places/dtos/place.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly users: UsersService,
    private readonly places: PlacesService
  ) {}

  @Private()
  @Patch()
  async updatePartially(
    @User() user: UserDocument,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const updatedUser = await this.users.update(user._id.toString(), updateUserDto);
    if(!updatedUser) {
      throw new InternalServerErrorException('failed to update user data');
    }

    return {
      user: UserDto.fromDocument(updatedUser)
    };
  }

  @Get(":userID/profile")
  async getProfile(@Param("userID", ParseObjectIDPipe) userID: string) {
    const user = await this.users.findById(userID.toString());
    if(!user) {
      throw new NotFoundException(`user ${userID} not found`)
    }

    return {
      user: UserDto.fromDocument(user)
    }
  }

  @Get(":userID/places")
  async getPlaces(@Param("userID", ParseObjectIDPipe) userID: string) {
    const places = await this.places.getOfUser(userID);
    
    return {
      places: places.map(place => PlaceDto.fromDocument(place))
    };
  }
}
