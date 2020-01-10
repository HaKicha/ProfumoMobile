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
                        <IconContainer style={{padding: '13px', height: '34px', width: '34px'}}>
                            <img src={'data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' height=\'34\' width=\'34\'%3E%3Cpath d=\'m 26.280127,27.2 c -1.806738,0 -3.268585,1.530025 -3.268585,3.4 0,1.869975 1.461847,3.4 3.268585,3.4 1.806833,0 3.285022,-1.530025 3.285022,-3.4 0,-1.869975 -1.478189,-3.4 -3.285022,-3.4 z m -16.4251092,0 c -1.806719,0 -3.2685466,1.530025 -3.2685466,3.4 0,1.869975 1.4618276,3.4 3.2685466,3.4 1.8068342,0 3.2850222,-1.530025 3.2850222,-3.4 0,-1.869975 -1.478188,-3.4 -3.2850222,-3.4 z m 0,-5.09995 1.8068342,-3.4 h 12.236717 c 1.231824,0 2.315906,-0.697013 2.874383,-1.751087 L 34,3.4 H 6.9149734 L 5.3710083,0 H 0 V 3.4 H 3.2850219 L 9.1980134,16.302988 4.3033739,25.50005 H 29.565149 v -3.4 z\' fill=\'%23fff\'/%3E%3C/svg%3E'} alt=""/>
                        </IconContainer>
                    </CartButton>
                    <Pane>
                        <ButtonContainer to={routes.CATEGORY_NAVIGATION}>
                            <IconContainer>
                                <img src={'data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' height=\'23\' width=\'30\'%3E%3Cpath d=\'M 0,0 H 30 V 3.2857143 H 0 Z M 0,9.8571429 H 30 V 13.142857 H 0 Z M 0,19.714286 H 30 V 23 H 0 Z\' fill=\'%23fff\'/%3E%3C/svg%3E'} alt=""/>
                            </IconContainer>
                        </ButtonContainer>
                        <ButtonContainer to={routes.GLOBAL_SEARCH}>
                            <IconContainer>
                                <img src={'data:image/svg+xml;charset=utf-8,%3Csvg width=\'30\' height=\'30\' viewBox=\'0 0 30 30\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M 13.636038,27.196776 A 13.636634,13.598388 0 1 1 24.32609,22.041831 c -0.01783,0.02133 5.673909,5.860639 5.673909,5.860639 l -2.174731,2.097529 c 0,0 -5.604389,-5.835753 -5.622215,-5.821532 a 13.579592,13.541506 0 0 1 -8.567015,3.018309 z m 0,-3.555135 a 10.071501,10.043254 0 1 0 0,-20.0865075 10.071501,10.043254 0 0 0 0,20.0865075 z\' fill=\'%23fff\'/%3E%3C/svg%3E'} alt=""/>
                            </IconContainer>
                        </ButtonContainer>
                        <span/>
                        <ButtonContainer to={routes.WHISHLIST}>
                            <IconContainer>
                                <img src={`data:image/svg+xml;charset=utf-8,%3Csvg viewBox=\'0 0 30 27\' xmlns=\'http://www.w3.org/2000/svg\' height=\'30\' width=\'27\'%3E%3Cpath d=\'m 15.926996,23.211001 a 31.990484,31.990492 0 0 0 4.705498,-3.113999 c 4.045498,-3.249 6.373497,-6.928499 6.367497,-10.9484977 -0.0045,-3.4259991 -2.635499,-6.1514984 -5.821497,-6.1484984 -1.524,0 -2.954999,0.6254998 -4.034998,1.7369995 L 14.998497,6.9375049 12.850498,4.7430054 A 5.6219972,5.6219986 0 0 0 8.8079995,3.0165059 c -3.1844984,0.003 -5.8109971,2.7389993 -5.8079971,6.1634984 0.0045,4.0154987 2.3384988,7.6844977 6.3839968,10.9214977 a 31.979984,31.979992 0 0 0 5.6339978,3.584999 c 0.2865,-0.144 0.590999,-0.303 0.908999,-0.477 z M 14.993997,2.6445059 15.298497,2.344506 A 8.5889957,8.5889979 0 0 1 21.173994,6.5873998e-6 C 26.042991,-0.00599341 29.993989,4.0875056 29.999989,9.1455043 30.014989,20.767502 15.020997,27 15.020997,27 15.020997,27 0.01500385,20.805002 3.8503605e-6,9.1860043 -0.00449614,4.1280056 3.9360019,0.02100659 8.8049995,0.01500659 A 8.5994957,8.5994979 0 0 1 14.684997,2.346006 l 0.3075,0.2984999 z\' fill=\'${this.props.store.whishlist.getAll.length > 0 ? '%23e25c4b':'%23FFF'}\'/%3E%3C/svg%3E`} alt=""/>
                            </IconContainer>
                        </ButtonContainer>
                        <ButtonContainer to={this.props.store.userStore.isLogged?routes.CABINET:routes.SIGN_IN}>
                            <IconContainer>
                                <img src={'data:image/svg+xml;charset=utf-8,%3Csvg viewBox=\'0 0 30 30\' xmlns=\'http://www.w3.org/2000/svg\' height=\'30\' width=\'30\'%3E%3Cpath d=\'M 21,9 A 6,6 0 1 0 9,9 6,6 0 0 0 21,9 Z m 3,0 A 9,9 0 1 1 6,9 9,9 0 0 1 24,9 Z m -9,13.5 c -4.602,0 -8.505,1.8345 -10.5525,4.5 h 21.105 C 23.505,24.3345 19.602,22.5 15,22.5 Z M 30,30 H 0 c 0.8295,-6.009 7.2285,-10.5 15,-10.5 7.7715,0 14.1705,4.491 15,10.5 z\' fill=\'%23fff\'/%3E%3C/svg%3E'} alt=""/>
                            </IconContainer>
                        </ButtonContainer>
                    </Pane>
                </GlobalMain>
                </ThemeProvider>
        );
    }

}


const IconParams = {
    height: '30px',
    width: '30px',
    padding: '9px',
    bgcolor: theme.primary_light
}

const IconContainer = styled.div`
    height: ${props => props.height||'30px'};
    width: ${props => props.width||'30px'};
    padding: ${props => props.padding||'7px'};
    border-radius: 50%;
    background-position: center;
    transition: all ${props => props.duration || '.5s'};
    align-self: center;
    justify-self: center;
    display: grid;
    justify-content: center;
    align-items: center;
    &:active {
        color: ${props => props.clickedColor || 'white'};
        background-color:  ${props => props.bgcolor||'rgba(10,10,10,0.5)'};
        background-size: 150%;
        transition: background 0s;
    }
    ${props => props.otherstyle}
`;

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