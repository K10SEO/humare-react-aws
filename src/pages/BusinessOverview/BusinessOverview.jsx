import React from 'react'
import PageLayout from "../../components/PageLayout/PageLayout"
import { importAllImages } from "../../util/importAllImages"

function BusinessOverview() {
  const images = importAllImages(require.context(
    "../../assets/img/imgBO",
    false,
    /^\.\/BOimage_.*\.webp$/
  ))
    return (
      <PageLayout name={"사업개요"} imgs={images}/>
    )
}

export default BusinessOverview