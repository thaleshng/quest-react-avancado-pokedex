import styled from "styled-components";
import { useState, useEffect } from "react";

export const Filter = ({ pokemonsData, selectedTypes, setSelectedTypes, setSearchInput, theme, props }) => {
    const [ types, setTypes ] = useState(new Set());
    const [ typesList, setTypesList ] = useState([]);

    useEffect(() => {
        const newTypes = new Set();
        pokemonsData.forEach((pokemon) => {
            pokemon.types.forEach((type) => {
                newTypes.add(type);
            });
        });
        setTypes(newTypes);
        setTypesList(Array.from(newTypes));
    }, [pokemonsData]);

    const handleTypeChange = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes((prevTypes) => prevTypes.filter((prevType) => prevType !== type));
        } else {
            setSelectedTypes((prevTypes) => [...prevTypes, type]);
        }
    };

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    return (
        <Form theme={theme}>
            <DivTypes theme={theme}>
                <DivUl theme={theme}>
                    <H2TypesAndText theme={theme}>Types</H2TypesAndText>
                    <UlTypes>
                        {typesList.map((type, index) => (
                            <LiTypes key={index}>
                                <Label htmlFor={type} content={type} isSelected={selectedTypes.includes(type)}>
                                    {type}
                                </Label>
                                <Input id={type} type="checkbox" checked={selectedTypes.includes(type)} onChange={() => handleTypeChange(type)} theme={theme} {...props} />
                            </LiTypes>
                        ))}
                    </UlTypes>
                </DivUl>
                <DivInput>
                    <H2TypesAndText theme={theme}>Name or ID</H2TypesAndText>
                    <InputText type="text" placeholder="Pokemon Name or ID" onChange={handleSearchChange} />
                </DivInput>
            </DivTypes>
            <Resetinput 
                type="reset" 
                value="Reset" 
                theme={theme} 
                onClick={() => {
                setSelectedTypes([]); 
                setSearchInput('');
                }}
            />
        </Form>
    );
};

export const Form = styled.form`
    background: ${props => props.theme['--bg-color-filter']};
    background-size: cover;
    align-self: start;
    margin: 0 0 10px 60px;
    border-radius: 5px;
    text-align: center;
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.theme['--border-color']};

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

export const DivTypes = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme['--border-color']};
`

export const DivUl = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${props => props.theme['--border-color']};
`

export const UlTypes = styled.ul`
    display: flex;
    flex-direction: column;
    max-height: 210px;
    flex-wrap: wrap;
`

export const H2TypesAndText = styled.h2`
    font-size: 18px;
    font-family: 'Flexo-Demi';
    color: ${props => props.theme['--general-color']};
    margin: 5px 0;
    align-self: center;
`

export const LiTypes = styled.li`
    display: flex;
    gap: 15px;
    padding: 3px 50px;
    justify-content: space-between;
    align-items: center; 
`

export const DivInput = styled.div`

`

export const InputText = styled.input`
    height: 20px;
    background-color: #FFF;
    margin: 0 20px;
    border-radius: 5px;
    padding-left: 5px;
    font-family: 'Flexo-Medium';
    border: 1px solid #000;
`

export const Label = styled.label`
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

    flex-grow: 1;
    padding: 0 3px;
    text-align: center;
    text-transform: capitalize;
    border-radius: 3px;
    font-size: 14px;
    font-family: 'Flexo-Medium';
`

export const Input = styled.input`
    appearance: none;
    cursor: pointer;

    width: 14px;
    height: 14px;
    border: 1px solid ${props => props.theme['--general-color']};
    border-radius: 3px;
    margin-top: 1px;

    &:checked {
        background: ${({ id }) => {
            if (id === 'grass') {
                return 'linear-gradient(180deg, #9bcc50 50%, #9bcc50 50%)';
            } else if (id === 'poison') {
                return 'linear-gradient(180deg, #b97fc9 50%, #b97fc9 50%)';
            } else if (id === 'fire') {
                return 'linear-gradient(180deg, #FF6B4E 50%, #FF6B4E 50%)';
            } else if (id === 'flying') {
                return 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)';
            } else if (id === 'water') {
                return 'linear-gradient(180deg, #4592c4 50%, #4592c4 50%)';
            } else if (id === 'bug') {
                return 'linear-gradient(180deg, #729f3f 50%, #729f3f 50%)';
            } else if (id === 'normal') {
                return 'linear-gradient(180deg, #a4acaf 50%, #a4acaf 50%)';
            } else if (id === 'dragon') {
                return 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)';
            } else if (id === 'fairy') {
                return 'linear-gradient(180deg, #fdb9e9 50%, #fdb9e9 50%)';
            } else if (id === 'ghost') {
                return 'linear-gradient(180deg, #7b62a3 50%, #7b62a3 50%)';
            } else if (id === 'ground') {
                return 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)';
            } else if (id === 'psychic') {
                return 'linear-gradient(180deg, #f366b9 50%, #f366b9 50%)';
            } else if (id === 'steel') {
                return 'linear-gradient(180deg, #9eb7b8 50%, #9eb7b8 50%)';
            } else if (id === 'dark') {
                return 'linear-gradient(180deg, #707070 50%, #707070 50%)';
            } else if (id === 'electric') {
                return 'linear-gradient(180deg, #eed535 50%, #eed535 50%)';
            } else if (id === 'fighting') {
                return 'linear-gradient(180deg, #d56723 50%, #d56723 50%)';
            } else if (id === 'ice') {
                return 'linear-gradient(180deg, #51c4e7 50%, #51c4e7 50%)';
            } else if (id === 'rock') {
                return 'linear-gradient(180deg, #a38c21 50%, #a38c21 50%)';
            }
        }};
`

export const Resetinput = styled.input`
        margin: 7px 0;
        padding: 3px 8px;
        background-color: #FFF;
        border-radius: 8px;
        font-family: 'Flexo-Medium';
        cursor: pointer;
        transition: 0.3s ease-in-out;
        width: 100px;
        align-self: center;

        &:hover {
            background-color: ${props => props.theme['--primary-bg-color']};
            color: #DDDDDD;
`