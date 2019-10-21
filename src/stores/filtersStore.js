import {observable, toJS, action, configure, computed} from "mobx";
import {uniqBy, forOwn, remove} from 'lodash';
import {getCategoryParams} from "../api/CategoryParams";

configure({ enforceActions: "observed" });
export class FiltersStore {

    constructor() {
        this.addProperties = this.addProperties.bind(this);
        this.setProperty = this.setProperty.bind(this);
        this.cleanProperties = this.cleanProperties.bind(this);
        this.setMaxPrice = this.setMaxPrice.bind(this);
        this.setMinPrice = this.setMinPrice.bind(this);
        this.setSearchQuery = this.setSearchQuery.bind(this);
    }

    @observable state = ''; // "pending" / "done" / "error"
    @observable
    filters = {};
    @observable
    properties = {};

    @action
    addProperties(){
        let properties = [];
        Array.from(arguments).forEach(el => properties.push(el.properties));
        let groupedProperties =  {};
        properties.forEach(catProp => {
            catProp.reduce((acc,el) => {
                if (Array.isArray(acc[el.property_name])) acc[el.property_name].push({
                    _id: el._id,
                    property_val: el.property_val
                });
                else acc[el.property_name] = [{
                    _id: el._id,
                    property_val: el.property_val
                }];
                return acc;
            }, groupedProperties);
        });
        let compactProperties = {};
        forOwn(groupedProperties, (value,key) => {
            compactProperties[key] = uniqBy(value, e => e._id );
        });
        this.properties = compactProperties;
    }

    @computed
    get Properties(){
        return toJS(this.properties);
    }

    @computed
    get Filters(){
        console.log(toJS(this.filters));
        return toJS(this.filters);
    }

    @computed
    get CheckedProperties(){
        return toJS(this.filters.properties);
    }

    @action
    setProperty(id, isAdd){
        if (isAdd)
            if (typeof this.filters.properties === "undefined") this.filters.properties = {_id: []};
            this.filters.properties._id.push(id);
        if (!isAdd) {
            remove(this.filters.properties._id, a => a === id);
            if (this.filters.properties._id.length === 0) delete this.filters.properties;
        }
    }


    @action
    cleanProperties(){
        delete this.filters.properties;
    }

    @action
    setMaxPrice(price){
        if (price === '') this.filters.price_lte = null;
        else this.filters.price_lte = price - 0;
    }

    @action
    setMinPrice(price){
        if (price === '') this.filters.price_gte = null;
        else this.filters.price_gte = price - 0;
    }

    @action
    setSearchQuery(query){
        if (query === '') this.filters._q = null;
        else this.filters._q = query;
    }


}

// {
//     property_name: [{
//         _id
//         property_val
//     },{
//         _id
//         property_val
//     }]
// }