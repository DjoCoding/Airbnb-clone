import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { PlacesService } from "./places.service";
import { PlaceDto } from "./dtos/place.dto";
import { ParseObjectIDPipe } from "src/common/pipes/parse-objectid.pipe";
import { Private } from "src/common/decorators/auth.decorator";
import { User } from "src/common/decorators/user.decorator";
import { UserDocument } from "src/schemas/users.schema";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { CreatePlaceFormDataDto } from "./dtos/create-place-form-data.dto";
import { PlaceIsMineGuard } from "./guards/place-is-mine.guard";

@Controller("places")
export class PlacesController {
    constructor(
        private readonly cloudinary: CloudinaryService,
        private readonly places: PlacesService
    ) {}

    @Get()
    async getAll() {
        const places = await this.places.get();
        const returnedPlaces = places.map(place => PlaceDto.fromDocument(place));
        
        console.log(returnedPlaces);

        return {
            places: returnedPlaces
        }
    }

    @Get(":placeID")
    @UsePipes(ParseObjectIDPipe)
    async getByID(@Param("placeID") placeID: string) {
        const place = await this.places.getByID(placeID);
        if(!place) {
            throw new NotFoundException(`Place ${placeID} not found`);
        }

        console.log(place)

        return {
            place: PlaceDto.fromDocument(place)
        }
    }

    @Post()
    @Private()
    @UseInterceptors(
        FilesInterceptor(
            "files"
        )
    )
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(
        @User() user: UserDocument, 
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() createPlaceFormDataDto: CreatePlaceFormDataDto
    ) {

        const { _id: ownerID } = user;

        const promises = files.map(file => {
            return this.cloudinary.uploadImage(file)
        });

        const pictures = await Promise.all(promises);

        const createdPlace = await this.places.create(ownerID.toString(), {
            ...createPlaceFormDataDto,
            pictures
        });

        if(!createdPlace) {
            throw new InternalServerErrorException(`Failed to create the place`);
        } 

        return {
            place: PlaceDto.fromDocument(createdPlace)
        };
    }

    
    @Delete(":placeID")
    @Private()
    @UseGuards(PlaceIsMineGuard)
    async remove(
        @Param("placeID", ParseObjectIDPipe) placeID: string
    ) {
        return this.places.remove(placeID);
    }
 }