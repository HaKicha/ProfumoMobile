import React from 'react';
import PageWrapper from "../public/PageWrapper";
import SearchInput from "../public/SearchInput";
import Recomendations from "../public/Recomendations";
import ReactGA from 'react-ga';
import MetaTags from "react-meta-tags";

export default class Search extends React.Component {

    componentWillMount() {
        ReactGA.pageview(location.pathname);
    }

    render() {
    return(
        <PageWrapper>
            <MetaTags>
                <title>Поиск</title>
            </MetaTags>
            <SearchInput productId={''}/>
            <Recomendations/>
        </PageWrapper>
    )
    }
}