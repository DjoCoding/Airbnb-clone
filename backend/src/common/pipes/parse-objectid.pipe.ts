import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import mongoose from "mongoose";

export class ParseObjectIDPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        const isvalid = mongoose.Types.ObjectId.isValid(value);
        if(!isvalid) {
            throw new BadRequestException(`Invalid id ${value}`);
        }
        return value;
    }
}