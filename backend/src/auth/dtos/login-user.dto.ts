import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto {
    @IsEmail({}, { message: "Invalid email format" })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: "Password min length is 8" })
    password: string;
}