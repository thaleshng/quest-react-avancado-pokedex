import { Link, useParams, useLocation } from "react-router-dom"
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../contexts/theme-context"
import { faHouse, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components";

export const GetPokemonDetails = () => {

    const { state } = useLocation();
    const pokemonInfos = state && state.pokemon;

    const { theme } = useContext(ThemeContext)

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
        if (id < 10) {
            return `00${id}`;
        } else if (id < 100) {
            return `0${id}`;
        } else {
            return `${id}`;
        }
    };

    const toggleVisibility = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const formatPokemonName = (name) => {
        const capitalizeWords = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
        if (name.includes("mr-")) {
            return capitalizeWords(name.replace("mr-", "mr. "));
        } else if (name.includes("tapu-")) {
            return capitalizeWords(name.replace("tapu-", "tapu "));
        } else if (name.includes("-f") && name.length === name.indexOf("-f") + 2) {
            return capitalizeWords(name.replace("-f", " ♀"));
        } else if (name.includes("-m") && name.length === name.indexOf("-m") + 2) {
            return capitalizeWords(name.replace("-m", " ♂"));
        } else if (name.includes("-jr")) {
            return capitalizeWords(name.replace("-jr", " Jr."));
        } else if (name.includes("type-")) {
            return capitalizeWords(name.replace("type-", "Type: "));
        } else  if (name.includes("-")) {
        const [pokemon, secondPart] = name.split("-");

        if ((secondPart.charAt(0) === 'o' && secondPart.length <= 2) || (secondPart === "z" && secondPart.length <= 2) || (secondPart === "jr" && secondPart.length <= 2) || (secondPart === "null") ){
            return capitalizeWords(name);
        }
        return capitalizeWords(pokemon);
    }
    
        return capitalizeWords(name);
    };

    return (
        <DivContainer>
            <DivLink theme={theme}>
                <Link to={`/`}>
                    <FontAwesomeIcon icon={faHouse} />
                </Link>
            </DivLink>
            <H1>{formatPokemonName(pokemonName)} <span>{`N° ${formatNumber(pokemonId)}`}</span></H1>
            <Main theme={theme}>
                <SectionGeneralInfos theme={theme}>
                    <Img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatNumber(pokemonId)}.png`} alt={pokemonName}  theme={theme}/>
                    <DivTypes>
                        {typeDetails.map((type, index) => (
                            <SpanTypes key={index} content={type.name}>{type.name}</SpanTypes>
                        ))}
                    </DivTypes>
                </SectionGeneralInfos>
                <SectionAbilitiesAndMoves>
                    <DivAbilities>
                        <UlAbilities theme={theme}>
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
                    <DivMoves theme={theme}>
                        <h2>Moves</h2>

                        <UlMoves theme={theme}>
                            {pokemonDetails.moves.map((move, index) => {
                                const moveName = move.move.name.replace(/-/g, ' ');
                                return (
                                    <LiMoves key={index} theme={theme}> 
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
    height: 20px;
    padding: 15px 0;
    margin-left: 15px;

    & > a {
        font-size: 25px;
        color: ${props => props.theme['--general-color']};
    }

    & > a:hover {
        font-size: 26px;
    }
`
const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px; 
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
    background-color: ${props => props.theme['--primary-bg-color-opacity']};
    height: 85vh;
    display: flex;
    
    @media (max-width: 650px) {
        flex-direction: column;
        align-items: center;
        height: 100%;
    }
`
const SectionGeneralInfos = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 450px;
    align-items: center;

    @media (min-width: 651px) {
        border-right: 1px solid ${props => props.theme['--border-color']};
    }

    @media (max-width: 650px) {
        border-bottom: 2px solid ${props => props.theme['--border-color']};
        width: 100%;
        padding-bottom: 15px;
    }
`
const Img = styled.img`
    width: 300px;
    height: 300px;
    padding: 25px;
    margin: 15px;
    background-color: ${props => props.theme['--secundary-bg-color-opacity']};
    border-radius: 15px;
    align-self: center;

    @media (max-width: 650px) {
        flex-direction: column;
        align-items: center;
    }

    @media (max-width: 390px) {
        width: 280px;
        height: 280px;
    }

    @media (max-width: 360px) {
        width: 260px;
        height: 260px;
    }

    @media (max-width: 340px) {
        width: 240px;
        height: 240px;
    }
`

const DivTypes = styled.div`
    display: flex;
    gap: 0 40px;

    @media (max-width: 650px) {
        padding: 25px 0;
    }
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
    }};"
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
    background-color: ${props => props.theme['--secundary-bg-color-opacity']};
    padding: 15px 0;
    width: 100%;

    & > h2 {
        font-family: 'Flexo-Bold';
        text-align: center;
        border-bottom: 2px solid ${props => props.theme['--border-color']};
    }

    & svg {
        margin-left: 5px;
        width: 18px;
        height: 18px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
    }

    & svg:hover {
        color: ${props => props.theme['--ability-info-color-hover']};
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
    background-color: ${props => props.theme['--secundary-bg-color-opacity']};
    flex-direction: column;

    & > h2 {
        text-align: center;
        font-family: 'Flexo-Bold';
        margin-top: 15px;
        border-bottom: 2px solid ${props => props.theme['--border-color']};
    }
`

const UlMoves = styled.ul`
    background-color: ${props => props.theme['--secundary-bg-color-opacity']};
    padding: 10px;
    flex-wrap: wrap;
    display: flex;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme['--scrollbar-color']};
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
        background-color: ${props => props.theme['--primary-bg-color-opacity']};
        padding: 8px;
        text-align: center;
        border-radius: 5px;
        color: ${props => props.theme['--general-color']};
    }

    & > p:hover {
        transition: 0.3s ease-in-out;
        background-color: ${props => props.theme['--primary-bg-color-hover']};
    }

    @media (max-width: 1223px) {
        flex-basis: calc(25% - 10px);
    }

    @media (max-width: 1068px) {
        flex-basis: calc(33% - 10px);
    }

    @media (max-width: 920px) {
        flex-basis: calc(50% - 10px);
    }

    @media (max-width: 758px) {
        flex-basis: calc(100% - 10px);
    }

    @media (max-width: 650px) {
        flex-basis: calc(33% - 10px);
    }

    @media (max-width: 530px) {
        flex-basis: calc(50% - 10px);
    }

    @media (max-width: 390px) {
        flex-basis: calc(100% - 10px);
    }
`