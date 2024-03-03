"use client"
import React, {useEffect, useState} from 'react';
import {getLocalStorage} from "@/app/localstorageFunctions";
import {object} from "prop-types";
import Link from "next/link";


type SearchCache = { [key: string]: any };

function Page() {
    const [searchHistory, setSearchHistory] = useState<string[]>([])

    useEffect(() => {
        const localstorageData: SearchCache | null = getLocalStorage("searchCache");
        if (localstorageData) {
            setSearchHistory(Object.keys(localstorageData));
        }
    }, []);

    // console.log(searchHistory)

    return (<>
            <nav className="top-0 z-20 bg-neutral-200 fixed w-full p-2">
                <Link className="ml-2 border-2 rounded-3xl border-gray-400 px-2 text-2xl" href={"/"}>{"<-Back"}</Link>
            </nav>
            <h1 className="mt-12 text-center font-bold text-4xl">Search History</h1>
            <div className="flex flex-col items-center">
                {searchHistory?.map((item, index) => {
                    return <Link className="border-2 border-black rounded-xl p-2 mb-2" key={index} href={`/?param=${item}`}>{item}</Link>
                })}
            </div>
        </>
    );
}

export default Page;