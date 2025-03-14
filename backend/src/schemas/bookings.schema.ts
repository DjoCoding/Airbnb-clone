import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type BookingDocument = Booking & Document<mongoose.Types.ObjectId> & {
    createdAt: Date;
    updatedAt: Date;
} 


@Schema({ timestamps: true })
export class Booking {
    @Prop({ required: true })
    placeID: string;

    @Prop({ required: true })
    userID: string;
}

export const BookingSchema =  SchemaFactory.createForClass(Booking);