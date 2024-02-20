import styled from "styled-components"

export const Button = (props) => <ButtonSeeMore {...props}/>

export const ButtonSeeMore = styled.button`
    border: none;
    border-radius: 12px;
    padding: 10px 15px;
    margin-top: 15px;
    display: flex;
    gap: 0 10px;
    align-items: center;
    font-family: 'Flexo-Demi';
    font-size: 16px;
    background-color: #DDDDDD;
    transition: 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme['--primary-bg-color']};
        color: #DDDDDD;

        > svg {
            transition: transform 0.8s ease-in-out;
            transform: rotate(270deg);
        }
    }

    @media (min-width: 1450px) {
        font-size: 25px;
    }
`