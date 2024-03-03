"use client"
import {ChangeEvent, SetStateAction, useEffect, useState} from "react";
import Default from "@/app/Default";
import SearchComponent from "@/app/SearchComponent";
import Link from "next/link";
import ImageModal from "@/app/ImageModal";


export default function Home(params: { searchParams: { param: SetStateAction<string>; }; }) {
    const [pageNumber, setPageNumber] = useState(1)
    const [query, setQuery] = useState("")
    const [imageModal, setImageModal] = useState(null)

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setPageNumber(1)
    }

    const closeModal=()=>{
        setImageModal(null)
    }

    const modifyImageModal=(imageData)=>{
        setImageModal(imageData)
        // console.log(imageData)
    }


    useEffect(() => {

        if (params.searchParams.param) {
            console.log(params.searchParams.param)
            setQuery(params.searchParams.param)
        }
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
        <main >
            {imageModal&&<ImageModal closeModal={closeModal} imageData={imageModal}/>}
            <nav className="top-0 z-20 bg-neutral-200 fixed w-full p-2">
                <input className="text-black px-2 text-2xl border-2 rounded-3xl border-gray-400" value={query} type="text" onChange={handleSearch}/>
                <Link href={"/history"}>History</Link>
            </nav>

            {query == "" ? <Default modifyImageModal={modifyImageModal}/> : <SearchComponent modifyImageModal={modifyImageModal} query={query} pageNumber={pageNumber}/>}


        </main>
    );
}
