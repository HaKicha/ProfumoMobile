import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {theme} from "../../stores/StyleStore";
import Header from "../public/Header";
import Footer from "../public/Footer";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

export default class PurchaseHistory extends React.Component{
    render() {
        return(
            <div>
                <GlobalHead>
                <Header/>
                </GlobalHead>
                <Main>
                    <Title>Purchase History</Title>
                    <ButtonBlock>
                        <Button className={"mdc-button"}>
                            <span className={"mdc-button__label"}>Time</span>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </Button>
                    </ButtonBlock>
                    <Categories>
                        <C>Your Orders</C>
                        <P>0 products</P>
                    </Categories>
                </Main>
                <Footer/>
            </div>
        )
    }

}
const GlobalHead = styled.div`
  display: block;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 2;
`
const Main = styled.div`
  display: grid;
  grid-template-rows: 40px 40px 40px;
  position: absolute;
  z-index: 1;
  width: 100vw;
  top: 50px;
`
const Title = styled.h3`
  font-size: 20px;
  justify-self: center;
  margin: 5px 0 0 0;
  align-self: center;
  
`
const ButtonBlock = styled.div`
  display: grid;
  width: 95%;
`
const Button = styled.button`
  display: block;
  height: 20px !important;
  color: black !important;
  border-radius: 0 !important;
  justify-self: end;
  span{
    margin-right: 10px;
    text-transform: none !important;
  }
  
  &:before,
  &:after {
    background-color: #000 !important;
  }
`
const Categories = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-self: center;

`
const C = styled.p`
  justify-self: start;
  font-size: 16px;
  margin: 0;
`
const P = styled.p`
  justify-self: end;
  font-size: 16px;
  margin: 0;
`