import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import {Link} from "react-router-dom";
import {UrlStore} from "../../stores/UrlStore";

export default class CatalogCard extends React.Component {

render() {
    return(
        <ThemeProvider theme={theme}>
            <Container to={`/blog/${this.props.Data.id}`}>
                <Image src={UrlStore.MAIN_URL + this.props.Data.header_photo.url || ''} alt=""/>
                <Name  to={`/blog/${this.props.Data.id}`}>
                    {this.props.Data.title}
                </Name>
                <Desc></Desc>
                <DateMark>{new Date(this.props.Data.publishing).toLocaleDateString()}</DateMark>
            </Container>
        </ThemeProvider>
    )
    }
}

const Container = styled(Link)`
    display: grid;
    grid-template-rows: 250px repeat(3, max-content);
    grid-gap: 5px;
    text-decoration: none;
`;

const Image = styled.img`
    object-fit: contain;
    display: block;
    max-width: 100%;
    padding: 0;
    margin: auto;  
    align-self: center;
    justify-self: center;
`;

const Name = styled.span`
    font-size: 14pt;
    color: ${props => props.theme.primary};
    text-align: left;
    &:hover {
        color: ${props => props.theme.primary_light};
        text-decoration: underline;
    }
    
`;

const DateMark = styled.span`
    font-size: 12pt;
    color: #888888;
`;

const Desc = styled.p`
    font-size: 12pt;
    text-align: justify;
    margin: 0;
    padding: 0;
    &:hover {
        text-decoration: underline;
    }
    
`;