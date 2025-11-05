import React from 'react'
import PageLayout from "../../components/PageLayout/PageLayout"
import { importAllImages } from "../../util/importAllImages"

function LocationPlan() {
  const images = importAllImages(require.context(
    "../../assets/img/imgLP",
    false,
    /^\.\/LPimage_.*\.webp$/
  ))
  return (
    <PageLayout name={"단지배치도"} imgs={images}/>
  )
}

export default LocationPlan