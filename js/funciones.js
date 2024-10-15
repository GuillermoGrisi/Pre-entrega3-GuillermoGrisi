function agregarProducto() {
    const producto = document.getElementById("productoInput").value;
    
    if (producto === "") {
    document.getElementById("mensajeError").innerHTML = "Por favor, ingrese un producto."
        return;
    }else{
        document.getElementById("mensajeError").innerHTML = ""
    }

    compras.push({ nombre: producto, comprado: false });
    guardarCompras();
    mostrarCompras();
    document.getElementById("productoInput").value = "";
}


function mostrarCompras() {
    const listaCompras = document.getElementById("listaCompras");
    listaCompras.innerHTML = "";

    if (compras.length === 0) {
        listaCompras.innerHTML = `
            <div class="alert alert-primary" role="alert">
              <h6>No hay productos en la lista de compras.</h6>
            </div>`;}
        else {
         compras.forEach((item, index) => {
         const li = document.createElement("li");
         li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
         if (item.comprado) {
            li.classList.add("comprado", "bg-success-subtle");
        }if
            (item.noComprado) {
                li.classList.add("noComprado", "bg-danger-subtle");
            }

        li.innerHTML = `
            ${item.nombre.toUpperCase()}
            <div>
                <button class="btn btn-success btn-sm" onclick="marcarComoComprado(${index})"><i class="bi bi-check-circle"></i></button>
                <button class="btn btn-danger btn-sm" onclick="marcarComoNoComprado(${index})"><i class="bi bi-x-circle"></i></button>
                <button class="btn btn-secondary border border-secondary btn-sm" onclick="eliminarProducto(${index})"><i class="bi bi-trash3"></i></button>
            </div>
        `;

        listaCompras.appendChild(li);
    });
}
}

function marcarComoComprado(index) {
    compras[index].comprado = !compras[index].comprado;
    guardarCompras();
    mostrarCompras();
}
function marcarComoNoComprado(index) {
    compras[index].noComprado = !compras[index].noComprado;
    guardarCompras();
    mostrarCompras();
}

function eliminarProducto(index) {
    compras.splice(index, 1);
    guardarCompras();
    mostrarCompras();
}


function guardarCompras() {
    localStorage.setItem('compras', JSON.stringify(compras));
}


function guardarLista() {
    if (compras.length === 0) {
        Swal.fire({
            title: "La lista de compras esta vacia!",
            icon: "error",
            iconColor: "#d33",
            timer: 2000,
          });
        return;
    }


    const listaCopia = JSON.parse(JSON.stringify(compras));
    listasGuardadas.push(listaCopia);
    
    localStorage.setItem('listasGuardadas', JSON.stringify(listasGuardadas));
    mostrarListasGuardadas();
    Swal.fire({
        title: "La lista de compras guardada correctamente!",
        icon: "success",
        timer: 2000,
      });
}


function eliminarLista() {
    Swal.fire({
        text: "Estas seguro que queres eliminar la lista de compras?",
        icon: "warning",
        iconColor: "#d33",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: " #198754",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar"
      }).then((result) => {
        if (result.isConfirmed) {

            compras = [];
    guardarCompras();
    mostrarCompras();

          Swal.fire({
            title: "Eliminada",
            text: "La lista de compras fue eliminada con exito!",
            icon: "success",
            timer: 3000,
          });
        }
      });
}


function mostrarListasGuardadas() {
    const divListas = document.getElementById("listasGuardadas");
    divListas.innerHTML = ""; 

    if (listasGuardadas.length === 0) {
        divListas.innerHTML = `<div class="alert alert-primary" role="alert">
                  <h6>No hay listas guardadas.</h6>
             </div>`;
    }else{listasGuardadas.forEach((lista, index) => {
        const div = document.createElement("div");
        div.classList.add("mt-2");

        let textoLista = "";
        lista.forEach(item => {
            textoLista += `${item.nombre}<br>`;
        });

        div.innerHTML = `
            <div class="card">
                <div class="card-body p-2">
                    <h5 class="card-title">Lista Guardada ${index + 1}</h5>
                    <p class="card-text">${textoLista}</p>
                    <button class="btn btn-success p-1" onclick="restaurarLista(${index})">Restaurar</button>
                    <button class="btn btn-danger p-1" onclick="eliminarListaGuardada(${index})">Eliminar</button>
                </div>
            </div>
        `;

        divListas.appendChild(div);
    });
}
}

function restaurarLista(index) {
    compras = JSON.parse(JSON.stringify(listasGuardadas[index]));
    guardarCompras();
    mostrarCompras();
    Swal.fire({
        title: `La lista de compras ${index +1} restaurada correctamente!`,
        icon: "success",
        timer: 2000,
      });
}

function eliminarListaGuardada(index) {
    Swal.fire({
        text: `Estas seguro que queres eliminar la lista de compras guardada ${index +1}?`,
        icon: "warning",
        iconColor: "#d33",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: " #198754",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar"
      }).then((result) => {
        if (result.isConfirmed) {    

    listasGuardadas.splice(index, 1);
    localStorage.setItem('listasGuardadas', JSON.stringify(listasGuardadas));
    mostrarListasGuardadas();
    Swal.fire({
        title: "Eliminada",
        text: `La lista de compras guardada ${index +1} fue eliminada con exito!`,
        icon: "success",
        timer: 3000,
      });
    }
  });
}