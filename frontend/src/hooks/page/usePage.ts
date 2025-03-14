import { create } from "zustand";
import { IPlace } from "../../types";

type PageState = {
    place: IPlace | null;

    actions: {
        setPlace: (place: IPlace | null) => void;
    }
}

const usePage = create<PageState>((set, get) => ({
    place: null,
    actions: {
        setPlace: (place: IPlace | null) => {
            set({
                place
            })
        }
    }
}))

export default usePage;