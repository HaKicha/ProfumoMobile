import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import Logo from '../../resources/image/Logo_dark.svg';
import {Link} from "react-router-dom";
import {Login as SendLoginData} from "../../api/Auth";
import {history} from "../App";
import routes from '../../stores/routes';

export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isPassCorrect: true
        };
        this.login = '';
        this.password = '';

        this.inputHandler = this.inputHandler.bind(this);
        this.send = this.send.bind(this);
    }

    inputHandler(e){
        this[e.target.name] = e.target.value;
    }

    send(e){
        e.preventDefault();
        SendLoginData(this.login, this.password).then(data => {
            if (typeof data === "undefined") this.setState({isPassCorrect: false});
            else history.push(routes.MAIN)
        })
    }

render() {
    return(
        <ThemeProvider theme={theme}>
            <Container onSubmit={() => {}}>
                <Image src={Logo}/>
                <InputContainer>
                    <input type="text" name={'login'} placeholder={"Номер телефона или E-mail"} onChange={this.inputHandler}/>
                    <span/>
                </InputContainer>
                <InputContainer warning={!this.state.isPassCorrect}>
                    <input type="password" name={'password'} placeholder={"Пароль"} onChange={this.inputHandler}/>
                    <span/>
                    <Hint visible={!this.state.isPassCorrect}>Пароль введен неверно</Hint>
                </InputContainer>
                <Button onClick={this.send}>Войти</Button>
                <StyledLink to={routes.SIGN_UP}>Регистрация</StyledLink>
                <StyledLink to={routes.FORGOT_PASSWORD}>Забыли пароль?</StyledLink>
            </Container>
        </ThemeProvider>
    )
    }
}

const Container = styled.form`
    display: grid;
    width: 100vw;
    height: 100vh;
    overflow: hidden;  
    grid-template-rows: 150px repeat(5, 35px);
    grid-gap: 25px;
    justify-items: center;
`;

const Image = styled.img`
    display: block;
    width: 90%;
    margin: 0;
    justify-self: center;
    align-self: end;
    object-fit: contain; 
`;

const InputContainer = styled.div`
    display: block;
    width: 90%;
    position: relative;
    height: max-content;
    justify-self: center;
    input {
        width: 100%;
        border: none;
        height: 30px;
        font-size: 14pt;
        border-bottom: 2px solid ${props => props.warning?'red':'#ccc'};
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
        -webkit-tap-highlight-color: transparent;
        outline: none;
    }
    
    input:focus{
        outline: none;
    }
    
    span{
        position: absolute;
        width: 0;
        height: 2px;
        background: ${props => props.theme.primary};
        bottom: 1px;
        left: 0;
       
    }
    
    input:focus ~ span{
        width: 101%;
        left: 0;
        transition: width .3s ease-in;
      }
`;

const Button = styled.button`
    display: block;
    background: ${props => props.theme.primary};
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    height: 35px;
    border: none;
    font-size: 14pt;
    color: white;
    font-weight: bold;
    cursor: pointer;
    width: 90%;
    text-align: center;
    vertical-align: center; 
    line-height: 35px;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
    &:hover{
         background: ${props => props.theme.primary_light};   
    }  
`;

const StyledLink = styled(Link)`
    display: block;
    background: white;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    height: 35px;
    font-size: 14pt;
    color: ${props => props.theme.primary};
    font-weight: bold;
    cursor: pointer;
    width: 90%;
    text-align: center;
    vertical-align: center; 
    line-height: 35px;
    border: 1px solid ${props => props.theme.primary};
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
    &:hover{
         background: ${props => props.theme.primary_light};   
         color: white;
    } 
    
`;

const Hint = styled.p`
  display: ${props => props.visible?'block':'none'};
  font-size: 9pt;
  color: red;
  margin: 0;
  padding: 0;   
`;