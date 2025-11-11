import React from 'react'
import PageLayout from "../../components/PageLayout/PageLayout"
import ContactForm from "../../components/ContactForm/ContactForm"


function ConsultationForm() {
  return (
    <>
    <PageLayout name={"상담 문의"} imgs={"none"}/>
    <ContactForm/>
    </>
  )
}

export default ConsultationForm