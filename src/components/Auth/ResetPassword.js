import React from 'react';
import Logo from "../../resources/image/Logo_dark.svg";
import {debounce} from "lodash";
import styled, {ThemeProvider} from "styled-components";
import {Link} from "react-router-dom";
import {theme} from "../../stores/StyleStore";
import routes from '../../stores/routes';
import {resetPassword} from "../../api/Auth";

export default class ResetPassword extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isPassCorrect: true,
            isLoading: false,
            complete: false
        };

        this.url = new URL(location.href);
        this.code = this.url.searchParams.get('code');
        this.password = '';
        this.repeatPassword = '';


        this.passInputHandler = this.passInputHandler.bind(this);
        this.send = this.send.bind(this);
    }

    passInputHandler(target){
        this[target.name] = target.value;
        if (this.password !== this.repeatPassword && this.repeatPassword !== '') this.setState({isPassCorrect: false})
        else  this.setState({isPassCorrect: true})
    }

    repatPasswordInputHandler = debounce(this.passInputHandler, 1000);

    send (e) {
        e.preventDefault();
            let data = {
                code: this.code,
                password: this.password,
                passwordConfirmation: this.repeatPassword
            }
            this.setState({isLoad: true});
            resetPassword(data).then(response => {
                this.setState({
                    isLoad: false,
                    complete: response
                })
            })
    }

render() {
        if (this.state.complete) return (
            <ThemeProvider theme={theme}>
                <Container>
                    <Image src={Logo}/>
                    <h3>Пароль успешно изменен!</h3>
                    <StyledLink to={routes.MAIN}>На главную</StyledLink>
                    <StyledLink to={routes.SIGN_IN}>Войти</StyledLink>
                    <StyledLink to={routes.SIGN_UP}>Зарегистрироватся</StyledLink>
                </Container>
            </ThemeProvider>
        )

    return(
        <ThemeProvider theme={theme}>
            <Container>
                <Image src={Logo}/>
                <Info>Введите новый пароль</Info>
                <InputContainer>
                    <input
                        type={'password'}
                        pattern={"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"}
                        required
                        name={'password'}
                        placeholder={"Пароль"}
                        onChange={e => {
                            let Target = e.target;
                            this.repatPasswordInputHandler(Target);
                        }}/>
                    <span/>
                    <small>Пароль должен содержать большые и маленькие буквы и цифры. Не менее восьми символов</small>
                </InputContainer>
                <InputContainer warning={!this.state.isPassCorrect}>
                    <input
                        type={'password'}
                        required
                        name={'repeatPassword'}
                        placeholder={"Повторить пароль"}
                        onChange={e => {
                            let Target = e.target;
                            this.repatPasswordInputHandler(Target);
                        }}/>
                    <span/>
                    <Hint visible={!this.state.isPassCorrect}>Пароли не совпадают</Hint>
                </InputContainer>
                <Button onClick={this.send} disabled={!this.state.isPassCorrect}>Изменить пароль</Button>
                <StyledLink to={routes.SIGN_IN}>Войти</StyledLink>
                <StyledLink to={routes.SIGN_UP}>Зарегистрироватся</StyledLink>
            </Container>
        </ThemeProvider>
    )
    }
}


const Container = styled.form`
    display: grid;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;  
    grid-template-rows: 100px repeat(9, max-content);
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
        border-bottom: 2px solid ${props => props.warning ? 'red' : '#ccc'};
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
        -webkit-tap-highlight-color: transparent;
        outline: none;
    }
    
    input:focus{
        outline: none;
    }
    small{
        display: none;
        font-size: 9pt;
        color: #636363;
        margin: 0;
        padding: 0;
    }
    input:focus ~ small{
      display: block;
       
    }
    
    input:invalid:not(:empty){
        outline: none;
        box-shadow: none;
        border-bottom: 2px solid red;
    }
    
    span{
        display: block;
        position: relative;
        width: 0;
        height: 2px;
        bottom: 2px;
        left: 0;
    }
    
    input:focus ~ span{
        width: 101%;
        left: 0;
        transition: width .3s ease-in;
        background: ${props => props.theme.primary};
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


const Info = styled.p`
    padding: 0 20px;
    display: block;
    color: #767676;    
    margin: 0;
`;
