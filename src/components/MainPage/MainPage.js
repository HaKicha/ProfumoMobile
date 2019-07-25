import React from 'react';
import '@material/button/dist/mdc.button.min.css';
import '@material/checkbox/dist/mdc.checkbox.min.css'

export default class MainPage extends React.Component {

render() {
    return(
            <div className="mdc-checkbox">
                <input type="checkbox"
                       className="mdc-checkbox__native-control"
                       id="checkbox-1"/>
                <div className="mdc-checkbox__background">
                    <svg className="mdc-checkbox__checkmark"
                         viewBox="0 0 24 24">
                        <path className="mdc-checkbox__checkmark-path"
                              fill="none"
                              d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                    </svg>
                    <div className="mdc-checkbox__mixedmark"></div>
                </div>
            </div>
    )
    }
}