import swal from "sweetalert";
import "../styles.css";
import { AuthService } from "./classes/auth-service";
import { GeolocationService } from "./classes/geolocation-service";
import { User } from "./interfaces/user";

const container = document.getElementById("form-register") as HTMLFormElement;
const imgPreview = document.getElementById("imgPreview") as HTMLImageElement;
AuthService.logout();

const userService = new AuthService();
let user: User;


userService.validateToken().then(()=>{
    location.assign("../index.html");
});

GeolocationService.getLocation()
    .then((cords) => {
        container.lat.value = cords.latitude;
        container.lng.value = cords.longitude;
    })
    .catch(() => {
        container.lat.value = 0;
        container.lng.value = 0;
    });



document.addEventListener("submit", e => {
    e.preventDefault();
    if (container.email.value.trim() === container.email2.value.trim()) {
        user = {
            "name": (container.name as unknown as HTMLInputElement).value,
            "avatar": imgPreview.src as string,
            "email": container.email.value.trim(),
            "password": container.password.value,
            "lat": +container.lat.value,
            "lng": +container.lng.value,
        };
        userService.register(user).then(() => {
            swal("User registered!", "You can log in now", "success").then(() => {
                container.reset();
                location.assign("../login.html");
            });

        }).catch(e => {
            let message = "";
            for (let i = 0; i < e.message.length; i++) {
                message += e.message[i] + "\n";
            }
            swal("Registration error", message, "error");
        });

    }
    else {
        swal("Registration error", "Emails must be equal", "error");
    }

});



container.avatar.addEventListener("change", () => {

    const file = container.avatar.files[0];
    if (file && file.type.startsWith("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener("load", () => {
            imgPreview.classList.remove("d-none");
            imgPreview.src = reader.result as string;
        });
    }
    else {
        imgPreview.src = "";
    }

});