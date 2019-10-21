import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import Logo from '../../resources/image/Logo_dark.svg';
import {Link} from "react-router-dom";
import {Register} from "../../api/Auth";
import {history} from "../App";
import {debounce} from "lodash";
import {AnimatedRadioButton} from "../../stores/AnimatedObjectStore";

export default class Registration extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isPassCorrect: true,
            isDataNotRepeat: true
        };
        this.phone = '';
        this.email = '';
        this.name = '';
        this.surname = '';
        this.password = '';
        this.repeatPassword = '';
        this.gender = 'male';


        this.inputHandler = this.inputHandler.bind(this);
        this.passInputHandler = this.passInputHandler.bind(this);
        this.send = this.send.bind(this);
    }

    inputHandler(e){
        this[e.target.name] = e.target.value;
    }

    genderChangeHandler(e){
        e.gender = e.target.value;
    }
    
    passInputHandler(target){
        this[target.name] = target.value;
        if (this.password !== this.repeatPassword && this.repeatPassword !== '') this.setState({isPassCorrect: false})
        else  this.setState({isPassCorrect: true})
    }

    repatPasswordInputHandler = debounce(this.passInputHandler, 1000);

    send(e){
        e.preventDefault();
        Register(this.phone, this.email, this.password, this.name, this.surname, this.gender).then(response => {
            if (!response) this.setState({isDataNotRepeat: false});
            else history.push('/')
        })
    }

    render() {
        return(
            <ThemeProvider theme={theme}>
                <Container onSubmit={() => {}}>
                    <Image src={Logo}/>
                    <InputContainer>
                        <input
                            type={'text'}
                            required
                            name={'phone'}
                            pattern={"[+]{0,1}[0-9]{10,12}"}
                            placeholder={"Номер телефона"}
                            onChange={this.inputHandler}/>
                        <span/>
                    </InputContainer>
                    <InputContainer warning={!this.state.isDataNotRepeat}>
                        <input
                            type={'email'}
                            required name={'email'}
                            placeholder={"E-mail"}
                            onChange={this.inputHandler}/>
                        <span/>
                        <Hint visible={!this.state.isDataNotRepeat}>Такой пользователь уже существует</Hint>
                    </InputContainer>
                    <InputContainer>
                        <input
                            type={'text'}
                            required
                            name={'name'}
                            placeholder={"Имя"}
                            pattern={"[А-Яа-яЁё`ЇїЄєІіA-Za-z\-]{2,}"}
                            onChange={this.inputHandler}/>
                        <span/>
                    </InputContainer>
                    <InputContainer>
                        <input
                            type={'text'}
                            required name={'surname'}
                            placeholder={"Фамилия"}
                            pattern={"[А-Яа-яЁё`ЇїЄєІіA-Za-z\-]{2,}"}
                            onChange={this.inputHandler}/>
                        <span/>
                    </InputContainer>
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
                    <Genders>
                        <AnimatedRadioButton>
                            <input type="radio" name="g" defaultChecked={true} value={'male'} onChange={this.genderChangeHandler}/>
                            <span>Я мужчина</span>
                        </AnimatedRadioButton>
                        <AnimatedRadioButton>
                            <input type="radio" name="g" value={'female'} onChange={this.genderChangeHandler}/>
                            <span>Я женщина</span>
                        </AnimatedRadioButton>
                    </Genders>
                    <Button onClick={this.send}>Регистрация</Button>
                    <StyledLink to={'/'}>Уже есть аккаунт? Войти</StyledLink>
                    <StyledLink to={'/'}>Забыли пароль?</StyledLink>
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
    padding-bottom: 200px;
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

const Genders = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;  
`;