import { Auth } from "src/app/auth/interfaces/auth";


export interface Restaurant {
    id?: number;
    name: string;
    description: string;
    cuisine: string;
    daysOpen: string[];
    image: string;
    phone: string;
    creator?: Auth;
    mine?: boolean;
    distance?: number;
    commented?: boolean;
    stars?: number;
    address: string;
    lat: number;
    lng: number;
}
