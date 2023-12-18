import ImageBox from './components/ImageBox'
import './styles/App.css'
import { imagesData } from './data/imagesData';

function App() {


  return (
    <div className="App">
      <h5>React Image List Box</h5>
      <ImageBox initialImages={imagesData} perPage={5} />
    </div>
  );
}

export default App;
