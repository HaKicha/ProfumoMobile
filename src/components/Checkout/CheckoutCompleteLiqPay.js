import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {theme} from "../../stores/StyleStore";
import {inject} from "mobx-react";
import PageWrapper from "../public/PageWrapper";
import ReactGA from 'react-ga';
import MetaTags from "react-meta-tags";

const base64DecodeUnicode = function(str) {
    // Convert Base64 encoded bytes to percent-encoding, and then get the original string.
    let percentEncodedStr = atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('');


    return decodeURIComponent(percentEncodedStr);
};

@inject('store')
export default class CheckoutCompleteLiqPay extends React.Component {

    constructor(props){
        super(props);
        let str = new URL(location.href).searchParams.get('postdata');
        str = base64DecodeUnicode(str);

        this.postdata = JSON.parse(JSON.parse(str));
    }

    componentWillMount() {
        ReactGA.pageview(location.pathname);
    }

    render() {
        if (Array.isArray(this.postdata.data))
            return(
                <PageWrapper>
                    <MetaTags>
                        <title>Заказ успешен</title>
                    </MetaTags>
                    <Container>
                        <h2>Заказ отправлен в обработку</h2>
                        <h3>Наш сотрудник свяжется с вами</h3>
                        <table>
                            <tbody>
                            <tr>
                                <td>Стоимость доставки: </td>
                                <td>{this.postdata.data[0].CostOnSite} грн</td>
                            </tr>
                            <tr>
                                <td>ТТН: </td>
                                <td>{this.postdata.data[0].IntDocNumber}</td>
                            </tr>
                            <tr>
                                <td>Предполагаемая дата доставки: </td>
                                <td>{this.postdata.data[0].EstimatedDeliveryDate}</td>
                            </tr>
                            </tbody>
                        </table>
                        <StyledLink to={'/'}>Вернуться к покупкам</StyledLink>
                    </Container>
                </PageWrapper>
                )

        else return <Container>
            <h2>Произошла ошибка</h2>
            <h3>Ошибка: {this.postdata.data.error}</h3>
            <StyledLink to={'/'}>На главную</StyledLink>
        </Container>

    }
}

const Container = styled.div`
    width: calc(100% - 40px);
    display: grid;
    padding: 20px;
    overflow-x: hidden;
    h2,h3 {
        text-align: center;
        margin: 5px 0;
    }
    table {
        width: 100%;
        font-size: 14pt;
    }
    
`;

const StyledLink = styled(Link)`
    display: block;
    background: white;
    margin: 20px auto;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    height: 35px;
    font-size: 14pt;
    color: ${theme.primary};
    font-weight: bold;
    cursor: pointer;
    width: 90%;
    text-align: center;
    vertical-align: center; 
    line-height: 35px;
    border: 1px solid ${theme.primary};
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
    &:hover{
         background: ${theme.primary_light};   
         color: white;
    } 
    
`;