/** 

* * TODO 1: dar fetch nas infos dos pokemons recebendo o nome do pokemon que for clicado na home retornando "Types", "Abilities" e "Moves"
* * TODO 2: retonar o nome da habilidade do pokemon pra fazer outro fetch da descrição da habilidade | pegar "results.name" e "results.effect_entries.short_effect" Obs.: ver possibilidade de pegar a propriedade "flavor_text"
* TODO 3: retornar o array de moves do pokemon clicado e ver a possibilidade de pegar mais infos se não for travar o site fazendo as requisições | pegar "results.name"; "results.effect_entries.short_effect" e "results.type.name"
* * TODO 4: o nome já vai vir ao clicar
* TODO 5: a imagem vai ser usada url com o nome do pokemon que vier
* TODO 6: pegar os tipos do mesmo jeito que na Home
* ! CONFERIR A QUANTIDADE DE FETCHS PARA EVITAR TRAVAMENTO NA PÁGINA

*/

import { Link, useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { faHouse, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components";

export const PokemonDetails = () => {

    const { state } = useLocation();
    const pokemonInfos = state && state.pokemon;

    const { pokemonName } = useParams()

    const [pokemonDetails, setPokemonDetails] = useState({
        abilities: [],
        types: [],
        moves: [],
    });

    const [abilityDetails, setAbilityDetails] = useState([]);
    const [typeDetails, setTypeDetails] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    const url = pokemonInfos.url
    const urlParts = url.split("/");
    const pokemonId = urlParts[urlParts.length - 2];

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/?language=en`);
            const data = await response.json();

            setPokemonDetails({
                abilities: data.abilities,
                types: data.types,
                moves: data.moves
            })
        };
        fetchData();
    }, [pokemonName]);

    useEffect(() => {
        const fetchData = async () => {
            if (pokemonDetails.abilities) {
                const abilityDetails = await Promise.all(
                    pokemonDetails.abilities.map(async (ability) => {
                        const response = await fetch(`https://pokeapi.co/api/v2/ability/${ability.ability.name}/?language=en`);
                        const data = await response.json();
                        return data;
                    }))
                setAbilityDetails(abilityDetails)
            }
        }
        fetchData()
    }, [pokemonDetails.abilities])

    useEffect(() => {
        const fetchTypeData = async () => {
            if (pokemonDetails.types) {
                const typeDetails = await Promise.all(
                    pokemonDetails.types.map(async (type) => {
                        const response = await fetch(
                            `https://pokeapi.co/api/v2/type/${type.type.name}/?language=en`
                        );
                        const data = await response.json();
                        return data;
                    })
                );
                setTypeDetails(typeDetails);
            }
        };

        fetchTypeData();
    }, [pokemonDetails.types]);

    const formatNumber = (id) => {
        return id <= 9 ? `00${id}` : `0${id}`;
    };

    const toggleVisibility = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    // console.log(pokemonDetails.moves[1].move.name)

    return (
        <DivContainer>
            <DivLink>
                <Link to={`/`}>
                    <FontAwesomeIcon icon={faHouse} />
                </Link>
            </DivLink>
            <H1>{pokemonName} <span>{`N° ${formatNumber(pokemonId)}`}</span></H1>
            <Main>
                <SectionGeneralInfos>
                    <Img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatNumber(pokemonId)}.png`} alt="" />
                    <DivTypes>
                        {typeDetails.map((type, index) => (
                            <SpanTypes key={index} content={type.name}>{type.name}</SpanTypes>
                        ))}
                    </DivTypes>
                </SectionGeneralInfos>
                <SectionAbilitiesAndMoves>
                    <DivAbilities>
                        <UlAbilities>
                            <h2>Abilities</h2>
                            {abilityDetails.map((ability, index) => {
                                const abilityName = ability.name.replace(/-/g, ' ');

                                const englishSunAndMoonFlavorText = ability.flavor_text_entries.find(entry => entry.language.name === "en" && entry.version_group.name === "sun-moon")

                                return (
                                    <LiAbilities key={index}>
                                        <h2>
                                            {abilityName}
                                            <FontAwesomeIcon
                                                icon={faCircleInfo}
                                                onClick={() => toggleVisibility(index)} />
                                        </h2>
                                        <AbilityDescription isVisible={index === activeIndex}>
                                            {englishSunAndMoonFlavorText ? englishSunAndMoonFlavorText.flavor_text : "Efeito não disponível em inglês"}
                                        </AbilityDescription>
                                    </LiAbilities>
                                )
                            })}
                        </UlAbilities>
                    </DivAbilities>
                    <DivMoves>
                        <h2>Moves</h2>

                        <UlMoves>

                            {pokemonDetails.moves.map((move, index) => {
                                const moveName = move.move.name.replace(/-/g, ' ');

                                return (
                                    <LiMoves key={index}>
                                        <p>{moveName}</p>
                                    </LiMoves>
                                )
                            })}
                        </UlMoves>
                    </DivMoves>
                </SectionAbilitiesAndMoves>
            </Main>
        </DivContainer>
    )
}

const DivLink = styled.div`
    width: 28px;
    height: 35px;
    padding: 15px 0;

    & > a {
        font-size: 25px;
        color: #000000
    }

    &:hover > a {
        font-size: 26px;
    }
