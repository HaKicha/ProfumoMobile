import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons/index";
import {Link} from "react-router-dom";
import {inject} from "mobx-react";

@inject('store')
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
                <Image opened={this.state.opened} src={'data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJjaGV2cm9uLWRvd24iIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1jaGV2cm9uLWRvd24gZmEtdy0xNCBmYS1sZyAiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNDQ4IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNIDIwNy4wMjksMzgxLjQ3NiAxMi42ODYsMTg3LjEzMiBjIC05LjM3MywtOS4zNzMgLTkuMzczLC0yNC41NjkgMCwtMzMuOTQxIGwgNC40NTAwMTIsLTQuMTYyMzggYyA2LjE1NTYxMSwtNS43NTc3NCAxMy40OTU5MjgsLTEyLjA1OTYgMjUuMDgwMTQyLC0zLjU4NzUxIEwgMjIyLjkxNTI1LDMzMS4xNDkwNyA0MDQuMjM2NTMsMTQ3LjgzOTkzIGMgOS4zNzksLTkuMzM1IDIwLjM5NTg3LC03LjMwODgzIDI1LjIyMzAzLC0xLjU4NzEyIGwgNS44NTM0NCw2LjkzODE5IGMgOC41NDc0OCwxMC4xMzE0OCA5LjM3MywyNC41NjkgMCwzMy45NDEgTCAyNDAuOTcxLDM4MS40NzYgYyAtOS4zNzMsOS4zNzIgLTI0LjU2OSw5LjM3MiAtMzMuOTQyLDAgeiI+PC9wYXRoPjwvc3ZnPgo='}/>
            </Title>
            {this.props.data.children? <Body opened={this.state.opened}>
                {this.props.data.children.map(elem => <Pane to={'/catalog/'+elem.key} key={elem.key} onClick={() => {
                    this.props.store.filters.cleanProperties();
                    this.props.store.filters.setMaxPrice('');
                    this.props.store.filters.setMinPrice('');
                }}>{elem.label}</Pane>)}
                <Pane to={'/catalog/' + this.props.data.key} >Все в категории {this.props.data.label}</Pane>
            </Body>:null}
        </div>
    )
    return (
        <Pane to={'/catalog/' + this.props.data.key}>{this.props.data.label}</Pane>
    )
    }
}

const Title = styled.div`
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    font-size: 12pt;
    color: #000;
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
        font-weight: bold;
    }

    &:active {
        background-color:  rgba(181,181,181,0.5);
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
    color: #000;
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
    font-weight: bold;
    &:active {
        background-color:  ${props => 'black'||'rgba(214,214,214,0.50)'};
        background-size: 150%;
        transition: background 0s;
    }
    
`;

const Image = styled.img`
    height: 15px;
    width: 15px;
    transform: rotate(${props => props.opened?'180deg':'0'});   
    filter: brightness(150%);
`;