import { getPokemonList, getPokemonTypes, getPokemonsWithTypes } from "./poke-api";

describe('getPokemonList', () => {
    it('obtém dados da API', async () => {
      const data = await getPokemonList();
      expect(data.results).toBeDefined();
      expect(data.nextUrl).toBeDefined();
    });
  });
  
  describe('getPokemonTypes', () => {
    it('obtém tipos para um Pokémon específico', async () => {
      const types = await getPokemonTypes('https://pokeapi.co/api/v2/pokemon/1/');
      expect(types).toBeDefined();
      expect(Array.isArray(types)).toBe(true);
    });
  });
  
  describe('getPokemonsWithTypes', () => {
    it('obtém uma lista de Pokémon com tipos', async () => {
      const pokemonsWithTypes = await getPokemonsWithTypes();
      expect(pokemonsWithTypes).toBeDefined();
      expect(Array.isArray(pokemonsWithTypes)).toBe(true);
      expect(pokemonsWithTypes.length).toBeGreaterThan(0);
  
      pokemonsWithTypes.forEach((pokemon) => {
        expect(pokemon.name).toBeDefined();
        expect(pokemon.url).toBeDefined();
        expect(pokemon.types).toBeDefined();
        expect(Array.isArray(pokemon.types)).toBe(true);
      });
    });
  });