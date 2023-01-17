// Web services http://arturober.com:5006/tareas
// GET all the todos and show them in the list
// When sending the form, generate a POST call and insert a new task
// OPTIONAL: Include a button to delete the task

let idTodoList = document.getElementById("todolist");
let form = document.getElementById("form");


function getWork() {
    fetch(`http://arturober.com:5006/tareas`).then(resp => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
    }).then(respJSON => {
        respJSON.tareas.forEach(p => appendProduct(p));
    }).catch(error => console.error(error));
}

addEventListener("submit", postWork)

function postWork(e) {
    e.preventDefault();
    let work = {"descripcion":form.desc.value};

    fetch(`http://arturober.com:5006/tareas`, {
        method: 'POST',
        body: JSON.stringify(work),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json(); // promise
    }).then(respJSON => {
        appendProduct(respJSON.tarea);
    }).catch(error => console.error(error));
}

function deleteWork(tarea) {
    fetch(`http://arturober.com:5006/tareas/${tarea.id}`, {
        method: 'DELETE'
    })
    .then(resp => {
        if(!resp.ok) throw new Error(resp.statusText);
        // OK Delete restaurant in HTML
    });
}


function appendProduct(tarea) {
    let li = document.createElement("li");
    let button = document.createElement("button");
    button.addEventListener("click", e => deleteWork(tarea));
    li.append(tarea.descripcion + " ");
    button.append("Delete");
    li.appendChild(button);
    idTodoList.appendChild(li);

}

getWork();
// <li>Tarea 1 <button>Borrar</button></li>