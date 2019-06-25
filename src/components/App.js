import React, { Component } from "react";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import MainPage from "./MainPage/MainPage";

class App extends Component {
    render() {
        return (
        <BrowserRouter>
            <Switch>
                <Route path={'/'} component={MainPage}/>
            </Switch>
        </BrowserRouter>
    );
    }
}

export default App;