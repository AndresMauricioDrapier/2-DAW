import { User } from "src/app/auth/interfaces/user";


export interface Restaurant {
    id?: number;
    name: string;
    description: string;
    cuisine: string;
    daysOpen: string[];
    image: string;
    phone: string;
    creator?: User;
    mine?: boolean;
    distance?: number;
    commented?: boolean;
    stars?: number;
    address: string;
    lat: number;
    lng: number;
}
