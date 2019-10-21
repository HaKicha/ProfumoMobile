import React, {Component} from "react";
import {Provider} from 'mobx-react'
import {Route, Switch, BrowserRouter} from "react-router-dom";
import {Router} from "react-router";
const createHistory = require("history").createBrowserHistory;
import MainPage from "./MainPage/MainPage";
import Catalog from "./Catalog/Catalog";
import Product from "./Product/Product";
import '../index.css';
import {createHttpLink} from "apollo-link-http";
import {UrlStore} from "../stores/UrlStore";
import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloProvider} from 'react-apollo'
import {FiltersStore} from "../stores/filtersStore";
import CartStore from "../stores/CartStore";
import SessionCartStore from "../stores/SessionCartStore";
import Cart from "./Cart/Cart";
import {UserStore} from "../stores/UserStore";
import Login from "./Auth/Login";
import Registration from "./Auth/Registration";
import routes from '../stores/routes';
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Cabinet from "./Cabinet/Cabinet";
import {me} from "../api/User";
import Profile from "./Cabinet/Profile";
import Address from "./Cabinet/Address";
import PurchaseHistory from "./Cabinet/History/PurchaseHistory";
import WhishlistStore from "../stores/WhishlistStore";
import Whishlist from "./Cabinet/Whishlist";

const httpLink = createHttpLink({
    uri: UrlStore.MAIN_GRAPHQL_URI
});

export const history = createHistory();
export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

export const userStore = new UserStore();
export const whishlist = new WhishlistStore();

const stores = {
    filters: new FiltersStore(),
    cart: new CartStore(),
    sessionCart: new SessionCartStore(),
    userStore: userStore,
    whishlist: whishlist
}

class App extends Component {

    componentWillMount() {
        me().then(data => {
            if (data) {
                userStore.setUser(data);
                whishlist.add(...data.wishlist)
            }
        })
    }

    render() {
        return (
            <ApolloProvider client={client}>
                <Provider store={stores}>
                    <Router history={history}>
                            <Route exact path={routes.MAIN} component={MainPage}/>
                            <Route path={routes.SIGN_UP} component={Registration}/>
                            <Route path={routes.SIGN_IN} component={Login}/>
                            <Route path={routes.PRODUCT} component={Product}/>
                            <Route path={routes.CATALOG} component={Catalog}/>
                            <Route path={routes.CART} component={Cart}/>
                            <Route path={routes.FORGOT_PASSWORD} component={ForgotPassword}/>
                            <Route path={routes.RESET_PASSWORD} component={ResetPassword}/>
                            <Route exact path={routes.CABINET} component={Cabinet}/>
                            <Route path={routes.PROFILE} component={Profile}/>
                            <Route path={routes.CONTACTS} component={Address}/>
                            <Route path={routes.PURCHASE_HISTORY} component={PurchaseHistory}/>
                            <Route path={routes.WHISHLIST} component={Whishlist}/>
                    </Router>
                </Provider>
            </ApolloProvider>
        );
    }
}

export default App;