//Evento para agregar un nuevo plato
document.getElementById("formulario").addEventListener("submit", agregar);

//Funcion para crear nuevo plato
function agregar(e) {
    codigo = document.getElementById("codigo").value;
    nombre = document.getElementById("nombre").value;
    contenido = document.getElementById("contenido").value;
    tipo = document.getElementById("tipo");
    obtenerTipo = tipo.options[tipo.selectedIndex].text;
    precio = document.getElementById("precio").value;

    if (
        codigo == "" ||
        nombre == "" ||
        contenido == "" ||
        obtenerTipo == "Seleccione la categoria" ||
        precio == ""
    ) {
        alert("Rellene todos los campos!!");
    } else {
        let plato = {
            codigo,
            nombre,
            contenido,
            obtenerTipo,
            precio,
        };

        if (localStorage.getItem("Menu") === null) {
            let menu = [];
            menu.push(plato);
            localStorage.setItem("Menu", JSON.stringify(menu));
        } else {
            let menu = JSON.parse(localStorage.getItem("Menu"));
            menu.push(plato);
            localStorage.setItem("Menu", JSON.stringify(menu));
        }

        leer();
        document.getElementById("formulario").reset();
        alert("Plato agregado correctamente...");
        e.preventDefault();
    }
}

//Funcion para leer los datos y colocarlos en la tabla
function leer() {
    let menu = JSON.parse(localStorage.getItem("Menu"));
    document.getElementById("tbody").innerHTML = "";
    for (let i in menu) {
        let codigo = menu[i].codigo;
        let nombre = menu[i].nombre;
        let contenido = menu[i].contenido;
        let obtenerTipo = menu[i].obtenerTipo;
        let precio = menu[i].precio;

        document.getElementById("tbody").innerHTML +=
            `<tr>
        <th scope="row">` + codigo + `</th>
        <td>` + nombre + `</td>
        <td>` + contenido + `</td>
        <td>` + obtenerTipo + `</td>
        <td>` + precio + `</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button class="btn btn-success" onclick="editar(`+ codigo + `)"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="eliminar(`+ codigo + `)"><i class="bi bi-trash-fill"></i></button>
            </div>
        </td>
        </tr>`
    }
}

//Funcion para editar los datos
function editar(codigo) {
    let menu = JSON.parse(localStorage.getItem("Menu"));
    for (let i in menu) {
        if (menu[i].codigo == codigo) {
            document.getElementById("body").innerHTML =
                `<div class="container mt-4 justify-content-center">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="card">
                                <div class="card-header text-center">
                                    <h2>Editar plato</h2>
                                </div>
                                <div class="card-body">
                                    <form id="formulario">
                                        <div class="mb-3">
                                            <label class="form-label">Codigo:</label>
                                            <input type="number" class="form-control" id="codigoActualizado" value="` + menu[i].codigo + `">
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Nombre:</label>
                                            <input type="text" class="form-control" id="nombreActualizado" value="` + menu[i].nombre + `">
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Contenido:</label>
                                            <textarea class="form-control" id="contenidoActualizado">` + menu[i].contenido + `</textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Tipo:</label>
                                            <select class="form-select" id="tipoActualizado">
                                                <option value="0">Seleccione la categoria</option>
                                                <option value="1">Entrada</option>
                                                <option value="2">Fuerte</option>
                                                <option value="3">Postre</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Precio:</label>
                                            <input type="number" class="form-control" id="precioActualizado" value="` + menu[i].precio + `">
                                        </div>
                                    </form>
                                    <button type="submit" class="btn btn-success" onclick="actualizar(`+ i + `)">Actualizar</button>
                                    <button type="submit" class="btn btn-warning" onclick="volver()">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
        } 
    }
}

//Funcion para actualizar los datos
function actualizar(i) {
    let menu = JSON.parse(localStorage.getItem("Menu"));
    menu[i].codigo = document.getElementById("codigoActualizado").value;
    menu[i].nombre = document.getElementById("nombreActualizado").value;
    menu[i].contenido = document.getElementById("contenidoActualizado").value;
    tipo = document.getElementById("tipoActualizado");
    menu[i].obtenerTipo = tipo.options[tipo.selectedIndex].text;
    menu[i].precio = document.getElementById("precioActualizado").value;

    alert("Plato actualizado correctamente...");
    localStorage.setItem("Menu", JSON.stringify(menu));
    volver();
}

//Funcion para eliminar los datos
function eliminar(codigo) {
    let menu = JSON.parse(localStorage.getItem("Menu"));
    for (let i in menu) {
        if (menu[i].codigo == codigo) {
            var opcion = confirm("¿Esta seguro de eliminar este plato del menu?");
            if (opcion == true) {
                menu.splice(i, 1);
                alert("Plato eliminado correctamente");
                break;
            }
        }
    }
    localStorage.setItem("Menu", JSON.stringify(menu));
    leer();
}

//Funcion para volver a la interfaz principal
function volver() {
    window.location.href = "index.html";
    leer();
}

//Evento para leer los datos y cargarlos a la tabla cada vez que se ingrese a la pagina
leer();
