import { SetMetadata } from "@nestjs/common";

export const PRIVATE_DECORATOR_KEY = "IS_PRIVATE";
export const Private = () => SetMetadata(PRIVATE_DECORATOR_KEY, true);