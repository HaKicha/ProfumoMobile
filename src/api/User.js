import {UrlStore} from "../stores/UrlStore";
import {getAuthData} from "../modules/LocalStorageWorker";
import User from "../entities/User";

export async function me() {
    let response = await fetch(`${UrlStore.MAIN_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAuthData('jwt')}`
        }
    });
    if (response.status >= 200 && response.status <= 400) {
        let data = await response.json();
        return new User(data);
    }
    return false
}

export async function changeUserData(data) {
    let response = await fetch(`${UrlStore.MAIN_URL}/users/me`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAuthData('jwt')}`
        },
        body: JSON.stringify(data)
    });
    if (response.status >= 200 && response.status < 400)
        return await response.json();
    else return false;
}
