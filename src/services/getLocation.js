import axios from 'axios';
const BASE_URL = 'https://geo.ipify.org/api/v2/country,city';

export default async (args = {}) => {
    const { domain, ipAddress } = args;
    const response = await axios.get(BASE_URL, {
        params: {
            apiKey: process.env.VUE_APP_API_KEY,
            domain,
            ipAddress,
        },
    });

    return response.data;
};
