import swal from "sweetalert";
import "../styles.css";
import { AuthService } from "./classes/auth-service";
import { UserService } from "./classes/user-service";

const user = new UserService();

AuthService.logout();

//?EDIT PROFILE
const formProfile = document.getElementById("form-profile") as HTMLFormElement;
//?EDIT PHOTO
const formImage = document.getElementById("form-photo") as HTMLFormElement;
const photoDefault = document.getElementById("photo") as HTMLImageElement;
const imgPreview = document.getElementById("imgPreview") as HTMLImageElement;
//?EDIT PASSWORD
const formPassword = document.getElementById("form-password") as HTMLFormElement;

const userService = new AuthService();
userService.validateToken().then().catch(() =>{
    location.assign("../login.html");
});

user.getProfile().then((e) => {
    photoDefault.src = e.user.avatar;
    formProfile.email.value = e.user.email;
    (formProfile.name as unknown as HTMLInputElement).value = e.user.name;
});

formProfile.addEventListener("submit", e => {
    e.preventDefault();
    user.saveProfile((formProfile.name as unknown as HTMLInputElement).value,formProfile.email.value).then(() =>{
        swal("Profile Updated","","success");
    });
});
formImage.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(imgPreview.src.startsWith("data:image")){
        user.saveAvatar(imgPreview.src).then(()=>{
            photoDefault.src = imgPreview.src;
            imgPreview.classList.add("d-none");
            swal("Photo updated","","success");
            
        });
    }
    else{ 
        swal("Error","Error uploading photo","error");
    }
});

formPassword.addEventListener("submit",e =>{
    e.preventDefault();
    if(formPassword.password.value === formPassword.password2.value){
        user.savePassword(formPassword.password.value).then(()=>{
            swal("Password updated","","success");
        });
    }
    else{
        swal("Error","Error uploading password","error");
    }
});

formImage.image.addEventListener("change", () => {

    const file = formImage.image.files[0];
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



