import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import Logo from '../../resources/image/Logo_dark.svg';
import {Link} from "react-router-dom";
import {forgotPassword as SendEmail} from '../../api/Auth';
import routes from '../../stores/routes';

export default class ForgotPassword extends React.Component {

    constructor(props){
        super(props);
        this.email = '';

        this.state = {
            loading: false,
            error: false,
            complete: false
        }

        this.inputHandler = this.inputHandler.bind(this);
        this.send = this.send.bind(this);
    }

    inputHandler(e){
        this[e.target.name] = e.target.value;
    }

    send(){
        SendEmail(this.email).then(response => {
            this.setState({loading: true});
            if (response) this.setState({loading: false, complete: true});
            else this.setState({loading: false, error: true});
        })
    }

    render() {

        let sendEmailForm = <React.Fragment>
            <h1>Сброс пароля</h1>
            <Info>Для сброса пароль укажите пожалуста свой Email</Info>
            <InputContainer warning={this.state.error}>
                <input type={'email'} name={'email'} placeholder={"E-mail"} onChange={this.inputHandler}/>
                <span/>
                <Hint visible={this.state.error}>Email указан неверно</Hint>
            </InputContainer>

            <Button onClick={this.send}>Отправить</Button>
        </React.Fragment>

        let complete = <React.Fragment>
            <h1>Успешно</h1>
            <Info>На указанный вами e-mail будет отправлено письмо с подтверждением</Info>
            <Info>Проверьте, пожалуйста, свою почту и следуйте указанным инструкциям</Info>

        </React.Fragment>

        return(
            <ThemeProvider theme={theme}>
                <Container>
                    <Image src={Logo}/>
                    {this.state.complete?complete:sendEmailForm}

                    <StyledLink to={routes.SIGN_UP}>Регистрация</StyledLink>
                    <StyledLink to={routes.SIGN_IN}>Войти</StyledLink>
                </Container>
            </ThemeProvider>
        )
    }
}

const Container = styled.div`
    display: grid;
    width: 100vw;
    height: 100vh;
    overflow: hidden;  
    grid-template-rows: 150px repeat(5, max-content);
    grid-gap: 25px;
    justify-items: center;
    
    h1 {
        margin: 0;
    }
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

const Info = styled.p`
    padding: 0 20px;
    display: block;
    color: #767676;    
    margin: 0;
`;

