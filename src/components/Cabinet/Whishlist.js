import React from 'react';
import styled,{ThemeProvider} from 'styled-components';
import {inject, observer} from "mobx-react";
import Query from "react-apollo/Query";
import gql from "graphql-tag";
import {theme} from "../../stores/StyleStore";
import StarRatings from 'react-star-ratings';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import PageWrapper from "../public/PageWrapper";
import {UrlStore} from "../../stores/UrlStore";
import Categories from '../Product/Categories';
import {faTimes, faCartPlus} from "@fortawesome/free-solid-svg-icons";
import {AnimatedIcon} from "../../stores/AnimatedObjectStore";

@inject('store')
@observer
export default class Whishlist extends React.Component {

    removeFromWishList = (id => {
        this.props.store.whishlist.remove(id)
    }).bind(this);


render() {
    if (!this.props.store.whishlist.getAll.filter(el => el !== null).length > 0) return (
        <PageWrapper>
            <Title>Пусто :(</Title>
        </PageWrapper>
    )
    return(
        <ThemeProvider theme={theme}>
        <PageWrapper>
            <Container>
                {this.props.store.whishlist.getAll.map(id => {
                    if (id === null) return null
                    return <Query
                        key={id}
                        query={
                            gql`query MyProductCategory($id: ID!){
                          product(id: $id){
                            _id
                            photos{
                              url
                            }
                            name_ru
                            avaliable
                            rating
                            price
                          }
                        }`
                        }
                        variables={{"id": id}}>
                        {({loading, error, data}) => {
                            if (loading) return <p></p>;
                            if (error) {
                                return <p>Error :(</p>;
                            }
                            const images = data.product.photos.map(a => a.url).reverse();
                            return(
                                <ProductCard>
                                    <Image src={UrlStore.MAIN_URL + images[0]}/>
                                    <InfoBlock>
                                        <Categories ProductID={id}/>
                                        <Name
                                            to={'/product/' + id}
                                        >{data.product.name_ru}</Name>
                                        <StarRatings
                                            rating={data.product.rating > 0? data.product.rating : 4}
                                            starRatedColor={"black"}
                                            starEmptyColor={'gray'}
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension={'16px'}
                                            starSpacing={'1px'}
                                        />
                                        <Price>{data.product.avaliable?data.product.price + ' грн':'Нет в наличии'}</Price>
                                    </InfoBlock>
                                    <div>
                                        <AnimatedIcon
                                            icon={faTimes}
                                            margin={'10px 0 0 0'}
                                            height={'25px'}
                                            width={'25px'}
                                            color={theme.bgCol}
                                            onClick={e =>{
                                            e.preventDefault();
                                            this.removeFromWishList(id);
                                        }}>
                                            <FontAwesomeIcon icon={faTimes} size={'lg'}/>
                                        </AnimatedIcon>
                                        {data.product.avaliable && <AnimatedIcon
                                            icon={faCartPlus}
                                            margin={'10px 0 0 0'}
                                            height={'25px'}
                                            width={'25px'}
                                            color={theme.primary}
                                            onClick={() => {this.props.store.cart.add(id, 1)}}
                                        />}
                                    </div>
                                </ProductCard>
                            );
                        }}
                    </Query>

                })}
            </Container>
        </PageWrapper>
        </ThemeProvider>
    )
    }
}
const Title = styled.h1`
    margin: 100px auto;
    display: block;
    font-size: 30pt;
    text-align: center;
    color: #b4b4b4;
`;

const Container = styled.div`
    display: grid;
    justify-items: center;
`;

const ProductCard = styled.div`
    display: grid;
    grid-template-columns: 2fr 5fr 30px;
    padding: 10px;
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    padding: 10px;
    align-self: center;
`;

const InfoBlock = styled.div`
    display: grid;
    padding: 0 20px;
`;

const Name = styled(Link)`
    font-size: 9pt;
    color: ${props => props.theme.primary};
    padding-top: 5px;
    
    &:hover {
      color: ${props => props.theme.primary_light};
      text-decoration: underline;
    }    
`;
const Vendor = styled.span`
    font-size: 16px;
    color: #4A4A4A;
    margin-bottom: 10px;

`;
const Price = styled.span`
    font-size: 14pt;
    color: #575757;
    font-weight: bold;
    margin-bottom: 10px;
`;


const CloseButton = styled.div`
    height: 30px;
    width: 30px;
    border-radius: 50px;
    display: grid;
    justify-items: center;
    align-items: center;
    cursor: pointer;
    transition: .2s ease-out;
    &:hover{
      background: rgba(50, 50, 50, 0.5);
      color: #222;
    }
`;

const EmptyBlock = styled.div`
    margin: 0 auto;
    width: 100%;
    height: 250px;
    text-align: center; 
    padding-top: 40px;
    
    h2{
      font-size: 24pt;
    }
    p{
      font-size: 18pt;
    }
`;

const ToMain = styled(Link)`
    cursor: pointer;
    font-size: 18pt;
    text-decoration: underline;
    &:hover {
      color: ${props => props.theme.primary}
    } 
`;

const CartButton = styled(FontAwesomeIcon)`
    color: ${props => props.theme.primary};
    cursor: pointer;
    margin-top: 10px;
    &:hover{
        color: ${props => props.theme.primary_light};
    }
    
`;