`
const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const H1 = styled.h1`
    align-self: center;
    text-transform: capitalize;
    font-family: 'Flexo-Medium';
    margin-bottom: 10px;
    
    & > span {
        color: #888888;
        padding-left: 5px;
    }
`

const Main = styled.main`
    background-color: rgba(255, 123, 60, 0.8);
    height: 85vh;
    display: flex;
`
const SectionGeneralInfos = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 450px;
    align-items: center;
    border-right: 1px solid rgba(255, 123, 60, 0.8);
`
const Img = styled.img`
    width: 300px;
    height: 300px;
    padding: 25px;
    margin: 15px;
    background-color: rgba(255, 160, 122, 0.8);
    border-radius: 15px;
    align-self: center;
`

const DivTypes = styled.div`
    display: flex;
    gap: 0 40px;
`

const SpanTypes = styled.span`
    padding: 2px 25px;
    border-radius: 5px;
    font-size: 16px;
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
const SectionAbilitiesAndMoves = styled.section`
    display: flex;
    flex-direction: column;
    gap: 30px 0;
`

const DivAbilities = styled.div`
    display: flex;
    margin: 15px;
`

const UlAbilities = styled.ul`
    background-color: rgba(255, 160, 122, 0.8);
    padding: 15px 0;
    width: 100%;

    & > h2 {
        font-family: 'Flexo-Bold';
        text-align: center;
        border-bottom: 2px solid rgba(255, 123, 60, 0.8);
    }

    & svg {
        margin-left: 5px;
        width: 18px;
        height: 18px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
    }

    & svg:hover {
        color: #FF6B4E;
    }
`

const LiAbilities = styled.li`
    font-family: 'Flexo-Medium';
    padding: 5px;
    
    & > h2 {
        margin-bottom: 5px;
        font-family: 'Flexo-Demi';
        font-size: 18px;
        text-transform: capitalize;
        text-align: center;
        color: #FFF;
    }
`

const AbilityDescription = styled.p`
    display: ${props => props.isVisible ? 'block' : 'none'};
    text-align: center;
`;

const DivMoves = styled.div`
    display: flex;
    margin: 15px; 
    min-height: 250px;
    background-color: rgba(255, 160, 122, 0.8);
    flex-direction: column;

    & > h2 {
        text-align: center;
        font-family: 'Flexo-Bold';
        margin-top: 15px;
        border-bottom: 2px solid rgba(255, 123, 60, 0.8);
    }
`

const UlMoves = styled.ul`
    background-color: rgba(255, 160, 122, 0.8);
    padding: 10px;
    flex-wrap: wrap;
    // width: 800px;
    display: flex;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: #FF6900;
        border-radius: 5px;
    }
    
    &::-webkit-scrollbar-track {
        background-color: #DDD;
        border-radius: 5px;
    }
`

const LiMoves = styled.li`    
    flex-basis: calc(20% - 10px);
    margin: 5px;
    min-width: 145px;

    & > p {
        text-transform: capitalize;
        font-family: 'Flexo-Medium';
        background-color: rgba(255, 123, 60, 0.8);
        padding: 8px;
        text-align: center;
        border-radius: 5px;
        transition: 0.3s ease-in-out;
    }

    & > p:hover {
        background-color: #FF7B4C;
    }
`

