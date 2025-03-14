import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { AuthService } from "src/auth/auth.service";
import { UsersService } from "src/users/users.service";
import { PRIVATE_DECORATOR_KEY } from "../decorators/auth.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly users: UsersService,
        private readonly auth: AuthService
    ) {}

    async canActivate(ctx: ExecutionContext) {
        const isprivate = this.reflector.get<boolean | null>(PRIVATE_DECORATOR_KEY, ctx.getHandler());
        if(!isprivate) return true;

        const req = ctx.switchToHttp().getRequest<Request>();
        const token = this.getTokenFromHeader(req);
        if(!token) {
            throw new UnauthorizedException("Token not found");
        }

        const payload = this.auth.verifyAccessToken(token);
        if(!payload) {
            throw new UnauthorizedException("Invalid token provided");
        }

        const { id } = payload;
        
        const user = await this.users.findById(id.toString());
        req["user"] = user;
        
        return true;
    }

    getTokenFromHeader(req: Request) {
        const authorization = req.headers.authorization;
        if(!authorization) return null; 

        const [ bearer, token ] = authorization.split(" ");
        if(bearer !== "Bearer") return null;
        if(!token) return null;

        return token;
    }
}