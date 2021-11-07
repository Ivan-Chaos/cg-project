import { Row, Col, Form, Button } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react'
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Canvas from '../Fractals/Canvas/Canvas'
import ImageDialog from '../Colors/ImageDialog'
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


const ColorsWrapper = () => {

    const [image, setImage] = useState();
    const [crop, setCrop] = useState({
        unit: '%',
        width: 40,
        aspect: 7 / 5
    }
    );

    const [src, setSrc] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const [draw, setDraw] = useState(() => (ctx, frameCount) => { });

    const [draw2, setDraw2] = useState(() => (ctx, frameCount) => { });

    const [lightness, setLightness] = useState(50);
    const [deviation, setDeviation] = useState(0);

    const [ctx1, setCtx1] = useState(undefined);
    const [ctxToSave, setCtxToSave] = useState(undefined);
    const [pointColor, setPintColor] = useState(undefined)


    useEffect(() => {
        if (src !== "") {
            setOpenDialog(true);
        }
    }, [src])


    useEffect(()=>{
        setDraw2(() => (ctx, frameCount) => {
            debugger;
            var imageData = ctx.getImageData(0, 0, 700, 500);
            cyanBrigthness(imageData.data, lightness, deviation, ctx1);
            ctx.putImageData(imageData, 0, 0);
        })
    }, [lightness, deviation]);

    useEffect(() => {

        setDraw(() => (ctx, frameCount) => {
            
            var imageObj1 = new Image();
            imageObj1.src = src;
            imageObj1.onload = function () {
                
                const pixelRatio = window.devicePixelRatio;

                ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
                ctx.imageSmoothingQuality = 'high';

                ctx.drawImage(
                    imageObj1,
                    crop.x * imageObj1.naturalWidth / 100,
                    crop.y * imageObj1.naturalHeight / 100,
                    crop.width * imageObj1.naturalWidth / 100,
                    crop.height * imageObj1.naturalHeight / 100,
                    0,
                    0,
                    700,
                    500
                );

                var imageData = ctx.getImageData(0, 0, 700, 500);
                setCtx1(imageData.data);
                setCtxToSave(ctx);

                ctx.canvas.onmousemove = function(e) {
                    var mouseX, mouseY;
        
                    if(e.offsetX) {
                        mouseX = e.offsetX;
                        mouseY = e.offsetY;
                    }
                    else if(e.layerX) {
                        mouseX = e.layerX;
                        mouseY = e.layerY;
                    }

                    let p = ctx.getImageData(mouseX, mouseY, 1, 1).data;

                    setPintColor(p);
              };
            }


        })

        setDraw2(() => draw);
    }, [crop])


    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return { h: h, s: s, l: l };
    }

    function hslToRgb(h, s, l) {
        var r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            var hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }

    var rgb2cmyk = function(r, g, b, normalized){
        var c = 1 - (r / 255);
        var m = 1 - (g / 255);
        var y = 1 - (b / 255);
        var k = Math.min(c, Math.min(m, y));
        
        c = (c - k) / (1 - k);
        m = (m - k) / (1 - k);
        y = (y - k) / (1 - k);
        
        if(!normalized){
            c = Math.round(c * 10000) / 100;
            m = Math.round(m * 10000) / 100;
            y = Math.round(y * 10000) / 100;
            k = Math.round(k * 10000) / 100;
        }
        
        c = isNaN(c) ? 0 : c;
        m = isNaN(m) ? 0 : m;
        y = isNaN(y) ? 0 : y;
        k = isNaN(k) ? 0 : k;
        
        return {
            c: c,
            m: m,
            y: y,
            k: k
        }
    }

    function cyanBrigthness(data, lightness, deviation, originalData) {
        for (var i = 0; i < data.length; i += 4) {
            
            let hsl = rgbToHsl(originalData[i], originalData[i + 1], originalData[i + 2])
            if (hsl.h >= 0.5 - deviation / 360 && hsl.h <= 0.5 + deviation / 360 && hsl.l >= 0.15 && hsl.l <= 0.9) {
                debugger;
                hsl.l = lightness / 100;
            }

            let rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
            data[i] = rgb.r;
            data[i + 1] = rgb.g;
            data[i + 2] = rgb.b;
        }
    }


    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setSrc(reader.result)
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (<div>
        <Row>
            <Col>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ textAlign: 'right' }}>До</h1>
                        <Canvas draw={draw} height={500} width={700} />
                    </div>
                </div>
            </Col>
            <Col>
                <ImageDialog open={openDialog} setOpen={setOpenDialog} src={src} crop={crop} setCrop={setCrop} />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <h1>Після</h1>
                        <Canvas draw={draw2} height={500} width={700} />
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <div style={{margin: '3em'}}>
                    <h4> <b>R:</b> {pointColor && pointColor[0]}  <b>G:</b> {pointColor && pointColor[1]}  <b>B:</b> {pointColor && pointColor[2]} </h4>
                    {pointColor!==undefined && <h4> <b>H:</b> {Math.round(rgbToHsl(...pointColor).h*360)}  <b>S:</b>{Math.round(rgbToHsl(...pointColor).l*100)}  <b>L:</b>{Math.round(rgbToHsl(...pointColor).l*100)}  </h4>}
                    {<h4> <b>C:</b> {Math.round(rgb2cmyk(...pointColor).c*100)} <b>M:</b> {Math.round(rgb2cmyk(...pointColor).m*100)} <b>Y:</b> {Math.round(rgb2cmyk(...pointColor).y*100)} <b>K:</b> {Math.round(rgb2cmyk(...pointColor).k*100)} </h4>}
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control type="file" onChange={onSelectFile} />
                    </Form.Group>
                    <Typography id="input-slider" gutterBottom>
                        Яскравість
                    </Typography>
                    <Slider sx={{ color: 'rgba(0,0,0,0.87)', height: 10}} defaultValue={50} aria-label="Default" valueLabelDisplay="auto" onChange={(e) => setLightness(e.target.value)} />

                    <Typography id="input-slider" gutterBottom>
                        Відхилення по блакитному кольору
                    </Typography>
                    <Slider  sx={{ color: 'rgba(0,0,0,0.87)', height: 10}} defaultValue={deviation} max={60} aria-label="Default" valueLabelDisplay="auto" onChange={(e) => setDeviation(e.target.value)} />
                    <Button variant="dark" onClick={()=>{
                        var canvas = ctxToSave.canvas;
                        let timage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                        var link = document.createElement('a');
                        link.download = "my-image.png";
                        link.href = timage;
                        link.click();
                    }}>Завантажити файл</Button>
                </div>
            </Col>
        </Row>

        <Row>
            <Col>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                    <h1>Загальна інформація про кольорні моделі</h1>
                </div>
                <p style={{ marginLeft: '4em', marginRight: '4em', fontSize: '14pt' }}>    Бро́унівський рух — невпорядкований, хаотичний рух частинки під дією нерівномірних ударів молекул речовини з різних боків у розчинах. Названий на честь ботаніка Роберта Броуна, який спостерігав це явище під мікроскопом у 1827 р. Теорію броунівського руху сформулював у 1905 р. Альберт Ейнштейн.

                    Призначення колірної моделі - дати засоби опису кольору в межах деякого колірного діапазону, у тому
                    числі і для виконання інтерполяції кольорів.
                    Існують різні моделі, оскільки із зображенням виконуються різні дії: відображення на екран, видрук на
                    принтер, опрацювання кольорів, перетворення в сірі тони, корекція яскравості, інтенсивності і т.п.
                    Кожна модель має своє призначення, тобто ефективна для виконання окремих операцій.
                    Розглянемо апаратно-орієнтовані триколірні моделі RGB, CMY та триатрибутні HSV, HSL.
                </p>

            </Col>
        </Row>


    </div>);
}

export default ColorsWrapper;