import axios from 'axios';

class API {
    apiKey = "gy2n8uu9mu5ndzwbedv4k8kk";

    search(query){
        let url = `http://api.walmartlabs.com/v1/search?apiKey=${this.apiKey}&query=${query}`;

        return new Promise((resolve, reject) => {
            axios
                .get(url).then( response => {
                    if(response.data && response.data){
                        resolve(response.data);
                    }
                }, error => {
                    reject();
                    console.log(error);
                });
        });
    }

    getDetails(itemID){
        let url = `http://api.walmartlabs.com/v1/items/${itemID}?apiKey=${this.apiKey}&format=json`;
        
        return new Promise((resolve, reject) => {
            axios
                .get(url).then( response => {
                    if(response.data && response.data){
                        resolve(response.data);
                    }
                }, error =>{
                    reject();
                    console.log(error);
                });
        });

    }

    getRecommendations(itemID){
        let url = `http://api.walmartlabs.com/v1/nbp?apiKey=${this.apiKey}&itemId=${itemID}`;
        
        return new Promise((resolve, reject) => {
            axios
                .get(url).then( response => {
                    if(response.data && response.data){
                        resolve(response.data);
                    }
                }, error =>{
                    reject();
                    console.log(error);
                });
        });
    }
}

export default API;