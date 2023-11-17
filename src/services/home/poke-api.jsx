// export async function getPokemonList() {
//     const url = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
//     const response = await fetch(url);
//     const data = await response.json();
//     const nextUrl = data.next
    
//     return {
//         nextUrl: nextUrl,
//         results: data.results,
//     };
// }

// export async function getPokemonTypes(url) {
//     const response = await fetch(url);
//     const data = await response.json();
//     const types = data.types.map((typeInfo) => typeInfo.type.name);
//     return types;
// }

// export async function getPokemonsWithTypes() {
//     const { results: pokemonList } = await getPokemonList();

//     const pokemonsWithTypes = await Promise.all(
//         pokemonList.map(async (pokemon) => {
//             const types = await getPokemonTypes(pokemon.url);

//             return {
//                 name: pokemon.name,
//                 url: pokemon.url,
//                 types: types,
//             };
//         })
//     );

//     return pokemonsWithTypes;
// }

export async function getPokemonList(url = 'https://pokeapi.co/api/v2/pokemon/?limit=10') {
    const response = await fetch(url);
    const data = await response.json();
    const nextUrl = data.next;

    return {
        nextUrl: nextUrl,
        results: data.results,
    };
}

export async function getPokemonTypes(url) {
    const response = await fetch(url);
    const data = await response.json();
    const types = data.types.map((typeInfo) => typeInfo.type.name);
    return types;
}

export async function getPokemonsWithTypes(startIndex = 0) {
    let currentUrl = `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${startIndex}`;
    let allPokemons = [];

    do {
        const { results: pokemonList, nextUrl } = await getPokemonList(currentUrl);

        const remainingPokemons = 10 - allPokemons.length;
        const pokemonsToFetch = pokemonList.slice(0, remainingPokemons);

        const pokemonsWithTypes = await Promise.all(
            pokemonsToFetch.map(async (pokemon) => {
                const types = await getPokemonTypes(pokemon.url);

                return {
                    name: pokemon.name,
                    url: pokemon.url,
                    types: types,
                };
            })
        );

        allPokemons = allPokemons.concat(pokemonsWithTypes);
        
        currentUrl = nextUrl;
    } while (currentUrl && allPokemons.length < 10);

    return allPokemons;
}


