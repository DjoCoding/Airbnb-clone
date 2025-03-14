import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type PlaceDocument = Place & mongoose.Document<mongoose.Types.ObjectId> & {
    createdAt: Date;
    updatedAt: Date;
}

@Schema({ timestamps: true })
export class Place {
    @Prop({ type: mongoose.Types.ObjectId, ref: "User", required: true })
    ownerID: mongoose.Types.ObjectId;

    @Prop({ type: String, required: true })
    city: string;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: false })
    description?: string;

    @Prop([{ type: String }])
    pictures: string[];

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: Date, required: true })
    from: Date;

    @Prop({ type: Date, required: true })
    to: Date;

    @Prop({ type: Number, required: true })
    numberOfGuests: number;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);