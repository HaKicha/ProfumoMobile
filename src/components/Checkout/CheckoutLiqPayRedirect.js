import React from 'react';
import PageWrapper from "../public/PageWrapper";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {theme} from "../../stores/StyleStore";
import {inject} from "mobx-react";
import routes from '../../stores/routes';
import Order from "../../entities/Order";
import {sendOrder} from "../../api/Order";
import Preloader from "../public/Preloader";
import ReactGA from 'react-ga';
import MetaTags from "react-meta-tags";

@inject('store')
export default class CheckoutLiqPayRedirect extends React.Component {

    constructor(props){
        super(props);
        props.store.cart.clear();
        this.state = {
            isLoading: true,
            response: []
        }
    }

    componentWillMount() {
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
                <title>Перейти к оплате</title>
            </MetaTags>
            <Container>
                <form method={'post'} action={'https://www.liqpay.ua/api/3/checkout'}>
                    <h3>Ваш заказ создан. Для перехода к оплате нажмите кнопку ниже</h3>
                    <input type="text" name={'data'} value={this.state.response.data} style={{display: 'none'}}/>
                    <input type="text" name={'signature'} value={this.state.response.signature} style={{display: 'none'}}/>
                    <Button onClick={this.props.store.cart.clear}>Перейти к оплате</Button>
                    <StyledLink to={routes.MAIN}>Отменить</StyledLink>
                </form>
            </Container>
        </PageWrapper>
    )
    }
}

const Container = styled.div`
    display: grid;
    justify-items: center;
    h3 {
      text-align: center;
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


const Button = styled.button`
    display: block;
    background: ${theme.primary};
    margin: 20px auto;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    height: 35px;
    border: none;
    font-size: 14pt;
    color: white;
    font-weight: bold;
    cursor: pointer;
    width: 90%;
    text-align: center;
    vertical-align: center; 
    line-height: 35px;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
    &:hover{
         background: ${theme.primary_light};   
    }  
`;