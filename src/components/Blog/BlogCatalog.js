import React from 'react';
import Header from "../public/Header";
import styled, {ThemeProvider} from 'styled-components'
import {theme} from "../../stores/StyleStore";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import CatalogCard from "./CatalogCard";
import Footer from "../public/Footer";
import ReactPaginate from 'react-paginate';
import MetaTags from "react-meta-tags";
import PageWrapper from "../public/PageWrapper";

export default class Catalog extends React.Component {

    componentWillMount() {
        window.scrollTo(0,0);
    }

    constructor(props){
        super(props);
        this.state = {
            currentPage: 0
        }
        this.defaultPageSize = 10;
    }


    setPage = page => {
        this.setState({
            currentPage: page.selected
        })
    };

    render() {
        return(
            <ThemeProvider theme={theme}>
                <PageWrapper>
                    <MetaTags>
                        <title>Наш блог</title>
                    </MetaTags>
                    <Header/>
                    <Content>
                        <Query query={
                            gql`query ($limit: Int!, $startFrom: Int!, $sortOption: String!){
                              blogs(start: $startFrom, limit: $limit, sort: $sortOption) {
                                id
                                title
                                publishing
                                short_desc
                                header_photo {
                                      url
                                    }
                                }
                            }`
                        }
                               variables={{
                                   limit: this.defaultPageSize,
                                   startFrom: (this.state.currentPage) * this.defaultPageSize,
                                   sortOption: 'publishing:desc'
                               }}
                        >
                            {({loading, error, data}) => {
                                if (loading) return <p></p>;
                                if (error) {
                                    return <p>Error :(</p>;
                                }
                                return data.blogs.map(elem => <CatalogCard Data={elem} key={elem.id}/>)
                            }}
                        </Query>
                    </Content>
                        <Query query={
                            gql`query{
                                  blogsConnection{
                                    aggregate{
                                      totalCount
                                    }
                                  }
                                }`
                        }

                        >
                            {({loading, error, data}) => {
                                if (loading) return <p></p>;
                                if (error) {
                                    return <p>Error :(</p>;
                                }
                                return (
                                    <PaginationContainer>
                                    {data.blogsConnection.aggregate.totalCount / this.defaultPageSize > 1 && <ReactPaginate
                                        previousLabel={'Назад'}
                                        nextLabel={'Далее'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={Math.ceil(data.blogsConnection.aggregate.totalCount / this.defaultPageSize)}
                                        marginPagesDisplayed={1}
                                        pageRangeDisplayed={3}
                                        onPageChange={this.setPage}
                                        containerClassName={'pagination'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active'}
                                    />}
                                </PaginationContainer>
                                )
                            }}
                        </Query>
                    <Footer/>
                </PageWrapper>
            </ThemeProvider>
        )
    }
}

const Content = styled.div`
    display: grid;
    max-width: 100%;
    grid-gap: 20px;
    min-height: calc(100vh - 360px);
    justify-content: center;
    grid-auto-rows: auto;
    padding: 0 20px;
`;


const PaginationContainer = styled.div`
    padding-bottom: 40px;
    display: grid;
    justify-content: center;
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
    
        li {
            display: inline-block;
            padding: 7px;
            font-size: 14pt;
            margin-right: 5px;
            height: 20px;
            width: 20px;
            box-shadow: 0 0 1px 1px #ccc;
            border-radius: 4px;
            text-align: center;
            outline: none;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
            -webkit-tap-highlight-color: transparent;
            cursor: pointer;
            line-height: 100%;
        }
        
        li.next,
        li.previous{
            display: none;
        }
        
        li.active{
            background: ${theme.primary};
            color: white;
        }
    }
    
`;