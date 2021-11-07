import { useEffect, useState } from 'react'
import Affine from "../Affine/Affine";
import { Row, Col } from 'react-bootstrap'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const AffineWrapper = () => {
    const [triangleCoordinates, setTriangleCoordinates] = useState([
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 1.5, y: 2 }
    ])

    const [length, setLength] = useState(0);

    const [sendClick, setSendClick] = useState(false);

    const [direction, setDirection] = useState(true);

    return (<div style={{ marginTop: '1em' }}>
        <Row>
            <Col xs={5}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                    <div style={{ width: '26em', background: '#edf2f5', padding: '2em', borderRadius: '25px' }}>

                        {
                            triangleCoordinates.map((e, index) => {
                                return <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: '1em' }}>
                                    {String.fromCharCode(65 + index)}:
                                    <TextField
                                        InputProps={{ inputProps: { step: 0.1 } }}
                                        id="standard-required"
                                        label="X"
                                        defaultValue="Hello World"
                                        variant="standard"
                                        type="number"
                                        style={{ width: "5em", marginRight: '1em', marginLeft: '2em' }}
                                        value={triangleCoordinates[index].x}
                                        onChange={e => {
                                            let temp = [...triangleCoordinates];
                                            temp[index].x = parseFloat(e.target.value);
                                            setTriangleCoordinates([...temp]);
                                        }}
                                    />
                                    <TextField
                                        InputProps={{ inputProps: { step: 0.1 } }}
                                        id="standard-required"
                                        label="Y"
                                        defaultValue="Hello World"
                                        variant="standard"
                                        type="number"
                                        style={{ width: "5em" }}
                                        value={triangleCoordinates[index].y}
                                        onChange={e => {
                                            let temp = [...triangleCoordinates];
                                            temp[index].y = parseFloat(e.target.value);
                                            setTriangleCoordinates([...temp]);
                                        }}
                                    />
                                </div>
                            })
                        }
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: '1em' }}>
                            Відстань зсуву:
                            <TextField
                                InputProps={{ inputProps: { step: 0.1 } }}
                                id="standard-required"
                                label="Відстань"
                                defaultValue="Hello World"
                                variant="standard"
                                type="number"
                                style={{ width: "7em", marginRight: '1em', marginLeft: '2em' }}
                                onChange={e => setLength(parseFloat(e.target.value))}
                                value={length}
                            />
                        </div>
                        <hr />
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        defaultChecked
                                        onChange={(e, value)=>{
                                            setDirection(value);
                                        }}
                                    />
                                }
                                label="За годинниковою стрілкою"
                            />


                            <Button variant="contained" onClick={() => setSendClick(true)}>Перемалювати</Button>
                        </div>
                    </div>
                </div>
            </Col>
            <Col xs={6}>
                <Affine
                    height={600}
                    width={600}
                    tickCount={9}
                    triangleCoordinates={triangleCoordinates}
                    setTriangleCoordinates={setTriangleCoordinates}
                    length={length}
                    sendClick={sendClick}
                    setSendClick={setSendClick}
                    direction = {direction}
                />
            </Col>
        </Row >
        <Row>
            <Col>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                    <h1>Загальна інформація про Афінні перетворення</h1>
                </div>
                <p style={{ marginLeft: '4em', marginRight: '4em', fontSize: '14pt' }}>    
                                  
     Афінні перетворення знаходять широке застосування в задачах машинної графіки. Найбільшого поширення набули часткові випадки афінних перетворень: зсув, поворот, масштабування.
     Нехай у площині задана початкова система координат 0ХY і деяка нова система координат 01X1Y1. Тоді перетворення, які полягають у тому, щоб у відповідність точці P площини ставиться точка P1, яка в новій системі має такі самі координати, що й точкаP у початковій, називаються афінними.

                </p>
            </Col>
        </Row>
    </div >);
}

export default AffineWrapper;