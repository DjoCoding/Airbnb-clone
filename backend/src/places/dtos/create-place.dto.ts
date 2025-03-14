import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";


export class CreatePlaceDto {
    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsArray()
    @IsString({ each: true })
    pictures: string[];

    @IsNumber()
    @IsPositive()
    price: number;

    @IsDate()
    from: Date;

    @IsDate()
    to: Date;

    @IsNumber()
    @IsPositive()
    numberOfGuests: number;
}