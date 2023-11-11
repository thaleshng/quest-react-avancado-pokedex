import { useEffect, useState } from "react"
import { getPokemonTypes, getPokemons } from "../../services/poke-api"
import { ButtonSeeMore } from "../button/button"
import styled from "styled-components"
import pokemonLogo from "../../assets/images/Pokemon-Logo.png"
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Home = () => {
    const [ pokemons, setPokemons ] = useState([])
    const [ types, setTypes ] = useState([]);
    const [visiblePokemons, setVisiblePokemons] = useState(10);
    const [buttonClicked, setButtonClicked] = useState(false);

    useEffect(()=>{
        async function fetchData() {
            const pokemons = await getPokemons()
            setPokemons(pokemons.results)

            const types = await getPokemonTypes()
            setTypes(types)
        }
        fetchData()
    }, [])

    const formatNumber = (index) => {
        return index < 10 ? `00${index}` : `0${index}`;
    };

    const loadMorePokemons = () => {
        setVisiblePokemons((prevVisiblePokemons) => prevVisiblePokemons + 10);
        setButtonClicked(true);
    };

    return (
        <Main>
            <ImgLogo src={pokemonLogo}></ImgLogo>
             <Ul>
             {pokemons.slice(0, visiblePokemons).map((pokemon, index) => (
                    <Li key={index}>
                        <DivImg>
                            <img src={`https://projectpokemon.org/images/normal-sprite/${pokemon.name}.gif`} alt={pokemon.name} ></img>
                        </DivImg>
                        <Span>N° {formatNumber(index+1)}</Span>
                        <Span>{pokemon.name}</Span>
                        <DivTypes>
                            {types[index]?.map((type, index) => (
                                <SpanTypes key={index} content={type}>{type}</SpanTypes>
                            ))}
                        </DivTypes>
                    </Li>
               ))}
            </Ul>
            {!buttonClicked && (
                <ButtonSeeMore onClick={loadMorePokemons} >
                    Carregar mais Pokémons 
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
    display: flex;
    flex-direction: column;
    width: 180px;
    height: 240px;
    padding: 10px;
    border-radius: 15px;
    align-items: center;
    gap: 2px;
    background-color: #FF7B3C;

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
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1px 20px;
    border-radius: 3px;
    margin: 0 auto;
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
