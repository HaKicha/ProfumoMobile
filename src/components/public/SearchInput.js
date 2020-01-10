import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import {faSearch} from '@fortawesome/free-solid-svg-icons/index';
import {faTimes} from '@fortawesome/free-solid-svg-icons/index';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import {AnimatedIcon} from "../../stores/AnimatedObjectStore";
import {history} from "../App";

export default class SearchInput extends React.Component {

    constructor(props){
        super(props);
        this.inputRef = React.createRef();
        this.searchClickHandler = this.searchClickHandler.bind(this);
        this.clearClickHandler = this.clearClickHandler.bind(this);
    }

    searchClickHandler(){
        if (this.inputRef.current.value !== '') {
            let Url = '/catalog/';
            if (this.props.productId !== '') Url += this.props.productId;
            Url += '&';
            Url += this.inputRef.current.value;
            this.props.close();
            history.push(Url);
        }
    }

    componentWillMount(){
        document.addEventListener('keyup', (e) => {
            if (this.props.open && e.key === 'Enter') this.searchClickHandler();
        })
    }

    clearClickHandler(){
        this.inputRef.current.value = '';
        this.inputRef.current.focus()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.open) {
            this.inputRef.current.value = '';
            this.inputRef.current.focus();
        }
    }

    render() {
        return (
                <Container open={this.props.open}>
                    <Background  onClick={this.props.close}/>
                    <Main>
                        <Input type="text" placeholder={'Поиск'} ref={this.inputRef} onClick={e =>{ e.stopPropagation()}}/>
                        <AnimatedIcon icon={faSearch} size={'sm'} color={'#6f6f6f'} onClick={this.searchClickHandler}/>
                    </Main>
                </Container>
        )
    }
}

const Main = styled.div`
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 10%;
    padding: 0 5%;
    -webkit-box-shadow: 0 0 2px 0 #575757;
    -moz-box-shadow: 0 0 2px 0 #575757;
    box-shadow: 0 0 2px 0 #575757;
    border: 1px #575757;
    border-radius: 5px;
    background: #fff;
    height: 50px;
    position: fixed;
    top: 70px;
    left: 5%;
    right: 5%;
    z-index: 101;
 `
const Input = styled.input`
    justify-self: center;
    align-self: center;
    width: 100%;
    height: 40px;
    outline: none;
    z-index: 1;
    font-size: 18px;
    border: none;
    
`

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    display: ${props => props.open?'block':'none'};
    z-index: 100;
`;

const Background = styled.div`
    background: #777;
    opacity: 0.5;
    height: 100vh;
    width: 100vw;
    z-index: 100;
    opacity: 0.5;
`;