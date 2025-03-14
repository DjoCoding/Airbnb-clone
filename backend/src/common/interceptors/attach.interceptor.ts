import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";

export class AttachInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>) {
        return next.handle()
        .pipe(
            map(data => ({
                status: "success",
                data
            }))
        )
    }
}