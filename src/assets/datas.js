import axios from "axios";
import VueJwtDecode from 'vue-jwt-decode';

const url = 'http://192.168.84.250:5000'

export default {

    api: url + '/api/comments',
    auth: url + '/auth',
    loggedin:false,
    options: {
        method: 'get',
        headers: new Headers({'content-type': 'application/json', 'Authorization': localStorage.getItem("user")}),
    },

    async getAll() {
        return fetch(this.api, this.options)
            .then(data => data.json())
            .then(json => { return json });
    },
    async find(name) {
        return fetch(this.api + '/find?name=' + name, this.options)
            .then(data => data.json())
            .then(json => { return json });
    },
    create(data) {
        axios({
            method: 'post',
            url: this.api + '/create',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("user"),
            },
            data: data
        });
    },
    toggleHidden(id, hidden) {
        axios({
            method: 'post',
            url: this.api + '/update?id=' + id + '&hidden=' + hidden,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("user"),
            },
        });
    },
    delete(id) {
        axios({
            method: 'delete',
            url: this.api + '/delete?id=' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("user"),
            },
        });
    },
    register(newUser) {
        axios({
            method: 'post',
            url: this.auth + '/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: newUser
        });
    },
    login(creds) {
        const res = axios({
            method: 'post',
            url: this.auth + '/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: creds
        });
        res.then(res => {
            if (res.status === 200) {
                let token = res.data.token;
                localStorage.setItem("user", token);
            }
        })
            .catch(err => {
                console.error(err);
            });
        return res;
    },
    getUserDetails() {
        let token = localStorage.getItem("user");
        try {
            return VueJwtDecode.decode(token);
        } catch (error) {
            console.log(error, 'error from decoding token');
        }
    },
    async getUsers() {
        return fetch(this.auth + '/users', this.options)
            .then(data => data.json())
            .then(json => { return json });
    },
    updateUser(data) {
        axios({
            method: 'post',
            url: this.auth + '/update',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("user"),
            },
            data: data
        });
    },
    logout() {
        localStorage.removeItem("user");
    },
    isAuthenticated() {
        return localStorage.getItem('user') && this.getUserDetails()
    },
    isAdminUser(){
        return localStorage.getItem('user') && this.getUserDetails().role === 'admin'
    }
}
