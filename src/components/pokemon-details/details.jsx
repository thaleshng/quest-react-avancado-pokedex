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
import { faHouse } from "@fortawesome/free-solid-svg-icons";
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
    const [ abilityDetails, setAbilityDetails ] = useState([]);
    const [typeDetails, setTypeDetails] = useState([]);

    const url = pokemonInfos.url
    const urlParts = url.split("/");
    const pokemonId = urlParts[urlParts.length - 2];

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/?language=en`);
            const data = await response.json();

            setPokemonDetails ({
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

    console.log(abilityDetails)

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
                        <Ul>
                            <h2>Abilities</h2>
                            {abilityDetails.map((ability, index) => {
                                const nomeDaHabilidade = ability.name.replace(/-/g, ' ');

                                const englishSunAndMoonFlavorText = ability.flavor_text_entries.find(entry => entry.language.name === "en" && entry.version_group.name === "sun-moon")

                                return (
                                    <Li key={index}>
                                    <h2>{nomeDaHabilidade}</h2>
                                    <p>{englishSunAndMoonFlavorText ? englishSunAndMoonFlavorText.flavor_text : "Efeito não disponível em inglês"}</p>
                                </Li>
                                )
                        })}
                        </Ul>
                    </DivAbilities>
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
    
    & > span {
        color: #888888;
        padding-left: 5px;
    }
`

const Main = styled.main`
background-color: rgba(255, 123, 60, 0.8);
    height: 80vh;
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
    padding: 10px;
`

const Ul = styled.ul`
    height: 100%;
    background-color: rgba(255, 160, 122, 0.8);
    padding: 15px;

    & > h2 {
        font-family: 'Flexo-Bold';
        text-align: center;
    }
`

const Li = styled.li`
    font-family: 'Flexo-Medium';
    padding: 5px;
    
    & > h2 {
        margin-bottom: 5px;
        font-family: 'Flexo-Demi';
        font-size: 20px;
        text-transform: capitalize;
        color: #FFF;
    }
` 