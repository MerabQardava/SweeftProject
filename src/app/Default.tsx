import React, {useEffect, useState} from 'react';
import {getLocalStorage, setLocalStorage} from "@/app/localstorageFunctions";
import ImageListComponent from "@/app/ImageListComponent";

async function getTop20Photos() {

    const accessKey: String = "DGciUO7cO78CxR9T9k7aVfjRf7p21h2HEapgnyUiAAo";
    try {
        const response = await fetch(`https://api.unsplash.com/photos?page=1&order_by=popular&per_page=20`, {
            headers: {
                Authorization: `Client-ID ${accessKey}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        // console.log(data)

        return data


    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function Default(props) {

    // console.log(props)
    const [top20, setTop20] = useState<{ urls: { regular: string }, id: string,slug:string }[]>([])

    useEffect(() => {
        const fetchData = async () => {
            let top20Data = getLocalStorage("top20")
            if (top20Data && top20Data.value) {
                setTop20(top20Data)
            } else {
                let data = await getTop20Photos()
                setTop20(data)
                setLocalStorage("top20", data, 1)
            }
        }
        fetchData()
    }, []);

    // console.log(top20)


    return (
        <ImageListComponent modifyImageModal={props.modifyImageModal} imgArr={top20}/>
        // <div className="flex flex-col justify-center items-center gap-5">
        //     {top20?.map((item) => {
        //         return <img className="w-3/5 border rounded-3xl" key={item.id} src={item.urls.regular}/>
        //     })}
        // </div>
    );
}

export default Default;