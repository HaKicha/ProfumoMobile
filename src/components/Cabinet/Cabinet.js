import React from 'react';
import styled from 'styled-components';
import male from '../../resources/image/genderIcons/male.svg';
import female from '../../resources/image/genderIcons/female.svg';
import PageWrapper from "../public/PageWrapper";
import contacts from '../../resources/image/cabinet/contacts.svg'
import whishlist from '../../resources/image/cabinet/wishlist.svg'
import history from '../../resources/image/cabinet/history.svg'
import profile from '../../resources/image/cabinet/profile.svg'
import {Link} from "react-router-dom";
import routes from '../../stores/routes';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {inject, observer} from "mobx-react";
import {Logout} from "../../api/Auth";
import ReactGA from 'react-ga';
import MetaTags from "react-meta-tags";

@inject('store')
@observer
export default class Cabinet extends React.Component {

    componentWillMount() {
        ReactGA.pageview(location.pathname);
    }


    render() {
        setTimeout(() => {
            if (!this.props.store.userStore.isLogged) history.push(routes.SIGN_IN);
        }, 2500);
    return(
        <PageWrapper>
            <Container>
            <MetaTags>
                <title>{this.props.store.userStore.User.name} {this.props.store.userStore.User.surname}</title>
            </MetaTags>
                <UserBlock>
                    <Avatar src={this.props.store.userStore.User.gender === 'female'?female:male}/>
                    <b>{this.props.store.userStore.User.name} {this.props.store.userStore.User.surname}</b>
                </UserBlock>
                <NavButton to={routes.USER_CONTACTS}>
                    <img src={contacts}/>
                    <span>Адрес доставки</span>
                </NavButton>
                <NavButton  to={routes.WHISHLIST}>
                    <img src={whishlist}/>
                    <span>Пожелания</span>
                </NavButton>
                <NavButton to={routes.PURCHASE_HISTORY}>
                    <img src={history}/>
                    <span>История покупок</span>
                </NavButton>
                <NavButton to={routes.PROFILE}>
                    <img src={profile}/>
                    <span>Редактировать профиль</span>
                </NavButton>
            </Container>
            <LogoutButton icon={faSignOutAlt} size={'2x'} onClick={Logout}/>
        </PageWrapper>
    )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 200px 80px 80px;
    grid-template-columns: 1fr 1fr;
    padding: 20px 50px;
    overflow: hidden;
    grid-gap: 20px;
`;

const UserBlock = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;  
    grid-column: 1/3;
`;

const Avatar = styled.img`
    display: block;
    height: 120px;
    width: 120px;
    object-fit: contain;
    padding: 15px;
    background: #eee;
    border-radius: 50%;
    justify-self: center;
`;

const NavButton = styled(Link)`
    display: grid;
    justify-items: center;
    text-decoration: none;
    grid-template-rows: 55px 20px;
    img {
        height: 45px;
        width: 45px;
        object-fit: contain;
        margin-top: 5px;
    }
    
    span {
        text-decoration: none;
        color: black;
        font-size: 10pt;
        text-align: center;
    }
    
`;

const LogoutButton = styled(FontAwesomeIcon)`
    position: absolute;
    top: 20px;
    right: 20px;
    color: #444444;
    cursor: pointer;
`;