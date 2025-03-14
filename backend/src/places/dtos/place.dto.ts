import { PlaceDocument } from "src/schemas/places.schema";

export class PlaceDto {
    constructor(
        private id: string,
        private ownerID: string,
        private city: string,
        private title: string, 
        private pictures: string[],
        private from: Date,
        private to: Date,
        private price: number,
        private createdAt: Date,
        private description: string,
    ) {}

    static fromDocument(place: PlaceDocument) {
        return new PlaceDto(
            place._id.toString(),
            place.ownerID.toString(),
            place.city,
            place.title,
            place.pictures,
            place.from,
            place.to,
            place.price,
            place.createdAt,
            place.description || ""
        )
    }
}