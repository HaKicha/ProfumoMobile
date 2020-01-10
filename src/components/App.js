import React, {Component} from "react";
import {Provider} from 'mobx-react'
import {Route} from "react-router-dom";
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
import CategoryNavigation from "./CategoryNavigation/CategoryNavigation";
import Contacts from "./Contacts/Contacts";
import Delivery from "./InfoPages/Delivery";
import License from "./InfoPages/License";
import Payment from "./InfoPages/Payment";
import UserAgreement from "./InfoPages/UserAgreement";
import Warranty from "./InfoPages/Warranty";
import BlogCatalog from "./Blog/BlogCatalog";
import BlogPage from "./Blog/BlogPage";
import AddComment from "./Product/AddComment";
import {GetCart} from "../api/Cart";
import AboutUs from "./AboutUs/AboutUs";
import Search from "./Search/Search";
import CheckoutStore from "../stores/CheckoutStore";
import AcceptOrder from "./Checkout/AcceptOrder";
import AcceptAddress from "./Checkout/AcceptAddress";
import AcceptPayment from "./Checkout/AcceptPayment";
import CheckoutCompleteNP from "./Checkout/CheckoutCompleteNP";
import CheckoutLiqPayRedirect from "./Checkout/CheckoutLiqPayRedirect";
import CheckoutCompleteLiqPay from "./Checkout/CheckoutCompleteLiqPay";
import ReactGA from 'react-ga';

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
const cartStore = new CartStore();

const stores = {
    filters: new FiltersStore(),
    cart: cartStore,
    sessionCart: new SessionCartStore(),
    userStore: userStore,
    whishlist: whishlist,
    checkoutStore: new CheckoutStore()
}

class App extends Component {

    componentWillMount() {
        ReactGA.initialize('UA-128259482-2');
        me().then(data => {
            if (data) {
                userStore.setUser(data);
                whishlist.add(...data.wishlist)
            }
            GetCart().then(data => {
                console.log(data.body);
                cartStore.addMany(data.body)
            })
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
                        <Route path={routes.PRODUCT_CATEGORY} component={Catalog}/>
                        <Route path={routes.CART} component={Cart}/>
                        <Route path={routes.FORGOT_PASSWORD} component={ForgotPassword}/>
                        <Route path={routes.RESET_PASSWORD} component={ResetPassword}/>
                        <Route exact path={routes.CABINET} component={Cabinet}/>
                        <Route path={routes.PROFILE} component={Profile}/>
                        <Route path={routes.USER_CONTACTS} component={Address}/>
                        <Route path={routes.PURCHASE_HISTORY} component={PurchaseHistory}/>
                        <Route path={routes.WHISHLIST} component={Whishlist}/>
                        <Route path={routes.CATEGORY_NAVIGATION} component={CategoryNavigation}/>
                        <Route path={routes.CONTACTS} component={Contacts}/>
                        <Route path={routes.DELIVERY} component={Delivery}/>
                        <Route path={routes.LICENSE} component={License}/>
                        <Route path={routes.PAYMENT} component={Payment}/>
                        <Route path={routes.USER_AGREEMENT} component={UserAgreement}/>
                        <Route path={routes.WARRANTY} component={Warranty}/>
                        <Route exact path={routes.BLOG_CATALOG} component={BlogCatalog}/>
                        <Route exact path={routes.BLOG_PAGE} component={BlogPage}/>
                        <Route path={routes.ADD_COMMENT} component={AddComment}/>
                        <Route path={routes.ABOUT_US} component={AboutUs}/>
                        <Route path={routes.GLOBAL_SEARCH} component={Search}/>
                        <Route path={routes.CHECKOUT_ORDER} component={AcceptOrder}/>
                        <Route path={routes.CHECKOUT_ADDRESS} component={AcceptAddress}/>
                        <Route path={routes.CHECKOUT_PAYMENT} component={AcceptPayment}/>
                        <Route path={routes.CHECKOUT_COMPLETE_NOVA_POSHTA} component={CheckoutCompleteNP}/>
                        <Route path={routes.CHECKOUT_REDIRECT_LIQPAY} component={CheckoutLiqPayRedirect}/>
                        <Route path={routes.CHECKOUT_COMPLETE_LIQPAY} component={CheckoutCompleteLiqPay}/>
                    </Router>
                </Provider>
            </ApolloProvider>
        );
    }
}

export default App;
