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
  background: ${(props) => props.theme['--bg-color-input-theme']};
  border-radius: 10px;
  position: absolute;
  right: 90px;
  top: 22.5px;
  cursor: pointer;

  @media (max-width: 920px) {
    right: 25px;
}

  @media (max-width: 650px) {
    right: 25px;
}

  &:before {
    content: url(${sunIcon});
    position: absolute;
    top: -5px;
    left: -5px;
    transition: transform 0.3s ease;
  }

  &:checked:before {
    content: url(${moonIcon});
    transform: translateX(22.5px);
    top: -5px;
    left: 0;
  }
`;