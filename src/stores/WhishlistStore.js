import {action, observable, computed, toJS} from "mobx";
import {uniq} from 'lodash';
import {UpdateWhishlist} from "../api/WishList";


export default class WhishlistStore {

    @observable
    whishlist = [];


    @action
    add(...id){
        let data = id.filter(el => el.length === 24)
        this.whishlist.push(...data);
        this.whishlist = uniq(toJS(this.whishlist));
        UpdateWhishlist(toJS(this.whishlist));
    }

    @action
    remove(id){
        this.whishlist = this.whishlist.filter(el => el !== id);
        UpdateWhishlist(toJS(this.whishlist));
    }

    @observable
    has(id){
        return (this.whishlist.filter(elem => elem === id).length > 0)
    }

   @computed
   get getAll(){
        return toJS(this.whishlist);
   }

}