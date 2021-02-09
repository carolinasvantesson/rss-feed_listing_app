import {feeds} from './../utils/feeds.json';
import axios from './../utils/axios';
import {dnFeed} from './../utils/dn';

export function getFeeds() {
    return parseData(dnFeed, [])

}

async function getFeedsData() {
    return feeds.reduce(async (acc, feedUrl) => {
        const fetched = await axios({
            method: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/' + feedUrl
        }).then(res => res.data);
        const acc1 = await acc;

        const items = parseData(fetched, acc1);

        return [...acc1, ...items];

    }, []);
}

function parseData(fetched, existingItems) {
    const i = new window.DOMParser().parseFromString(fetched, "text/xml");
    const itemsArray = Array.from(i.querySelectorAll("item"));
    const arr = itemsArray.reduce((acc, itemNode) => {
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

    return arr.sort((a, b) => new Date(b) - new Date(a)).slice(0, 10);

}
