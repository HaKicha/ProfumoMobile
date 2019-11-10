import React from 'react';
import PageWrapper from "../public/PageWrapper";
import styled from'styled-components';
import {theme} from "../../stores/StyleStore";
import ReactSelect from "react-select";
import {inject, observer} from "mobx-react";
import routes from '../../stores/routes';
import {history} from "../App";
import ReactGA from 'react-ga';
import MetaTags from "react-meta-tags";

@inject('store')
@observer
export default class AcceptPayment extends React.Component {

    constructor(props){
        super(props);
        props.store.checkoutStore.setPayment('nova_poshta');
        this.state = {
            payment: {
                value: 'nova_poshta',
                label: 'Оплата наличными (Новая почта)'
            }
        }
        this.setPaymentHandler = this.setPaymentHandler.bind(this);
        this.setComment = this.setComment.bind(this);
        this.goToPayment = this.goToPayment.bind(this);
    }

    componentWillMount() {
        ReactGA.pageview(location.pathname);
    }

    options = [{
        value: 'nova_poshta',
        label: 'Оплата наличными (Новая почта)'
    },{
        value: 'liqpay',
        label: 'Электронный платеж (Liqpay)'
    }]

    setPaymentHandler(data){
        this.setState({
            payment: data
        })
        this.props.store.checkoutStore.setPayment(data.value);
    }

    setComment(e){
        this.props.store.checkoutStore.setComment(e.target.value);
    }

    goToPayment(){
        if (this.props.store.checkoutStore.payment === 'nova_poshta'){
            history.push(routes.CHECKOUT_COMPLETE_NOVA_POSHTA)
        } else if (this.props.store.checkoutStore.payment === 'liqpay') history.push(routes.CHECKOUT_REDIRECT_LIQPAY)

    }

render() {
    return(
        <PageWrapper>

            <MetaTags>
                <title>Оплата</title>
            </MetaTags>

            <Container>
                <Title>Выберите способ оплаы</Title>
                <ReactSelect
                    placeholder={''}
                    styles={reactSelectStyles}
                    options={this.options}
                    value={this.state.payment}
                    onChange={this.setPaymentHandler}
                    onBlur={event => event.preventDefault()}
                />
                <Title>Комментарии и пожелания</Title>
                <Textarea
                    spellCheck={"false"}
                    name={'text'}
                    placeholder={'Текст сообщения'}
                    required={true}
                    defaultValue={this.props.store.checkoutStore.comment}
                    onChange={this.setComment}
                />
                <Button onClick={this.goToPayment}>Подтвердить</Button>
            </Container>

        </PageWrapper>
    )
    }
}

const Container = styled.div`
    padding: 0 20px;
    
`;


const Title = styled.h3`
    text-align: center;
    margin: 10px 0;
    padding: 0;
    border-bottom: 1px solid #ccc;
    width: 100%;
    
`;

const Textarea = styled.textarea`
    height: 120px;
    padding: 15px;
    display: block;
    width: calc(100% - 30px);
    margin: 10px auto;
    border: 2px solid #ccc;
    resize: none;
    font-size: 14pt;
    font-family: "Gilroy" !important;
    outline: none;
    box-shadow: 0 0 1px 1px white;
    &:focus {
            border: 1px solid ${theme.primary};
    }
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