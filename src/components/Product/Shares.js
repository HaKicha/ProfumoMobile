import React from 'react';
import styled from 'styled-components'
import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    ViberShareButton,
    InstapaperShareButton,
    EmailShareButton,
    VKShareButton
} from 'react-share';

import {
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    ViberIcon,
    InstapaperIcon,
    EmailIcon,
    VKIcon
} from 'react-share';
export default class Shares extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            opened: false
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextState.opened !== nextProps.open)
        this.setState({
            opened: nextProps.open
        })
    }

    render() {
    return(
        <Background onClick={this.props.toggle} open={this.state.opened}>
            <Container  open={this.state.opened}>
                <Title>Поделиться товаром</Title>
                <FacebookShareButton url={location.href} onClick={this.props.toggle}>
                    <FacebookIcon round={true}/>
                </FacebookShareButton>
                <TwitterShareButton url={location.href} onClick={this.props.toggle}>
                    <TwitterIcon round={true}/>
                </TwitterShareButton>
                <TelegramShareButton url={location.href} onClick={this.props.toggle}>
                    <TelegramIcon round={true}/>
                </TelegramShareButton>
                <WhatsappShareButton url={location.href} onClick={this.props.toggle}>
                    <WhatsappIcon round={true}/>
                </WhatsappShareButton>
                <ViberShareButton url={location.href} onClick={this.props.toggle}>
                    <ViberIcon round={true}/>
                </ViberShareButton>
                <InstapaperShareButton url={location.href} onClick={this.props.toggle}>
                    <InstapaperIcon round={true}/>
                </InstapaperShareButton>
                <EmailShareButton url={location.href} onClick={this.props.toggle}>
                    <EmailIcon round={true}/>
                </EmailShareButton>
                <VKShareButton url={location.href} onClick={this.props.toggle}>
                    <VKIcon round={true}/>
                </VKShareButton>
            </Container>
        </Background>
    )
    }
}

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    position: fixed;
    bottom: ${props => props.open?'0':'-100vh'};
    left: 0;
    right: 0;
    transition: bottom .8s;
    
    width: 100%;
    background: #fff;
    z-index: 9;
    padding-bottom: 25vw;
    
    div{
        height: 80% !important;
        width: 80% !important;
        padding: 10% !important;
    }
    svg{
      height: 100% !important;
      width: 100% !important;
      cursor: pointer;
    }
`;

const Title = styled.h3`
    grid-column: 1/5;
    text-align: center;
    padding: 0;
    margin: 10px 0 0 0 ;
`;

const Background = styled.div`
    display: ${props => props.open?'grid':'none'};
    background: rgba(152,152,152,0.5);
    height: 100vh;
    width: 100vw;
    z-index: 8;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;