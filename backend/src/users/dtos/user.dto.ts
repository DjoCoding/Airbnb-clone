import { plainToClass } from "class-transformer";
import { UserDocument } from "src/schemas/users.schema";

export class UserDto {
    constructor(
        private id: string,
        private firstname: string,
        private lastname: string,
        private email: string,
        private createdAt: Date
    ) {}

    static fromDocument(user: UserDocument) {
        return new UserDto(
            user._id.toString(),
            user.firstname,
            user.lastname,
            user.email,
            user.createdAt
        );
    }
}