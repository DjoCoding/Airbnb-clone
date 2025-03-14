import { Provider } from "@nestjs/common"
import { v2 as cloudinary } from "cloudinary"
import { CLOUDINARY } from "src/constants"

export const CloudinaryProvider: Provider = {
    provide: CLOUDINARY,
    useFactory: () => {
        return cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        })
    }
}