import './App.css';
import BrownianMotion from './Fractals/BrownianMotion/BrownianMotion';
import Plasma from './Fractals/Plasma/Plasma'

function App() {
  return (
    <div className="App">
      <Plasma  height={400} width={400} rectSize={0.25}/>
      <BrownianMotion height={400} width={400} fineness = {1} aggressiveness={3}/>
    </div>
  );
}

export default App;
