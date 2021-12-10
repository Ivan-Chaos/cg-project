import { Mandlebub } from "../Mandlebub/Mandlebub";
import { Row, Col, Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';


const MandlebulbWrapper = () => {

    const [animate, setAnimate] = useState(true);
    const [lineMode, setLineMode] = useState(true);
    const [power, setPower] = useState(10);
    const [startViewAngle, setStartViewAngle] = useState(90);
    const [ctxToSave, setCtxToSave] = useState(undefined);
    const [iterations, setIterations] = useState(20.0);

    return (<div style={{ marginTop: '1em' }}>
        <Row>
            <Col>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', width: window.visualViewport.width - 100 }}>
                    <FormControlLabel control={<Switch checked={animate} onChange={(ev) => { setAnimate(!animate) }} />} label="Анімація обертання" />
                    <FormControlLabel control={<Switch checked={lineMode} onChange={(ev) => { setLineMode(!lineMode) }} />} label="Лінійний рендеринг" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', }}>
                    <Mandlebub move={animate} lineMode={lineMode} Power={power} setCtxToSave={setCtxToSave} startViewAngle={startViewAngle} Iterations={iterations}/>
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                    <TextField
                        label="Степінь фракталу"
                        variant="standard"
                        type="number"
                        style={{ marginLeft: '1em', width: '10em' }}
                        InputProps={{ inputProps: { min: 1, max: 100000 } }}
                        onChange={(ev) => {
                            setPower(parseFloat(ev.target.value))
                        }}
                        value={power}
                    />

                    <TextField
                        label="Кількість ітерацій"
                        style={{ marginLeft: '1em', width: '10em' }}
                        InputProps={{ inputProps: { min: 1, max: 200 } }}
                        variant="standard"
                        type='number'
                        value={iterations}
                        onChange={(ev) => {
                            setIterations(parseFloat(ev.target.value));
                        }}
                    />

                    <TextField
                        label="Початковий кут огляду"
                        style={{ marginLeft: '1em', width: '10em' }}
                        InputProps={{ inputProps: { min: 1, max: 200 } }}
                        variant="standard"
                        type='number'
                        value={startViewAngle}
                        onChange={(ev) => {
                            setStartViewAngle(parseFloat(ev.target.value));
                        }}
                    />

                    <Tooltip title="Завантажити прорисований тривимірний фрактал Мандельброта">
                        <Button variant="secondary" style={{ width: '15em', marginLeft: '1em', height: '3em' }} onClick={() => {
                            var canvas = ctxToSave.canvas;
                            let timage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                            var link = document.createElement('a');
                            link.download = "mandelbulb.png";
                            link.href = timage;
                            link.click();
                        }}>Завантажити зображення</Button>
                    </Tooltip>
                </div>

            </Col>
        </Row>
        <Row>
            <Col>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                    <h1>Загальна інформація про тривимірний фрактал Мандельброта </h1>
                </div>
                <p style={{ marginLeft: '4em', marginRight: '4em', fontSize: '14pt' }}>
                    Лампочка Мандельброта — тривимірний фрактал, аналог множини Мандельброта, створений Деніелом Вайтом та Полом Ніландером, з використанням гіперкомплесної алгебри
                    що базується на сферичних координатах. Формула для n-того степеня тривимірного гіперкомплексного числа <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/7dfff12dcc76a13745a57deac5876879d6527871" /> така: <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/adafb469b0756eb3d6d2405bc188547aa04c97c3" /> <br />
                    Де <br /><img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/19257a19541118e903bf2407c0674d1ae1459abb" />
                    <br />
                    <br />
                    Була використана ітерація <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/e4e51efae4343db86cc290225cc181f15030104f" />
                    де z та c — тривимірні гіперкомплексні числа, на яких операція піднесення до натурального степеня виконується як вказано вище. Для n > 3, результатом є тривимірний фрактал. Найчастіше використовують восьмий степінь.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ marginRight: '5em' }}>
                        <img src="https://mandelbulbs.s3.amazonaws.com/new/sphere.png" />
                        <p>Сферична система координат</p>
                    </div>

                    <div>
                        <img src="https://mandelbulbs.s3.amazonaws.com/new/q85/mandelbulb-small.jpg" />
                        <p>Тривимірний фрактал Мандельброта 8 степеня</p>
                    </div>
                </div>
               

            </Col>
        </Row>
    </div>);
}

export default MandlebulbWrapper;