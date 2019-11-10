import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Link} from "react-router-dom";
import {theme} from "../../stores/StyleStore";
import {getCategoryTree} from "../../api/Categories";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {UrlStore} from "../../stores/UrlStore";

export default class Categories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: true,
            categories: []
        }
        this.transformCategories = this.transformCategories.bind(this);
    }

    transformCategories = category => {
        return category.key;
    }

    componentWillMount() {
        getCategoryTree(true)
            .then(categories => {
                this.setState({
                    categories: categories.map(cat => this.transformCategories(cat)),
                    ready: true
                })
            })
    }

    render() {
        if (this.state.ready)
            return (
                <ThemeProvider theme={theme}>
                    <React.Fragment>
                        <Title>КАТЕГОРИИ</Title>
                        <Container>
                            {this.state.categories.map(id =>
                                <Query query={
                                    gql`query($id: ID!){
                                      category(id: $id){
                                        name_ru
                                        category_photo{
                                            url
                                        }
                                      }
                                    }`
                                }
                                       variables={{"id": id}}
                                       key={id}
                                >
                                    {({loading, error, data}) => {
                                        if (loading) return <p></p>;
                                        if (error) {
                                            return <p>Error :(</p>;
                                        }
                                        if (data.category.category_photo === null) return ''
                                        return (
                                            <Category to={'/catalog/' + id}>
                                                <Image src={UrlStore.MAIN_URL + data.category.category_photo.url}/>
                                                <LinkToCategory to={'/catalog/' + id}>{data.category.name_ru}</LinkToCategory>
                                            </Category>
                                        );
                                    }}
                                </Query>
                            )}
                        </Container>
                    </React.Fragment>
                </ThemeProvider>
            )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px 20px;
    width: 100%;
    span{
        height: 1px;
        width: 250px;
        margin: 0 20px;
        display: block;
    }
`;

const Category = styled(Link)`
    display: grid;
    grid-template-rows: minmax(20vw, 40vw) max-content;
    border: none;
    cursor: pointer;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
    p {
        text-align: center;
    }
    &:hover{
        box-shadow: 0 0 3px 3px rgba(226,92,75,0.5);
        p{
            color: ${theme.primary_light};
        }
    }
`;

const Image = styled.img`
    height: 90%;
    max-width: 90%;
    padding: 5%;
    object-fit: contain;
    align-self: center;
    justify-self: center;  
`;

const LinkToCategory = styled.p`
    color: ${theme.primary};
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    margin: 0;
    padding: 0;
    font-size: 14pt;
    align-self: center;
    justify-self: center;
    text-shadow: 1px 1px 2px #ccc;
`;

const Title = styled.h2`
    text-align: center;
    margin-top: 20px;
`;
