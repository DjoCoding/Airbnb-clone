import mongoose from "mongoose";

export class JwtPayloadDto {
    id: mongoose.Types.ObjectId;
    email: string;
}