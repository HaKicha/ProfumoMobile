import React from 'react';
import '@material/button/dist/mdc.button.min.css';
import '@material/checkbox/dist/mdc.checkbox.min.css'
import Preloader from "../public/Preloader";
import {AnimatedRadioButton} from "../../stores/AnimatedObjectStore";
import PageWrapper from "../public/PageWrapper";

export default class MainPage extends React.Component {

render() {
    return(
       <PageWrapper>
           <div>
               <AnimatedRadioButton>
                   <input type="radio" name="g"/>
                   <span>Option 1</span>
               </AnimatedRadioButton>
               <AnimatedRadioButton>
                   <input type="radio" name="g"/>
                   <span>Option 1</span>
               </AnimatedRadioButton>
           </div>
       </PageWrapper>
    )
    }
}

