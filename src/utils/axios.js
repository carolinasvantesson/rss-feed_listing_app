import axiosLibrary from 'axios';

const axios = axiosLibrary.create({
    headers: {
        'content-type': 'application/rss+xm'
    }
});

export default axios;

