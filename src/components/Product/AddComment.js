import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import PageWrapper from "../public/PageWrapper";
import StarRatings from "react-star-ratings";
import {theme} from "../../stores/StyleStore";
import {addComment} from "../../api/Comments";
import {history} from "../App";
import {Link} from "react-router-dom";

export default class AddComment extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            rating: 5,
            loading: false
        }
        this.id = props.match.params.id;
        this.text = '';
    }

    setRating = grade =>  {this.setState({rating: grade})}
    setText = e => {this.text = e.target.value};
    send = e => {
        e.preventDefault();
        this.setState({loading: true})
        addComment(this.text, this.state.rating, this.id).then(() => {
            history.push('/product/' + this.id);
        })
    }

render() {
    return(
        <ThemeProvider theme={theme}>
        <PageWrapper>
            <Container>
                <h4>Добавить коментарий</h4>
                <Textarea
                spellCheck={"false"}
                name={'text'}
                placeholder={'Текст сообщения'}
                required={true}
                onChange={this.setText}
                />
                <b>Оцените продукт</b>
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
                <Button onClick={this.send}>
                    Отправить
                </Button>
                <StyledLink to={'/product/' + this.id}>
                    Назад
                </StyledLink>
            </Container>
        </PageWrapper>
        </ThemeProvider>
    )
    }
}

const Container = styled.div`
    display: grid;
    justify-items: center;
    
`;


const Textarea = styled.textarea`
    height: 120px;
    padding: 15px 5px 5px 15px;
    display: block;
    width: 300px;
    margin: 10px auto;
    border: 2px solid #ccc;
    resize: none;
    font-size: 14pt;
    font-family: "Gilroy" !important;
    outline: none;
    box-shadow: 0 0 1px 1px white;
    &:focus {
            border: 1px solid ${props => props.theme.primary};
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
    margin-bottom: 15px;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
    &:hover{
         background: ${props => props.theme.primary_light};   
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