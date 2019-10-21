import {UrlStore} from "../stores/UrlStore";

export async function getCategoryTree() {
    let response = await fetch(`${UrlStore.MAIN_URL}/categories/tree/without`);
    if (response.status === 200) return  await response.json();
    else return []
}