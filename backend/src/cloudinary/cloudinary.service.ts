import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    uploadImage(file: Express.Multer.File) {
        return new Promise<string>((res, rej) => {
            const upload = 
            cloudinary
            .uploader
            .upload_stream(
                (err, result) => {
                    if(err) return rej(err);
                    if(!result) return rej("failed to upload image");
                    const { url } = result;
                    return res(url);
                }
            )
            .end(file.buffer);
            return upload;
        })
    }
}
