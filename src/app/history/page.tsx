"use client"
import React, {useEffect, useState} from 'react';
import {getLocalStorage} from "@/app/localstorageFunctions";
import {object} from "prop-types";
import Link from "next/link";


type SearchCache = { [key: string]: any };

function Page() {
    const [searchHistory, setSearchHistory] = useState<string[]>([])

    useEffect(() => {
        const localstorageData: SearchCache = getLocalStorage("searchCache")
        setSearchHistory(Object.keys(localstorageData));
    }, []);

    // console.log(searchHistory)

    return (<>
            <Link href={"/"}>Back</Link>
            <div className="flex flex-col items-center">
                {searchHistory?.map((item, index) => {
                    return <Link key={index} href={`/?param=${item}`}>{item}</Link>
                })}
            </div>
        </>
    );
}

export default Page;