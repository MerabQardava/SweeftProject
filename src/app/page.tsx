"use client"
import Image from "next/image";
import {ChangeEvent, useEffect, useState} from "react";
import useImageSearch from "@/app/useImageSearch";
import Default from "@/app/Default";
import SearchComponent from "@/app/SearchComponent";



export default function Home() {
    const [pageNumber, setPageNumber] = useState(1)
    const [query, setQuery] = useState("")

    console.log(pageNumber)


    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setPageNumber(1)
    }

    useEffect(() => {
        function handleScroll() {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;


            if (scrollTop + clientHeight >= scrollHeight - 1) {
                setPageNumber((number)=>number+=1)
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    return (
        <main className="">
            <input className="text-black border-2 border-black" type="text" onChange={handleSearch}/>

            {query==""?<Default/>:<SearchComponent query={query} pageNumber={pageNumber} />}



        </main>
    );
}
