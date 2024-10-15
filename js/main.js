let compras = JSON.parse(localStorage.getItem('compras')) || [];
let listasGuardadas = JSON.parse(localStorage.getItem('listasGuardadas')) || [];

mostrarCompras();
mostrarListasGuardadas();

//EVENTOS PARA LOS BOTONES
document.getElementById("agregarBtn").addEventListener("click", agregarProducto);
document.getElementById("guardarListaBtn").addEventListener("click", guardarLista);
document.getElementById("eliminarListaBtn").addEventListener("click", eliminarLista);

//EVENTO PARA CARGAR EL PRODUCTO PRESIONANDO ENTER
document.getElementById("productoInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { agregarProducto();}});
