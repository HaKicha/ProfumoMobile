import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import ProductPane from "./ProductPane";
import {theme} from "../../../stores/StyleStore";
import StarRatings from 'react-star-ratings';
import {sendFeedback} from "../../../api/Feedback";


export default class Order extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            opened: false,
            rating: 5,
            loading: false
        }
        this.feedback = '';
        this.toggleAddInfo = this.toggleAddInfo.bind(this);
    }

    toggleAddInfo(){
        this.setState(oldState => {
            return {opened: !oldState.opened}
        })
    }


    getStatusString = status => {
        switch (status) {
            case 'success': return 'Оплачено'
            case 'error': return 'Ошибка'
            case 'failure': return 'Ошибка'
            case 'revoke': return 'Отменен'
            case 'in_post': return 'На почте'
            case 'processing': return 'Обрабатывается'
            case 'ordered': return 'Доставлено'
        }
    }

    setRating = grade =>  {this.setState({rating: grade})}
    setFeedback = e => {this.feedback = e.target.value}

    sendFeedback = e => {
        e.preventDefault();
        this.setState({loading: true})
        let data = {
            text: this.feedback,
            order: this.props.order._id,
            rank: this.state.rating
        }
        console.log(data);
        console.log(this.props.order);
        sendFeedback(data)
            .then(response => setTimeout(() => {
                this.setState({loading: false})
            },1500));
    }

render() {
    return(
        <ThemeProvider theme={theme}>
        <Container opened={this.state.opened}>
            <Head onClick={this.toggleAddInfo}>
                <span>{new Date(this.props.order.updatedAt).toLocaleDateString()}</span>
                <span>Товаров: {this.props.order.orders.length}</span>
                <span>Сума: {this.props.order.orders.reduce((acc,el) => {
                   if (el.discount_price > 0) return acc + el.product.discount_price * el.count;
                   else return acc + el.product.price  * el.count;
                },0)} грн.</span>
            </Head>
            <AddInfo visible={this.state.opened}>
                {this.props.order.orders.map(el => <ProductPane order={el} key={el.product.id}/>)}
                <b>Статус доставки: <Status>{this.getStatusString(this.props.order.status)}</Status></b>
                <b>Способ оплаты</b>
                <Payment>{this.props.order.type === 'liqpay'?'Электронный платеж (Liqpay)':'Оплата наличными (Новая почта)'}</Payment>

                <b>Способ доставки</b>
                <Textarea>
                    <textarea
                        readOnly={true}
                        value={`Новая почта. ${this.props.order.deliveryInfo.cityName}\n${this.props.order.deliveryInfo.postOfficeName}\n${this.props.order.deliveryInfo.surname} ${this.props.order.deliveryInfo.name} ${this.props.order.deliveryInfo.phone}\nТТН: ${this.props.order.newpost[0].IntDocNumber}`}
                    />
                </Textarea>

                <b>Поставить оценку</b>
                <Rating>
                    <StarRatings
                        rating={this.state.rating}
                        starRatedColor={theme.primary}
                        starEmptyColor={'gray'}
                        numberOfStars={5}
                        name='rating'
                        starDimension={'35px'}
                        starSpacing={'5px'}
                        changeRating={this.setRating}
                        starHoverColor={theme.primary_light}
                    />
                </Rating>

                <b>Оставте отзыв</b>
                <Textarea>
                    <textarea onChange={this.setFeedback}/>
                </Textarea>
                <Button onClick={this.sendFeedback}>Отправить отзыв</Button>
            </AddInfo>
        </Container>
        </ThemeProvider>
    )
    }
}

const Container = styled.div`
    display: grid;
    height: ${props => props.opened?'auto':'35px'};
    border-bottom: 1px solid #ccc;
`;

const Head = styled.div`
    height: 35px;
    border-bottom: 1px solid #ccc;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;  
    grid-gap: 10px;
    font-size: 10pt;
    align-items: center;
    background-position: center;
    transition: all 1.2s;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
    span:last-child{
      justify-self: right;
    }
        &:active {
        background-color:  ${props => props.bgcolor||'rgba(214,214,214,0.50)'};
        background-size: 150%;
        transition: background 0s;
    }
`;

const AddInfo = styled.div`
    display: ${props => props.visible?'grid':'none'};
    padding-bottom: 30px;
`;

const Status = styled.span`
    font-weight: normal;
    font-size: 12pt;
`;

const Payment = styled.p`
    display: grid;
    font-size: 10pt;
    margin-top: 10px;
    span {
        text-align: right;
    }
`;

const Textarea = styled.div`
    display: grid;
    
    textarea {
        resize: none;
        height: 100px;
        padding: 10px 20px;
        border: none;
        font-family: "Gilroy" !important;
        border-radius: 10px;
        box-shadow: 0 0 1px 1px #b2b2b2,  0 0 1px 1px #b2b2b2 inset;
        outline: none;
        &:focus:not([readonly]) {
            box-shadow: 0 0 1px 1px ${theme.primary},  0 0 1px 1px ${theme.primary} inset;
        }
    }
`;

const Rating = styled.div`
    display: grid;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    span{
        vertical-align: center;
        height: 20px;
    }
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
    justify-self: center;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
    &:hover{
         background: ${props => props.theme.primary_light};   
    }  
`;