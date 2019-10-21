import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export default class Category extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            opened: false
        };
        this.toggleFilterDropdown = this.toggleFilterDropdown.bind(this);
    }

    toggleFilterDropdown(){
        this.setState(oldState => ({opened: !oldState.opened}))
    }

render() {
    if (this.props.data.children)
    return(
        <div>
            <Title onClick={this.toggleFilterDropdown}>
                <span>{this.props.data.label}</span>
                <FontAwesomeIcon icon={this.state.opened ? faChevronUp : faChevronDown} size={'lg'}/>
            </Title>
            {this.props.data.children? <Body opened={this.state.opened}>
                {this.props.data.children.map(elem => <Pane to={'/catalog/'+elem.key} key={elem.key} onClick={this.props.closePane}>{elem.label}</Pane>)}
                <Pane to={'/catalog/' + this.props.data.key} onClick={this.props.closePane}>Все в категории {this.props.data.label}</Pane>
            </Body>:null}
        </div>
    )
    return (
        <Pane to={'/catalog/' + this.props.data.key} onClick={this.props.closePane}>{this.props.data.label}</Pane>
    )
    }
}

const Title = styled.div`
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    font-size: 12pt;
    color: #fff;
    padding-left: 10px;
    width: calc(100% - 10px);
    display: grid;
    grid-template-columns: 1fr 35px;
    cursor: pointer;
    background-position: center;
    align-items: center;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
    transition: background-color 1.2s;
    span {
        display: block;
    }

    &:active {
        background-color:  ${props => props.bgcolor||'rgba(214,214,214,0.50)'};
        background-size: 150%;
        transition: background 0s;
    }
`;

const Body = styled.div`
    display: grid;
    height: ${props => props.opened ? 'auto':'0'};
    overflow: hidden;
    padding-left: 15px;
`;

const Pane = styled(Link)`
    min-height: 40px;
    line-height: 40px;
    vertical-align: middle;
    font-size: 12pt;
    color: #fff;
    width: calc(100% - 10px);
    padding-left: 10px;
    display: grid;
    cursor: pointer;
    background-position: center;
    align-items: center;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
    transition: background-color 1.2s;
    text-decoration: none;
    &:active {
        background-color:  ${props => props.bgcolor||'rgba(214,214,214,0.50)'};
        background-size: 150%;
        transition: background 0s;
    }
    
`;