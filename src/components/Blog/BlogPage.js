import React from 'react';
import styled from 'styled-components';
import gql from "graphql-tag";
import {Query} from "react-apollo";
import ReactMarkdown from 'react-markdown';
import RecomendedBlock from "./RecomendedBlock";
import {UrlStore} from "../../stores/UrlStore";
import MetaTags from 'react-meta-tags';
import PageWrapper from "../public/PageWrapper";
import ReactGA from 'react-ga';
import InfoFooter from "../public/InfoFooter";

export default class BlogPage extends React.Component {

    componentWillUpdate() {
        ReactGA.pageview(location.pathname);
        window.scrollTo(0,0);
    }

render() {
    return(
        <PageWrapper>
            <Query query={
                gql`query ($id: ID!){
                          blog(id: $id){
                            id
                            title
                            publishing
                            newsBody
                            link
                            short_desc
                            meta_title
                            meta_keywords
                            meta_decription
                            header_photo {
                                  url
                                }
                            }
                        }`
            }
                   variables={{"id":this.props.match.params.id}}>
                {({loading, error, data}) => {
                    if (loading) return <p></p>;
                    if (error) {
                        return <p>Error :(</p>;
                    }
                    return(
                        <React.Fragment>
                            <MetaTags>
                                <title>{data.blog.title}</title>
                                <meta name='title' content={data.blog.meta_title}/>
                                <meta name='keywords' content={data.blog.meta_keywords}/>
                                <meta name='decription' content={data.blog.meta_decription}/>
                            </MetaTags>
                            <Content>
                                <h1>{data.blog.title}</h1>
                                <p>{data.blog.short_desc}</p>
                                <img src={UrlStore.MAIN_URL + data.blog.header_photo.url}/>
                                <ReactMarkdown source={data.blog.newsBody}/>
                                {data.blog.link && <span>Ссылка на товар: <a href={data.blog.link}>{data.blog.link}</a></span>}
                            </Content>
                        </React.Fragment>
                    );
                }}
            </Query>
            <RecomendedBlock CurrentId={this.props.match.params.id}/>
            <InfoFooter/>
        </PageWrapper>
    )
    }
}

//<Recomendations/>

const Content = styled.div`
    max-width: 100%;
    margin: 20px auto;
    padding: 20px;
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
        text-align: left;
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
