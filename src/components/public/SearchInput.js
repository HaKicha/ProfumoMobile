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
        if (this.inputRef.current.value !== '')
        history.push('/catalog/&' + this.inputRef.current.value);
    }

    clearClickHandler(){
        this.inputRef.current.value = '';
        this.inputRef.current.focus()
    }

    render() {
        return (
                <Main>
                    <AnimatedIcon icon={faSearch} size={'sm'} color={'#767676'} onClick={this.searchClickHandler}/>
                    <Input type="text" placeholder={'Поиск'} ref={this.inputRef}/>
                    <AnimatedIcon icon={faTimes} size={'sm'} color={'#767676'} onClick={this.clearClickHandler}/>
                </Main>
        )
    }
}

const Main = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: 15% 1fr 15%;
    height: 50px;
    -webkit-box-shadow: 0 0 2px 2px #aaa;
    -moz-box-shadow: 0 0 2px 2px #aaa;
    box-shadow: 0 0 2px 2px #aaa;
    border: 1px #767676;
    padding: 0 5%;
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
const ClearButton = styled(FontAwesomeIcon)`
  color: #767676;
  z-index: 2;
  margin-top: 15px;

  
  &:active{
    color: #333;
  }
`
const SearchIcon = styled(FontAwesomeIcon)`
  color: #767676;
  z-index: 2;
  margin-top: 15px;
  margin-left:70%;
  &:active{
    color: #333;
  }
`;


