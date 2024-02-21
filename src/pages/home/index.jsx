import { useEffect, useState, useContext } from "react"
import { ThemeContext } from "../../contexts/theme-context"
import { getPokemonsWithTypes } from "../../services/home/poke-api"
import { ButtonSeeMore } from "../../components/button-see-more/index"
import styled from "styled-components"
import pokemonLogo from "../../assets/images/Pokemon-Logo.png"
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
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

    const isDataLoaded = pokemonsData.length > 0;

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    return (
        <Main>
            {isDataLoaded && (
                <>
                    <ImgLogo src={pokemonLogo} alt="Logo Pokémon" />
                    <StyledFontAwesomeIcon icon={icon} onClick={() => { toggleFilter(); changeIcon() }} theme={theme} />
                    {showFilter &&
                    <Filter 
                        pokemonsData={pokemonsData} 
                        theme={theme} 
                        selectedTypes={selectedTypes} 
                        setSelectedTypes={setSelectedTypes} 
                        setSearchInput={setSearchInput}
                    />}
                    <DivSearch>
                        <InputSearch type="text" placeholder="Pokemon Name or ID" onChange={handleSearchChange} value={searchInput}/>
                        {searchInput !== '' ? (
                            <ResetInputSearch
                                type="reset" 
                                value="Clear" 
                                theme={theme} 
                                onClick={() => setSearchInput('')}
                            />
                        ) : (
                            <FontAwesomeIcon icon={faSearch} />
                        )}
                    </DivSearch>
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
                </>
            )}
        </Main>
    );
}

const Main = styled.main`
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 1450px) {
        height: 80vh;
        max-width: 1920px;
    }
`

const ImgLogo = styled.img`
    max-width: 25%;
    max-height: 25%;

    @media (min-width: 1450px) {
        max-width: 30%;
        max-height: 30%;
    }

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

    @media (max-width: 240px) {
        max-width: 70%;
        max-height: 70%;
        margin-top: 20px;
    }
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: ${({ icon }) => (icon === faXmark ? '28px' : '20px')};
    align-self: start;
    margin: ${({ icon }) => (icon === faXmark ? '0 0 0px 60px' : '0 0 0px 60px')};
    cursor: pointer;
    position: relative;
    bottom: 10px;
    transition: transform, color 0.5s ease;
    color: ${({ icon }) => (icon !== faXmark ? props => props.theme['--general-color'] : props => props.theme['--general-color'])};

    &:hover {
        transform: ${({ icon }) => (icon === faXmark ? 'none' : 'scale(1.15)')};
        color: ${({ icon }) => (icon === faXmark ? props => props.theme['--color-filter-hover'] : "none")};
    }

    @media (min-width: 2560px) {
        color: ${({ icon }) => (icon !== 'faXmark' ? '#000' : 'inherit')}; 
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
        margin: 0 0 10px 80px;
        color: ${({ icon }) => (icon !== 'faXmark' ? '#000' : 'inherit')}; 
    }

    @media (max-width: 400px) {
        margin: 0 0 10px 70px;
    }

    @media (max-width: 390px) {
        margin: 0 0 10px 60px;
    }

    @media (max-width: 375px) {
        margin: 0 0 10px 58px;
    }

    @media (max-width: 360px) {
        margin: 0 0 10px 50px;
    }

    @media (max-width: 320px) {
        margin: 0 0 10px 30px;
    }

    @media (max-width: 240px) {
        margin: 0 0 10px 0px;
    }
`
const DivSearch = styled.div`
    align-self: flex-end;
    position: relative;
    bottom: 10px;
    right: 40px;

    & > svg {
        position: absolute;
        right: 25px;
        top: 3px;
        color: #999
    }

    @media (max-width: 1024px) {
        right: 28px;
    }

    @media (max-width: 768px) {
        margin: 0 -25px;
    }

    @media (max-width: 425px) {
        right: 100px;
    }

    @media (max-width: 415px) {
        right: 95px;
    }

    @media (max-width: 400px) {
        right: 90px;
    }

    @media (max-width: 390px) {
        right: 82px;
    }

    @media (max-width: 375px) {
        right: 75px;
    }

    @media (max-width: 360px) {
        right: 70px;
    }

    @media (max-width: 320px) {
        right: 48px;
    }

    @media (max-width: 240px) {
        right: 15px;
    }
`

export const InputSearch = styled.input`
    height: 20px;
    width: 180px;
    background-color: #FFF;
    margin: 0 20px;
    border-radius: 5px;
    padding-left: 5px;
    font-family: 'Flexo-Medium';
    border: 1px solid #000;

    @media (min-width: 1450px) {
       min-width: 250px;
       font-size: 25px;
    }
`

const ResetInputSearch = styled.input`
    position: absolute;
    right: 25px;
    top: 3px;
    cursor: pointer;
    font-family: 'Flexo-Medium';
    color: #999;
`