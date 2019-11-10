import React from 'react';
import {changeUserData, me} from "../../api/User";
import {theme} from "../../stores/StyleStore";
import PageWrapper from "../public/PageWrapper";
import styled, {ThemeProvider} from "styled-components";
import {getCitiesByName, getPostOffices} from "../../api/NovaPoshta";
import ReactSelect from 'react-select'
import {inject, observer} from "mobx-react";
import Preloader from "../public/Preloader";
import {history} from "../App";
import routes from '../../stores/routes';
import ReactGA from 'react-ga';
import MetaTags from "react-meta-tags";

@inject('store')
@observer
export default class AcceptAddress extends React.Component {



    constructor(props){
        super(props);
        this.state = {
            name: '',
            surname: '',
            phone: '',
            cities: [],
            cityName: '',
            cityCode: '',
            postOffices: [],
            postOfficeName: '',
            postOfficeCode: '',
            loading: true,
            cityDescription: ''
        }

        this.saveData = this.saveData.bind(this);
    }

    setPostOffice = (option => {
        this.setState({
            cityName: option.label,
            cityCode: option.value,
        })
        if (option !== null)
            getPostOffices(option.value).then(data => {return data.map(elem => {
                return {
                    value: elem.Ref,
                    label: elem.DescriptionRu
                }
            })}).then(options => this.setState({
                postOffices: options,
                cityName: option.label,
                postOfficeName: '',
                postOfficeCode: ''
            }))
        else this.setState({
            postOffices: [],
            postOfficeName: '',
            postOfficeCode: ''
        })
    }).bind(this);

    setCities = (name => {
        if (name.length >= 3)
            getCitiesByName(name).then(data => {return data.map(elem => {
                return {
                    value: elem.Ref,
                    label: elem.SettlementTypeDescriptionRu + ' ' + elem.DescriptionRu
                }
            })}).then(options => {
                console.log(options);
                this.setState({
                    cities: options
                })
            });
    }).bind(this);



    componentWillMount() {
        ReactGA.pageview(location.pathname);
        me().then(data => {
            if (data !== false) {
                this.setState({
                    name: data.adress.name || '',
                    surname: data.adress.surname || '',
                    phone: data.adress.phone || '',
                    cityName: data.adress.cityName || '',
                    cityCode: data.adress.cityCode || '',
                    postOfficeName: data.adress.postOfficeName || '',
                    postOfficeCode: data.adress.postOfficeCode || '',
                    cityDescription: data.adress.cityDescription || '',
                    loading: false
                })
            } else  this.setState({loading: false})
        });
    }

    saveData = e => {
        let data = {};
        data.name = this.state.name;
        data.surname = this.state.surname;
        data.phone = this.state.phone;
        data.cityName = this.state.cityName;
        data.cityCode = this.state.cityCode;
        data.postOfficeName = this.state.postOfficeName;
        data.postOfficeCode = this.state.postOfficeCode;
        data.cityDescription = this.state.cityDescription;
        this.props.store.checkoutStore.setAddress(data);
        history.push(routes.CHECKOUT_PAYMENT);
    }

    setName = e => {
        this.setState({
            name: e.target.value
        })
    }

    setSurname = e => {
        this.setState({
            surname: e.target.value
        })
    }

    setPhone = e => {
        this.setState({
            phone: e.target.value
        })
    }


    setCurrentPostOffice = (e => {
        this.setState({
            postOfficeName: e.label,
            postOfficeCode: e.value
        })
    }).bind(this);

    render() {
        if (this.state.loading) return <Preloader/>
        return(
            <ThemeProvider theme={theme}>
                <PageWrapper>

                    <MetaTags>
                        <title>Доставка</title>
                    </MetaTags>
                    <Container>
                        <Title>Адрес доставки (Новая почта)</Title>
                        <InputContainer>
                            <b>Имя</b>
                            <input type={'text'} name={'name'} placeholder={'Имя'} defaultValue={this.state.name} onChange={this.setName}/>
                            <span/>
                        </InputContainer>
                        <InputContainer>
                            <b>Фамилия</b>
                            <input type={'text'} name={'surname'} placeholder={'Фамилия'} defaultValue={this.state.surname} onChange={this.setSurname}/>
                            <span/>
                        </InputContainer>
                        <InputContainer>
                            <b>Телефон</b>
                            <input type={'text'} placeholder={'Телефон'} defaultValue={this.state.phone}  onChange={this.setPhone}/>
                            <span/>
                        </InputContainer>
                        <SelectContainer>
                            <b>Город</b>
                            <ReactSelect
                                noOptionsMessage={() => 'Введите ваш город'}
                                placeholder={''}
                                styles={reactSelectStyles}
                                onInputChange={e => {this.setCities(e)}}
                                onChange={this.setPostOffice}
                                options={this.state.cities}
                                value={{
                                    label: this.state.cityName,
                                    value: this.state.cityCode
                                }}
                                isClearable={true}
                                onBlur={event => event.preventDefault()}
                            />
                        </SelectContainer>
                        <SelectContainer>
                            <b>Отделение Новой Пошты</b>
                            <ReactSelect
                                noOptionsMessage={() => 'Выберите отделение'}
                                placeholder={''}
                                styles={reactSelectStyles}
                                options={this.state.postOffices}
                                isClearable={true}
                                value={{
                                    label: this.state.postOfficeName,
                                    value: this.state.postOfficeCode
                                }}
                                onChange={this.setCurrentPostOffice}
                                onBlur={event => event.preventDefault()}
                            />
                        </SelectContainer>
                        <Button onClick={this.saveData}>Подтвердить</Button>
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


const SelectContainer = styled.div`
    display: block;
    width: 100%;
`;


const Button = styled.button`
    display: block;
    background: ${theme.primary};
    margin: 20px auto;
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
         background: ${theme.primary_light};   
    }  
`;

const Title = styled.h3`
    text-align: center;
    margin: 10px 0;
    padding: 0;
    border-bottom: 1px solid #ccc;
    width: 100%;
    
`;


const reactSelectStyles = {
    container: styles => ({...styles, height: '38px', display: 'block', width: '100%'}),
    control: (styles, state) => (
        {...styles,
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            borderRadius: '0',
            borderBottom: state.isFocused?`2px solid ${theme.primary} !important`:'2px solid #ccc',
            height: state.isFocused?'36px':'38px',
            width: '100%',
            cursor: 'text',
            outline: state.isFocused?`1px solid ${theme.primary} !important`:'none',
            '&:hover':{
                border: `none`,
                outline: 'none'
            }
        }),
    dropdownIndicator: styles => ({...styles, color: '#ccc',cursor: 'pointer', '&:hover':{color: '#000'}}),
    indicatorSeparator: styles => ({...styles, backgroundColor: '#ccc', '&:hover':{backgroundColor: '#ccc'}}),
    input: styles => ({...styles, fontSize: '14pt', color: 'black',outline: 'none',cursor: 'text'}),
    singleValue: styles  => ({...styles, color: 'black',fontSize: '14pt'}),
    clearIndicator: styles  => ({...styles, cursor: 'pointer'})
};