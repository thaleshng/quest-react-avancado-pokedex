import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PokemonsList } from "../components/home/home"
import { PokemonDetails } from "../components/pokemon-details/details"

export const AppRoutes = () => {
    return (
        <BrowserRouter basename="quest-react-avancado-pokedex">
            <Routes>
                <Route exact path="/" element={<PokemonsList />} />
                <Route exact path="/:pokemonName" element={<PokemonDetails />} />
            </Routes>
        </BrowserRouter>
    )
}