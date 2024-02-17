import { useEffect, useState, useContext } from "react"
import { ThemeContext } from "../../contexts/theme-context"
import { getPokemonsWithTypes } from "../../services/home/poke-api"
import { ButtonSeeMore } from "../../components/button-see-more/index"
import styled from "styled-components"
import pokemonLogo from "../../assets/images/Pokemon-Logo.png"
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Filter } from "../../components/filter/filter"
import { PokeCard } from "../../components/pokecard"

export const PokemonsList = () => {
    const [pokemonsData, setPokemonsData] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [icon, setIcon] = useState(faFilter);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const { theme } = useContext(ThemeContext)
    const [displayedPokemons, setDisplayedPokemons] = useState(10);

    useEffect(() => {
        async function fetchData() {
            const pokemonsWithTypes = await getPokemonsWithTypes();
            setPokemonsData(pokemonsWithTypes);
        }
        fetchData();
    }, []);

    const toggleFilter = () => {
        setShowFilter((prevShowFilter) => !prevShowFilter);
    };

    const filterPokemons = () => {
        const filteredPokemons = pokemonsData.filter((pokemon, index) => {
            const matchesType = selectedTypes.length === 0 || selectedTypes.every((type) => pokemon.types.includes(type));
            const formattedNumber = formatNumber(index);
            const matchesSearch =
                !searchInput ||
                pokemon.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                formattedNumber.includes(searchInput.toLowerCase());
            return matchesType && matchesSearch;
        });

        return filteredPokemons.slice(0, displayedPokemons);
    };

    const formatNumber = (index) => {
        const pokemon = pokemonsData[index];
        if (!pokemon) {
            return "";
        }

        const pokemonIndex = pokemonsData.findIndex((p) => p === pokemon) + 1;

        if (pokemonIndex < 10) {
            return `00${pokemonIndex}`;
        } else if (pokemonIndex < 100) {
            return `0${pokemonIndex}`;
        } else {
            return `${pokemonIndex}`;
        }
    };

    const loadMorePokemons = () => {
        setDisplayedPokemons((prevDisplayedPokemons) => prevDisplayedPokemons + 10);
    };

    const changeIcon = () => {
        setIcon(icon === faFilter ? faXmark : faFilter);
    };

    const filteredPokemons = filterPokemons();

    return (
        <Main>
            <ImgLogo src={pokemonLogo} alt="Logo Pokémon" />
            <StyledFontAwesomeIcon icon={icon} onClick={() => { toggleFilter(); changeIcon() }} theme={theme} />
            {showFilter && <Filter pokemonsData={pokemonsData} theme={theme} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} setSearchInput={setSearchInput} />
            }
            <PokeCard
                pokemonsData={pokemonsData}
                selectedTypes={selectedTypes}
                filterPokemons={filterPokemons}
                theme={theme}
                formatNumber={formatNumber}
                displayedPokemons={displayedPokemons}
            />
            {displayedPokemons === filteredPokemons.length && displayedPokemons < pokemonsData.length && (
                <ButtonSeeMore onClick={loadMorePokemons} theme={theme}>
                    Carregar mais Pokémon
                    <FontAwesomeIcon icon={faArrowsRotate} />
                </ButtonSeeMore>
            )}
        </Main>
    );
}

const Main = styled.main`
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ImgLogo = styled.img`
    max-width: 25%;
    max-height: 25%;

    @media (max-width: 475px) {
        max-width: 45%;
        max-height: 45%;
    }

    @media (max-width: 375px) {
        max-width: 50%;
        max-height: 50%;
    }

    @media (max-width: 320px) {
        max-width: 60%;
        max-height: 60%;
    }
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: ${({ icon }) => (icon === faXmark ? '28px' : '20px')};
    align-self: start;
    margin: ${({ icon }) => (icon === faXmark ? '0 0 0px 60px' : '0 0 10px 60px')};
    cursor: pointer;
    transition: transform, color 0.5s ease;
    color: ${({ icon }) => (icon !== faXmark ? props => props.theme['--general-color'] : props => props.theme['--general-color'])};

    &:hover {
        transform: ${({ icon }) => (icon === faXmark ? 'none' : 'scale(1.15)')};
        color: ${({ icon }) => (icon === faXmark ? props => props.theme['--color-filter-hover'] : "none")};
    }

    @media (max-width: 1280px) {
        margin: 0 0 10px 55px;
    }

    @media (max-width: 1024px) {
        margin: 0 0 10px 45px;
    }

    @media (max-width: 768px) {
        margin: 0 0 10px 35px;
    }

    @media (max-width: 425px) {
        margin: 0 0 10px 90px;
        color: ${({ icon }) => (icon !== 'faXmark' ? '#000' : 'inherit')}; 
    }

    @media (max-width: 390px) {
        margin: 0 0 10px 75px;
    }

    @media (max-width: 375px) {
        margin: 0 0 10px 70px;
    }

    @media (max-width: 320px) {
        margin: 0 0 10px 40px;
    }
`