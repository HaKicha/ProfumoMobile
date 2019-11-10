import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import {Link} from "react-router-dom";
import {UrlStore} from "../../stores/UrlStore";


export default class BlogCard extends React.Component {

    render() {
        return(
            <ThemeProvider theme={theme}>
                <Container to={`/blog/${this.props.Data.id}`}>
                    <Image src={UrlStore.MAIN_URL + this.props.Data.header_photo.url} alt=""/>
                    <Desc>
                        <Name>
                            {this.props.Data.title}
                        </Name>
                        <Subtitle>{this.props.Data.short_desc}</Subtitle>
                        <DateMark>{new Date(this.props.Data.publishing).toLocaleDateString()}</DateMark>
                    </Desc>
                </Container>
            </ThemeProvider>
        )
    }
}

const Container = styled(Link)`
    display: grid;
    grid-template-rows: 35vw max-content;
    text-decoration: none;
`;

const Image = styled.img`
    object-fit: contain;
    max-height: 100%;
    width: 100%;
`;

const Desc = styled.div`
    display: grid;
    grid-template-rows: min-content min-content 25px;
`;

const Name = styled.span`
    font-size: 12pt;
    color: ${props => props.theme.primary};
    justify-self: center;
    cursor: pointer;
    &:hover {
        color: ${props => props.theme.primary_light};
    }
    
`;

const DateMark = styled.span`
    font-size: 10pt;
    color: #696969;
    margin-top: 5px;
`;

const Subtitle = styled.p`
    margin: 0;
    font-size: 12pt;
    text-align: left;
    line-height: 140%;
`;