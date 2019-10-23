import React from 'react';
import '@material/button/dist/mdc.button.min.css';
import '@material/checkbox/dist/mdc.checkbox.min.css'
import PageWrapper from "../public/PageWrapper";
import Recomendations from "../public/Recomendations";

export default class MainPage extends React.Component {

render() {
    return(
       <PageWrapper>
           <Recomendations/>
       </PageWrapper>
    )
    }
}

