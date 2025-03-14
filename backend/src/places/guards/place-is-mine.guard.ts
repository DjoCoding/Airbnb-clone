import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { UserDocument } from "src/schemas/users.schema";
import { PlacesService } from "../places.service";

@Injectable()
export class PlaceIsMineGuard implements CanActivate {
    constructor(
        private readonly places: PlacesService
    ) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request<{ placeID: string }, {}, {}, {}> & { user: UserDocument }>();
        
        const  { params: { placeID } } = req; 
        const { user } = req;

        const place = await this.places.getByID(placeID);
        if(!place) {
            throw new NotFoundException(`Place ${placeID} not found`);
        }

        if(!user._id.equals(place.ownerID)) {
            throw new UnauthorizedException();
        }

        return true;
    }
}