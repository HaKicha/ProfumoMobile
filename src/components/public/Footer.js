import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {theme} from "../../stores/StyleStore";
import {faAlignLeft} from '@fortawesome/free-solid-svg-icons';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {AnimatedIcon} from "../../stores/AnimatedObjectStore";
import {Link} from "react-router-dom";
import routes from '../../stores/routes'
import {inject, observer} from "mobx-react";

@inject('store')
@observer
export default class Footer extends React.Component{
    render() {
        return (
                <ThemeProvider theme={theme}>
                <GlobalMain>
                    <CartButton to={routes.CART}>
                        <AnimatedIcon
                            height={'34px'}
                            width={'34px'}
                            padding={'13px'}
                            icon={faShoppingCart}
                        />
                    </CartButton>
                    <Pane>
                        <ButtonContainer to={routes.CATEGORY_NAVIGATION}>
                            <AnimatedIcon
                                height={'26px'}
                                width={'26px'}
                                padding={'9px'}
                                icon={faAlignLeft}
                                bgcolor={theme.primary_light}
                            />
                        </ButtonContainer>
                        <ButtonContainer to={routes.GLOBAL_SEARCH}>
                            <AnimatedIcon
                                height={'26px'}
                                width={'26px'}
                                padding={'9px'}
                                bgcolor={theme.primary_light}
                                icon={faSearch}/>
                        </ButtonContainer>
                        <span/>
                        <ButtonContainer to={routes.WHISHLIST}>
                            <AnimatedIcon
                                height={'26px'}
                                width={'26px'}
                                padding={'9px'}
                                bgcolor={theme.primary_light}
                                icon={faHeart}/>
                        </ButtonContainer>
                        <ButtonContainer to={this.props.store.userStore.isLogged?routes.CABINET:routes.SIGN_IN}>
                            <AnimatedIcon
                                height={'26px'}
                                width={'26px'}
                                padding={'9px'}
                                bgcolor={theme.primary_light}
                                icon={faUserCircle}/>
                        </ButtonContainer>
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
  z-index: 11;
`
const Pane = styled.div`
  height: 50px;
  background-color: ${props => props.theme.bgCol};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  
`

const CartButton = styled(Link)`
  height: 60px;
  width: 60px;
  background-color: ${props => props.theme.primary};
  border-radius: 50%;
  border: 3px solid white;
  position: fixed;
  left: calc(50vw - 30px);
  bottom: 20px;
`

const ButtonContainer = styled(Link)`
  display: block;
  width: max-content;
  justify-self: center;
`