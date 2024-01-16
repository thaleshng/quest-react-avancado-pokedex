import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./home"
import { PokemonDetails } from "./pokemon-details"

export const AppRoutes = () => (
        <BrowserRouter basename="quest-react-avancado-pokedex">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/:pokemonName" element={<PokemonDetails />} />
            </Routes>
        </BrowserRouter>
    )