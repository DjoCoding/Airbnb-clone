import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "src/users/dtos/create-user.dto";
import { compare, hash } from "src/utils/hash"
import { LoginUserDto } from "./dtos/login-user.dto";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { JwtPayloadDto } from "./dtos/jwt-payload.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly users: UsersService,
        private readonly jwt: JwtService
    ) {}

    async registerUser(createUserDto: CreateUserDto) {
        const { email } = createUserDto;
        
        const isfound = await this.users.findByEmail(email);
        if(isfound) {
            throw new ConflictException({
                message: "Email already in use"
            });
        }

        const hashedPassword = await hash(createUserDto.password);
        return this.users.create({
            ...createUserDto,
            password: hashedPassword
        });
    }

    async loginUser(loginUserDto: LoginUserDto) {
        const { email } = loginUserDto;

        const user = await this.users.findByEmail(email);
        if(!user) {
            throw new UnauthorizedException("Email or password incorrect");
        }
        
        const { password: hashedPassword } = user;
        if(!await compare(loginUserDto.password, hashedPassword)) {
            throw new UnauthorizedException("Email or password incorrect");
        }

        const payload: JwtPayloadDto = { email: user.email, id: user._id };
        
        const accessToken  = this.jwt.sign(payload, {
            secret: process.env.SECRET,
            expiresIn: "1h"
        });

        const refreshToken = this.jwt.sign(payload, {
            secret: process.env.SECRET,
            expiresIn: "30d"
        });


        return {
            user,
            accessToken, 
            refreshToken
        };
    }

    verifyAccessToken(token: string) {
        const payload = this.jwt.decode<JwtPayloadDto | null>(token);
        return payload;
    }
}