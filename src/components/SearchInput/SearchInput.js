import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default class SearchInput extends React.Component {
    render() {
        return (
                <Main>
                    <SearchIcon icon={faSearch} size={'lg'}/>
                    <Input type="text"/>
                    <ClearButton icon={faTimes} size={'lg'}/>
                </Main>
        )
    }

}

const Main = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 15% 1fr 15%;
  height: 50px;
 `
const Input = styled.input`
  justify-self: center;
  align-self: center;
  width: 90%;
  height: 40px;
  -webkit-box-shadow: 0 0 2px 2px #aaa;
  -moz-box-shadow: 0 0 2px 2px #aaa;
  box-shadow: 0 0 2px 2px #aaa;
  outline: none;
  border: 1px #767676;
  padding: 0 50px 0 50px;
  z-index: 1;
  font-size: 18px;
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


