import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private users: mongoose.Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    
    const isfound = await this.users.findOne({ email }).exec(); 
    if(isfound) {
      throw new ConflictException("Email already in use");
    }

    const createdUser = new this.users(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.users.find().exec();
  }

  findById(id: string) {
    return this.users.findById(id);
  }

  findByEmail(email: string) {
    return this.users.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if(updateUserDto.email) {
      const isfound = await this.users.findOne({ email: updateUserDto.email }).exec();
      if(isfound) {
        throw new ConflictException("Email already in use");
      }
    }

    return this.users.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.users.findByIdAndDelete(id).exec();
  }
}
