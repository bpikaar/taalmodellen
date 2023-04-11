import https from "https";
import http from "http";

export default class Data {
    static getTextFromUrl(url) {
        return new Promise((resolve, reject) => {

            let client = url.toString().indexOf("https") === 0 ? https : http;

            client.get(url, (resp) => {
                let data = ''

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk
                })

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    resolve(data)
                })

            }).on("error", (err) => {
                reject(err)
            })
        })
    }
}