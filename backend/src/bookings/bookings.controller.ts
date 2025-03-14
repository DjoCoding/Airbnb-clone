import { Controller, Post, Body, InternalServerErrorException, Get } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Private } from 'src/common/decorators/auth.decorator';
import { UserDocument } from 'src/schemas/users.schema';
import { User } from 'src/common/decorators/user.decorator';
import { BookingDto } from './dto/booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Private()
  async create(@User() user: UserDocument, @Body() createBookingDto: CreateBookingDto) {
    const { _id: userID } = user;

    const booking = await this.bookingsService.create(userID.toString(), createBookingDto);
    if(!booking) {
      throw new InternalServerErrorException("Failed to create the booking");
    }

    return {
      booking: BookingDto.fromDocument(booking)
    }
  }

  @Get()
  @Private()
  async getUserBookings(@User() user: UserDocument) {
    const { _id: userID } = user; 
    const bookings = await this.bookingsService.findBookingsOfUser(userID.toString());
    return {
      bookings: bookings.map(booking => BookingDto.fromDocument(booking))      
    };
  }
}
