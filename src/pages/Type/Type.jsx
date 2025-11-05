import React from 'react'
import PageLayout from "../../components/PageLayout/PageLayout"
import { importAllImages } from "../../util/importAllImages"

function Type() {
  const images = importAllImages(require.context(
    '../../assets/img/imgType',
    false,
    /^\.\/Typeimage_.*\.webp$/
  ))
  return (
    <PageLayout name={"타입안내"} imgs={images}/>
  )
}

export default Type