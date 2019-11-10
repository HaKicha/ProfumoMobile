import React from 'react';
import styled, {keyframes, ThemeProvider} from 'styled-components';
import {faCartPlus, faHeart} from "@fortawesome/free-solid-svg-icons";
import StarRatings from 'react-star-ratings';
import {theme} from "../../stores/StyleStore";
import Query from "react-apollo/Query";
import gql from 'graphql-tag';
import {UrlStore} from '../../stores/UrlStore'
import {AnimatedIcon} from "../../stores/AnimatedObjectStore";
import {inject} from "mobx-react";
import {history} from "../App";

@inject('store')
export default class ProductPane extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            focused: false
        }
        this.focusHandler = this.focusHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
        this.block = React.createRef();
    }


    focusHandler(e){
        setTimeout(() => {
            this.setState({focused: true})
        }, 400)
    }

    blurHandler(e){
        this.setState({focused: false})
    }

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
                        let height = 0;
                        if (rating > 0) height += 20;
                        if (data.product.discount_price > 0) height += 30;
                        const BlockHover = keyframes`
                              0% { 
                                box-shadow: 0 0 0 0 ${theme.primary};
                                height: calc(230px + ${height}px);
                              }
                              100%  { 
                                box-shadow: 0 0 5px 0 ${theme.primary};
                                height: calc(270px + ${height}px);
                              }
                            `;

                        return(
                                <Container 
                                    onFocus={this.focusHandler}
                                    onBlur={this.blurHandler}
                                    tabIndex={0}
                                    ref={this.block}
                                    animation={BlockHover}
                                >
                                        <Image src={UrlStore.MAIN_URL + data.product.photos[0].url} loading={'lazy'} onClick={() => {
                                            if (this.state.focused) history.push('/product/' + this.props.productId);
                                            else this.block.current.focus()
                                        }}/>
                                    <Name  onClick={() => {
                                        if (this.state.focused) history.push('/product/' + this.props.productId);
                                        else this.block.current.focus()
                                    }}>{data.product.name_ru}</Name>
                                    {price}
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
                                    {this.state.focused && <IconsBlock>
                                        <AnimatedIcon icon={faCartPlus} color={theme.primary} onClick={() => {this.props.store.cart.add(this.props.productId)}}/>
                                        <AnimatedIcon icon={faHeart} color={theme.primary}  onClick={() => {this.props.store.whishlist.add(this.props.productId, 1)}}/>
                                    </IconsBlock>}
                                </Container>
                        );
                    }}
                </Query>
            </ThemeProvider>
        )
        else return null;
    }
}



const Container = styled.div`
    width: calc(50vw - 25px);
    display: grid;
    border: none;
    justify-items: center;
    grid-auto-rows: min-content;
    justify-content: center;
    padding: 5px;
    position: relative;
    text-decoration: none;
    z-index: 2;
    outline: none;
    background: #fff;
    transition: all .5s;
    &:focus {
        outline: none;
        z-index: 3;
        animation: ${props => props.animation} forwards .3s ease-in;
    }
`;

const Image = styled.img`
    max-height: 150px;
    object-fit: contain;  
    margin: auto;
    display: block;  
`;

const Name = styled.span`
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
    margin-bottom: 3px;
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

const IconsBlock = styled.div`
    display: grid;
    grid-template-columns: repeat(2, max-content);
    grid-gap: 30px;  
    padding: 10px 0;
`;