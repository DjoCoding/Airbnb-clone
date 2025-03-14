import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose";

export type UserDocument = User & Document<mongoose.Types.ObjectId> & {
    createdAt: Date;
    updatedAt: Date;
};

@Schema({ timestamps: true })
export class User {
    @Prop({ trim: true, required: true })
    firstname: string;

    @Prop({ trim: true, required: true })
    lastname: string;

    @Prop({ trim: true, required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);