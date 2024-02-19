import styled from "styled-components"
import { Link } from "react-router-dom"

export const PokeCard = ({ filterPokemons, theme, formatNumber, pokemonsData }) => {
    const filteredPokemons = filterPokemons();
    const noResults = filteredPokemons.length === 0;

    return (
        <Ul>
            {noResults ? (
                <LiTypeNone theme={theme}>
                    <p>No Pokémon found.</p>
                </LiTypeNone>
            ) : (
                filteredPokemons.map((pokemon, index) => {
                    const pokemonIndex = pokemonsData.findIndex((p) => p === pokemon) + 1;

                    return (
                        <Li key={index} theme={theme}>
                            <Link to={`/${pokemon.name}`} state={{ pokemon }}>
                                <DivImg theme={theme}>
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonIndex}.gif`} alt={pokemon.name} />
                                </DivImg>
                                <Span>N° {formatNumber(pokemonIndex - 1)}</Span>
                                <Span>{pokemon.name}</Span>
                                <DivTypes>
                                    {pokemon.types.map((type, index) => (
                                        <SpanTypes key={index} content={type}>{type}</SpanTypes>
                                    ))}
                                </DivTypes>
                            </Link>
                        </Li>
                    );
                }) 
            )}
        </Ul>
    );
};

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
        transform: scale(1.01);
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
        } else if (content === 'dragon') {
            return 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)';
        } else if (content === 'fairy') {
            return 'linear-gradient(180deg, #fdb9e9 50%, #fdb9e9 50%)';
        } else if (content === 'ghost') {
            return 'linear-gradient(180deg, #7b62a3 50%, #7b62a3 50%)';
        } else if (content === 'ground') {
            return 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)';
        } else if (content === 'psychic') {
            return 'linear-gradient(180deg, #f366b9 50%, #f366b9 50%)';
        } else if (content === 'steel') {
            return 'linear-gradient(180deg, #9eb7b8 50%, #9eb7b8 50%)';
        } else if (content === 'dark') {
            return 'linear-gradient(180deg, #707070 50%, #707070 50%)';
        } else if (content === 'electric') {
            return 'linear-gradient(180deg, #eed535 50%, #eed535 50%)';
        } else if (content === 'fighting') {
            return 'linear-gradient(180deg, #d56723 50%, #d56723 50%)';
        } else if (content === 'ice') {
            return 'linear-gradient(180deg, #51c4e7 50%, #51c4e7 50%)';
        } else if (content === 'rock') {
            return 'linear-gradient(180deg, #a38c21 50%, #a38c21 50%)';
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
        } else if (content === 'dragon') {
            return '#fff';
        } else if (content === 'ghost') {
            return '#fff';
        } else if (content === 'psychic') {
            return '#fff';
        } else if (content === 'dark') {
            return '#fff';
        } else if (content === 'fighting') {
            return '#fff';
        } else if (content === 'rock') {
            return '#fff';
        } else {
            return '#212121';
        }
    }};
`