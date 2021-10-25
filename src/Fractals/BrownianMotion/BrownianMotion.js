import Canvas from "../Canvas/Canvas";

import {useEffect, useState} from 'react'



const BrownianMotion = ({height, width, fineness, aggressiveness, iterations, coordinates, setCoordinates, step}) => {

    const [drawable, setDrawable] = useState(1)

    useEffect(()=>{
        setDrawable(drawable+1);
    }, [step])
    

    const draw = (ctx, frameCount) => {
        ctx.strokeStyle = 'hsl(0, 100%, 50%)';
        ctx.lineWidth = fineness;
        
        

        if(frameCount>1)
            return;
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        for(let i=0; i<iterations; i++){
            //setTimeout(()=>{
            ctx.beginPath();
            ctx.strokeStyle = `hsl(${360/iterations*i}, 100%, ${50-50/iterations*i}%)`;
            
            let newx = Math.pow(-1, Math.round(Math.random()*2)) * Math.random() * aggressiveness;
            let newy = Math.pow(-1, Math.round(Math.random()*2)) * Math.random() * aggressiveness;
            
            newx = coordinates.x+newx<0 || coordinates.x+newx>width ? -1 * newx: newx;
            newy = coordinates.y+newy<0 || coordinates.y+newy>height ? -1 * newy: newy;

            ctx.moveTo(coordinates.x+newx , coordinates.y+newy);
            ctx.lineTo(coordinates.x, coordinates.y);
            

            coordinates.x+=newx;
            coordinates.y+=newy;
            ctx.stroke();
            //}, 0*i);
        }
    }

    const drawStep = (ctx, frameCount) => {
        ctx.strokeStyle = 'hsl(0, 100%, 50%)';
        ctx.lineWidth = fineness;

        if(frameCount>1)
            return;
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        for(let i=0; i<iterations; i++){
            setTimeout(()=>{
            ctx.beginPath();
            ctx.strokeStyle = `hsl(${360/iterations*i}, 100%, ${50-50/iterations*i}%)`;
            
            let newx = Math.pow(-1, Math.round(Math.random()*2)) * Math.random() * aggressiveness;
            let newy = Math.pow(-1, Math.round(Math.random()*2)) * Math.random() * aggressiveness;
            
            newx = coordinates.x+newx<0 || coordinates.x+newx>width ? -1 * newx: newx;
            newy = coordinates.y+newy<0 || coordinates.y+newy>height ? -1 * newy: newy;

            ctx.moveTo(coordinates.x+newx , coordinates.y+newy);
            ctx.lineTo(coordinates.x, coordinates.y);
            

            coordinates.x+=newx;
            coordinates.y+=newy;
            ctx.stroke();
            }, 50*i);
        }
    }
    
    return ( <Canvas draw={step ? drawStep :  draw} height={height} width={width} setCoordinates={setCoordinates}/> );
}
 
export default BrownianMotion;