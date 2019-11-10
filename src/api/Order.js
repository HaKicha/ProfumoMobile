import {UrlStore} from "../stores/UrlStore";
import {getAuthData} from "../modules/LocalStorageWorker";
import {userStore} from "../components/App";

export async function sendOrder(order) {
    let headers = {
        'Content-Type': 'application/json'
    };
    if (userStore.isLogged) headers.Authorization = `Bearer ${getAuthData('jwt')}`;
    let response = await fetch(UrlStore.MAIN_URL + '/orders', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(order)
    });
    if (response.status >= 200 && response.status < 400)
        return  await response.json();
    else return false;

}

export async function getOrders() {
    let response = await fetch(UrlStore.MAIN_URL + '/orders', {
        headers: {
            'Authorization': `Bearer ${getAuthData('jwt')}`,
        }
    });
    if (response.status >= 200 && response.status < 400)
        return  await response.json();
    else return false;
}

