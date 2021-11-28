
import { Row, Col, Button } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react'
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Plasma } from '../Fractals/Plasma/Plasma';
import Tooltip from '@mui/material/Tooltip';

const PlasmaWrapper = () => {

    const [iterations, setIterations] = useState(5);
    const [step, setStep] = useState(false);
    const [grain, setGrain] = useState(15);
    const [ctxToSave, setCtxToSave] = useState(undefined);

    const [tempGrain, setTempGrain] = useState(15);
    const [tempIterations, setTempIterations] = useState(5);
    const [tempStep, setTempStep] = useState(false);


    return (<div>
        <Row>
            <Col>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', width: window.visualViewport.width - 100 }}>
                    <FormControlLabel control={<Switch onChange={(ev) => { setTempStep(!tempStep) }} />} label="Покроковий режим" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', }}>
                    <Plasma setCtxToSave={setCtxToSave} height={window.visualViewport.height / 2} rectSize={grain} width={window.visualViewport.height / 2} iterations={iterations} step={step} />
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', width: '100%' }}>

                    <Tooltip title={tempIterations > 7 ? "Зависока кількість ітерацій може спричинити повільний рендеринг" : ''}>
                        <TextField
                            error={tempIterations > 7}
                            helperText={tempIterations > 7 ? "Висока кількість ітерацій" : ''}
                            label="Кількість ітерацій"
                            variant="standard"
                            type={'number'}
                            value={tempIterations}
                            onChange={(ev) => {
                                setTempIterations(parseInt(ev.target.value));
                            }}
                            InputProps={{ inputProps: { min: 1, max: 10 } }}
                            style={{ width: '10em', marginLeft: '1em' }}
                        />
                    </Tooltip>

                    <TextField
                        label="Зернистість"

                        style={{ marginLeft: '1em' }}
                        type={'number'}
                        variant="standard"
                        value={tempGrain}
                        InputProps={{ inputProps: { min: 1, max: 15 } }}
                        onChange={(ev) => {
                            setTempGrain(parseInt(ev.target.value));
                        }}
                        style={{ width: '8em', marginLeft: '1em' }}
                    />

                    <Tooltip title="Завантажити прорисований фрактал плазми">
                        <Button variant="secondary" style={{ width: '15em', marginLeft: '1em', height: '3em' }} onClick={() => {
                            var canvas = ctxToSave.canvas;
                            let timage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                            var link = document.createElement('a');
                            link.download = "plasma.png";
                            link.href = timage;
                            link.click();
                        }}>Завантажити зображення</Button>
                    </Tooltip>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', width: '100%' }}>
                    <Button variant="dark" style={{ width: '15em', marginLeft: '1em' }}
                        onClick={() => {
                            setIterations(tempIterations);
                            setGrain(tempGrain);
                            setStep(tempStep);
                        }}
                    >Рендер</Button>
                </div>
            </Col>
        </Row>

        <Row>
            <Col>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                    <h1>Загальна інформація про фрактал плазми</h1>
                </div>
                <p style={{ marginLeft: '4em', marginRight: '4em', fontSize: '14pt' }}>    Бро́унівський рух — невпорядкований, хаотичний рух частинки під дією нерівномірних ударів молекул речовини з різних боків у розчинах. Названий на честь ботаніка Роберта Броуна, який спостерігав це явище під мікроскопом у 1827 р. Теорію броунівського руху сформулював у 1905 р. Альберт Ейнштейн.

                    Плазма - прийом в комп'ютерній графіці, що дозволяє створювати зображення за допомогою рандомізованих фракталів.
                    Для побудови плазми необхідно використовувати шаблон чорно-білого зображення. Рекурсивний алгоритм для побудови такий: привласнити значення відтінку для 4-х кутів прямокутника,
                    вирахувати середні значення відтінків для середин сторін і центру використовуючи середнє арифметичне. випадково змінити центральний відтінок. Величина зміни повинна залежати від розмірів прямокутника. розділити прямокутник на 4 рівні частини, в кутах яких будуть отримані середні значення.</p>

            </Col>
        </Row>
    </div>);
}

export default PlasmaWrapper;