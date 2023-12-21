import React from 'react';

import ImageBox from '../components/ImageBox'
import { imagesData } from '../data/imagesData';

import { LuTestTube2 } from "react-icons/lu";
import { FaRunning } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";

import ImageSettings from '../AdditionalComponent/ImageSettings';

function Example() {

  const [images, setImages] = React.useState(imagesData)
  const [filteredImages, setFilteredImages] = React.useState(images)
  const [selectedImgObj, setSelectedImgObj] = React.useState({})

  return (
    <div className="p-4">
      <h1>React Image List Box</h1>
      <ImageBox
        images={images}
        setImages={setImages}
        filteredImages={filteredImages}
        setFilteredImages={setFilteredImages}
        imageTypes={[{
          name: "Training",
          icon: <FaRunning className='category-icon'/>
        },
        {
          name: "Test",
          icon: <LuTestTube2 className='category-icon'/>
        },
        {
          name: "Validation",
          icon: <GrValidate className='category-icon'/>
        }]}
        onSearch={(searchInput) => {
          searchInput !== "" ? setFilteredImages(images.filter(item => item.filename.includes(searchInput))) : setFilteredImages(images)
        }}
        onClickPage={(showOnClickPage, setShowOnClickPage, selectedImgObj) => <ImageSettings showOnClickPage={showOnClickPage} setShowOnClickPage={setShowOnClickPage} selectedImgObj={selectedImgObj} />}
        perPage={10}
        imageWidth={200}
        imageHeight={200}
        boxWidth={"auto"}
        boxHeight={"auto"}
        enableCheckBox={true}
        enableDelete={true}
        enableTagAssignment={true}
        selectedImgObj={selectedImgObj}
        setSelectedImgObj={setSelectedImgObj}
        rootStyle={{
          backgroundColor: 'white',
          border: '1px solid black',
        }}
        buttonStyle={{
          border: "1px solid black",
        }}
        badgeStyle={{
          backgroundColor: "black",
          border: "1px solid black",
          color: "white",
        }}
        checkboxStyle={{
          border: "1px solid black",
        }}
        inputStyle={{
          border: "1px solid black",
        }}
        dropdownStyle={{
          border: "1px solid black"
        }}

      />
    </div>
  );
}

export default Example;
