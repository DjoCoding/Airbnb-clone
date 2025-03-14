import { BadRequestException, CanActivate, ExecutionContext, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Observable, retry } from "rxjs";
import { PlacesService } from "src/places/places.service";
import { ProtectedRequest } from "src/types/protected-request";

export class PlaceIsMineGuard implements CanActivate {
    constructor(
        private readonly places: PlacesService
    ) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<ProtectedRequest>();
        
        const { id } = req.params;
        const { user } = req;

        const place = await this.places.getByID(id);
        if(!place) {
            throw new NotFoundException(`Place ${id} doesn't exist`);
        }

        if(!place.ownerID.equals(user._id)) {
            throw new UnauthorizedException();
        }

        return true;
    }
}