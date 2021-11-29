import { BrownianMotion } from '../Fractals/BrownianMotion/BrownianMotion';
import { Row, Col, Button } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import { useState } from 'react'
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';

const BrownianWrapper = () => {
    const [iterations, setIterations] = useState(10);
    const [coordinates, setCoordinates] = useState({ x: (window.visualViewport.width - 200) / 2, y: window.visualViewport.height / 4 });
    const [step, setStep] = useState(false);
    const [aggressiveness, setAggressiveness] = useState(50)

    const [tempIterations, setTempIterations] = useState(10);
    const [tempAggressiveness, setTempAggressiveness] = useState(50);
    const [tempStep, setTempStep] = useState(false);
    const [ctxToSave, setCtxToSave] = useState(undefined);

    return (<div>
        <Row>
            <Col>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', width: window.visualViewport.width - 100 }}>
                    <FormControlLabel control={<Switch onChange={(ev) => { setTempStep(!tempStep) }} />} label="Покроковий режим" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', }}>
                    <BrownianMotion setCtxToSave={setCtxToSave} height={window.visualViewport.height / 2} width={window.visualViewport.width - 200} fineness={1} aggressiveness={aggressiveness} iterations={iterations} coordinates={coordinates} setCoordinates={setCoordinates} step={step} />
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                    <TextField
                        label="Кількість ітерацій"
                        variant="standard"
                        type="number"
                        style={{ marginLeft: '1em', width: '10em' }}
                        InputProps={{ inputProps: { min: 1, max: 100000 } }}
                        onChange={(ev) => {
                            setTempIterations(parseInt(ev.target.value));
                        }}
                        value={tempIterations}
                    />

                    <TextField
                        label="Довжина кроку"
                        style={{ marginLeft: '1em', width: '10em' }}
                        InputProps={{ inputProps: { min: 1, max: 200 } }}
                        variant="standard"
                        type='number'
                        value={tempAggressiveness}
                        onChange={(ev) => {
                            setTempAggressiveness(parseInt(ev.target.value));
                        }}
                    />
                    <Tooltip title="Завантажити прорисований фрактал плазми">
                        <Button variant="secondary" style={{ width: '15em', marginLeft: '1em', height: '3em' }} onClick={() => {
                            var canvas = ctxToSave.canvas;
                            let timage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                            var link = document.createElement('a');
                            link.download = "brownian.png";
                            link.href = timage;
                            link.click();
                        }}>Завантажити зображення</Button>
                    </Tooltip>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', width: '100%' }}>
                    <Button variant="dark" style={{ width: '15em', marginLeft: '1em' }}
                        onClick={() => {
                            setIterations(tempIterations);
                            setAggressiveness(tempAggressiveness)
                            setStep(tempStep);
                        }}
                    >Рендер</Button>
                </div>
            </Col>
        </Row>

        <Row>
            <Col>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                    <h1>Загальна інформація про броунівський рух</h1>
                </div>
                <p style={{ marginLeft: '4em', marginRight: '4em', fontSize: '14pt' }}>    Бро́унівський рух — невпорядкований, хаотичний рух частинки під дією нерівномірних ударів молекул речовини з різних боків у розчинах. Названий на честь ботаніка Роберта Броуна, який спостерігав це явище під мікроскопом у 1827 р. Теорію броунівського руху сформулював у 1905 р. Альберт Ейнштейн.

                    Відкриття й пояснення броунівського руху мало велике значення для фізики, оскільки було свідченням теплового руху молекул. Браун 1827 року, відкрив хаотичний рух спор плауна у воді. Рух завислих частинок відбувався внаслідок руху молекул. Молекули рідини зіштовхуються з завислими у ній частинками, отже й передають їм імпульс. Таким же чином рухаються частинки фарби у воді, пилинки в променях світла (хоча на рух пилинок також впливають і мікропотоки в повітрі) тощо.</p>

                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '30px', marginLeft: '5em' }}>
                    <h2>Як користуватись</h2>
                </div>
                <p style={{ marginLeft: '4em', marginRight: '4em', fontSize: '14pt' }}>
                    Для прорисовки фракталу броунівського руху оберіть бажану кількість ітерацій та довжину кроку, що являє собою довжину індивідуальної ліній. Щоб отрмати найкрасивіший результат обирайте найбільшу кількість ітерацій та найменший крок. Для наглядності перемикачем справа можна ввімкнути покроковий режим.
                </p>
            </Col>
        </Row>
    </div>);
}

export default BrownianWrapper;