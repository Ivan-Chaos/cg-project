import { useEffect, useState } from "react";
import Slider from '@mui/material/Slider';
import Canvas from '../../src/Fractals/Canvas/Canvas'
import { Button } from 'react-bootstrap'


function offsetX(v, x_offset, x_scale) {
    return x_offset + (v * x_scale);
}

function offsetY(v, y_offset, y_scale) {
    return y_offset - (v * y_scale);
}

function drawGrid(x_axis, y_axis, x_max, y_max, ctx) {
    ctx.clearRect(0, 0, x_axis * 2, y_axis * 2);
    var x_scale = x_axis / (x_max + 1);
    var y_scale = y_axis / (y_max + 1);

    var x_offset = x_axis + 0.5; // location on canvas
    var y_offset = y_axis + 0.5; // of graph's origin

    ctx.font = "20px sans-serif";
    ctx.strokeText('0', x_axis - 5, y_axis + 8);
    ctx.font = "14px sans-serif";
    ctx.strokeText('Y', x_axis - 25, 15);
    ctx.strokeText('X', x_axis * 2 - 10, y_axis + 30);

    ctx.font = "12px sans-serif";
    ctx.lineWidth = 1;

    // draw x-axis
    ctx.beginPath();
    ctx.moveTo(0, y_offset);
    ctx.lineTo(x_axis * 2, y_offset);
    ctx.stroke();
    ctx.closePath();

    // draw arrow
    ctx.beginPath();
    ctx.moveTo(x_axis * 2 + 0.5, y_axis + 0.5);
    ctx.lineTo(x_axis * 2 + 0.5 - 8, y_axis + 0.5 - 3);
    ctx.lineTo(x_axis * 2 + 0.5 - 8, y_axis + 0.5 + 3);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();

    // draw x values
    let j = -x_max;
    while (j <= x_max) {
        let x = j * x_scale;
        ctx.strokeStyle = '#aaa';
        ctx.beginPath();
        ctx.moveTo(x + x_offset, y_offset);
        ctx.lineTo(x + x_offset, y_offset + 10);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = '#666';
        ctx.strokeText(j, x + x_offset - 5, y_offset + 30);

        j++;
        if (j == 0) { j++; }
    }

    // draw y-axis
    ctx.beginPath();
    ctx.moveTo(x_offset, 0);
    ctx.lineTo(x_offset, y_axis * 2);
    ctx.stroke();
    ctx.closePath();

    // draw arrow
    ctx.beginPath();
    ctx.moveTo(x_axis + 0.5, 0.5);
    ctx.lineTo(x_axis + 0.5 - 3, 0.5 + 8);
    ctx.lineTo(x_axis + 0.5 + 3, 0.5 + 8);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();

    // draw y values
    j = -y_max;
    while (j <= y_max) {
        let y = j * y_scale;
        ctx.strokeStyle = '#aaa';
        ctx.beginPath();
        ctx.moveTo(x_offset, y + y_offset);
        ctx.lineTo(x_offset - 10, y + y_offset);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = '#666';
        ctx.strokeText(-j, x_offset - 25, y + y_offset + 5);

        j++;
        if (j == 0) { j++; }
    }

    ctx.font = "14px sans-serif black";
    ctx.strokeText('y = x', x_axis + 50, 50);

    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.strokeStyle = '#ee0000';

    debugger;
    ctx.moveTo(0, y_axis * 2);

    ctx.lineTo(x_axis * 2, 0);

    ctx.stroke();
    ctx.closePath();
}

