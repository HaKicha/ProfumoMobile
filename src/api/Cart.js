import {UrlStore} from "../stores/UrlStore";
import {getAuthData} from "../controllers/Cookies";

/**
 * @return {boolean}
 */
export async function ModifyCart(cartBody) {

    let response = await fetch(`${UrlStore.MAIN_URL}/cart/me`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthData('jwt')}`

            },
            body: JSON.stringify({
                body: cartBody
            })
        });
    return response.status >= 200 && response.status < 300;
}

/**
 * @return {boolean}
 */
export async function GetCart() {

    let response = await fetch(`${UrlStore.MAIN_URL}/cart/me`,
        {
            headers: {
                "Authorization": `Bearer ${getAuthData('jwt')}`
            },
        });
    if (response.status >= 200 && response.status < 300){
        return await response.json();
    }
    else return false;
}


/**
 * @return {boolean}
 */
export async function ClearCart() {

    let response = await fetch(`${UrlStore.MAIN_URL}/cart/me`,
        {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${getAuthData('jwt')}`
            },
        });
    return (response.status >= 200 && response.status < 300);
}

