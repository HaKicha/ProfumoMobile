import {UrlStore} from "../stores/UrlStore";
import {getAuthData} from "../modules/LocalStorageWorker";


export async function GetWishList() {

    let response = await fetch(`${UrlStore.MAIN_URL}/users/me`,
        {
            headers: {
                "Authorization": `Bearer ${getAuthData('jwt')}`
            },
        });
    if (response.status >= 200 && response.status < 400){
        let data = await response.json();
        return data.wishlist;
    }
    else return false;
}


export async function UpdateWhishlist(data) {

    let response = await fetch(`${UrlStore.MAIN_URL}/users/me`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthData('jwt')}`
            },
            body: JSON.stringify({
                wishlist: data
            })
        });

    if (response.status >= 200 && response.status < 400)
        {
            let data = await response.json();
            return data.wishlist;
        }
    return false;
}



