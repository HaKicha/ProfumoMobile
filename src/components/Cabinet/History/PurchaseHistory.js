import React from 'react';
import styled from 'styled-components';
import PageWrapper from "../../public/PageWrapper";
import {inject, observer} from "mobx-react";
import Order from "./Order";
import {theme} from "../../../stores/StyleStore";
import {Redirect} from "react-router";
import routes from "../../../stores/routes";
import ReactGA from 'react-ga';
import history from "../../../resources/image/cabinet/history.svg";
import MetaTags from "react-meta-tags";

@inject('store')
@observer
export default class PurchaseHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentFilter: 1
        }

        this.setFilters = this.setFilters.bind(this);
    }

    componentWillMount() {
        ReactGA.pageview(location.pathname);
    }

    setFilters = e => {
        this.setState({currentFilter: e.target.value - 0})
    }


    render() {
        setTimeout(() => {
            if (!this.props.store.userStore.isLogged) history.push(routes.SIGN_IN);
        }, 2500);
        return(
        <PageWrapper>
            <MetaTags>
                <title>История покупок</title>
            </MetaTags>
            <Container>
                <Menu>
                    <Li value={'1'} onClick={this.setFilters} active={this.state.currentFilter === 1}>Все</Li>
                    <Li value={'2'} onClick={this.setFilters} active={this.state.currentFilter === 2}>За месяц</Li>
                    <Li value={'3'} onClick={this.setFilters} active={this.state.currentFilter === 3}>За год</Li>
                </Menu>
                {this.props.store.userStore.User.orders.filter(order => {
                    if (this.state.currentFilter === 1) return true;
                    else if (this.state.currentFilter === 2) return new Date(order.createdAt).getMonth() === new Date().getMonth() && new Date(order.createdAt).getFullYear() === new Date().getFullYear()
                    else return new Date(order.createdAt).getFullYear() === new Date().getFullYear()
                }).reverse().map(order => <Order order={order} key={order._id}/>)}
            </Container>
        </PageWrapper>
    )
    }
}

const Container = styled.div`
    display: grid;
    padding: 20px;
    
`;

const Menu = styled.ul`
    list-style: none;
    margin: 0 0 10px 0;
    padding: 0;
`;

const Li = styled.li`
    display: block;
    cursor: pointer;
    color: ${props => props.active ? theme.primary : 'black'};
    text-decoration: ${props => props.active ? 'underline' : 'none'};
    margin-top: 5px;
`;