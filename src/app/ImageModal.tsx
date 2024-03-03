import React from 'react';

function ImageModal(props:any) {
    console.log(props)

    return (<section onClick={props.closeModal} className=" fixed w-[100%] h-[100%] bg-black bg-opacity-50">


            <div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white absolute">

                <div className="px-1 py-3 right-0 w-12 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 absolute rounded-3xl">
                    <img src="heart-svgrepo-com.svg"/>
                    <p className="text-white text-center">{props.imageData.likes}</p>
                    <img src="eye-svgrepo-com.svg"/>
                    <p className="text-white text-center">{props.imageData.views}</p>
                    <a href={props.imageData.links.download}><img src="download-svgrepo-com.svg"/></a>


                </div>

                <img className="object-contain " src={props?.imageData.urls?.full} alt=""/>
            </div>
        </section>
    );
}

export default ImageModal;