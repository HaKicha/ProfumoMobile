import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {theme} from "../../stores/StyleStore";
import '@material/textfield/dist/mdc.textfield.min.css'
import '@material/button/dist/mdc.button.min.css'
import {faPen} from '@fortawesome/free-solid-svg-icons';
import Header from "../public/Header";
import Footer from "../public/Footer";

export default class Contacts extends React.Component{
    render() {
        return(
            <div>
                <Header/>
                <ThemeProvider theme={theme}>
                <GlobalMain>
                <Main>
                    <Title>Contacts</Title>
                    <p>Your Name</p>
                    <p>Your Address</p>
                    <p>Your Phone</p>
                    <p>Your E-mail</p>
                        <PenButton id={"star-this-item"}
                                className={"mdc-icon-button mdc-icon-button--on"}
                                aria-label={"Unstar this item"}
                                aria-hidden={"true"}
                                aria-pressed={"true"}>
                            <Icon icon={faPen} size={'5x'} className={"mdc-icon-button__icon mdc-icon-button__icon--on"}/>
                        </PenButton>
                </Main>
                </GlobalMain>
                </ThemeProvider>
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
height: 81vh;
  display: grid;
  grid-template-rows: 50px 30px 30px 30px 30px 5fr;
  p{
    margin-left:5%;
    margin-bottom: 0;
    
  }
`
const Title = styled.h3`
  font-size: 20px;
  justify-self: center;
  align-self: start;
  margin-top: 10px;
`

const PenButton = styled.button`
  position: fixed;
  display: block;
  right: 10px;
  bottom: 100px;
  height: 80px;
  width: 80px;
  padding: 0;
  svg{
    margin-left: -5px;
  }
`
const Icon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.primary};
  background-color: #ffffff;
`