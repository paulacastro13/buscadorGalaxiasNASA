const valorBusqueda = document.getElementById('inputBuscar');
const botonBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('contenedor');

botonBuscar.addEventListener('click', function (event) {
    event.preventDefault();

    const valor = valorBusqueda.value.trim();
    const busquedaURL = `https://images-api.nasa.gov/search?q=${encodeURIComponent(valor)}`;

    fetch(busquedaURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error.');
            }
            return response.json();
        })
        .then(data => {
            mostrarResultados(data);
        })
        .catch(error => {
            contenedor.innerHTML = "<p>Error al realizar la búsqueda.</p>";
        });
});


function mostrarResultados(data) {
    contenedor.innerHTML = "";
    const items = data.collection.items;

    if (!items || items.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
    }

    items.forEach(item => {
        const info = item.data[0];
        const titulo = info.title;
        const descripcion = info.description;
        const fecha = info.date_created;
        const imagen = item.links[0].href;

        const tarjeta = `
        <div class="card mb-3">
            <div class="card-img-container">
                <img src="${imagen}" alt="${titulo}">
            </div>
            <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <p class="card-text descripcion">${descripcion}</p>
                <p class="card-text"><small class="text-body-secondary">${fecha}</small></p>
            </div>
        </div>
`;
        contenedor.innerHTML += `
            <div class="col-md-6 col-lg-4">${tarjeta}</div>
        `;
    });
}
