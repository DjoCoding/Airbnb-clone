import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: "First name min length is 3" })
    @MaxLength(20, { message: "First name max length is 20" })
    firstname: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: "First name min length is 3" })
    @MaxLength(20, { message: "First name max length is 20" })
    lastname: string;


    @IsEmail({}, { message: "Invalid email format" })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: "Password min length is 8" })
    password: string;
}
