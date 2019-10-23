import React from 'react';
import PageWrapper from "../public/PageWrapper";
import {inject, observer} from "mobx-react";
import styled from 'styled-components';
import CartPane from "./CartPane";
import {getProductsById} from "../../api/Products";
import Preloader from "../public/Preloader";
import {theme} from "../../stores/StyleStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

@inject('store')
@observer
export default class Cart extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            key: '',
            isLoading: true
        }
    }

    componentWillMount() {
        this.updateCart();
    }

    updateCart(){
        let ids = this.props.store.cart.getAll.map(el => el._id);
        if (this.state.key !== ids.sort().join()) {
            this.setState({isLoading: true, key: ids.sort().join()});
            getProductsById(ids).then(data => {
                this.props.store.sessionCart.update(data.map(el => {
                    el.count = this.props.store.cart.getCount(el._id)
                    return el;
                }));
                this.setState({isLoading: false})
            })
        }
        else if (this.state.isLoading) this.setState({isLoading: false})
    }


    render() {
        if (!this.state.isLoading) this.updateCart();
        if (this.props.store.cart.getAll.length > 0)
        return(
            <PageWrapper>
                {this.state.isLoading?<Preloader/>:<Container>
                    {this.props.store.sessionCart.getAll.map(elem => <CartPane productId={elem._id} key={elem._id}/>)}
                </Container>}
                <BottomPane>
                    <Total>{this.props.store.sessionCart.summary} грн.</Total>
                    <CheckoutButton>
                        <span>Оплата</span>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </CheckoutButton>
                </BottomPane>
            </PageWrapper>
        )
        else return (
            <PageWrapper>
                <Title>Пусто :(</Title>
            </PageWrapper>
        )
        }
    }

const Container = styled.div`
    display: block;
    padding: 20px 20px 100px 20px;
    
`;

const Title = styled.h1`
    margin: 100px auto;
    display: block;
    font-size: 30pt;
    text-align: center;
    color: #b4b4b4;
`;


const BottomPane = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: calc(100% - 40px);
    height: 80px;
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;  
    background: transparent;
    padding: 0 20px;
`;

const Total = styled.p`

    width: max-content;
    height: 25px;
    margin: 0;
    color: white;
    padding: 5px;
    background: ${theme.primary};
    border-radius: 4px;
    font-size: 14pt;
    font-weight: bold;
    
    &:before {
      content: "Всего: ";
    }
`;

const CheckoutButton = styled.div`
    text-transform: uppercase;
    width: max-content;
    display: grid;
    grid-template-columns: 1fr 25px; 
    justify-self: right;
    grid-gap: 10px;
    height: 25px;
    margin: 0;
    color: white;
    padding: 5px;
    background: ${theme.primary};
    border-radius: 4px;
    font-size: 14pt;
    font-weight: bold; 
    align-items: center;
    cursor: pointer;
`;