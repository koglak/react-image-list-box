import React from 'react';
import './styles/App.css'

import ImageBox from './components/ImageBox'
import { imagesData } from './data/imagesData';

function App() {

  const [images, setImages] = React.useState(imagesData)
  const [filteredImages, setFilteredImages] = React.useState(images)

  return (
    <div className="App">
      <h5>React Image List Box</h5>
      <ImageBox
        images={images}
        setImages={setImages}
        filteredImages={filteredImages}
        setFilteredImages={setFilteredImages}
        imageTypes={["Training", "Test", "Validation"]}
        onSearch={(searchInput) => {
          searchInput !== "" ? setFilteredImages(images.filter(item => item.filename.includes(searchInput))) : setFilteredImages(images)
        }}
        perPage={5}
        imageWidth={200}
        imageHeight={200}
        boxWidth={"auto"}
        boxHeight={"auto"}
        enableCheckBox={true}
        enableDelete={true}
        rootStyle={{
          backgroundColor: 'white',
          border: '1px solid black',
          borderRadius: "5px"
        }}
      />
    </div>
  );
}

export default App;
