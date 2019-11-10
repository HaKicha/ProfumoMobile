import React from 'react';
import PageWrapper from "../public/PageWrapper";
import Recomendations from "../public/Recomendations";
import Slider from "./Slider";
import Categories from "./Categories";
import Banner from "./Banner";
import BlogRefs from "./BlogRefs";
import ReactGA from 'react-ga';
import MetaTags from 'react-meta-tags';
import InfoFooter from "./InfoFooter";

export default class MainPage extends React.Component {

    componentWillMount() {
        ReactGA.pageview(location.pathname);
    }

    render() {
    return(
       <PageWrapper>
           <MetaTags>
               <title>Profumo</title>
           </MetaTags>
           <Slider/>
           <Categories/>
           <Banner/>
           <Recomendations/>
           <BlogRefs/>
           <InfoFooter/>
       </PageWrapper>
    )
    }
}

