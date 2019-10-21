import {getAuthData} from "../controllers/Cookies";
import {UrlStore} from "../stores/UrlStore";

export async function getRecomened(isAuthorized) {
    let headers = {};
    if (isAuthorized) headers.Authorization = 'Bearer ' + getAuthData('jwt');
    let response =  await fetch(UrlStore.MAIN_URL + '/recommendations.personal',{
        headers: headers
    })

    let data = await response.json();
    return data;
}