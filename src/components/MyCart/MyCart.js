import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {theme} from "../../stores/StyleStore";
import Header from "../public/Header";
import Footer from "../public/Footer";
import ProductCart from "../MyCart/ProductCart";
import Total from "../MyCart/Total";

export default class MyCart extends React.Component{
    render() {
        return(
            <React.Fragment>
                <Header />
                <Total />
                <BlockMain>
                    <Main>
                        <Title>My Cart</Title>
                    </Main>
                    <Content>
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                    </Content>
                </BlockMain>
                <Footer />
            </React.Fragment>
        )
    }

}
const BlockMain = styled.div`
  display: block;
  position: fixed;
  top: 110px;
  z-index: 1;
  width: 100vw;
  height: calc(100vh - 160px);
  overflow: scroll;
`
const Main = styled.div`
  display: grid;
  
`
const Content = styled.div`
  margin-top: 10px;
  bottom: 150px;
  z-index: 1;
  
`
const Title = styled.h3`
  font-size: 20px;
  justify-self: center;
  align-self: center;
  margin: 10px 0 0 0 ;
`