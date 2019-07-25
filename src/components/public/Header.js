import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import '@material/icon-button/dist/mdc.icon-button.min.css'
import LogoImg from '../../resources/image/Logo.svg'
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class Header extends React.Component{
    render(){
        return(
            <ThemeProvider theme={theme}>
                <GlobalMain>
                    <Back>
                        <Empty></Empty>
                        <Logo src={LogoImg}/>
                        <Button id="star-this-item"
                            className="mdc-icon-button mdc-icon-button--on"
                            aria-label="Unstar this item"
                            aria-hidden="true"
                            aria-pressed="true">
                        <FaIcon icon={faBars} size="sm" className="mdc-icon-button__icon"/>
                        <FaIcon icon={faBars} size="sm" className="mdc-icon-button__icon mdc-icon-button__icon--on"/>
                        </Button>
                    </Back>
                </GlobalMain>
            </ThemeProvider>
        )
    }
}
const Empty = styled.div`
  
`
const GlobalMain = styled.div`
  display: block;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 2;
`
const Back = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr ;
  width: 100%;
  height: 50px;
  background-color: ${props => props.theme.bgCol};

`
const Logo = styled.img`
  height: 30px;  
  width: 120px;
  justify-self: center;
  align-self: center;
`
const Button = styled.button`
  justify-self: right;
`
const FaIcon = styled(FontAwesomeIcon)`
  color: white;
`;


