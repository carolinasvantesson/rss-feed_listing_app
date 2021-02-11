import React, {useState, useEffect} from 'react';
import {getFeeds} from "../actions/actions";
import './../styles/index.css';

export default function StartPage() {
    const [listItems, setListItems] = useState([])

    useEffect(() => {
        getFeedsData();
    }, []);

    async function getFeedsData(){
        setListItems(await getFeeds());
    }

    return (
        <div className="list-wrapper">{!!listItems.length && listItems.map((item, index) => <div
            className="list-item-wrapper" key={index}><a href={item.link} >{item.title}</a></div>)}</div>)


}
