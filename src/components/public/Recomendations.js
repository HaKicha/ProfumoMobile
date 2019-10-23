import React from 'react';
import styled from 'styled-components';
import {Swiper, Slide} from 'react-dynamic-swiper'
import 'react-dynamic-swiper/lib/styles.css';
import {getRecomened} from "../../api/Recomendations";
import {inject, observer} from "mobx-react";
import Query from "react-apollo/Query";
import gql from 'graphql-tag'
import {UrlStore} from "../../stores/UrlStore";
import {Link} from "react-router-dom";
import {theme} from "../../stores/StyleStore";

@inject('store')
@observer
export default class Recomendations extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            data: [],
            ready: false
        }
    }

    componentWillMount() {
        getRecomened(this.props.store.userStore.isLogged).then(data => {
            let buffer = [];
            let arr = data;
            while (arr.length > 0) {
                buffer.push(arr.slice(0,2));
                arr = arr.slice(2);
            }
            this.setState({
                data: buffer,
                ready: true
            })
        })
    }

    render() {
        if (!this.state.ready || this.state.data.length === 0) return '';

        return(
            <Container>
                <Title>Самые популярные товары</Title>
                <Swiper
                    navigation={true}
                    pagination={false}
                >
                    {this.state.data.map(group =>
                        <Group key={group[0]}>
                            {group.map(elem =>
                                <Query query={
                                    gql`query MyProductCategory($id: ID!){
                          product(id: $id){
                            name_ru
                            vendor
                            photos{
                                url
                            }
                            price
                          }
                        }`
                                }
                                       key={elem}
                                       variables={{"id":elem}}>
                                    {({loading, error, data}) => {
                                        if (loading) return <p/>;
                                        if (error) {
                                            return '';
                                        }
                                        return <Block to={'/product/' + elem}>
                                            <Image src={UrlStore.MAIN_URL + data.product.photos[0].url}/>
                                            <Name to={'/product/' + elem}>{data.product.name_ru}</Name>
                                            <Price>{data.product.price}</Price>
                                        </Block>
                                    }}
                                </Query>)}
                        </Group>

                    )}
                </Swiper>
            </Container>
        )
    }
}

const Container = styled.div`
    .swiper-button-next {
        
    }
    
`;

const Title = styled.h2`
    text-align: center;
    
`;

const Block = styled(Link)`
    display: grid;
    grid-template-rows: 45vw repeat(2, max-content);
    width: 100%;
    justify-items: center;
    text-decoration: none;
    
    &:hover {
        p{
            color: ${theme.primary_light};
        }
    }
`;

const Image = styled.img`
    object-fit: contain;
    max-height: 90%;
    justify-self: center;
    max-width: 90%;
    padding: 5%;
`;

const Name = styled.p`
    white-space: pre-line;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 30px;
    line-height: 15px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    color: black;
    margin: 0;
    text-decoration: none;
`;


const Price = styled.span`
    display: block;
    padding: 3px;
    background: ${theme.primary_light};
    font-size: 14pt;
    color: #fff;
    width: max-content;
    border-radius: 5px;
    margin-top: 3px;
    text-decoration: none;
    align-self: center;
    &:after {
        content: " грн.";
    }
`;

const Group = styled(Slide)`
    display: grid !important;
    justify-content: center !important;
    grid-template-columns: repeat(2,45%) !important;
    
`;
