import { SERVER,RESTAURANTS } from "./constants.js";
import { Http } from "./http.js";

export class RestaurantService{
    #http;
    constructor(){
        this.#http = new Http();
    }

    getAll(){
        return this.#http.get(RESTAURANTS);
    }

    post(restaurant){
        return this.#http.post(RESTAURANTS,restaurant);
    }

    delete(id){
        return this.#http.delete(`${RESTAURANTS}/${id}`).catch(e => e);
    }
    
}