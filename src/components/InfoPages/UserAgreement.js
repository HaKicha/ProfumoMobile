import React from 'react';
import styled from 'styled-components';
import Query from 'react-apollo/Query'
import gql from "graphql-tag";
import ReactMarkdown from "react-markdown";
import PageWrapper from "../public/PageWrapper";
import ReactGA from 'react-ga';
import MetaTags from "react-meta-tags";
import InfoFooter from "../public/InfoFooter";

export default class UserAgreement extends React.Component {

    componentWillMount() {
        ReactGA.pageview(location.pathname);
        window.scrollTo(0,0);
    }

    render() {
        return(
            <PageWrapper>
                <MetaTags>
                    <title>Приватность</title>
                </MetaTags>
                <Content>
                    <Query query={gql`
                   query {
                    useragreements{   
                        text
                        meta_title
                        meta_keywords
                        meta_decription
                      }
                    } 
                `}>
                        {({loading, error, data})=> {
                            if (loading) return <p/>
                            if (error) return <p>Error :)</p>
                            return <>
                                <meta name='title' content={data.useragreements[0].meta_title}/>
                                <meta name='keywords' content={data.useragreements[0].meta_keywords}/>
                                <meta name='decription' content={data.useragreements[0].meta_decription}/>
                                <ReactMarkdown source={data.useragreements[0].text}/>
                            </>
                        }}
                    </Query>
                </Content>
                <InfoFooter/>
            </PageWrapper>
        )
    }
}


const Content = styled.div`
    max-width: 100%;
    overflow-x: hidden;
    padding: 10px;
    display: block; 
    
    *{
        display: block;
    }
    
    a {
        display: inline-block;
    }
    
    img {
        max-width: 100%;
        object-fit: contain;
        margin: auto;
        margin-bottom: 20px;
    }
    
    p {
        font-size: 12pt;
        text-align: justify;
        letter-spacing: 0px;
        line-height: 140%;
    }
    
    em{
        margin-bottom: 10px;
    }
    
    h1,h2,h3,h4,h5,h6 {
        text-align: center;
    }
    
    li {
        display: list-item; 
        line-height: 140%;
    }
`;