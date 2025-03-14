import { BookingDocument } from "src/schemas/bookings.schema";

export class BookingDto {
    constructor(
        private id: string,
        private userID: string,
        private placeID: string,
        private createdAt: Date
    ) {}

    static fromDocument(booking: BookingDocument) {
        return new BookingDto(
            booking._id.toString(),
            booking.userID.toString(),
            booking.placeID.toString(),
            booking.createdAt
        )
    }
}