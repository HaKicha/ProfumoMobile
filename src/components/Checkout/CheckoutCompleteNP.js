import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {inject} from "mobx-react";
import {sendOrder} from "../../api/Order";
import Order from "../../entities/Order";
import Preloader from "../public/Preloader";
import PageWrapper from "../public/PageWrapper";
import {theme} from "../../stores/StyleStore";
import ReactGA from 'react-ga';
import MetaTags from "react-meta-tags";

@inject('store')
export default class CheckoutCompleteNP extends React.Component {

    constructor(props){
        super(props);
        props.store.cart.clear();
        this.state = {
            isLoading: true,
            response: []
        }
    }

    componentWillMount(){
        ReactGA.pageview(location.pathname);
        let order = new Order(
            this.props.store.checkoutStore.comment,
            this.props.store.checkoutStore.getOrder(),
            this.props.store.checkoutStore.getAddress(),
            this.props.store.checkoutStore.payment
        );
        sendOrder(order)
            .then(data => {
                    this.setState({
                        response: data,
                        isLoading: false
                    });
                })
    }

render() {
        if (this.state.isLoading) return <Preloader/>
    return(
        <PageWrapper>

            <MetaTags>
                <title>Заказ успешен</title>
            </MetaTags>
        <Container>
            <h3>Заказ отправлен в обработку</h3>
            <h4>Наш сотрудник свяжется с вами</h4>
            <table>
                <tbody>
                <tr>
                    <td>Стоимость доставки: </td>
                    <td>{this.state.response[0].CostOnSite} грн</td>
                </tr>
                <tr>
                    <td>ТТН: </td>
                    <td>{this.state.response[0].IntDocNumber}</td>
                </tr>
                <tr>
                    <td>Предполагаемая дата доставки: </td>
                    <td>{this.state.response[0].EstimatedDeliveryDate}</td>
                </tr>
                </tbody>
            </table>
            <StyledLink to={'/'} >Вернуться к покупкам</StyledLink>
        </Container>
        </PageWrapper>
    )
    }
}

const Container = styled.div`
    width: calc(100% - 40px);
    display: grid;
    padding: 20px;
    overflow-x: hidden;
    h3,h4 {
        text-align: center;
        margin: 5px 0;
    }
    table {
        width: 100%;
        font-size: 14pt;
    }
    
`;

const StyledLink = styled(Link)`
    display: block;
    background: white;
    margin: 20px auto;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    height: 35px;
    font-size: 14pt;
    color: ${theme.primary};
    font-weight: bold;
    cursor: pointer;
    width: 90%;
    text-align: center;
    vertical-align: center; 
    line-height: 35px;
    border: 1px solid ${theme.primary};
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
    &:hover{
         background: ${theme.primary_light};   
         color: white;
    } 
    
`;