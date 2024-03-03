"use client"
import Image from "next/image";
import {ChangeEvent, SetStateAction, useEffect, useState} from "react";
import useImageSearch from "@/app/useImageSearch";
import Default from "@/app/Default";
import SearchComponent from "@/app/SearchComponent";
import Link from "next/link";


export default function Home(params: { searchParams: { param: SetStateAction<string>; }; }) {
    const [pageNumber, setPageNumber] = useState(1)
    const [query, setQuery] = useState("")


    useEffect(() => {

        if (params.searchParams.param) {
            console.log(params.searchParams.param)
            setQuery(params.searchParams.param)
        }
    }, []);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setPageNumber(1)
    }

    useEffect(() => {
        function handleScroll() {
            const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 1) {
                setPageNumber((number) => number += 1)
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <main>
            <input className="text-black border-2 border-black" value={query} type="text" onChange={handleSearch}/>
            <Link href={"/history"}>History</Link>

            {query == "" ? <Default/> : <SearchComponent query={query} pageNumber={pageNumber}/>}


        </main>
    );
}
