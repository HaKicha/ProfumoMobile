import React, { Component } from "react";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import Header from "./public/Header";
import Search from "./Search/Search";
import Product from "./Product/Product";
import SearchInput from "./SearchInput/SearchInput";
import Page from "./Page/Page";
import AboutUs from "./AboutUs/AboutUs";
import Footer from "./public/Footer";
import StartPage from "./StartPage/StartPage";
import StartPageTwo from "./StartPageTwo/StartPageTwo";
import IWantIt from "./IWantIt/IWantIt";
import PurchaseHistory from "./PurchaseHistory/PurchaseHistory";
import EditProfile from "./EditProfile/EditProfile";
import Contacts from "./Contscts/Contacts";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductCart from "./MyCart/ProductCart";
import Total from "./MyCart/Total";
import MyCart from "./MyCart/MyCart";
import Cabinet from "./Cabinet/Cabinet";
import СheckOut from "./CheckOut/CheckOut";
import '../index.css';

class App extends Component {
    render() {
        return (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/'} component={MainPage}/>
                <Route path={'/header'} component={Header}/>
                <Route path={'/search'} component={Search}/>
                <Route path={'/product'} component={Product}/>
                <Route path={'/page'} component={Page}/>
                <Route path={'/aboutUs'} component={AboutUs}/>
                <Route path={'/searchInput'} component={SearchInput}/>
                <Route path={'/footer'} component={Footer}/>
                <Route path={'/startPage'} component={StartPage}/>
                <Route path={'/startPageTwo'} component={StartPageTwo}/>
                <Route path={'/iWantIt'} component={IWantIt}/>
                <Route path={'/purchase'} component={PurchaseHistory}/>
                <Route path={'/edit'} component={EditProfile}/>
                <Route path={'/contacts'} component={Contacts}/>
                <Route path={'/prodDetails'} component={ProductDetails}/>
                <Route path={'/prodCart'} component={ProductCart}/>
                <Route path={'/total'} component={Total}/>
                <Route path={'/myCart'} component={MyCart}/>
                <Route path={'/cabinet'} component={Cabinet}/>
                <Route path={'/checkOut'} component={СheckOut}/>
            </Switch>
        </BrowserRouter>
    );
    }
}

export default App;