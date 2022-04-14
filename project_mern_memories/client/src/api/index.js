import axios from 'axios';

const url = 'https://server-memories.herokuapp.com';

export class ApiClient {
    constructor(token, logoutHandler) {
        this.token = token;
        this.logoutHandler = logoutHandler;
    }

    apiCall(method,url,data) {
        return axios({
            method,
            url,
            data,
        }).catch((error) => {
            throw error
        })
    }

    authenticatedCall(method,url,data) {
        return axios({
            method,
            url,
            headers: {
                authorization: this.token
            },
            data,
        }).catch((error) => {
            // NEED TO ESTABLISH LOGOUTHANDLER FUNCTIONALITY
            /* if(error.response.status === 403){
            //this.logoutHandler();
         return Promise.reject()
        } else {
        throw error;
        } */
        })
    }


    async register(displayName, userName, password){
        return await this.authenticatedCall("post", `${url}/register`, {displayName: displayName, userName: userName, password: password})
    }
    async login(userName,password){
        return await this.authenticatedCall("post", `${url}/auth`, {userName: userName, password: password})
    }

    // uses apiCall for read-only view
    getEvents() {
        return this.apiCall("get", url)
    }
    getEventsByLocation(location) {
        return this.apiCall("get",`${url}/location/${location}`)
    }
    getEventsByDate(eventDate) {
        return this.apiCall("get", `${url}/date/${eventDate}` )
    }

    // api calls that require registration

    addEvent(creator, eventName, location, description, eventDate, img){
        return this.authenticatedCall("post", `${url}`, { creator, eventName, location, description, eventDate, img })
    }

    updateEvent(_id, creator, eventName, location, description, eventDate, img){
        return this.authenticatedCall("put", `${url}/${_id}`, { creator, eventName, location, description, eventDate, img })
    }

    deleteEvent(_id) {
        return this.authenticatedCall("delete", `${url}/${_id}`)
    }



}