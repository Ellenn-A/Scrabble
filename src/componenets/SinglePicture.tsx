import React from "react";
import { useDrag } from "react-dnd";
import { IPicture } from "../types/types";


export const Picture:React.FC<IPicture> = ({id, name, url}) => {

    //call useDrag hook fo every draggable item 
    const [{isDragging}, drag] = useDrag(() => ({
        type:"image", //in string say what type of object im expecting 
        item:{id:id}, //pass in picture's id to make it identifiable 
        collect: (monitor) =>({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return ( 
        <div>
            <img ref={drag} src={url} alt={name} className="single-image" style={{border:isDragging ? "2px solid magenta":"0px"}}/>
        </div>
    )
}