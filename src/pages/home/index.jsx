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
    const [buttonClicked, setButtonClicked] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [icon, setIcon] = useState(faFilter);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const { theme } = useContext(ThemeContext)

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

    const filterPokemonsByType = () => {
        const filteredPokemons = pokemonsData.filter((pokemon) => {
            return selectedTypes.length === 0 || selectedTypes.every((type) => pokemon.types.includes(type));
        });

        return filteredPokemons;
    };

    const formatNumber = (index) => {
        return index < 9 ? `00${index + 1}` : `0${index + 1}`;
    };

    const loadMorePokemons = async () => {
        const additionalPokemons = await getPokemonsWithTypes(pokemonsData.length);
        setPokemonsData((prevPokemons) => [...prevPokemons, ...additionalPokemons]);
        setButtonClicked(true);
    };

    const changeIcon = () => {
        setIcon(icon === faFilter ? faXmark : faFilter);
    };
    
    return (
        <Main>
            <ImgLogo src={pokemonLogo} alt="Logo Pokémon" />
            <StyledFontAwesomeIcon icon={icon} onClick={() => { toggleFilter(); changeIcon() }} theme={theme} />
            {showFilter && <Filter pokemonsData={pokemonsData} theme={theme} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />}
            <PokeCard  selectedTypes={selectedTypes} filterPokemonsByType={filterPokemonsByType} theme={theme} formatNumber={formatNumber}/>
            {!buttonClicked && (
                <ButtonSeeMore onClick={loadMorePokemons} theme={theme}>
                    Load More Pokemons
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