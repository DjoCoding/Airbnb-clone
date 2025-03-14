import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreatePlaceFormDataDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsOptional()
    description: string;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    price: number;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    numberOfGuests: number;

    @Type(() => Date)
    @IsDate()
    from: Date

    @Type(() => Date)
    @IsDate()
    to: Date;
}