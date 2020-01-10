import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import {faChevronUp, faChevronDown} from "@fortawesome/free-solid-svg-icons/index";
import {AnimatedCheckBlock} from "../../stores/AnimatedObjectStore";
import {inject} from "mobx-react/index";

@inject('store')
export default class FilterDropdown extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            opened: false
        }
        this.toggleFilterDropdown = this.toggleFilterDropdown.bind(this);
        // this.toggleFilter = this.toggleFilter.bind(this);
    }

    toggleFilterDropdown(){
        this.setState(oldState => ({opened: !oldState.opened}))
    }

    toggleFilter(id,e) {
        this.props.store.filters.setProperty(id,e.target.checked);z
    }

render() {
    return(
        <Container key={this.props.Title}>
            <Title onClick={this.toggleFilterDropdown}>
                <span>{this.props.Title}</span>
                <FontAwesomeIcon icon={this.state.opened ? faChevronUp : faChevronDown} size={'lg'}/>
            </Title>
            <Body opened={this.state.opened}>
                {this.props.data.map(elem =>
                    <AnimatedCheckBlock
                        key={elem._id}
                        Color={'#e36f64'}
                        LabelColor={'#444'}>
                        <input
                            type="checkbox"
                            onClick={this.toggleFilter.bind(this,elem._id)}
                        />
                        <span>{elem.property_val}</span>
                    </AnimatedCheckBlock>
                )}
            </Body>
        </Container>
    )
    }
}

const Container = styled.div`
    
    
`;

const Title = styled.div`
    display: grid;
    grid-template-columns: 1fr 25px;
    padding: 5px 10px;
    cursor: pointer;
    background-position: center;
    transition: all 1.2s;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
    -webkit-tap-highlight-color: transparent;
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
    padding: ${props => props.opened ? '10px 15px':'0 15px'};
    overflow: hidden;
`;