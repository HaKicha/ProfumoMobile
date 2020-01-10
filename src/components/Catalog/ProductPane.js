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
import perfumesIcon from '../../resources/image/perfumesImage.png';

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
                                        {data.product.photos.length > 0 ? <Image src={UrlStore.MAIN_URL + data.product.photos[0].url} loading={'lazy'} onClick={() => {
                                            if (this.state.focused) history.push('/product/' + this.props.productId);
                                            else this.block.current.focus()
                                        }}/> : <Image src={perfumesIcon} loading={'lazy'} onClick={() => {
                                            if (this.state.focused) history.push('/product/' + this.props.productId);
                                            else this.block.current.focus()
                                        }}/>}
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
                                    {this.state.focused && <>
                                        {!(!data.product.avaliable || data.product.amount === 0) ?  <IconsBlock>
                                            <IconContainer onClick={() => {this.props.store.cart.add(this.props.productId, 1)}}>
                                                <img style={{height: '32px', width: '30px'}} src={`data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' height=\'32\' width=\'30\'%3E%3Cpath d='m 24.710582,25.523633 c -1.487902,0 -2.691776,1.260021 -2.691776,2.8 0,1.539979 1.203874,2.8 2.691776,2.8 1.48798,0 2.705312,-1.260021 2.705312,-2.8 0,-1.539979 -1.217332,-2.8 -2.705312,-2.8 z m -13.526561,0 c -1.4878859,0 -2.6917439,1.260021 -2.6917439,2.8 0,1.539979 1.203858,2.8 2.6917439,2.8 1.487981,0 2.705312,-1.260021 2.705312,-2.8 0,-1.539979 -1.217331,-2.8 -2.705312,-2.8 z m 0,-4.199959 1.487981,-2.8 h 10.077296 c 1.014444,0 1.907217,-0.574011 2.367139,-1.442071 L 31.068124,5.9236334 H 8.7628083 l -1.2715007,-2.8 H 3.0681243 v 2.8 H 5.7734365 L 10.642959,16.549623 6.6120793,24.123674 H 27.415894 v -2.8 z' fill=\'%23e36f64\'/%3E%3C/svg%3E`} alt=""/>
                                            </IconContainer>
                                            <AnimatedIcon icon={faHeart} color={theme.primary}  onClick={() => {this.props.store.whishlist.add(this.props.productId)}}/>
                                        </IconsBlock>: <h2 style={{fontSize: '90%'}}>Нет в наличии</h2>}
                                    </>}
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
    width: 100%;
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
    font-size: 14pt;
    color: #000000;
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

const IconContainer = styled.div`
    height: ${props => props.height||'30px'};
    width: ${props => props.width||'30px'};
    padding: ${props => props.padding||'7px'};
    border-radius: 50%;
    background-position: center;
    transition: all ${props => props.duration || '.5s'};
    align-self: center;
    justify-self: center;
    display: grid;
    justify-content: center;
    align-items: center;
    &:active {
        color: ${props => props.clickedColor || 'white'};
        background-color:  ${props => props.bgcolor||'rgba(10,10,10,0.5)'};
        background-size: 150%;
        transition: background 0s;
    }
    ${props => props.otherstyle}
    img {
        height: 18px;
        width: 18px;
    }
`;
