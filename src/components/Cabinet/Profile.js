import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import PageWrapper from "../public/PageWrapper";
import {inject, observer} from "mobx-react";
import {theme} from "../../stores/StyleStore";
import {AnimatedRadioButton} from "../../stores/AnimatedObjectStore";
import {changeUserData} from "../../api/User";
import Preloader from "../public/Preloader";
import {Redirect} from "react-router";
import routes from "../../stores/routes";
import ReactGA from 'react-ga';
import history from "../../resources/image/cabinet/history.svg";
import MetaTags from "react-meta-tags";

@inject('store')
@observer
export default class Profile extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            loading: false,
            gender: ''
        }

        this.name = '';
        this.surname = '';
        this.maleRef = React.createRef();
        this.femaleRef = React.createRef();

        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.save = this.save.bind(this);
    }

    componentWillMount() {
        ReactGA.pageview(location.pathname);
    }

    inputHandler(e){
        this[e.target.name] = e.target.value;
    }

    genderChangeHandler(e){
        this.setState({
            gender: e.target.value
        })
    }



    save(e){
        e.preventDefault();
        let data = {};
        data.name = this.name;
        data.surname = this.surname;
        data.gender = this.state.gender;
        console.log(data);
        this.setState({loading: true});
        changeUserData(data).then(response => {
            this.props.store.userStore.setUser(response);
            this.setState({loading: false});
        })
    }


    render() {
        setTimeout(() => {
            if (!this.props.store.userStore.isLogged) history.push(routes.SIGN_IN);
        }, 2500);
        if (this.state.loading) return <Preloader/>
        if (this.state.gender !== this.props.store.userStore.User.gender)
            this.setState({gender: this.props.store.userStore.User.gender})
        this.name = this.props.store.userStore.User.name;
        this.surname = this.props.store.userStore.User.surname;

    return(
        <ThemeProvider theme={theme}>
            <PageWrapper>
                <MetaTags>
                    <title>Личные настройки</title>
                </MetaTags>
                <Container>
                    <h4>Редактировать профиль</h4>
                    <InputContainer>
                        <b>Имя</b>
                        <input type={'text'} name={'name'} placeholder={'Имя'} defaultValue={this.props.store.userStore.User.name} onChange={this.inputHandler}/>
                        <span/>
                    </InputContainer>
                    <InputContainer>
                        <b>Фамилия</b>
                        <input type={'text'} name={'surname'} placeholder={'Фамилия'} defaultValue={this.props.store.userStore.User.surname} onChange={this.inputHandler}/>
                        <span/>
                    </InputContainer>
                    <InputContainer>
                        <b>Телефон</b>
                        <input type={'text'} placeholder={'Телефон'} readOnly={true} value={this.props.store.userStore.User.username}/>
                        <span/>
                    </InputContainer>
                    <InputContainer>
                        <b>Email</b>
                        <input type={'text'} placeholder={'Email'} readOnly={true} value={this.props.store.userStore.User.email}/>
                        <span/>
                    </InputContainer>
                    <Genders>
                        <b>Пол</b>
                        <AnimatedRadioButton margin={'0'}>
                            <input type="radio" name="g" ref={this.maleRef} checked={this.state.gender === 'male'} value={'male'} onChange={this.genderChangeHandler}/>
                            <span>Мужчина</span>
                        </AnimatedRadioButton>
                        <AnimatedRadioButton margin={'5px 0'}>
                            <input type="radio" name="g" value={'female'} checked={this.state.gender === 'female'} ref={this.femaleRef} onChange={this.genderChangeHandler}/>
                            <span>Женщина</span>
                        </AnimatedRadioButton>
                    </Genders>
                    <Button onClick={this.save}>Сохранить</Button>
                </Container>
            </PageWrapper>
        </ThemeProvider>
    )
    }
}

const Container = styled.div`
    display: grid;
    padding: 20px;
    justify-items: center;
`;


const InputContainer = styled.label`
    display: block;
    width: 100%;
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


const Genders = styled.div`
    display: grid;
    justify-self: left;
`;

const Button = styled.button`
    margin-top: 20px;
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
