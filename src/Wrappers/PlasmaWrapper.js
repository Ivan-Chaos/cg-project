
import {Row, Col, Button} from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import {useState, useEffect} from 'react'
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Plasma from '../Fractals/Plasma/Plasma';

const PlasmaWrapper = () => {
    
    const [iterations, setIterations] = useState(10);
    const [step, setStep] = useState(false);
    const [grain, setGrain] = useState(1);


    return ( <div>
        <Row>
            <Col>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px', width: window.visualViewport.width-100}}>    
                    <FormControlLabel control={<Switch onChange={(ev)=>{setStep(!step)}}/>} label="Покроковий режим" />
                </div>
                <div style={{display: 'flex', justifyContent: 'center',}}>
                    <Plasma height={window.visualViewport.height/2} rectSize={grain} width={window.visualViewport.height/2} iterations={iterations} step={step} />
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                    <TextField label="Кількість ітерацій" variant="outlined" onChange={(ev)=>{
                        setIterations(parseInt(ev.target.value));
                    }}/>
                    
                    <TextField label="Зернистість" style={{marginLeft: '1em'}} variant="outlined" onChange={(ev)=>{
                        setGrain(parseInt(ev.target.value));
                    }}/>
                </div>
            </Col>
        </Row>

        <Row>
            <Col>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                    <h1>Загальна інформація про фрактал плазми</h1>
                </div>
                <p style={{marginLeft: '4em', marginRight: '4em', fontSize: '14pt'}}>    Бро́унівський рух — невпорядкований, хаотичний рух частинки під дією нерівномірних ударів молекул речовини з різних боків у розчинах. Названий на честь ботаніка Роберта Броуна, який спостерігав це явище під мікроскопом у 1827 р. Теорію броунівського руху сформулював у 1905 р. Альберт Ейнштейн.

                Плазма - прийом в комп'ютерній графіці, що дозволяє створювати зображення за допомогою рандомізованих фракталів.
     Для побудови плазми необхідно використовувати шаблон чорно-білого зображення. Рекурсивний алгоритм для побудови такий: привласнити значення відтінку для 4-х кутів прямокутника, 
вирахувати середні значення відтінків для середин сторін і центру використовуючи середнє арифметичне. випадково змінити центральний відтінок. Величина зміни повинна залежати від розмірів прямокутника. розділити прямокутник на 4 рівні частини, в кутах яких будуть отримані середні значення.</p>
                
            </Col>
        </Row>
    </div>  );
}
 
export default PlasmaWrapper;