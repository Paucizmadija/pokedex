const pokemonList = document.getElementById("pokemon-list");
const searchInput = document.getElementById("search-bar");
const botonNav = document.querySelectorAll(".btn-section");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then(res => res.json())
        .then((data) => showPokemon(data))
}

function showPokemon(poke) {

    let elementalTypes = poke.types.map((type) => `<div class="${type.type.name} ${type.slot === 2 ? "round" : ""} type"><p>${type.type.name}</p></div>`);
    elementalTypes = elementalTypes.join(``);

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if(pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    let cardBackground = poke.types[0].type.name;
    let iconType = "";
    let tipos = [
        {
          typePokemon: "normal",
          iconType: "doughnut-chart"
        },
        {
          typePokemon: "grass",
          iconType: "leaf"
        },
        { 
          typePokemon: "fire",
          iconType: "hot"
        },
        {
          typePokemon: "water",
          iconType: "shower"
        },
        {
          typePokemon: "electric",
          iconType: "bolt"
        },
        {
          typePokemon: "ice",
          iconType: "popsicle"
        },
        {
          typePokemon: "fighting",
          iconType: "hand"
        },
        {
          typePokemon: "poison",
          iconType: "skull"
        },
        {
          typePokemon: "ground",
          iconType: "landscape"
        },
        {
          typePokemon: "flying",
          iconType: "paper-plane"
        },
        {
          typePokemon: "psychic",
          iconType: "brain"
        },
        {
          typePokemon: "bug",
          iconType: "bug"
        },
        {
          typePokemon: "rock",
          iconType: "component"
        },
        {
          typePokemon: "ghost",
          iconType: "ghost"
        },
        {
          typePokemon: "dragon",
          iconType: "castle"
        },
        {
          typePokemon: "fairy",
          iconType: "star"
        },
        {
          typePokemon: "steel",
          iconType: "shield-alt-2"
        }
      ];
      const found = tipos.find(element => element.typePokemon == cardBackground);
      
      cardBackground = cardBackground + "-light";
      iconType = found.iconType;

    const div = document.createElement("div");
    div.classList.add("card");
    div.classList.add(cardBackground)
    div.innerHTML = `
        <div class="pokemon-number">
            <p id="order">#${pokeId}</p>
        </div>

        <div class="pokemon-name">
            <i class="type-icon bx bxs-${iconType}"></i>
            <p id="poke-name">${poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</p>
        </div>

        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}" class="pokemon">
        
        ${elementalTypes}
    `;
    pokemonList.append(div)
}

searchInput.addEventListener("input", handleSearch);

function handleSearch(event) {
    const searchText = event.target.value.toLowerCase();
    const pokemonCards = document.getElementsByClassName("card");

    for (let i = 0; i < pokemonCards.length; i++) {
        const card = pokemonCards[i];
        const pokemonName = card.querySelector("#poke-name").textContent.toLowerCase();
        const pokemonNumber = card.querySelector("#order").textContent.toLowerCase();

        if (pokemonName.includes(searchText) || pokemonNumber.includes(searchText)) {
            card.style.display = "inline";
        } else {
            card.style.display = "none";
        }
    }
}


botonNav.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    pokemonList.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((res) => res.json())
            .then((data => {

                if(botonId === "ver-todos") {
                    showPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                     showPokemon(data);
                    }
                }

            }))
    }
}))

