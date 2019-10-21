import React from 'react';
import styled from 'styled-components';
import Counter from '../public/Counter';
import {AnimatedIcon} from "../../stores/AnimatedObjectStore";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import Query from "react-apollo/Query";
import {UrlStore} from "../../stores/UrlStore";
import {inject} from "mobx-react";

@inject('store')
export default class CartPane extends React.Component {

    constructor(props){
        super(props);
        this.createCountSetter = this.createCountSetter.bind(this);
    }

    createCountSetter(id){
        return (count => {
            this.props.store.cart.setCount(id,count);
            this.props.store.sessionCart.setCount(id, count);
        }).bind(this);
    }


render() {
    return(
        <Query
            query={gql`query ($id: ID!){
                          product(id: $id){
                            _id
                            name_ru
                            price
                            amount
                            avaliable
                            vendor
                            discount_price
                            photos{
                              url
                            }
                          }
                        }`}
            variables={{id: this.props.productId}}
        >
            {({loading,error,data}) => {
                if (loading) return <p/>
                if (error) return  <p/>

                let price = <Price>{data.product.price}</Price>
                if (data.product.discount_price > 0)
                    price = <Price>{Math.floor(data.product.discount_price * 100) / 100}</Price>

                let addInfo = <AddInfo>
                    <span>{data.product.vendor}</span>
                    {price}
                    <CounterWrapper>
                        <Counter
                            max={data.product.amount}
                            setVal={this.createCountSetter(this.props.productId)}
                            defaultValue={this.props.store.cart.getCount(this.props.productId)}/>
                    </CounterWrapper>
                </AddInfo>

                if (!data.product.avaliable || data.product.amount <= 0) {
                    addInfo = <b>Нет в наличии</b>
                }

                return(
                    <Container>
                        <Image src={UrlStore.MAIN_URL + data.product.photos[0].url}/>
                        <Info>
                            <NameContainer>
                                <p>{data.product.name_ru}</p>
                                <AnimatedIcon icon={faTimes}
                                              size={'sm'}
                                              height={'20px'}
                                              width={'20px'}
                                              color={'#767676'}
                                              onClick={() => {this.props.store.cart.remove(this.props.productId)}}
                                              otherstyle={'margin-top: -7px;'}/>
                            </NameContainer>
                            {addInfo}
                        </Info>
                    </Container>
                )
            }}
        </Query>
    )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 100%;
    margin-bottom: 5px;
    border-bottom: 1px solid #ccc;
    
`;

const Info = styled.div`
    display: grid;   
    grid-template-rows: repeat(2, max-content);
`;

const NameContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 30px;
    p {
        font-weight: bold;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 14pt;
        margin: 0;
        padding: 0;
        white-space: nowrap;
    }
`;

const AddInfo = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 120px;
    grid-template-rows: repeat(2, max-content);
    
    span{
    grid-column: 1/3;
        display: block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 14pt;
        margin: 0;
        padding: 0;
        white-space: nowrap;
    }
`;

const CounterWrapper = styled.div`
  grid-column: 2/3;
  display: grid;
`;

const Image = styled.img`
    display: block;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;  
    margin: auto;
`;

const Price = styled.p`
    font-weight: bold;
    font-size: 14pt;
    padding: 0;
    display: block;
    &:after{
      content: " грн.";
    }
    
`;