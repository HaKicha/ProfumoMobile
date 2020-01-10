import React from 'react';
import styled from 'styled-components';
import Category from "./Category";
import {getCategoryTree} from "../../api/Categories";
import PageWrapper from "../public/PageWrapper";
import ReactGA from 'react-ga';
import MetaTags from "react-meta-tags";
import InfoFooter from "../public/InfoFooter";


export default class CategoryNavigation extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            categories: []
        }
    }

    componentWillMount() {
        ReactGA.pageview(location.pathname);
        getCategoryTree().then(data => {this.setState({categories: data})})
    }

    render() {
        return(
            <PageWrapper>
                <MetaTags>
                    <title>Категории</title>
                </MetaTags>
                <Container>
                    {this.state.categories.map(elem => {return <Category key={elem.key} data={elem}/>})}
                </Container>
                <InfoFooter/>
            </PageWrapper>
        )
    }
}

const Container = styled.div`
    padding-bottom: 50px;
`;