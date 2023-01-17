import "../styles.css";
import { AuthService } from "./classes/auth-service";
import { MapService } from "./classes/map-service";
import { UserService } from "./classes/user-service";
import { User } from "./interfaces/user";

const profileHBS = require("../templates/profile.hbs");


const user = new UserService();
const profile = document.getElementById("profile");
AuthService.logout();

const userService = new AuthService();
userService.validateToken().then().catch(() =>{
    location.assign("../login.html");
});


function getId():(number|undefined) {

    const split = window.location.href.split("?");
    const numberUndefined = split.length>1 && split[1].includes("id=")?+split[1].split("=")[1]:undefined;
    return numberUndefined;

}
user.getProfile(getId()).then((e) =>{
    console.log(e.user);
    showUser(e.user); 
    showMap(e.user);
});

function showUser(user:User):void{

    profile.innerHTML = profileHBS({
        avatar:user.avatar,
        name:user.name,
        email:user.email,
        me:user.me
    });
}
async function showMap(e:User): Promise<void> {
    const coordinates = {
        latitude: 0,
        longitude: 0
    };
    coordinates.latitude = e.lat;
    coordinates.longitude = e.lng;
    const mapService = MapService.createMapService(coordinates, "map");
    mapService.createMarker(coordinates, "red");
}


