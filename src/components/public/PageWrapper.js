import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import styled from 'styled-components';

export default class PageWrapper extends React.Component {

render() {
    return(
        <React.Fragment>
            <Header/>
            <Content>
                {this.props.children}
            </Content>
            <Footer/>
        </React.Fragment>
    )
    }
}

const Content = styled.div`
    position: absolute;
    top: 50px;
    padding-bottom: 100px;
    z-index: 1;
    width: 100vw;
`;