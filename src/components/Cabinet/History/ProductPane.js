import React from 'react';
import styled from 'styled-components';
import {UrlStore} from "../../../stores/UrlStore";
import Query from "react-apollo/Query";
import gql from "graphql-tag";

export default class ProductPane extends React.Component {

    render() {
        return (
            <Query query={gql`query ($id: ID!){
                            product(id: $id){
                                name_ru
                                _id
                                photos{
                                  url
                                }
                              }
                            }`}
            variables={{id: this.props.order.product._id || this.props.order.product.id}}>
                {({loading,error,data}) => {
                    if (loading) return <p/>
                    if (error) return <p/>
                    return (
                        <Container>
                            <Photo src={UrlStore.MAIN_URL + data.product.photos[0].url}/>
                            <Name>{data.product.name_ru}</Name>
                            <Count>{this.props.order.count} шт.</Count>
                            <Price>{this.props.order.count *
                            this.props.order.product.discount_price && this.props.order.product.discount_price > 0 ?
                                this.props.order.product.discount_price : this.props.order.product.price} грн.</Price>
                        </Container>
                    )
                }}
            </Query>
        )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 70px 1fr repeat(2, max-content);  
`;


const Photo = styled.img`
    max-height: 60px;
    margin: 3px;
    padding: 2px;
    box-shadow: 0 0 2px 2px #bababa;
    display: block;
    border-radius: 3px;
`;

const Name = styled.p`
    justify-self: center;
    font-size: 10pt;
    align-self: center;
    margin: 0;
`;

const Count = styled.p`
    grid-column: 4/5;
    align-self: center;
    vertical-align: center; 
    margin-right: 10px;   
`;

const Price = styled.p`
    grid-column: 5/6;
    align-self: center;
    justify-self: right;
    text-align: right;
`;