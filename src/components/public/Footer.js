import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {theme} from "../../stores/StyleStore";
import {faAlignLeft} from '@fortawesome/free-solid-svg-icons';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {faUserAlt} from '@fortawesome/free-solid-svg-icons';

export default class Footer extends React.Component{
    render() {
        return (
                <ThemeProvider theme={theme}>
                <GlobalMain>
                        <CartButton id="star-this-item"
                                className="mdc-icon-button mdc-icon-button--on"
                                aria-label="Unstar this item"
                                aria-hidden="true"
                                aria-pressed="true">
                            <Icon icon={faShoppingCart} size="1x" className="mdc-icon-button__icon mdc-icon-button__icon--on"/>
                        </CartButton>
                    <Pane>
                        <ButIcon id="star-this-item"
                                className="mdc-icon-button mdc-icon-button--on"
                                aria-label="Unstar this item"
                                aria-hidden="true"
                                aria-pressed="true">
                            <FaIcon icon={faAlignLeft} size="1x" className="mdc-icon-button__icon"/>
                            <FaIcon icon={faAlignLeft} size="1x" className="mdc-icon-button__icon mdc-icon-button__icon--on"/>
                        </ButIcon>
                        <ButIcon id="star-this-item"
                                className="mdc-icon-button mdc-icon-button--on"
                                aria-label="Unstar this item"
                                aria-hidden="true"
                                aria-pressed="true">
                            <FaIcon icon={faSearch} size="1x" className="mdc-icon-button__icon"/>
                            <FaIcon icon={faSearch} size="1x" className="mdc-icon-button__icon mdc-icon-button__icon--on"/>
                        </ButIcon>
                        <span/>
                        <ButIcon id="star-this-item"
                                className="mdc-icon-button mdc-icon-button--on"
                                aria-label="Unstar this item"
                                aria-hidden="true"
                                aria-pressed="true">
                            <FaIcon icon={faHeart} size="1x" className="mdc-icon-button__icon"/>
                            <FaIcon icon={faHeart} size="1x" className="mdc-icon-button__icon mdc-icon-button__icon--on"/>
                        </ButIcon>
                        <ButIcon id="star-this-item"
                                className="mdc-icon-button mdc-icon-button--on"
                                aria-label="Unstar this item"
                                aria-hidden="true"
                                aria-pressed="true">
                            <FaIcon icon={faUserAlt} size="1x" className="mdc-icon-button__icon"/>
                            <FaIcon icon={faUserAlt} size="1x" className="mdc-icon-button__icon mdc-icon-button__icon--on"/>
                        </ButIcon>
                    </Pane>
                </GlobalMain>
                </ThemeProvider>
        );
    }

}
const GlobalMain = styled.div`
  display: block;
  position: fixed;
  bottom: 0;
  width: 100vw;
  z-index: 2;
`
const Pane = styled.div`
  height: 50px;
  background-color: ${props => props.theme.bgCol};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  
`
const FaIcon = styled(FontAwesomeIcon)`
  justify-self: center;
  align-self: center;
  color: #ffffff;
  &:active{
    color:#767676;
  }
`;

const CartButton = styled.button`
  height: 60px;
  width: 60px;
  background-color: ${props => props.theme.primary};
  border-radius: 50%;
  border-bottom: 3px solid white;
  border-left: 3px solid white;
  border-right: 3px solid white;
  position: fixed;
  left: calc(50vw - 30px);
  bottom: 20px;
`
const Icon = styled(FontAwesomeIcon)`
  color: #ffffff;
  padding-right: 4px;
  &:active{
    color:#767676;!important;
  }
`;
const ButIcon = styled.button`
  justify-self: center;
  align-self: center;
`

