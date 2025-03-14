import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Place, PlaceSchema } from "src/schemas/places.schema";
import { PlacesService } from "./places.service";
import { PlacesController } from "./places.controller";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({
    imports: [
        MongooseModule.forFeature([ { name: Place.name, schema: PlaceSchema }]),
        CloudinaryModule
    ],
    providers: [PlacesService],
    controllers: [PlacesController],
    exports: [PlacesService]
})

export class PlacesModule {}