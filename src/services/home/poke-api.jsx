export async function getPokemonList(url = 'https://pokeapi.co/api/v2/pokemon/?limit=10') {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const nextUrl = data.next;

        return {
            nextUrl: nextUrl,
            results: data.results,
        };
    } catch (error) {
        console.error("Error fetching Pokemon list:", error);
        throw error;
    }
}

export async function getPokemonTypes(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const types = data.types.map((typeInfo) => typeInfo.type.name);
        return types;
    } catch (error) {
        console.error("Error fetching Pokemon types:", error);
        throw error;
    }
}

export async function getPokemonsWithTypes(startIndex = 0, limit = 920) {
    let currentUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${startIndex}`;
    let allPokemons = [];

    do {
        try {
            const { results: pokemonList, nextUrl } = await getPokemonList(currentUrl);

            if (!nextUrl) {
                break;
            }

            const remainingPokemons = limit - allPokemons.length;
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
        } catch (error) {
            console.error("Error fetching Pokemon list:", error);
        }
    } while (currentUrl && allPokemons.length < limit);

    return allPokemons;
}