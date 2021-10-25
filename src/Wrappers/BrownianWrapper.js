import BrownianMotion from '../Fractals/BrownianMotion/BrownianMotion';
import {Row, Col, Button} from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import {useState} from 'react'
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const BrownianWrapper = () => {
    const [iterations, setIterations] = useState(10);
    const [coordinates, setCoordinates] = useState({x: (window.visualViewport.width-200)/2, y: window.visualViewport.height/4});
    const [step, setStep] = useState(false);


    const [aggressiveness, setAggressiveness] = useState(50)

    return (<div>
        <Row>
            <Col>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px', width: window.visualViewport.width-100}}>    
                    <FormControlLabel control={<Switch onChange={(ev)=>{setStep(!step)}}/>} label="Покроковий режим" />
                </div>
                <div style={{display: 'flex', justifyContent: 'center',}}>
                    <BrownianMotion height={window.visualViewport.height/2} width={window.visualViewport.width-200} fineness = {1} aggressiveness={aggressiveness} iterations={iterations} coordinates={coordinates} setCoordinates={setCoordinates} step={step}/>
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                    <TextField label="Кількість ітерацій" variant="outlined" onChange={(ev)=>{
                        setIterations(parseInt(ev.target.value));
                    }}/>
                    
                    <TextField label="Довжина кроку" style={{marginLeft: '1em'}} variant="outlined" onChange={(ev)=>{
                        setAggressiveness(parseInt(ev.target.value));
                    }}/>
                </div>
            </Col>
        </Row>

        <Row>
            <Col>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                    <h1>Загальна інформація про броунівський рух</h1>
                </div>
                <p style={{marginLeft: '4em', marginRight: '4em', fontSize: '14pt'}}>    Бро́унівський рух — невпорядкований, хаотичний рух частинки під дією нерівномірних ударів молекул речовини з різних боків у розчинах. Названий на честь ботаніка Роберта Броуна, який спостерігав це явище під мікроскопом у 1827 р. Теорію броунівського руху сформулював у 1905 р. Альберт Ейнштейн.

Відкриття й пояснення броунівського руху мало велике значення для фізики, оскільки було свідченням теплового руху молекул. Браун 1827 року, відкрив хаотичний рух спор плауна у воді. Рух завислих частинок відбувався внаслідок руху молекул. Молекули рідини зіштовхуються з завислими у ній частинками, отже й передають їм імпульс. Таким же чином рухаються частинки фарби у воді, пилинки в променях світла (хоча на рух пилинок також впливають і мікропотоки в повітрі) тощо.</p>
                
            </Col>
        </Row>
    </div> );
}
 
export default BrownianWrapper;