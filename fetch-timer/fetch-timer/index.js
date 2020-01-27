const axios = require('axios');
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
};