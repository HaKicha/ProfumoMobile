import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {theme} from "../../stores/StyleStore";
import Header from "../public/Header";
import Footer from "../public/Footer";

export default class IWantIt extends React.Component{
    render() {
        return(
            <div>
                <Header/>
                <GlobalMain>
                    <Main>
                        <Title>I Want It</Title>
                        <Categories>
                            <C>Categories</C>
                            <P>0 products</P>
                        </Categories>
                        <Link href="#"> All</Link>
                    </Main>
                </GlobalMain>
                <Footer/>
            </div>
        )
    }

}
const GlobalMain = styled.div`
  display: block;
  position: absolute;
  top: 50px;
  z-index: 1;
  width: 100vw;
`
const Main = styled.div`
  display: grid;
  grid-template-rows: 40px 40px 40px;
`
const Categories = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-self: center;
  margin-top: 10px;
`
const C = styled.p`
  justify-self: start;
  font-size: 16px;
`
const P = styled.p`
  justify-self: end;
  font-size: 16px;
`
const Title = styled.h3`
  font-size: 20px;
  justify-self: center;
  align-self: center;
`
const Link = styled.a`
  margin-left: 5%;
  margin-top: 15px;

  
`
