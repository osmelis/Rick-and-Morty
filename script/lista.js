let items = document.getElementById("items");
let personaje = document.getElementById("personaje");
let verHome = document.getElementById("ver-home");

verHome.addEventListener("click", () => {
    personaje.style.display = "none";
    items.style.display = "flex";
})
let value;
function llamarPersonajes(url) {
    items.innerHTML = "";
    fetch(url).then((res) => {
        return res.json();
    }).then((res) => {
        value = res;
        res.results.map((val) => {
            items.innerHTML += `
        <article class="capsula">
            <div class="perfil" style="background-image: url('${val.image}')" onclick="showPerson(${val.id})"></div>
            <h3>${val.name}</h3>
            <p>${val.species}</p>
        </article>
        `
        })
    })
}

llamarPersonajes("https://rickandmortyapi.com/api/character/");

let anterior = document.getElementById("anterior");
let siguiente = document.getElementById("siguiente");

anterior.addEventListener("click", () => {
    llamarPersonajes(value.info.prev);
})

siguiente.addEventListener("click", () => {
    llamarPersonajes(value.info.next);
})

function showPerson(val) {
    fetch("https://rickandmortyapi.com/api/character/" + val).then((res) => {
        return res.json();
    }).then((val) => {
        personaje.innerHTML = ` <article class="capsula">
        <div class="perfil" style="background-image: url('${val.image}')"></div>
        <h3>${val.name}</h3>
        <p>${val.species}</p>
    </article>`;
        personaje.style.display = "block";
        items.style.display = "none";
    })

}