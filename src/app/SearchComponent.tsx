"use client"

import React, {useEffect, useState} from 'react';
import useImageSearch from "@/app/useImageSearch";
import {getLocalStorage} from "@/app/localstorageFunctions";

type searchCacheProps = {
    query: string
    pageNumber: number
}


function SearchComponent(props: searchCacheProps) {
    const [cache, setCache] = useState({})
    const [imagesArr, setImagesArr] = useState()

    function combineArrays(arr, num) {
        const combinedArray = arr.slice(0, num).reduce((result, subArray) => {
            return result.concat(subArray);
        }, []);
        return combinedArray;
    }

    useEffect(() => {
        if(cache?.[props.query]){
            setImagesArr(combineArrays(cache[props.query],props.pageNumber))
        }
    }, [cache,props.pageNumber]);


    useEffect(() => {
            setCache(getLocalStorage("searchCache"));
        const updateCache = () => {
            setCache(getLocalStorage("searchCache"));
        };

        window.addEventListener('storage', updateCache);

        return () => {
            window.removeEventListener('storage', updateCache);
        };
    }, [props.query]);


    // console.log(cache)
    // console.log(cache[props.query][props.pageNumber-1])


    useImageSearch(props.query, props.pageNumber)

    // @ts-ignore
    if (imagesArr) {
        return (
            <div className="flex flex-col justify-center items-center gap-5">{imagesArr.map((item: any) => <img
                className="w-3/5 border rounded-3xl" key={item.id} src={item.urls.regular}/>)}</div>
        );
    } else {
        return <div>sus</div>
    }
}

export default SearchComponent;