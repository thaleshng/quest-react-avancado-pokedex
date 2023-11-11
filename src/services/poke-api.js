export async function getPokemons() {
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
    const response = await fetch(url)
    return await response.json()
}

async function getPokemonIds() {
    const data = await getPokemons();
    const pokemons = data.results;
    const ids = [];
    

    for (let i = 0; i < pokemons.length; i++) {
        const pokemonUrl = pokemons[i].url;
        const response = await fetch(pokemonUrl);
        const pokemonData = await response.json();  
        const id = i + 1;
        ids.push(id);
    }

    return ids;
}

export async function getPokemonTypes() {
    const id = await getPokemonIds()
    const typesData = [];

    for (let i = 0; i < id.length; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id[i]}/`;
        const response = await fetch(url);
        const data = await response.json();
        
        const types = data.types.map(type => type.type.name);
        typesData.push(types);
    }

    return typesData;
}