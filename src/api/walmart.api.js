import axios from 'axios';
import { apiKey } from '../config/config';

/*
    Contains the Walmart APIs for searching, getting detailed info, and recommendations.
    Also allows for some minor error handling and ensuring that Axios doesn't send back
    anything but the data we need in our components.
 */

class WalmartAPI {
    search(query){
        let url = `https://api.walmartlabs.com/v1/search?apiKey=${apiKey}&query=${query}`;

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
        let url = `https://api.walmartlabs.com/v1/items/${itemID}?apiKey=${apiKey}&format=json`;
        
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
        let url = `https://api.walmartlabs.com/v1/nbp?apiKey=${apiKey}&itemId=${itemID}`;
        
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

export default WalmartAPI;