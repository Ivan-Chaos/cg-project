//import { useRef, useEffect } from 'react'
import useCanvas from './useCanvas';

const Canvas = (props) => {

    const { draw, ...rest } = props;

    const canvasRef = useCanvas(draw);

    const handleCanvasClick = (event)=>{
        debugger;
        const currentCoord = {x: event.clientX-88, y: event.clientY-124}
        if(props.setCoordinates!==undefined)
            props.setCoordinates(currentCoord);
    }

    return <canvas ref={canvasRef} {...rest} style={{border: '1px solid black'}} onClick={handleCanvasClick}/>
}

export default Canvas;