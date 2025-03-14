interface AdditionalInformation {
    title: string;
    name: string;
    type: string;
}

export const additionInformationInputs: AdditionalInformation[]= [
    {
        title: "number of guests",
        name: "maxNumberGuests",
        type: "number"
    },
    {
        title: "number of nights",
        name: "maxNumberOfNights",
        type: "number"
    },
    {
        title: "number of bedrooms",
        name: "numberOfBedrooms",
        type: "number"
    }
];

export const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aou",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];