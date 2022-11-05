//Evento para agregar una nueva tarea
document.getElementById("formulario").addEventListener("submit", agregar);

//---------------------------------  CREATE  -----------------------------//
//Funcion para crear una nueva tarea
function agregar(e) {
    codigo = document.getElementById("codigo").value;
    nombre = document.getElementById("nombre").value;
    descripcion = document.getElementById("descripcion").value;

    importancia = document.getElementById("importancia");
    obtenerImportancia = importancia.options[importancia.selectedIndex].text;

    estado = document.querySelector("#estado");
    obtenerEstado  = estado.checked;
    if (obtenerEstado == true) {
        var completado = "Completado";
    } else {
        var completado = "No completado";
    }

    if (obtenerImportancia == "Seleccione la importancia") {
        alert("Seleccione la importancia de la tarea!!");
    } else {
        let tarea = {
            codigo,
            nombre,
            descripcion,
            obtenerImportancia,
            completado,
        };

        if (localStorage.getItem("Tareas") === null) {
            let listaTareas = [];
            listaTareas.push(tarea);
            localStorage.setItem("Tareas", JSON.stringify(listaTareas));
        } else {
            let listaTareas = JSON.parse(localStorage.getItem("Tareas"));
            listaTareas.push(tarea);
            localStorage.setItem("Tareas", JSON.stringify(listaTareas));
        }

        leer();
        document.getElementById("formulario").reset();
        alert("Tarea agregada correctamente...");
        e.preventDefault();
    }
}

//---------------------------------  READ  -----------------------------//
//Funcion para leer los datos y colocarlos en la tabla
function leer() {
    let listaTareas = JSON.parse(localStorage.getItem("Tareas"));
    document.getElementById("tbody").innerHTML = "";
    for (let i in listaTareas) {
        let codigo = listaTareas[i].codigo;
        let nombre = listaTareas[i].nombre;
        let descripcion = listaTareas[i].descripcion;
        let obtenerImportancia = listaTareas[i].obtenerImportancia;
        let completado = listaTareas[i].completado;

        document.getElementById("tbody").innerHTML +=
        `<tr>
            <td>`+ (i++) + `</td>
            <td>`+ codigo + `</td>
            <td>`+ nombre + `</td>
            <td>`+ descripcion + `</td>
            <td>`+ obtenerImportancia + `</td>
            <td>`+ completado + `</td>
            <td>
                <button onclick="editar(` + codigo + `)"><i class="fa fa-pencil"></i></button>
                <button onclick="eliminar(` + codigo + `);"><i class="fa fa-trash"></i></button>
            </td>
        <tr>`
    }
}

//---------------------------------  UPDATE  -----------------------------//
//Funcion para editar los datos
function editar(codigo) {
    let listaTareas = JSON.parse(localStorage.getItem("Tareas"));
    for (let i in listaTareas) {
        if (listaTareas[i].codigo == codigo) {
            if (listaTareas[i].completado == "No completado") {
                listaTareas[i].codigo = listaTareas[i].codigo;
                listaTareas[i].nombre = listaTareas[i].nombre;
                listaTareas[i].descripcion = listaTareas[i].descripcion;
                listaTareas[i].obtenerImportancia = listaTareas[i].obtenerImportancia;
                listaTareas[i].completado = "Completado";
                alert("Tarea completada satisfactoriamente...");
            }else{
                listaTareas[i].codigo = listaTareas[i].codigo;
                listaTareas[i].nombre = listaTareas[i].nombre;
                listaTareas[i].descripcion = listaTareas[i].descripcion;
                listaTareas[i].obtenerImportancia = listaTareas[i].obtenerImportancia;
                listaTareas[i].completado = "No completado";
                alert("Tarea cambiada de estado a: (NO COMPLETADO)...");
            }
        }
    }

    localStorage.setItem("Tareas", JSON.stringify(listaTareas));
    leer();
}

//---------------------------------  DELETE  -----------------------------//
//Funcion para eliminar los datos
function eliminar(codigo) {
    let listaTareas = JSON.parse(localStorage.getItem("Tareas"));
    for (let i in listaTareas) {
        if (listaTareas[i].codigo == codigo) {
            if (listaTareas[i].completado == "No completado") {
                var opcion = confirm("¿Esta seguro de eliminar esta tarea?");
                if (opcion == true) {
                    listaTareas.splice(i, 1);
                    alert("Tarea eliminada correctamente...");
                    break;
                }
            }else{
                alert("No se puede eliminar una tarea completada!!");
            }
            
        }
    }
    localStorage.setItem("Tareas", JSON.stringify(listaTareas));
    leer();
}

//Evento para leer los datos y cargarlos a la tabla cada vez que se ingrese a la pagina
leer();