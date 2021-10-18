import { useState } from "react";
import Canvas from "../Canvas/Canvas";


const Plasma = ({height, width, rectSize}) => {
    
    const [roundCounter, setRoundCounter] = useState(0)

    const draw = (ctx, frameCount) => {
        if(frameCount>1)
            return;
            
            const randomInt = (max) =>{
                return Math.floor(Math.random() * max);
            }

            const rgb4Avg = (color1, color2, color3, color4, mt) =>{
                let avgCol = {};
                const rv = Math.pow(-1, Math.round(Math.random()*2))*Math.random()*25*mt;
                avgCol.r = Math.sqrt((Math.pow(color1.r, 2) + Math.pow(color2.r, 2)+ Math.pow(color3.r, 2)+ Math.pow(color4.r, 2))/4) +rv;
                avgCol.g = Math.sqrt((Math.pow(color1.g, 2) + Math.pow(color2.g, 2)+ Math.pow(color3.g, 2)+ Math.pow(color4.g, 2))/4) +rv;
                avgCol.b = Math.sqrt((Math.pow(color1.b, 2) + Math.pow(color2.b, 2)+ Math.pow(color3.b, 2)+ Math.pow(color4.b, 2))/4) +rv;
                return avgCol;
            }

            const rgb3Avg = (color1, color2, color3, mt) =>{
                let avgCol = {};
                const rv = Math.pow(-1, Math.round(Math.random()*2))*Math.random()*25*mt;
                avgCol.r = Math.sqrt((Math.pow(color1.r, 2) + Math.pow(color2.r, 2)+ Math.pow(color3.r, 2))/3)+ rv;
                avgCol.g = Math.sqrt((Math.pow(color1.g, 2) + Math.pow(color2.g, 2)+ Math.pow(color3.g, 2))/3) +rv;
                avgCol.b = Math.sqrt((Math.pow(color1.b, 2) + Math.pow(color2.b, 2)+ Math.pow(color3.b, 2))/3) +rv;
                return avgCol;
            }

            const rgb2Avg = (color1, color2) =>{
                let avgCol = {};
                const rv = Math.pow(-1, Math.round(Math.random()*2))*Math.random()*25*mt;
                avgCol.r = Math.sqrt((Math.pow(color1.r, 2) + Math.pow(color2.r, 2))/2)+ rv;
                avgCol.g = Math.sqrt((Math.pow(color1.g, 2) + Math.pow(color2.g, 2))/2) +rv;
                avgCol.b = Math.sqrt((Math.pow(color1.b, 2) + Math.pow(color2.b, 2))/2) +rv;
                return avgCol;
            } 

            let mt=1;
            
            const rectangeDraw = (x1, x2, y1, y2, myIteration, colors)=>{
                
                
                let newX = (x1+x2)/2;
                let newY = (y1+y2)/2;
                /*
                const newColor = rgb4Avg(colors.bottomRight, colors.bottomLeft, colors.topRight, colors.topLeft, mt);
                const newRightColor = rgb3Avg(colors.topRight, colors.bottomRight, newColor, mt);
                const newLeftColor = rgb3Avg(colors.bottomLeft, colors.topLeft, newColor, mt);
                const newTopColor = rgb3Avg(colors.topLeft, colors.topRight, newColor, mt);
                const newBottomColor = rgb3Avg(colors.bottomLeft, colors.bottomRight, newColor, mt); 
                */

                const newRightColor = rgb2Avg(colors.topRight, colors.bottomRight);
                const newLeftColor = rgb2Avg(colors.bottomLeft, colors.topLeft);
                const newTopColor = rgb2Avg(colors.topLeft, colors.topRight);
                const newBottomColor = rgb2Avg(colors.bottomLeft, colors.bottomRight); 

                const newColor = rgb4Avg(colors.bottomRight, colors.bottomLeft, colors.topRight, colors.topLeft, mt);

                ctx.fillStyle = `rgb(${newRightColor.r}, ${newRightColor.g}, ${newRightColor.b})`;
                ctx.fillRect(x2, (y1+y2)/2, rectSize, rectSize);

                ctx.fillStyle = `rgb(${newLeftColor.r}, ${newLeftColor.g}, ${newLeftColor.b})`;
                ctx.fillRect(x1, (y1+y2)/2, rectSize, rectSize);

                ctx.fillStyle = `rgb(${newTopColor.r}, ${newTopColor.g}, ${newTopColor.b})`;
                ctx.fillRect((x1+x2)/2, y1, rectSize, rectSize);

                ctx.fillStyle = `rgb(${newBottomColor.r}, ${newBottomColor.g}, ${newBottomColor.b})`;
                ctx.fillRect((x1+x2)/2, y2, rectSize, rectSize);

                
                ctx.fillStyle = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
                ctx.fillRect(newX, newY, rectSize, rectSize);

                //debugger;                
                //setTimeout(()=>{
                    if(myIteration<10){
                        rectangeDraw(x1, newX, y1, newY, myIteration+1,{
                            topLeft: colors.topLeft,
                            topRight: newTopColor,
                            bottomRight: newColor,
                            bottomLeft: newLeftColor
                        });

                        rectangeDraw(x1, newX, newY, y2, myIteration+1,{
                            topLeft: newLeftColor,
                            topRight: newColor,
                            bottomRight: newBottomColor,
                            bottomLeft: colors.bottomLeft
                        });
    
                        rectangeDraw(newX, x2, y1, newY, myIteration+1, {
                            topLeft: newTopColor,
                            topRight: colors.topRight,
                            bottomRight: newRightColor,
                            bottomLeft: newColor
                        });
                        
                        rectangeDraw(newX, x2, newY, y2, myIteration+1, {
                            topLeft: newColor,
                            topRight: newRightColor,
                            bottomRight: colors.bottomRight,
                            bottomLeft: newBottomColor
                        });
                       
                        
                    }
                    //mt*=Math.pow(2, -Math.random()*0.8);
                //}, 25)
                
                    
            }


        
            //ctx.fillRect(0, 0, 5, 5);
        
            rectangeDraw(0, ctx.canvas.clientWidth, 0, ctx.canvas.clientHeight, 0, {
                topLeft: {r: randomInt(220), g: randomInt(220), b: randomInt(220)},
                topRight: {r: randomInt(220), g: randomInt(220), b: randomInt(220)},
                bottomRight: {r: randomInt(220), g: randomInt(220), b: randomInt(220)},
                bottomLeft: {r: randomInt(220), g: randomInt(220), b: randomInt(220)}
            });
        
        /*ctx.moveTo(Math.random()*300, Math.random()*300);
        ctx.lineTo(Math.random()*300, Math.random()*300);
        ctx.stroke();*/
    }
    
    return ( <div>
        

        <Canvas draw={draw} height={height} width={width}/>
    </div> );
}
 
export default Plasma;