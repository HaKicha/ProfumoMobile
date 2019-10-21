import React from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {theme} from "../../stores/StyleStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import styled, {ThemeProvider} from "styled-components";
import {Link} from "react-router-dom";

export default class Categories extends React.Component {

    render() {
        return(
            <ThemeProvider theme={theme}>
                <Container>
                    <Query query={
                        gql`query MyProductCategory($id: ID!){
                          product(id: $id){
                            category {
                              name_ru
                              _id
                              parent {
                                name_ru
                                _id
                                parent{
                                  _id
                                  name_ru
                                }
                              }
                            }

                          }
                        }`
                    }
                           variables={{"id": this.props.ProductID}}>
                        {({loading, error, data}) => {
                            if (loading) return <p></p>;
                            if (error) {
                                return <p>Error :(</p>;
                            }
                            try{
                                if (data.product.category.parent.parent === null)
                                    return(
                                        <div>
                                            <Link to={`/catalog/${data.product.category.parent._id}`}>
                                                {data.product.category.parent.name_ru}
                                            </Link>
                                            <FontAwesomeIcon icon={faChevronRight}/>
                                            <Link to={`/catalog/${data.product.category._id}`}>
                                                {data.product.category.name_ru}
                                            </Link>
                                        </div>
                                    );
                                else return(
                                    <div>
                                        <Link to={`/catalog/${data.product.category.parent.parent._id}`}>
                                            {data.product.category.parent.parent.name_ru}</Link>
                                        <FontAwesomeIcon icon={faChevronRight} size={'sm'}/>
                                        <Link to={`/catalog/${data.product.category.parent._id}`}>
                                            {data.product.category.parent.name_ru}</Link>
                                        <FontAwesomeIcon icon={faChevronRight}/>
                                        <Link to={`/catalog/${data.product.category._id}`}>
                                            {data.product.category.name_ru}</Link>
                                    </div>
                                )
                            } catch (e) {
                                console.log(e);
                            }
                            return <div/>
                        }}
                    </Query>
                </Container>
            </ThemeProvider>
        )
    }
}

const Container = styled.div`
  display: grid;
  grid-auto-rows: auto;
  align-items: center;
  
  svg {
    height: 12px;
    color: #777777;
    margin: 0 3px;
  }  
  
  a {
      font-size: 11pt;
      margin: 2px 0;
      display: inline-block;
      cursor: pointer;
      color: #777777;
      &:hover{
      text-decoration: underline;
      color: ${props => props.theme.primary}
  }
  }
`;
