import axios from 'axios';
/*
    Contains the Walmart APIs for searching, getting detailed info, and recommendations.
    Also allows for some minor error handling and ensuring that Axios doesn't send back
    anything but the data we need in our components.
 */
class WalmartAPI {
    apiKey = "gy2n8uu9mu5ndzwbedv4k8kk";

    search(query){
        let url = `https://api.walmartlabs.com/v1/search?apiKey=${this.apiKey}&query=${query}`;

        return new Promise((resolve, reject) => {
            axios
                .get(url).then( response => {
                    if(response.data && response.data && response.data.items){
                        resolve(response.data.items);
                    }
                    else{
                        reject();
                    }
                }, error => {
                    reject();
                });
        });
    }

    getDetails(itemID){
        let url = `https://api.walmartlabs.com/v1/items/${itemID}?apiKey=${this.apiKey}&format=json`;
        
        return new Promise((resolve, reject) => {
            axios
                .get(url).then( response => {
                    if(response.data && response.data){
                        resolve(response.data);
                    }
                }, error =>{
                    reject();
                });
        });

    }

    getRecommendations(itemID){
        let url = `https://api.walmartlabs.com/v1/nbp?apiKey=${this.apiKey}&itemId=${itemID}`;
        
        return new Promise((resolve, reject) => {
            axios
                .get(url).then( response => {
                    if(response && response.data){
                        if(response.data.errors) {
                            reject();
                        }
                        else{
                            resolve(response.data);
                        }
                    }
                }, error => {
                    reject();
                });
        });
    }
}

export default new WalmartAPI();