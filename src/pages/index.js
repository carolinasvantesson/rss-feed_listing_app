import React, {useState, useEffect} from 'react';
import {getFeeds} from "../actions/actions";
import './../styles/index.css';

export default function StartPage() {
    const [listItems, setListItems] = useState([])

    useEffect(() => {
        setListItems(getFeeds());
    }, [setListItems]);


    return (<div className="list-wrapper">{listItems && listItems.map((item, index) => <div className="list-item-wrapper"><a href={item.link} key={index}>{item.title}</a></div>)}</div>)


}
