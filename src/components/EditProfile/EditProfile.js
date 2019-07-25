import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {theme} from "../../stores/StyleStore";
import '@material/textfield/dist/mdc.textfield.min.css'
import '@material/button/dist/mdc.button.min.css'
import Header from "../public/Header";
import Footer from "../public/Footer";

export default class EditProfile extends React.Component{
    render() {
        return(
            <div>
                <Header/>
                <ThemeProvider theme={theme}>
                <GlobalMain>
                <Main>
                    <Title>Edit Profile</Title>
                    <DivInp className="mdc-text-field mdc-text-field--no-label">
                        <input type="text" className="mdc-text-field__input" placeholder="New Name"
                               aria-label="Label" />
                        <div className="mdc-line-ripple"></div>
                    </DivInp>
                    <DivInp className="mdc-text-field mdc-text-field--no-label">
                        <input type="text" className="mdc-text-field__input" placeholder="New Address"
                               aria-label="Label" />
                        <div className="mdc-line-ripple"></div>
                    </DivInp>
                    <DivInp className="mdc-text-field mdc-text-field--no-label">
                        <input type="number" className="mdc-text-field__input" placeholder="New Phone"
                               aria-label="Label" />
                        <div className="mdc-line-ripple"></div>
                    </DivInp>
                    <DivInp className="mdc-text-field mdc-text-field--no-label">
                        <input type="email" className="mdc-text-field__input" placeholder="New E-mail"
                               aria-label="Label" />
                        <div className="mdc-line-ripple"></div>
                    </DivInp>
                    <Button className={"mdc-button"}>
                        <span className={"mdc-button__label"}>Save</span>
                    </Button>
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
  display: grid;
  grid-template-rows: 40px 1fr 1fr 1fr 1fr 1fr;'
  
`
const Title = styled.h3`
  font-size: 20px;
  justify-self: center;
  align-self: start;
  margin-top: 10px;
`
const DivInp = styled.div`
  width: 90%;
  justify-self: center;
  align-self: center;
  margin-top: 5px ;
  input{
    background-color: #ffffff !important; 
    text-align: center;
    border-bottom: none !important;
  }
`
const Button = styled.button`
  justify-self: center;
  align-self: center;
  width: 90%;
  height: 50px !important;
  background-color: ${props => props.theme.primary} !important;
  text-transform: none !important;
  box-shadow: 0 0 4px rgba(0,0,0,0.5) !important;
  margin-top: 15px;
  border-radius: 2px !important;
  & :active{
      color:#cccccc !important;    
    }
  span{
    color: #ffffff;    
  }
  
`