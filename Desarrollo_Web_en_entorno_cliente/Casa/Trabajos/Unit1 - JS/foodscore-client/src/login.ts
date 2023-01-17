import "../styles.css";
import swal from "sweetalert";
import { AuthService } from "./classes/auth-service";
import { GeolocationService } from "./classes/geolocation-service";
import { TokenResponse } from "./interfaces/responses";
import { UserLogin } from "./interfaces/user";


const container = document.getElementById("form-login") as HTMLFormElement;

const userService = new AuthService();
let userLogin: UserLogin;
let latitude: number;
let longitude: number;


userService.validateToken().then(()=>{
    location.assign("../index.html");
});

GeolocationService.getLocation()
    .then((cords) => {
        latitude = cords.latitude;
        longitude = cords.longitude;
    })
    .catch();



document.addEventListener("submit", e => {
    e.preventDefault();
    userLogin = {
        "email": container.email.value,
        "password": container.password.value,
        "lat": latitude,
        "lng": longitude,
    };
    userService.login(userLogin).then((e) => {
        console.log("hola");
        userService.checkToken((e as unknown as TokenResponse).accessToken);
        container.reset();
        location.assign("../index.html");
    }).catch(error => {
        swal("Login error", error.error, "error");
    });


});