import React from 'react';


type defaultImageData = {modifyImageModal:any;
    imgArr: { urls: { regular: string }, id: string, slug: string }[]
}

function ImageListComponent(props: defaultImageData) {




    return (
        <div className="flex mt-4 flex-col justify-center items-center gap-5">
            {props.imgArr?.map((item) => {
                return <img onClick={() => props.modifyImageModal(item)} alt={item.slug} className="w-3/5 border rounded-3xl" key={item.id} src={item.urls.regular}/>
            })}
        </div>
    );
}

export default ImageListComponent;