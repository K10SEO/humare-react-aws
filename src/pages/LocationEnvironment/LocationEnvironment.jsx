import React from 'react'
import PageLayout from "../../components/PageLayout/PageLayout"
import { importAllImages } from "../../util/importAllImages"

// import images from "../../assets/img/imgLE"

function LocationEnvironment() {
  const images = importAllImages(require.context(
    "../../assets/img/imgLE",
    false,
    /^\.\/LEimage_.*\.webp$/
  ))
  return (
    <PageLayout name={"입지환경"} imgs={images}/>
  )
}

export default LocationEnvironment