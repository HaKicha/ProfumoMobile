import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {theme} from "../../stores/StyleStore";
import '@material/menu/dist/mdc.menu.min.css'
import '@material/button/dist/mdc.button.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

export default class Search extends React.Component{
    render() {
        return(

                <Main>
                    <Filters>
                        <Button className={"mdc-button"}>
                            <span className={"mdc-button__label"}>Filters</span>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </Button>
                        <Button className={"mdc-button"}>
                            <span className={"mdc-button__label"}>Sort By</span>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </Button>
                    </Filters>

                </Main>
        )
    }
}
const Main = styled.div`
  display: grid;
  height: 40px;
`
const Filters = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  height: 40px;
`

const Button = styled.button`
  display: block;
  height: 40px !important;
  color: black !important;
  border-radius: 0 !important;
  span{
    margin-right: 10px;
  }
  &:before,
  &:after {
    background-color: #000000 !important;
  }
`


