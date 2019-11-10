import React from 'react';
import styled from 'styled-components';
import {UrlStore} from "../../stores/UrlStore";
import {inject} from "mobx-react";
import gql from "graphql-tag";
import Query from "react-apollo/Query";

@inject('store')
export default class CartPane extends React.Component {

    constructor(props){
        super(props);
    }


    render() {

        let price = <Price>{this.props.order.product.price} грн. * {this.props.order.count}</Price>
        if (this.props.order.product.discount_price > 0)
            price = <Price>{Math.floor(this.props.order.product.discount_price * 100) / 100}  * {this.props.order.count}</Price>


        return(
            <Container>
                <Query
                    query={gql`query ($id: ID!){
                                  product(id: $id){
                                    _id
                                    photos{
                                      url
                                    }
                                  }
                                } `}
                    variables={{id: this.props.order.product._id}}
                >
                    {({loading,error,data}) => {
                        if (loading) return <p/>
                        if (error) return <p/>
                        return (<Image src={UrlStore.MAIN_URL + data.product.photos[0].url}/>)
                    }}
                </Query>
                <Info>
                    <NameContainer>{this.props.order.product.name_ru}</NameContainer>
                    <AddInfo>
                        <span>{this.props.order.product.vendor}</span>
                        {price}
                    </AddInfo>
                </Info>
            </Container>
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

const NameContainer = styled.p`
    font-weight: bold;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 14pt;
    margin: 0;
    padding: 0;
    white-space: nowrap;
`;

const AddInfo = styled.div`
    display: grid;
    width: 100%;
    grid-template-rows: repeat(2, max-content);
    
    span{
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


const Image = styled.img`
    display: block;
    max-width: 90%;
    max-height: 90%;
    padding: 5%;
    object-fit: contain;  
    margin: auto;
`;

const Price = styled.p`
    font-weight: bold;
    font-size: 14pt;
    padding: 0;
    display: block;
    
`;