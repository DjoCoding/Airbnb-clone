import { ArgumentsHost, BadRequestException, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";

export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();


        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const message = exception.message;
            const response = exception.getResponse();

            return res.status(status).json({
                status: "error",
                message,
                response
            });
        }

        Logger.error(exception);

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            messsge: "Internal server error"
        })
    }
}