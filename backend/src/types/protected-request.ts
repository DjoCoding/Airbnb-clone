import { Request } from "express";
import { UserDocument } from "src/schemas/users.schema";

export type ProtectedRequest = Request & {
    user: UserDocument;
}