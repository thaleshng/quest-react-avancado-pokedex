import styled from "styled-components";

export const Filter = ({ pokemonsData, selectedTypes, setSelectedTypes, theme, props }) => {

    const types = new Set();

    // Iterar sobre os pokémons e seus tipos
    pokemonsData.forEach(pokemon => {
        pokemon.types.forEach(type => {
            types.add(type);
        });
    });

    // Converter o conjunto de tipos de volta para uma matriz (array)
    const typesList = Array.from(types);

    // Saída dos tipos únicos no console
    console.log(typesList);

    const handleTypeChange = (type) => {
        // Atualizar os tipos selecionados quando houver alteração
        if (selectedTypes.includes(type)) {
            setSelectedTypes((prevTypes) => prevTypes.filter((prevType) => prevType !== type));
        } else {
            setSelectedTypes((prevTypes) => [...prevTypes, type]);
        }
    };

    return (
        <Form theme={theme} >
            {typesList.map((type, index)=>(
                <DivTypeOption key={index}>
                    <Label htmlFor={type} content={type} isSelected={selectedTypes.includes(type)}>{type}</Label>
                    <Input id={type} type="checkbox" checked={selectedTypes.includes(type)} onChange={() => handleTypeChange(type)} theme={theme} {...props} />
                </DivTypeOption>
            ))}
            <Resetinput type="reset" value="Reset" theme={theme} onClick={() => setSelectedTypes([])} />
        </Form>
    )
}

export const Form = styled.form`
    background: ${props => props.theme['--bg-color-filter']};
    background-size: cover;
    align-self: start;
    margin: 0 0 10px 60px;
    border-radius: 5px;
    text-align: center;

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

    @media (max-width: 375px) {
        margin: 0 0 10px 70px;
    }

    @media (max-width: 320px) {
        margin: 0 0 10px 40px;
    }
`

export const DivTypeOption = styled.div`
    display: flex;
    gap: 15px;
    padding: 3px 50px;
    justify-content: space-between;
    align-items: center;
    
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
            }
        }};
`

export const Resetinput = styled.input`
        margin: 5px 0;
        padding: 3px 8px;
        background-color: #FFF;
        border-radius: 8px;
        font-family: 'Flexo-Medium';
        cursor: pointer;
        transition: 0.3s ease-in-out;

        &:hover {
            background-color: ${props => props.theme['--primary-bg-color']};
            color: #DDDDDD;
`