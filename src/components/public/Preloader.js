import React from 'react';
import Logo from '../../resources/image/icon.svg'
import styled, {keyframes} from 'styled-components';

export default class Preloader extends React.Component {

    render() {
        return(
                <Image src={Logo} />
        )
    }
}

const Animation = keyframes`
  0%{
      transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;

const Image = styled.img`
    width: 50vw;
    object-fit: contain;  
    margin: calc(50vh - 50vw) 25vw auto 25vw;
    animation: ${Animation} linear 5s infinite;
`;
