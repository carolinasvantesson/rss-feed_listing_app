import {feeds} from './../utils/feeds.json';
import axios from './../utils/axios';

export async function getFeeds() {
    return getFeedsData();
}

async function getFeedsData() {

    const feedsArray = await feeds.reduce(async (acc, feedUrl) => {
        const fetched = await axios({
            method: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/' + feedUrl
        })
            .then(res => res.data)
            .catch(error => {
                console.log('error',error);
                return false;
            });
        const acc1 = await acc;
        if (fetched) {
            const items = parseData(fetched, acc1);
            return [...acc1, ...items];
        } else {
            return acc1;
        }

    }, []);

    return feedsArray.sort((a, b) => new Date(b) - new Date(a)).slice(0, 10);
}

function parseData(fetched, existingItems) {
    try {
        const i = new window.DOMParser().parseFromString(fetched, "text/xml");
        const itemsArray = Array.from(i.querySelectorAll("item"));

        return itemsArray.reduce((acc, itemNode) => {
            const link = itemNode.querySelector("link").innerHTML;
            if (existingItems.findIndex(i => i.link === link) === -1) {
                return [...acc, {
                    link,
                    title: itemNode.querySelector("title").innerHTML,
                    pubDate: itemNode.querySelector("pubDate").innerHTML
                }]
            }
            return acc;
        }, []);
    } catch (e) {
        console.log('error when parsing data')
        return [];
    }


}
