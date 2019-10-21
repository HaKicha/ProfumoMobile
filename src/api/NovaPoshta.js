import {City} from "../entities/City";
import {PostOffice} from "../entities/PostOffice";


export async function getCitiesByName(name) {
    let response = await fetch(`https://api.novaposhta.ua/v2.0/json/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: `{
                    "modelName": "Address",
                    "calledMethod": "getCities",
                    "methodProperties": {
                    "FindByString": "${name}",
                    "Limit":"50"
                    },
                    "apiKey": "8cdc8d8e527c479de35eb7f6d8a7bee8"
                }`
    });
    let data = await response.json();
    return data.data.map(elem => new City(elem));
}

export async function getPostOffices(ref) {
    let response = await fetch(`https://api.novaposhta.ua/v2.0/json/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: `{
                    "modelName": "AddressGeneral",
                        "calledMethod": "getWarehouses",
                        "methodProperties": {
                    "CityRef":"${ref}"
                    }
                }`
    });
    let data = await response.json();
    return data.data.map(elem => new PostOffice(elem));
}

