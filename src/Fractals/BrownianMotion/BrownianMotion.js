import Canvas from "../Canvas/Canvas";

import React, { useEffect, useState } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const BrownianMotion1 = ({ height, width, fineness, aggressiveness, iterations, coordinates, setCoordinates, step, setCtxToSave }) => {

    const [drawable, setDrawable] = useState(false)

    let isDrawing = false;

    useEffect(() => {
        if (drawable) {
            setDrawable(false);
        }
    }, [drawable])


    const draw = (ctx, frameCount) => {
        ctx.strokeStyle = 'hsl(0, 100%, 50%)';
        ctx.lineWidth = fineness;
        setCtxToSave(ctx);


        if (frameCount > 1)
            return;
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        isDrawing= true;
        //повторити n разів симуляцію руху точки
        for (let i = 0; i < iterations; i++) {
            ctx.beginPath();
            ctx.strokeStyle = `hsl(${360 / iterations * i}, 100%, ${50 - 50 / iterations * i}%)`;

            //обчислення нового довільного значення на відстані
            let newx = Math.pow(-1, Math.round(Math.random() * 2)) * Math.random() * aggressiveness;
            let newy = Math.pow(-1, Math.round(Math.random() * 2)) * Math.random() * aggressiveness;

            newx = coordinates.x + newx < 0 || coordinates.x + newx > width ? -1 * newx : newx;
            newy = coordinates.y + newy < 0 || coordinates.y + newy > height ? -1 * newy : newy;

            ctx.moveTo(coordinates.x + newx, coordinates.y + newy);
            ctx.lineTo(coordinates.x, coordinates.y);


            coordinates.x += newx;
            coordinates.y += newy;
            ctx.stroke();
        }
        isDrawing = false;
    }

    const drawStep = (ctx, frameCount) => {
        ctx.clearRect(0, 0, width, height)
        ctx.strokeStyle = 'hsl(0, 100%, 50%)';
        ctx.lineWidth = fineness;

        if (frameCount > 1)
            return;
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        isDrawing = true;
        for (let i = 0; i < iterations; i++) {
            setTimeout(() => {
                ctx.beginPath();
                isDrawing = true;
                ctx.strokeStyle = `hsl(${360 / iterations * i}, 100%, ${50 - 50 / iterations * i}%)`;

                let newx = Math.pow(-1, Math.round(Math.random() * 2)) * Math.random() * aggressiveness;
                let newy = Math.pow(-1, Math.round(Math.random() * 2)) * Math.random() * aggressiveness;

                newx = coordinates.x + newx < 0 || coordinates.x + newx > width ? -1 * newx : newx;
                newy = coordinates.y + newy < 0 || coordinates.y + newy > height ? -1 * newy : newy;

                ctx.moveTo(coordinates.x + newx, coordinates.y + newy);
                ctx.lineTo(coordinates.x, coordinates.y);


                coordinates.x += newx;
                coordinates.y += newy;
                ctx.stroke();
            }, 50 * i);
        }
        isDrawing = false;

    }

    return (<TransformWrapper>
        <TransformComponent>
            {!drawable && <Canvas draw={step ? drawStep : draw} height={height} width={width} setCoordinates={setCoordinates} />}
        </TransformComponent>
        
    </TransformWrapper>);
}

export const BrownianMotion = React.memo(BrownianMotion1);