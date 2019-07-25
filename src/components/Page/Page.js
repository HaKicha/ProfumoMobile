import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import Header from "../public/Header";
import Product from "../Product/Product";
import Search from "../Search/Search";
import Footer from "../public/Footer";
import SearchInput from "../SearchInput/SearchInput";

export default class Page extends React.Component{
    render() {
        return(
            <React.Fragment>

                    <Header/>
                <HeadBlock>
                    <SearchInput/>
                    <Search/>
                </HeadBlock>
                <Content>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                </Content>
                <Footer />

            </React.Fragment>
        )    }

}
const Content = styled.div`
  display: block;
  position: absolute;
  top: 130px;
  margin-bottom: 40px;
  z-index: 1;
  width: 100vw;
`

const HeadBlock = styled.div`
  background: #fff;
  position: fixed;
  top: 50px;
  z-index: 2;
  width: 100vw;
`
