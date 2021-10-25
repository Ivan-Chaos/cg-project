import { Card, Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useHistory} from 'react-router-dom';

const Home = () => {
    const history = useHistory();
   return (<Row>
        <Col style={{ height: "90vh" }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "90vh" }}>
                <Card style={{ width: '420px', height: '700px', border: '1px solid black' }}>
                    <Card.Img style={{ width: '420px', height: '384px' }} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVnZo7yAZQ_IKfQSX-4qvOqK3RiMF2CZJmaQJSjrLj3gWDmY8i6WEceO4BZgUq19WB2Dk&usqp=CAU" />
                    <Card.Body>
                        <Card.Title style={{ fontSize: '30pt' }}>Фрактали</Card.Title>
                        <Card.Text style={{ fontSize: '18pt' }}>
                            В даному модули ви зможене згенерувати та зберігти фрактали Броунівського руху та плазми.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div style={{ display: "flex", justifyContent: 'flex-end' }}>

                            <FormControl style={{width:'7em', color: 'white'}}>
                                <InputLabel id="demo-simple-select-label">Перейти</InputLabel>
                                <Select>
                                    <MenuItem onClick={()=>history.push('/plasma')}>Плазма</MenuItem>
                                    <MenuItem onClick={()=>history.push('/brownian')}>Броунівський рух</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        </Col>

        <Col>

        </Col>

        <Col>
        </Col>

    </Row>);
}

export default Home;