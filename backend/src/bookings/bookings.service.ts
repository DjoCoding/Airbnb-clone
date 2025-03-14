import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking, BookingDocument } from 'src/schemas/bookings.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private readonly bookings: Model<BookingDocument>
  ) {}

  async create(userID: string, createBookingDto: CreateBookingDto) {
    const { placeID } = createBookingDto;
    
    const isAlreadyBooked = await this.findBookingOfUser(userID, placeID);
    if(isAlreadyBooked) {
      throw new ConflictException(`User ${userID} already booked place ${placeID}`); 
    }

    const createdBooking = new this.bookings({
      userID,
      ...createBookingDto
    });

    return createdBooking.save();
  }

  async findBookingOfUser(userID: string, placeID: string) {
    return this.bookings.findOne({
      userID,
      placeID
    });
  }

  async findBookingsOfUser(userID: string) {
    return this.bookings.find({
      userID
    });
  }
}
