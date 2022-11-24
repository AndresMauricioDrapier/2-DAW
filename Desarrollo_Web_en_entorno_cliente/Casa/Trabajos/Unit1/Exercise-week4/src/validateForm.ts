
function validName(name: string, form: HTMLFormElement) {
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


function validDescription(description: string, form: HTMLFormElement) {
    if (description !== "") {
        isValid(form);
        return true;
    }
    else {
        isInValid(form);
        return false;
    }
}

function validCuisine(cuisine: string, form: HTMLFormElement) {
    if (cuisine !== "") {
        isValid(form);
        return true;
    }
    else {
        isInValid(form);
        return false;
    }
}

function validPhone(phone: string, form: HTMLFormElement) {
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
function validPhoto(img: HTMLImageElement) {
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



function checkOpen(openingDays: string) {
    const errorDays = document.getElementById("daysError");
    if (openingDays !== "") {
        errorDays.classList.add("d-none");
        return true;
    }
    else {
        errorDays.classList.remove("d-none");
        return false;
    }
}

function isValid(clas: HTMLElement) {
    clas.classList.remove("is-invalid");
    clas.classList.remove("is-valid");
    clas.classList.add("is-valid");
}

function isInValid(clas: HTMLElement) {

    clas.classList.remove("is-invalid");
    clas.classList.remove("is-valid");
    clas.classList.add("is-invalid");
}

export function validForm(form: HTMLFormElement, openingDays: string) {


    if (validName((form.name as unknown as HTMLInputElement).value.trim(), (form.name as unknown as HTMLFormElement)) && validDescription(form.description.value.trim(), form.description) &&
        validCuisine(form.cuisine.value.trim(), form.cuisine) &&
        checkOpen(openingDays) && validPhone(form.phone.value.trim(), form.phone)) {
        return true;
    }
    else {
        false;
    }
}



export function days(openingDays: string[]) {

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

// export function openClosed(openingDays, spanBadge) {
//     if (openingDays.includes(new Date().getDay().toString())) {
//         spanBadge.classList.add("badge", "ms-2", "bg-success");
//         spanBadge.append("Open");
//     } else {
//         spanBadge.classList.add("badge", "ms-2", "bg-danger");
//         spanBadge.append("Closed");
//     }
// }
export function openClosedHBS(openingDays: string[]) {
    if (openingDays.includes(new Date().getDay().toString())) {
        return "Open";
    } else {
        return "Closed";
    }
}