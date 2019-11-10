import React from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import routes from '../../stores/routes';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAward,
    faBorderAll,
    faLock,
    faMoneyCheck,
    faPhoneAlt,
    faShoppingCart,
    faTruck
} from "@fortawesome/free-solid-svg-icons";
import {faFileAlt, faHandshake, faHeart, faQuestionCircle, faUserCircle} from "@fortawesome/free-regular-svg-icons";

@inject('store')
@observer
export default class Navigation extends React.Component{

    render() {
        return(
            <React.Fragment>
                <Pane
                    to={this.props.store.userStore.isLogged?routes.CABINET:routes.SIGN_IN}
                    onClick={this.props.closePane}
                >
                    <FontAwesomeIcon icon={faUserCircle}/>
                    <span>{this.props.store.userStore.isLogged?
                        this.props.store.userStore.User.name + ' ' + this.props.store.userStore.User.surname
                        :"Войти в личный кабинет"}</span>
                </Pane>
                <Pane to={routes.CATEGORY_NAVIGATION}
                      onClick={this.props.closePane}>
                    <FontAwesomeIcon icon={faBorderAll}/>
                    <span>Каталог</span>
                </Pane>
                <Pane to={routes.WHISHLIST}
                      onClick={this.props.closePane}>
                    <FontAwesomeIcon icon={faHeart}/>
                    <span>Избранное</span>
                </Pane>
                <Pane to={routes.CART}
                      onClick={this.props.closePane}>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                    <span>Корзина</span>
                </Pane>
                <Pane to={routes.BLOG_CATALOG}
                      onClick={this.props.closePane}>
                    <FontAwesomeIcon icon={faFileAlt}/>
                    <span>Наш блог</span>
                </Pane>
                <Pane to={routes.CONTACTS}
                      onClick={this.props.closePane}>
                    <FontAwesomeIcon icon={faPhoneAlt}/>
                    <span>Наши контакты</span>
                </Pane>
                <Pane to={routes.DELIVERY}
                      onClick={this.props.closePane}>
                    <FontAwesomeIcon icon={faTruck}/>
                    <span>Доставка</span>
                </Pane>
                <Pane to={routes.LICENSE}
                      onClick={this.props.closePane}>
                    <FontAwesomeIcon icon={faHandshake}/>
                    <span>Лицензионное соглашение</span>
                </Pane>
                <Pane to={routes.PAYMENT}
                      onClick={this.props.closePane}>
                    <FontAwesomeIcon icon={faMoneyCheck}/>
                    <span>Оплата</span>
                </Pane>
                <Pane to={routes.USER_AGREEMENT}
                      onClick={this.props.closePane}>
                    <FontAwesomeIcon icon={faLock}/>
                    <span>Приватность</span>
                </Pane>
                <Pane to={routes.WARRANTY}
                      onClick={this.props.closePane}>
                    <FontAwesomeIcon icon={faAward}/>
                    <span>Гарантия</span>
                </Pane>
                <Pane to={routes.ABOUT_US}
                      onClick={this.props.closePane}>
                    <FontAwesomeIcon icon={faQuestionCircle}/>
                    <span>О нас</span>
                </Pane>
            </React.Fragment>
        )
    }

}


const Pane = styled(Link)`
    display: grid;
    grid-template-columns: 30px 1fr;
    min-height: 40px;
    line-height: 40px;
    vertical-align: middle;
    font-size: 14pt;
    color: #fff;
    width: calc(100% - 10px);
    padding-left: 10px;
    display: grid;
    cursor: pointer;
    background-position: center;
    align-items: center;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
    transition: background-color 1.2s;
    text-decoration: none;
    &:active {
        background-color:  ${props => props.bgcolor||'rgba(214,214,214,0.50)'};
        background-size: 150%;
        transition: background 0s;
    }
    
    svg {
        color: white;
    }
    
`;