import React from 'react';
import styled from 'styled-components';
import Category from "./Category";
import {getCategoryTree} from "../../api/Categories";
import PageWrapper from "../public/PageWrapper";


export default class CategoryNavigation extends React.Component {

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
            <PageWrapper>
                <Container>
                    {this.state.categories.map(elem => {return <Category key={elem.key} data={elem}/>})}
                </Container>
            </PageWrapper>
        )
    }
}

const Container = styled.div`
    padding-bottom: 50px;
`;