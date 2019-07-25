import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {theme} from "../../stores/StyleStore";
import LogoImg from '../../resources/image/Logo_dark.svg'
import '@material/textfield/dist/mdc.textfield.min.css'
import '@material/button/dist/mdc.button.min.css'
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {faFacebookF} from "@fortawesome/free-brands-svg-icons";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons";


export default class StartPage extends React.Component{
    render() {
        return(
            <div>
                <ThemeProvider theme={theme}>
                    <Main>
                        <LogoBlock>
                            <Logo src={LogoImg}/>
                        </LogoBlock>
                        <InputBlock>
                            <DivInp className="mdc-text-field mdc-text-field--no-label">
                                <input type="text" className="mdc-text-field__input" placeholder="Name"
                                       aria-label="Label" />
                                <div className="mdc-line-ripple"></div>
                            </DivInp>
                            <DivInp className="mdc-text-field mdc-text-field--no-label">
                                <input type="email" className="mdc-text-field__input" placeholder="E-mail"
                                       aria-label="Label" />
                                <div className="mdc-line-ripple"></div>
                            </DivInp>
                            <DivInp className="mdc-text-field mdc-text-field--no-label">
                                <input type="password" className="mdc-text-field__input" placeholder="Password"
                                       aria-label="Label" />
                                <div className="mdc-line-ripple"></div>
                            </DivInp>
                            <Button className={"mdc-button"}>
                                <span className={"mdc-button__label"}>Sign Up</span>
                            </Button>
                            <ButtonTwo className={"mdc-button"}>
                                <span className={"mdc-button__label"}>Sign In</span>
                            </ButtonTwo>
                        </InputBlock>
                        <SocNetwork>
                            <p> Or Sing In As User</p>
                            <LogoSocNet>
                                <GoogleIcon icon={faGoogle} size={'lg'}/>
                                <FaceIcon icon={faFacebookF} size={'lg'}/>
                                <TwitIcon icon={faTwitter} size={'lg'}/>
                            </LogoSocNet>
                        </SocNetwork>
                    </Main>
                </ThemeProvider>
            </div>
        )
    }


}
const Main = styled.div`
  display: grid;
  grid-template-rows: 250px 2fr 1fr ;
  height: 100vh;
`
const Logo = styled.img`
  height: 76px;
  justify-self: center;
  align-self: end;
`
const LogoBlock = styled.div`
  display: grid;
`
const InputBlock = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 30px;
`
const Button = styled.button`
  justify-self: center;
  align-self: center;
  width: 90%;
  height: 45px !important;
  background-color: ${props => props.theme.primary} !important;
  text-transform: none !important;
  box-shadow: 0 0 2px rgba(0,0,0,0.5) !important;
  margin-top: 20px !important;
  & :active{
      color:#ffffff !important;    
    }
  span{
    color: #ffffff !important;
    font-weight: bold;
    &:active{
      color: ${props => props.theme.primary} !important;
    }    
  }
  
`
const ButtonTwo = styled.button`
  justify-self: center;
  align-self: center;
  width: 90%;
  height: 45px !important;
  background-color: #ffffff !important;
  text-transform: none !important;
  border: 1px solid ${props => props.theme.primary} !important;
  box-shadow: 0 0 2px rgba(0,0,0,0.5) !important;
  margin-top: 20px !important;
  & :active{
      color: ${props => props.theme.primary}!important;
    }
  span{
    color: ${props => props.theme.primary} !important;
    font-weight: bold; 
    &:active {
      color: #ffffff !important;
    }   
  }
  
`
const DivInp = styled.div`
  width: 90%;
  justify-self: center;
  align-self: center;
  input{
    background-color: #ffffff !important; 
    text-align: center;
    border-bottom: none;
    &:focus{
      border-bottom: none;
    }
`
const SocNetwork = styled.div`
 display: grid;
 grid-template-rows: 30px 60px;
 margin-top: 110px;
 p{
  margin: 0;
  justify-self: center;
  font-size: 14px;
 }
`
const LogoSocNet = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`
const GoogleIcon = styled(FontAwesomeIcon)`
  justify-self: end;
  &:active{
    color: #cccccc;
  }
`;
const FaceIcon = styled(FontAwesomeIcon)`
  justify-self: center;
  &:active{
    color: #cccccc;
  }
`;
const TwitIcon = styled(FontAwesomeIcon)`
  justify-self: start;
  &:active{
    color: #cccccc;
  }
`;
