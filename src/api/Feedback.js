import {UrlStore} from "../stores/UrlStore";


export async function sendFeedback(options) {
    let response = await fetch(UrlStore.MAIN_URL + '​/feedbacks', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(options)
    });
    return response.status >= 200 && response.status < 400
}

//  "text": "string",
//   "rank": 0,
//   "order": "string",
//   "name": "string",
//   "phone": "string",
//   "email": "string"