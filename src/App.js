import './App.css';
import './style/responsive.css';

import Game from './components/Game.js';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: [
      'Handject:wght@200;300;500;600',
    ],
  },
});


function App() {
  return (
    <div className="container">
      <Game/>
    </div>
  );
}

export default App;
