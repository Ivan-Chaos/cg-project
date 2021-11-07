//import { useRef, useEffect } from 'react'
import useCanvas from './useCanvas';

const Canvas = (props) => {

    const { draw, ...rest } = props;

    const canvasRef = useCanvas(draw);

    const handleCanvasClick = (event)=>{
        debugger;
        const currentCoord = {x: event.clientX-event.currentTarget.offsetLeft, y: event.clientY-event.currentTarget.offsetTop}
        if(props.setCoordinates!==undefined)
            props.setCoordinates(currentCoord);
    }

    return <canvas ref={canvasRef} {...rest} style={{border: '1px solid black'}} onClick={handleCanvasClick}/>
}

export default Canvas;