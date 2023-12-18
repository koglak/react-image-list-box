import React from 'react';
import './styles/App.css'

import ImageBox from './components/ImageBox'
import { imagesData } from './data/imagesData';

function App() {

  const [images, setImages] = React.useState(imagesData);

  return (
    <div className="App">
      <h5>React Image List Box</h5>
      <ImageBox
        images={images}
        setImages={setImages}
        perPage={5}
        imageWidth={200}
        imageHeight={200}
        boxWidth={"auto"}
        boxHeight={"auto"}
      />
    </div>
  );
}

export default App;
