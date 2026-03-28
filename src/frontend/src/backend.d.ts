import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    service: string;
    stylist: string;
    date: string;
    name: string;
    time: string;
    email: string;
    phone: string;
}
export interface backendInterface {
    createBooking(booking: Booking): Promise<bigint>;
    getAllBookings(): Promise<Array<Booking>>;
    getBooking(id: bigint): Promise<Booking>;
}
