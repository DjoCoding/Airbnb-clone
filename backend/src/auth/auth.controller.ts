import { Body, Controller, HttpStatus, Logger, Post, Res } from "@nestjs/common";
import { CreateUserDto } from "src/users/dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { UserDto } from "src/users/dtos/user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly auth: AuthService
    ) {}

    @Post("register")
    async registerUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.auth.registerUser(createUserDto);
        return UserDto.fromDocument(user);
    }
    
    @Post("login")
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        const { user, accessToken, refreshToken } = await this.auth.loginUser(loginUserDto);
        return {
            user: UserDto.fromDocument(user),
            token: accessToken
        }
    }
}