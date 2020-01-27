const axios = require('axios');
const sslChecker = require('ssl-checker');
module.exports = async function (context, myTimer) {
    const URL = process.env.URL;
    if (typeof process.env.URL === 'undefined') {
        context.log("[ERROR]URL is undefined.");
    }
    const result = await axios.get(URL)
        .then(response => {
            response.data.items.forEach(item => {
                context.log(item.volumeInfo.title)
            })
        }).catch(error => {
            context.log('[ERROR]: ' + error);
            throw error;
        });

    const domain = URL.match(/^https?:\/\/(.*?)(\/)/)[1];
    context.log("[INFO]check certificate. ", domain);
    const sslDetails = await sslChecker(domain)
        .then(result => {
            context.log("[INFO]SSL daysRemaining ", result.daysRemaining);
        })
};