//import { useRef, useEffect } from 'react'
import useCanvas from './useCanvas';

const Canvas = (props) => {

    const { draw, ...rest } = props;

    const canvasRef = useCanvas(draw);

    return <canvas ref={canvasRef} {...rest} style={{border: '1px solid black'}}/>
}

export default Canvas;