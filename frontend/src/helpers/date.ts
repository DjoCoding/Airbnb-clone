import { months } from "../constants";

export function getDifferenceInDays(to: Date, from: Date) {
    const diffMs = to.getTime() - from.getTime();
    return diffMs / (1000 * 3600 * 24);
}

export function getDay(d: Date) {
    const values = d.toISOString().split("T")[0].split("-");    
    return values[2];
}

export function getMonthAsNumberString(d: Date) {
    const values = d.toISOString().split("T")[0].split("-");    
    return values[1];
}

export function getMonthAsString(d: Date) {
    const values = d.toISOString().split("T")[0].split("-");    
    return months[parseInt(values[1]) - 1];
}

export function getYear(d: Date) {
    const values = d.toISOString().split("T")[0].split("-");
    return values[0];
}

export function formatDate(d: Date) {
    return `${getMonthAsString(d)} ${getDay(d)}, ${getYear(d)}`;
}