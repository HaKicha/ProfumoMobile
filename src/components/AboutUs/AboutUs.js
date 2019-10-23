import React from "react"
import styled from 'styled-components';
import Footer from "../public/Footer"
import Header from "../public/Header";
import ReactMarkdown from "react-markdown";
import Query from "react-apollo/Query";
import gql from "graphql-tag";
import {UrlStore} from "../../stores/UrlStore";
import MetaTags from 'react-meta-tags';
import Preloader from "../public/Preloader";
import PageWrapper from "../public/PageWrapper";

export default class AboutUs  extends React.Component{

    componentWillMount() {
        window.scrollTo(0,0);
    }

    render(){
        return (
            <React.Fragment>
                <MetaTags>
                    <title>О нас</title>
                </MetaTags>
                <Header/>
                <MainAbout>
                    <Title>
                        <h2> О НАС </h2>
                    </Title>
                    <Query
                        query={gql`
                            query{
                              aboutuses{
                                first_block
                                second_block
                                third_block
                              }
                            }
                        `}
                    >
                        {({loading, error, data}) => {
                            if (loading) return <PageWrapper><Preloader/></PageWrapper>
                            if (error) return <p/>

                            return (
                                <PageWrapper>
                                    <Articles>
                                        <div>
                                            <ReactMarkdown source={data.aboutuses[0].first_block||''}/>
                                        </div>
                                        <div>
                                            <ReactMarkdown source={data.aboutuses[0].second_block||''}/>
                                        </div>
                                        <div>
                                            <ReactMarkdown source={data.aboutuses[0].third_block||''}/>
                                        </div>
                                    </Articles>
                                </PageWrapper>
                            )
                        }}
                    </Query>
                </MainAbout>
                <Footer/>
            </React.Fragment>
        );
    }
}


const MainAbout = styled.div`
    display: grid;
`
const Title = styled.div`
    justify-self: center;
    align-self: center;
`

const Articles = styled.div`
    display: grid;
    grid-gap: 25px;
    text-align: center;
    padding: 20px;
    width: calc(100% - 40px);  
    
    img {
        max-width: 90%;
        margin: 10px auto;
        object-fit: contain;
    }
`;