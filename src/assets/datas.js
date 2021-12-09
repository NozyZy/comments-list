import axios from "axios";
export default {

    // comments : [
    //     {
    //         id: 1,
    //         name: 'Michel',
    //         title: 'Ce reve bleu',
    //         description: 'Lorem ipsum ton père en short',
    //         hidden: false,
    //     },
    //     {
    //         id: 2,
    //         name: 'Michel',
    //         title: 'Ce fake bleu',
    //         description: 'Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker',
    //         hidden: false,
    //     },
    //     {
    //         id: 3,
    //         name: 'Faustonks',
    //         title: 'Stonks',
    //         description: 'Zabka stonks',
    //         hidden: false,
    //     },
    //     {
    //         id: 4,
    //         name: 'Faustaverage',
    //         title: 'Dips go deeper',
    //         description: 'Je fais des dips',
    //         hidden: false,
    //     },
    //     {
    //         id: 5,
    //         name: 'Faustinsignifiant',
    //         title: 'Suis-je ?',
    //         description: 'Oh merde',
    //         hidden: false,
    //     },
    // ],
    api: 'http://localhost:5000/api/comments',
    async getAll() {
        return fetch(this.api)
            .then(data => data.json())
            .then(json => { return json });
    },
    async find(name) {
        return fetch(this.api + '/find?name=' + name)
            .then(data => data.json())
            .then(json => { return json });
    },
    create(data) {
        axios({
            method: 'post',
            url: this.api + '/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        });
    },
    toggleHidden(id, hidden) {
        axios({
            method: 'post',
            url: this.api + '/update?id=' + id + '&hidden=' + hidden,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    },
    delete(id) {
        axios({
            method: 'delete',
            url: this.api + '/delete?id=' + id,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
}
