import styled from "styled-components"
import moonIcon from "../../assets/images/pokemon-moon-icon.png"
import sunIcon from "../../assets/images/pokemon-sun-icon.png"

export const Input = (props) => {
    return(
        <ThemeInput {...props} />
    )
}

export const ThemeInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  border: none;
  width: 45px;
  height: 20px;
  background: ${(props) => (props.checked ? props.theme['--bg-color-input-theme'] : props.theme['--bg-color-input-theme'])};
  border-radius: 10px;
  position: absolute;
  right: 90px;
  top: 15px;
  cursor: pointer;

  &:before {
    content: url(${sunIcon}); // Utiliza um ícone como conteúdo
    position: absolute;
    top: -5px;
    left: -5px;
    transition: transform 0.3s ease;
  }

  &:checked:before {
    content: url(${moonIcon}); // Utiliza um ícone como conteúdo
    transform: translateX(22.5px);
    top: -5px;
    left: -8px;
  }
`;