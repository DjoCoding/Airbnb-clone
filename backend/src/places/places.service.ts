import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Place, PlaceDocument } from "src/schemas/places.schema";
import { CreatePlaceDto } from "./dtos/create-place.dto";
import { UpdatePlaceDto } from "./dtos/update-place.dto";
import { NotFoundError } from "rxjs";

@Injectable()
export class PlacesService {
    constructor(
        @InjectModel(Place.name) private readonly places: mongoose.Model<PlaceDocument>
    ) {}

    async getOfUser(ownerID: string) {
        return this.places.find({
            ownerID
        }).exec();
    }

    async getByID(id: string) {
        return this.places.findById(id).exec();
    }

    async getByTitleOfUser(ownerID: string, title: string) {
        return this.places.findOne({
            ownerID,
            title
        }).exec();
    }

    async get() {
        return this.places.find().exec();
    }

    async create(ownerID: string, createPlaceDto: CreatePlaceDto) {
        const { title } = createPlaceDto;
        const isfound = await this.getByTitleOfUser(ownerID, title);
        if(isfound) {
            throw new ConflictException(`Title ${title} already used by user ${ownerID}`);
        }

        const createdPlace = new this.places({
            ...createPlaceDto,
            ownerID
        });

        return createdPlace.save();
    }

    async update(id: string, updatePlaceDto: UpdatePlaceDto) {
        const prevPlace = await this.getByID(id);
        if(!prevPlace) {
            throw new NotFoundException(`Place ${id} not found`);
        }

        const ownerID = prevPlace.ownerID;

        if(updatePlaceDto.title) {
            const place = await this.getByTitleOfUser(ownerID.toString(), updatePlaceDto.title);
            if(place) {
                throw new ConflictException(`Title ${updatePlaceDto.title} is already used by `) 
            }
        }

        return this.places.findByIdAndUpdate(id, updatePlaceDto, { new: true }).exec();
    }

    async remove(id: string) {
        return this.places.findByIdAndDelete(id).exec();
    }
}