import {UrlStore} from "../stores/UrlStore";
import {deleteAuthData, getAuthData, setAuthData} from "../modules/LocalStorageWorker";
import {userStore, whishlist} from "../components/App";
import {history} from "../components/App";

/**
 * @return {undefined}
 */
async function Login(identifier, password) {

    let response = await fetch(`${UrlStore.MAIN_URL}/auth/local`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identifier: identifier,
                password: password
            })
        });
    if (response.status >= 200 && response.status < 400) {
        let data = await response.json();
        userStore.setUser(data.user);
        whishlist.add(...data.user.wishlist);
        setAuthData('jwt', data.jwt);
        return true;
    } else return false;
}


async function Register(username, email, password, name, surname, gender) {
    let response = await fetch(`${UrlStore.MAIN_URL}/auth/local/register`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                name: name,
                surname: surname,
                gender: gender
            })
        });
    if (response.status >= 200 && response.status < 400){
        let data = await response.json();
        setAuthData('jwt', data.jwt);
        userStore.setUser(data.user);
        return true;
    } else {
        return false;
    }

}

function Logout() {
    userStore.setUser({
        address:{},
        orders:[],
        whishlist:[]
    });
    deleteAuthData('jwt')
    history.push('/')
}

async function forgotPassword(email) {
    let response = await fetch(UrlStore.MAIN_URL + '/auth/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email})
    });
    return response.status >= 200 && response.status < 400;
}


async function resetPassword(data) {
    let response = await fetch(UrlStore.MAIN_URL + '/auth/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.status >= 200 && response.status < 400;
}


export {
    Login,
    Register,
    Logout,
    forgotPassword,
    resetPassword
}