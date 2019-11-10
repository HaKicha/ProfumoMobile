import React from 'react';
import PageWrapper from "../public/PageWrapper";
import {inject, observer} from "mobx-react";
import OrderPane from "./OrderPane";
import styled from 'styled-components';
import {theme} from "../../stores/StyleStore";
import {history} from "../App";
import routes from '../../stores/routes';
import ReactGA from 'react-ga';
import MetaTags from "react-meta-tags";

@inject('store')
@observer
export default class AcceptOrder extends React.Component {

    accept = () => {
        history.push(routes.CHECKOUT_ADDRESS);
    }

    componentWillMount() {
        ReactGA.pageview(location.pathname);
    }

    render() {

    return(
        <PageWrapper>
            <MetaTags>
                <title>Заказ</title>
            </MetaTags>
            <Container>
                <Title>Подтвердите ваш заказ</Title>
                {this.props.store.checkoutStore.getOrder().map(elem => <OrderPane order={elem} key={elem.product._id}/>)}
                <AmountPriceBlock>
                    <span>Всего:</span>
                    <p>{this.props.store.checkoutStore.getOrder().reduce((acc,el) => {
                        if (el.product.amount <= 0 && !el.product.avaliable) return acc;
                        if (el.product.discount_price > 0) return acc + el.product.discount_price * el.count;
                        return acc + el.product.price * el.count;
                    },0)}</p>
                </AmountPriceBlock>
                <Button onClick={this.accept}>Подтвердить</Button>
            </Container>
        </PageWrapper>
    )
    }
}

const Container = styled.div`
    padding: 0 20px;
    
`;

const AmountPriceBlock = styled.div`
    display: grid;
    grid-template-columns: max-content 1fr;
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;
    p{
        margin: 0;
        padding: 0;
        font-size: 14pt;
        font-weight: bold;
        text-align: right;
        
        &:after{
            content: " грн.";
        }
    }
    
    span {
        font-size: 14pt;
        font-weight: bold;
    }
`;

const Title = styled.h3`
    text-align: center;
    margin: 10px 0;
    padding: 0;
    border-bottom: 1px solid #ccc;
    
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