import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default class PhotoGallery extends React.Component {

render() {
    return(
        <ThemeProvider theme={theme}>
            <Container>
                <ImageGallery
                    items={this.props.images}
                    showThumbnails={false}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    showNav={true}
                    showBullets={true}
                />
            </Container>
        </ThemeProvider>
    )
    }
}

const Container = styled.div`
    display: block;
    width: 100%;
    
    .image-gallery-bullet  {
        background: ${props => props.theme.primary_light} !important;
        margin: 4px !important;
        padding: 3px !important;
        border: none !important;
        box-shadow: none !important;
    }    
    .image-gallery-bullet.active {
        background: ${props => props.theme.primary} !important;
        margin: 3px !important;
        box-shadow: none;
        padding: 4px !important;
    }
    
    .image-gallery-image img{
        max-height: calc(80vw - 50px) !important;
        padding: 25px !important;
        width: calc(90vw - 50px);
        object-fit: contain !important;
    }
    
    .image-gallery-image {
        display: grid !important;
        align-items: center !important;
        justify-items: center !important;
        height: 80vw !important;
    }
`;