import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import StarRatings from 'react-star-ratings';
import {theme} from "../../stores/StyleStore";
import Query from "react-apollo/Query";
import gql from 'graphql-tag';
import {UrlStore} from '../../stores/UrlStore'
import {AnimatedIcon} from "../../stores/AnimatedObjectStore";
import {Link} from "react-router-dom";
import {inject} from "mobx-react";

@inject('store')
export default class ProductPane extends React.Component {
    render(){
        if (this.props.productId)
        return(
            <ThemeProvider theme={theme}>
                <Query query={
                    gql`query ($id: ID!){
                          product(id: $id){
                            _id
                            name_ru
                            photos{
                              url
                            }
                            price
                            avaliable
                            amount
                            discount_price
                            comments_len
                            comments{
                              rate
                            }
                          }
                        }`
                }
                       variables={{id: this.props.productId}}>
                    {({loading, error, data}) => {
                        if (loading) return <td></td>;
                        if (error) {
                            return <td>Error :(</td>;
                        }

                        let price = <Price>{data.product.price}</Price>;
                        if (data.product.discount_price > 0)
                            price = <React.Fragment>
                                <OldPrice>{Math.floor(data.product.price * 100) / 100 }</OldPrice>
                                <Price>{Math.floor(data.product.discount_price * 100) / 100 }</Price>
                            </React.Fragment>
                        let rating = 0;
                        if (data.product.comments.length > 0)
                            rating = data.product.comments.reduce((acc,el) => {return acc + el.rate},0) / data.product.comments.length;
                        return(
                            <td>
                                <Container>
                                    <Link to={'/product/' + this.props.productId}>
                                        <Image src={UrlStore.MAIN_URL + data.product.photos[0].url} loading={'lazy'}/>
                                    </Link>
                                    <Name to={'/product/' + this.props.productId}>{data.product.name_ru}</Name>
                                    {price}
                                    <ControlButton
                                        icon={faEllipsisV}
                                        color={'#6f6f6f'}
                                        duration={'0.5s'}
                                        size={'sm'}
                                        tabIndex={'0'}
                                    />
                                    <Submenu
                                        className={'submenu'}
                                    >
                                        <li onClick={() => this.props.store.whishlist.add(this.props.productId)}>В избранное</li>
                                        <li onClick={() => this.props.store.cart.add(this.props.productId)}>В корзину</li>
                                    </Submenu>
                                    <Rating>
                                        {rating > 0? <StarRatings
                                            rating={rating}
                                            numberOfStars={5}
                                            starRatedColor={theme.primary_light}
                                            starEmptyColor={'gray'}
                                            starDimension={'12px'}
                                            starSpacing={"0"}
                                        />:<span/>}
                                        {rating > 0?<span>Отзывов: {data.product.comments_len}</span>:<span/>}
                                    </Rating>
                                </Container>
                            </td>
                        );
                    }}
                </Query>
            </ThemeProvider>
        )
        else return null;
    }
}

const Container = styled.div`
    width: calc(50vw - 12px);
    display: block;
    border-left: none;
    border-top: none;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding-right: 5px;
    padding-bottom: 5px;
    position: relative;
    text-decoration: none;
`;

const Image = styled.img`
    max-height: 150px;
    object-fit: contain;  
    margin: auto;
    display: block;  
`;

const Name = styled(Link)`
    white-space: pre-line;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 30px;
    line-height: 15px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    color: black;
    text-decoration: none;
`;

const Price = styled.span`
    display: block;
    padding: 3px;
    background: ${props => props.theme.primary_light};
    font-size: 14pt;
    color: #fff;
    width: max-content;
    border-radius: 5px;
    margin-top: 3px;
    text-decoration: none;
    &:after {
        content: " грн.";
    }
`;

const OldPrice = styled.span`
    display: block;
    padding: 3px;
    font-size: 12pt;
    color: #5d5d5d;
    text-decoration: line-through;
    width: max-content;
    margin-top: 3px;
    text-decoration: none;
    &:after {
        content: " грн.";
    }    
`;

const Rating = styled.div`
    display: grid;
    grid-template-columns: 60px 1fr;    
    font-size: 9pt;
    grid-gap: 5px;
    align-items: end;
`;

const ControlButton = styled(AnimatedIcon)`
    display: block;
    position: absolute;
    right: 0;
    bottom: -3px;
    outline: none;
    div {
        display: none;
        opacity: 0;
    }
    &:focus ~ .submenu{
        display: block;
        opacity: 1;
    }
`;

const Submenu = styled.ul`
    display: none;
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    height: 90px;
    background: #fff;
    z-index: 1;    
    transition: opacity 0.5s;
    list-style: none;
    margin: 0;
    padding: 0;
    box-shadow: 1px 1px 2px 2px #ccc;
    text-decoration: none;
    li {
        height: 45px;
        font-size: 12pt;
        vertical-align: middle;
        cursor: pointer;
        transition: all 1.2s;
        background-position: center;
        line-height: 45px;
        padding-left: 5px;
    }
    li:active {
        color: ${props => props.clickedColor || 'white'};
        background-color:  ${props => props.bgcolor||'rgba(10,10,10,0.5)'};
        background-size: 100%;
        transition: background 0s;
    }
    
    
    
`;