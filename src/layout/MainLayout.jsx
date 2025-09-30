import React, {useState}from 'react'


import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom';

export default function MainLayout() {

  const [IsloggendIn , setIsloggendIn] = useState(!!localStorage.getItem("userToken"));

  return (
    <>
    <Navbar IsloggendIn = {IsloggendIn}  setIsloggendIn = {setIsloggendIn} />
      <Outlet context={{ setIsloggendIn }} />
    <Footer />

    </>
  )
}
