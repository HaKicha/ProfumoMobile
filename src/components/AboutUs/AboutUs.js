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
import ReactGA from 'react-ga';
import InfoFooter from "../public/InfoFooter";

export default class AboutUs  extends React.Component{

    componentWillMount() {
        ReactGA.pageview(location.pathname);
        window.scrollTo(0,0);
    }

    render(){
        return (
            <PageWrapper>
                <MetaTags>
                    <title>О нас</title>
                </MetaTags>
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
                                meta_title
                                meta_keywords
                                meta_decription
                              }
                            }
                        `}
                    >
                        {({loading, error, data}) => {
                            if (loading) return <PageWrapper><Preloader/></PageWrapper>
                            if (error) return <p/>

                            return (
                                <PageWrapper>
                                    <MetaTags>
                                        <meta name='title' content={data.aboutuses[0].meta_title}/>
                                        <meta name='keywords' content={data.aboutuses[0].meta_keywords}/>
                                        <meta name='decription' content={data.aboutuses[0].meta_decription}/>
                                    </MetaTags>
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
                                    <InfoFooter/>
                                </PageWrapper>
                            )
                        }}
                    </Query>
                </MainAbout>
            </PageWrapper>
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