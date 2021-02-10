import {feeds} from './../utils/feeds.json';
import axios from './../utils/axios';

export async function getFeeds() {
    return  getFeedsData();
}

async function getFeedsData() {
    const feedsArray = await feeds.reduce(async (acc, feedUrl) => {
        const fetched = await axios({
            method: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/' + feedUrl
        }).then(res => res.data);
        const acc1 = await acc;

        const items = parseData(fetched, acc1);
        return [...acc1, ...items];

    }, []);
    console.log('feedsArray', feedsArray);
    return feedsArray.sort((a, b) => new Date(b) - new Date(a)).slice(0, 10);

}

function parseData(fetched, existingItems) {
    const i = new window.DOMParser().parseFromString(fetched, "text/xml");
    const itemsArray = Array.from(i.querySelectorAll("item")).slice(0,10);
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


}
