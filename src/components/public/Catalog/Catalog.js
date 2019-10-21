import React from 'react';
import styled from 'styled-components';
import {getCategoryTree} from "../../../api/Categories";
import Category from "./Category";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp, faChevronDown} from "@fortawesome/free-solid-svg-icons";


export default class Catalog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            categories: []
        }
    }

    componentWillMount() {
        getCategoryTree().then(data => {this.setState({categories: data})})
    }

    render() {
    return(
        <Container>
            {this.state.categories.map(elem => {return <Category closePane={this.props.closePane} key={elem.key} data={elem}/>})}
        </Container>
    )
    }
}

const Container = styled.div`
    padding-bottom: 100px;
`;