import { IsMongoId } from "class-validator";

export class CreateBookingDto {
    @IsMongoId()
    placeID: string;
}
