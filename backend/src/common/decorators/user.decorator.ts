import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ProtectedRequest } from "src/types/protected-request";

export const User = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<ProtectedRequest>();
    const user = req.user;
    return data ? user[data] : user;
})