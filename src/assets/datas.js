import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';

const url = 'http://192.168.84.250:5000'

export default {

    api: url + '/api/comments',
    auth: url + '/auth',
    loggedin:false,
    options: {
        method: 'get',
        headers: new Headers({'content-type': 'application/json', 'Authorization': localStorage.getItem('user')}),
    },
    async getAll() {
        let favs = await this.getFavs(this.getUserDetails().email, true)
        favs = favs ? favs.toString() : ''
        localStorage.setItem('favs', favs)
        return fetch(this.api, this.options)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else return 'empty';
            });
    },
    async getFavComms() {
        let a = await this.getAll()
        let b = []
        let c = await this.getFavs(this.getUserDetails().email, false)
        a.forEach(e => c.forEach(i => {
            if (e.id === i) b.push(e)
        }))
        return b
    },
    async find(name) {
        return fetch(this.api + '/find?name=' + name, this.options)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else return 'empty';
            });
    },
    create(data) {
        axios({
            method: 'post',
            url: this.api + '/create',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('user'),
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
                'Authorization': localStorage.getItem('user'),
            },
        });
    },
    delete(id) {
        axios({
            method: 'delete',
            url: this.api + '/delete?id=' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('user'),
            },
        });
    },
    register(newUser) {
        return axios({
            method: 'post',
            url: this.auth + '/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: newUser
        })
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
                localStorage.setItem('user', token);
            }
        })
            .catch(err => {
                console.error(err);
            });
        return res;
    },
    getUserDetails() {
        let token = localStorage.getItem('user');
        let f = localStorage.getItem('favs');
        try {
            return {
                ...VueJwtDecode.decode(token),
                favs: f ? f.split(',') : []
            };
        } catch (error) {
            console.log(error, 'error from decoding token');
        }
    },
    async getUsers() {
        return fetch(this.auth + '/users', this.options)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else return null;
            });
    },
    async getFavs(email, bool) {
        if (bool) {
            return fetch(this.auth + '/favs?email=' + email, this.options)
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                    else return null;
                });
        } else {
            return localStorage.getItem('favs').split(',');
        }

    },
    updateUserRole(data) {
        axios({
            method: 'post',
            url: this.auth + '/update/role',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('user'),
            },
            data: data
        });
    },
    updateUserFav(data) {
        localStorage.setItem('favs', data.favs ? data.favs.toString() : '')
        axios({
            method: 'post',
            url: this.auth + '/update/fav',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('user'),
            },
            data: data
        });
    },
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('favs');
    },
    isAuthenticated() {
        return localStorage.getItem('user') && this.getUserDetails()
    },
    isAdminUser(){
        return localStorage.getItem('user') && this.getUserDetails().role.includes('admin')
    }
}
