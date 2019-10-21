import {observable, action, computed, toJS} from "mobx";

export class UserStore {

    constructor(props){
        this.setUser = this.setUser.bind(this);
    }

    @observable
    user = {
        address:{},
        orders:[],
        whishlist:[]
    };

    @action
    setUser = (user => {
        this.user = user;
    }).bind(this);

    @computed
    get User () {
        return(toJS(this.user));
    }

    @computed
    get isLogged() {
        return (typeof this.user._id !== 'undefined');
    };

    @computed
    get userId() {
        return this.user._id;
    }
}