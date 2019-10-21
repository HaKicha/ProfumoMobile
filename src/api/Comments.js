import {UrlStore} from "../stores/UrlStore";
import {getAuthData} from "../controllers/Cookies";

export async function addComment(text, rating, product) {
        let response = await fetch(`${UrlStore.MAIN_URL}/comments`,
            {
                method: 'POST',
                body: JSON.stringify({
                    text: text,
                    rate: rating,
                    product: product
                }),
                headers: {
                    "Authorization": `Bearer ${getAuthData('jwt')}`,
                    "Content-Type": 'application/json'
                }
            });
        if (response.status >= 200 && response.status < 300){
            return true;
        }
        else return false;
}

export async function deleteComment(id){
    let response = await fetch(`${UrlStore.MAIN_URL}/comments/${id}`,{
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${getAuthData('jwt')}`
        }
    });
    return response.status >= 200 && response.status < 400;
}