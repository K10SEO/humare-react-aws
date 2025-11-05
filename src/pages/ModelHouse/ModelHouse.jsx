import React from 'react'
import PageLayout from "../../components/PageLayout/PageLayout"
import { importAllImages } from "../../util/importAllImages"

function ModelHouse() {
  const images = importAllImages(require.context(
    "../../assets/img/imgMH",
    false,
    /^\.\/MDhouse_.*\.webp$/
  ))
  return (
    <PageLayout name={"모델하우스"} imgs={images}/>
  )
}

export default ModelHouse