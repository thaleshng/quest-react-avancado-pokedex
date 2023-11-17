import { useEffect, useState } from "react"
import { getPokemonsWithTypes } from "../../services/home/poke-api"
import { ButtonSeeMore } from "../button/button"
import styled from "styled-components"
import pokemonLogo from "../../assets/images/Pokemon-Logo.png"
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export const PokemonsList = () => {
    const [pokemonsData, setPokemonsData] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const pokemonsWithTypes = await getPokemonsWithTypes();
            setPokemonsData(pokemonsWithTypes);
        }
        fetchData();
    }, []);

    const formatNumber = (index) => {
        return index < 9 ? `00${index + 1}` : `0${index + 1}`;
    };

    const loadMorePokemons = async () => {
        const additionalPokemons = await getPokemonsWithTypes(pokemonsData.length);
        setPokemonsData((prevPokemons) => [...prevPokemons, ...additionalPokemons]);
        setButtonClicked(true);
    };
    
    return (
        <Main>
            <ImgLogo src={pokemonLogo}></ImgLogo>
             <Ul>
             {pokemonsData.map((pokemon, index) => (
                    <Li key={index}>
                        <Link to={`/${pokemon.name}`} state={{ pokemon }}>
                            <DivImg>
                                <img src={`https://projectpokemon.org/images/normal-sprite/${pokemon.name}.gif`} alt={pokemon.name} ></img>
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
               ))}
            </Ul>
            {!buttonClicked && (
                <ButtonSeeMore onClick={loadMorePokemons} >
                    Load More Pokemons 
                    <FontAwesomeIcon icon={faArrowsRotate} />
                </ButtonSeeMore>
            )}                   
        </Main>
    )
}

const Main = styled.main`
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Ul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
`

const Li = styled.li`
    & > a {
    display: flex;
    flex-direction: column;
    width: 180px;
    height: 240px;
    padding: 10px;
    border-radius: 15px;
    align-items: center;
    gap: 2px;
    background-color: #FF7B3C;
    text-decoration: none;

    &:hover {
        transform: scale(1.05);
        background-color: #FF7B4C;
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
            color: #000000;
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
    background-color: #FFA07A;
`

const Span = styled.span`
    align-self: flex-start;
`

const ImgLogo = styled.img`
    max-width: 25%;
    max-height: 25%;
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