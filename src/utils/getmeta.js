const axios = require('axios');


const API_URL = 'https://newtpm.secureclouddns.net/wp-json/wp/v2/pages/108238';
const TOKEN_URL = 'https://newtpm.secureclouddns.net/wp-json/jwt-auth/v1/token';
const USERNAME = 'admin'; // JWT username
const PASSWORD = 'Nahar@5683'; // JWT password

const token = Buffer.from(`${USERNAME}:${PASSWORD}`, 'utf8').toString('base64');

axios.get(TOKEN_URL, {
    headers: {
        'Authorization': `Basic ${token}`,
    }
}).then(response => {
    const elementorData = response.data.meta._elementor_data;
    console.log('Fetched Elementor Data:', elementorData);

    const modifiedElementorData = modifyElementorData(elementorData);

    updateElementorData(modifiedElementorData);
}).catch(error => {
    console.error('Error fetching Elementor data:', error.response?.data || error.message);
});