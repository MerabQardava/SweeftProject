import {useEffect} from 'react';

import {getLocalStorage, setLocalStorage} from "@/app/localstorageFunctions";


function useImageSearch(query: string, pageNumber: number) {

    let searchCache = getLocalStorage("searchCache")


    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;


        async function fetchData() {
            const accessKey:String = "DGciUO7cO78CxR9T9k7aVfjRf7p21h2HEapgnyUiAAo";
            try {
                const response = await fetch(`https://api.unsplash.com/search/photos?page=${pageNumber}&query=${query}&order_by=popular`, {
                    headers: {
                        Authorization: `Client-ID ${accessKey}`
                    },
                    signal: signal,
                    // cache:'force-cache'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                if (!searchCache) {
                    setLocalStorage("searchCache", {[query]: [data.results]}, 1)
                } else if (searchCache[query]) {
                    // searchCache[query].push(data.results)
                    setLocalStorage("searchCache", {...searchCache, [query]: [...searchCache[query], data.results]}, 1)
                } else {
                    // searchCache[query]=[data.results]
                    // console.log({[query]:[data.results]})
                    // modifySearchCache({[query]:[data.results]})
                    setLocalStorage("searchCache", {...searchCache, [query]: [data.results]}, 1)

                }
                // console.log(searchCache)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        let delay: NodeJS.Timeout;

        function delayedFetchData() {
            const delay = setTimeout(() => {
                fetchData()
            }, 200)
        }


        if (!searchCache || !searchCache[query] || !searchCache[query][pageNumber - 1]) {
            delayedFetchData()
        }


        return () => {
            abortController.abort();
            clearTimeout(delay)
        };

    }, [query, pageNumber]);
}

export default useImageSearch;