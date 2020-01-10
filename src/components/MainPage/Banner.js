import React from 'react';
import styled from 'styled-components';
import gql from "graphql-tag";
import Query from "react-apollo/Query";
import {UrlStore} from "../../stores/UrlStore";

export default class Banner extends React.Component {

    render() {
        return(

            <Query query={gql`
                   query {
                      banners{
                        link
                        banner{
                          url
                        }
                      }
                    } 
                `}>
                {({loading, error, data})=> {
                    if (loading) return <p/>
                    if (error) return <p>Error :)</p>
                    return <a href={data.banners[0].link}>
                        <BannerImg src={UrlStore.MAIN_URL + data.banners[0].banner.url}  loading={'lazy'}/>
                    </a>
                }}
            </Query>
        )
    }
}

const BannerImg = styled.img`
    width: 90%;
    margin: 50px 5% 10px 5%;
    
`;