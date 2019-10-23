import React from 'react';
import styled from 'styled-components';
import gql from "graphql-tag";
import CatalogCard from "./CatalogCard";
import {Query} from "react-apollo";

export default class RecomendedBlock extends React.Component {

render() {
    return(
        <React.Fragment>
            <Header>Недавно опубликованные статьи</Header>
            <Container>
                <Query query={
                    gql`query ($limit: Int!, $startFrom: Int!, $sortOption: String!){
                              blogs(start: $startFrom, limit: $limit, sort: $sortOption) {
                                id
                                title
                                publishing
                                header_photo {
                                      url
                                    }
                                }
                            }`
                }
                       variables={{
                           limit: 4,
                           startFrom: 0,
                           sortOption: 'publishing:desc'
                       }}
                >
                    {({loading, error, data}) => {
                        if (loading) return <p></p>;
                        if (error) {
                            return <p>Error :(</p>;
                        }
                        let arr = data.blogs.filter(elem => {return elem.id !== this.props.CurrentId});
                        if (arr.length > 3) arr.pop();
                        return arr.map(elem => <CatalogCard Data={elem} key={elem.id}/>)
                    }}
                </Query>
            </Container>
        </React.Fragment>
    )
    }
}

const Container = styled.div`
    display: grid;
    width: 100%;
    justify-content: center;
    margin: 30px 0;
    grid-gap: 20px;
    margin-bottom: 30px;
    @media(min-width: 1000px) {
      grid-template-columns: repeat(3, 300px);
    }
    @media(min-width: 650px) and (max-width: 999px){
      grid-template-columns: repeat(2, 300px);
    }
    @media(max-width: 649px) {
      grid-template-columns: 300px;
    }
    
`;

const Header = styled.h2`
    width: 100%;
    text-align: center;
    margin-top: 60px;
`;