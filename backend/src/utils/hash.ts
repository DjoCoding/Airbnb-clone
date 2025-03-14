import * as bcrypt from "bcryptjs"

const rounds = 10;

export async function hash(password: string) {
    return bcrypt.hash(password, rounds);
}

export async function compare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}