function drawTriangle(a, b, c, context, ticks, height) {


    const offset = height / (ticks * 2);

    context.strokeStyle = '#006147';

    context.beginPath();
    context.font = "14px sans-serif black";
    context.strokeText('A', (a.x + ticks) * offset, (ticks - a.y) * offset + 15);
    context.moveTo((a.x + ticks) * offset, (ticks - a.y) * offset);

    context.strokeText('B', (b.x + ticks) * offset, (ticks - b.y) * offset + 15);
    context.lineTo((b.x + ticks) * offset, (ticks - b.y) * offset);

    context.strokeText('C', (c.x + ticks) * offset, (ticks - c.y) * offset - 10);
    context.lineTo((c.x + ticks) * offset, (ticks - c.y) * offset);
    context.closePath();

    // the outline
    context.lineWidth = 3;
    context.strokeStyle = 'black';
    context.stroke();
}

function multiplyMatrices(m1, m2) {

}

function moveAndRotate(length, a, b, c, direction) {
    const triangleMatrix = [
        [a.x, a.y, 1],
        [b.x, b.y, 1],
        [c.x, c.y, 1]
    ]

    const moveMatrix = [
        [1, 0, 0],
        [0, 1, 0],
        [length, length, 1]
    ]

    let res = [[], [], []];

    for (let i = 0; i < triangleMatrix.length; i++) {
        for (let j = 0; j < triangleMatrix[i].length; j++) {
            let tres = 0;
            for (let k = 0; k < triangleMatrix[i].length; k++) {
                tres += triangleMatrix[i][k] * moveMatrix[k][j]
            }
            res[i].push(tres);
        }
    }

    let resrot = [[], [], []];

    let rotateMatrix;

    if (direction) {
        rotateMatrix = [
            [Math.cos(Math.PI / 6), -1 * Math.sin(Math.PI / 6), 0],
            [Math.sin(Math.PI / 6), Math.cos(Math.PI / 6), 0],
            [0, 0, 1]
        ]
    }
    else {
        rotateMatrix = [
            [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6), 0],
            [-1 * Math.sin(Math.PI / 6), Math.cos(Math.PI / 6), 0],
            [0, 0, 1]
        ]
    }



    for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res[i].length; j++) {
            let tres = 0;
            for (let k = 0; k < res[i].length; k++) {
                tres += res[i][k] * rotateMatrix[k][j]
            }
            resrot[i].push(tres);
        }
    }

    return [
        { x: parseFloat(resrot[0][0].toFixed(4)), y: parseFloat(resrot[0][1].toFixed(4)) },
        { x: parseFloat(resrot[1][0].toFixed(4)), y: parseFloat(resrot[1][1].toFixed(4)) },
        { x: parseFloat(resrot[2][0].toFixed(4)), y: parseFloat(resrot[2][1].toFixed(4)) }
    ]

}


const Affine = ({ height, width, tickCount, triangleCoordinates, setTriangleCoordinates, length, sendClick, setSendClick, direction }) => {

    const [ctxToSave, setCtxToSave] = useState(undefined);
    const [tc, setTc] = useState(6);

    //click is being delegated from higher above
    useEffect(() => {
        if (sendClick) {
            setTriangleCoordinates(moveAndRotate(length, ...triangleCoordinates, direction))
            setSendClick(false);
        }
    }, [sendClick])


    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, width, height);
        drawGrid(height / 2, width / 2, tc, tc, ctx);
        drawTriangle(...triangleCoordinates, ctx, tc + 1, height);
        setCtxToSave(ctx);
    }

    return (<div>
        <Canvas draw={draw} height={height} width={width} />
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1em' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: width + "px", alignItems: 'baseline' }}>
                Маштаб
                <Button variant="dark" style={{ width: '15em' }} onClick={() => {
                    var canvas = ctxToSave.canvas;
                    let timage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                    var link = document.createElement('a');
                    link.download = "my-image.png";
                    link.href = timage;
                    link.click();
                }}>Завантажити зображення</Button>

            </div>


            <Slider
                defaultValue={9}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={6}
                max={20}
                style={{ width: width + "px" }}
                onChange={(e) => {
                    setTc(parseInt(e.target.value));
                }}
            />
        </div>

    </div>);
}

export default Affine;