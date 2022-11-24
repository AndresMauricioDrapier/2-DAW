
function validName(name: string, form: HTMLFormElement): boolean {
    const exp = /[a-záéíóúÁÉÍÓÚ ]+/i;
    if (exp.test(name) && name) {
        isValid(form);
        return true;
    }
    else {
        isInValid(form);
        return false;
    }
}


function validDescription(description: string, form: HTMLFormElement): boolean {
    if (description !== "") {
        isValid(form);
        return true;
    }
    else {
        isInValid(form);
        return false;
    }
}

function validCuisine(cuisine: string, form: HTMLFormElement): boolean {
    if (cuisine !== "") {
        isValid(form);
        return true;
    }
    else {
        isInValid(form);
        return false;
    }
}



function checkOpen(openingDays: string[]): boolean {
    const errorDays = document.getElementById("daysError");
    if (openingDays.length != 0) {
        errorDays.classList.add("d-none");
        return true;
    }
    else {
        errorDays.classList.remove("d-none");
        return false;
    }
}

function validPhone(phone: string, form: HTMLFormElement): boolean {
    const exp = /^(\+?[0-9]{2} ?)?[0-9]{9}$/;
    if (exp.test(phone)) {
        isValid(form);
        return true;
    }
    else {
        isInValid(form);
        return false;
    }
}
function validPhoto(img: HTMLImageElement): boolean {
    const imgError = document.getElementById("image");
    if (img.src.startsWith("data:image")) {
        isValid(imgError);
        return true;
    }
    else {
        isInValid(imgError);
        return false;
    }
}

function validAddress(address:string,form: HTMLFormElement): boolean {
    
    if (address !== "") {
        isValid(form);
        return true;
    }
    else {
        isInValid(form);
        return false;
    }
}



function isValid(clas: HTMLElement): void {
    clas.classList.remove("is-invalid");
    clas.classList.remove("is-valid");
    clas.classList.add("is-valid");
}

function isInValid(clas: HTMLElement): void {

    clas.classList.remove("is-invalid");
    clas.classList.remove("is-valid");
    clas.classList.add("is-invalid");
}

export function validForm(form: HTMLFormElement, openingDays: string[], address: string): boolean {
    const img = document.getElementById("imgPreview") as HTMLImageElement;

    if (validName((form.name as unknown as HTMLInputElement).value.trim(), (form.name as unknown as HTMLFormElement)) && 
        validDescription(form.description.value.trim(), form.description) &&
        validCuisine(form.cuisine.value.trim(), form.cuisine) &&
        checkOpen(openingDays) && 
        validPhone(form.phone.value.trim(), form.phone) && 
        validPhoto(img) &&
        validAddress(address,form.address)) {
        return true;
    }
    else {
        false;
    }
}



export function days(openingDays: string[]): string {

    let openClose = "";

    for (let i = 0; i < openingDays.length; i++) {
        switch (openingDays[i]) {
        case "1":
            openClose += "Mo, ";
            break;
        case "2":
            openClose += "Tu, ";
            break;
        case "3":
            openClose += "We, ";
            break;
        case "4":
            openClose += "Th, ";
            break;
        case "5":
            openClose += "Fr, ";
            break;
        case "6":
            openClose += "Sa, ";
            break;
        case "0":
            openClose += "Su ";
            break;

        }
    }

    return openClose;
}
export function openClosedHBS(openingDays: string[]): string {
    if (openingDays.includes(new Date().getDay().toString())) {
        return "Open";
    } else {
        return "Closed";
    }
}