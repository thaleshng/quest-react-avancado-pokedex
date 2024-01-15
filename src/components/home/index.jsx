import { useEffect, useState, useContext } from "react"
import { ThemeContext } from "../../contexts/theme-context"
import { getPokemonsWithTypes } from "../../services/home/poke-api"
import { ButtonSeeMore } from "../button/button"
import styled from "styled-components"
import pokemonLogo from "../../assets/images/Pokemon-Logo.png"
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { Filter } from "../filter/filter"

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
        // Filtrar pokémons com base nos tipos selecionados
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
        // Mudar o ícone ao clicar
        setIcon(icon === faFilter ? faXmark : faFilter);
    };
    
    return (
        <Main>
            <ImgLogo src={pokemonLogo} />
            <StyledFontAwesomeIcon icon={icon} onClick={() => { toggleFilter(); changeIcon() }} theme={theme} />
            {showFilter && <Filter pokemonsData={pokemonsData} theme={theme} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />}
            <Ul>
                {selectedTypes.length > 0 && filterPokemonsByType().length === 0 ? (
                    <LiTypeNone theme={theme}>
                        <p>No Pokémon found with the selected types.</p>
                    </LiTypeNone>
                ) : (
                    filterPokemonsByType().map((pokemon, index) => (
                        <Li key={index} theme={theme}>
                            <Link to={`/${pokemon.name}`} state={{ pokemon }}>
                                <DivImg theme={theme}>
                                    <img src={`https://projectpokemon.org/images/normal-sprite/${pokemon.name}.gif`} alt={pokemon.name}></img>
                                </DivImg>
                                <Span>N° {formatNumber(index)}</Span>
                                <Span>{pokemon.name}</Span>
                                <DivTypes>
                                    {pokemon.types.map((type, index) => (
                                        <SpanTypes key={index} content={type}>{type}</SpanTypes>
                                    ))}
                                </DivTypes>
                            </Link>
                        </Li>
                    ))
                )}
            </Ul>
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

const Ul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    max-width: 1280px;
`

const LiTypeNone = styled.li`
    background-color: #fff;
    height: 40vh;
    background: ${props => props.theme['--primary-bg-color-opacity']};
    color: ${props => props.theme['--general-color']};
    display: flex;
    align-items: center;

    & > p {
        width: 1120px;
        text-align: center;
        font-family: 'Flexo-Demi';
        font-size: 18px;
        color: ${props => props.theme['--general-color']};

        @media (max-width: 2560px) {
            font-size: 24px;
        }

        @media (max-width: 1024px) {
            width: 890px;
        }

        @media (max-width: 768px) {
            width: 650px;
        }

        @media (max-width: 425px) {
            width: 200px;
            font-size: 16px;
        }
    } 
`

const Li = styled.li`
    & > a {
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 180px;
    height: 240px;
    padding: 10px;
    border-radius: 15px;
    align-items: center;
    gap: 2px;
    background-color: ${props => props.theme['--primary-bg-color']};
    text-decoration: none;

    &:hover {
        transform: scale(1.05);
        background-color: ${props => props.theme['--primary-bg-color-hover']};
    }

    & > span:nth-child(2) {
        color: #DDDDDD;
        font-family: 'Flexo-Bold';
        margin-bottom: 3px;
        }

        & > span:nth-child(3) {
            text-transform: capitalize;
            font-size: 21px;
            letter-spacing: 0.5px;
            font-family: 'Flexo-Demi';
            margin-bottom: 12px;
            color: ${props => props.theme['--general-color']};
        }
    }
`

const DivImg = styled.div`
    height: 140px;
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background-color: ${props => props.theme['--secundary-bg-color']};
`

const Span = styled.span`
    align-self: flex-start;
`



const DivTypes = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    & > span:nth-child(1) {
        
    }

    & > span:nth-child(2) {
        
    }
`

const SpanTypes = styled.span`
    padding: 1px 20px;
    border-radius: 3px;
    font-size: 13px;
    font-family: 'Flexo-Medium';
    text-transform: capitalize;
    background: ${({ content }) => {
        if (content === 'grass') {
            return 'linear-gradient(180deg, #9bcc50 50%, #9bcc50 50%)';
        } else if (content === 'poison') {
            return 'linear-gradient(180deg, #b97fc9 50%, #b97fc9 50%)';
        } else if (content === 'fire') {
            return 'linear-gradient(180deg, #FF6B4E 50%, #FF6B4E 50%)';
        } else if (content === 'flying') {
            return 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)';
        } else if (content === 'water') {
            return 'linear-gradient(180deg, #4592c4 50%, #4592c4 50%)';
        } else if (content === 'bug') {
            return 'linear-gradient(180deg, #729f3f 50%, #729f3f 50%)';
        } else if (content === 'normal') {
            return 'linear-gradient(180deg, #a4acaf 50%, #a4acaf 50%)';
        }
    }};

    color: ${({ content }) => {
        if (content === 'poison') {
            return '#fff';
        } else if (content === 'fire') {
            return '#fff';
        } else if (content === 'water') {
            return '#fff';
        } else if (content === 'bug') {
            return '#fff';
        } else {
            return '#212121';
        }
    }};
`