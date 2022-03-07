import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { IPicture } from "../types/types";
import { Picture } from "./SinglePicture";

const PictureList = [
    {
        id:1,
        name: 'A',
        url: 'https://media.istockphoto.com/photos/letter-a-3d-red-isolated-on-white-with-shadow-orthogonal-projection-picture-id688125274?b=1&k=20&m=688125274&s=170667a&w=0&h=XF73KFNjhOuFp4-0uk8hZ6VK-H6EX4vXIbldkww3Ny8='
    },
    {
        id:2,
        name: 'B',
        url: 'https://media.istockphoto.com/photos/alphabet-b-picture-id155158342?b=1&k=20&m=155158342&s=170667a&w=0&h=GP8vVbD0I5HDDWHPfygtfu4JSUkrFk-o84V2GDuNEls='
    },
    {
        id:3,
        name: 'C',
        url: 'https://media.istockphoto.com/photos/polished-silver-alphabet-c-on-white-background-picture-id155158351?b=1&k=20&m=155158351&s=170667a&w=0&h=0jvBsgNwHQuE0znUAAhbThqj557BXuaqnMj5NDOX88w='
    }
]



export const DragDrop = ():JSX.Element=>{
    const [availableImages, setAvailableImages] = useState<IPicture[]>(PictureList);
    //first time app is opened 
    // if (availableImages.length===0){
    //     setAvailableImages(PictureList)
    // }
    console.log('component refresh' ,availableImages)
    const [board, setBoard ] = useState <IPicture[]>([]);

    //function to display letters
    const AllImages = availableImages.map((pic)=>{
        return (
            <div>
                <Picture id={pic.id} name={pic.name} url={pic.url} />
            </div>
        )
    }) 

    //register image has been dropped 
    const [{isOver}, drop] = useDrop(()=>({
        accept: "image", //the type of object I am accepting 
        drop: (item:IPicture) => addImageToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    //add image to the board
    const addImageToBoard = (id:number) =>{
        // console.log(id)
        const pictureList = PictureList.filter((picture) => id === picture.id);
        setBoard((board) => [...board, pictureList[0]]);
        setAvailableImages(filterAray(id))
    }

    const filterAray = (id:number) =>{
        console.log('available images ' , availableImages)
        const filteredImages = availableImages.filter((pic) => id !== pic.id)
        console.log(filteredImages);
        return filteredImages;
    }


    //display pics on board 
    const picsOnBoard = board.map((pic)=>{
        return <Picture id={pic.id} name={pic.name} url={pic.url} />
    })


    return (
        <div className="display-area">
            <div className="Pictures">{AllImages}</div>
            <div className="Board" ref={drop}>{picsOnBoard}</div>
        </div>
    )
}