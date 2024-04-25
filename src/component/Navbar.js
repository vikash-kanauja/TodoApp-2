import moment from 'moment';
import React from 'react'
import { FaWifi } from "react-icons/fa";
import { FaSignal } from "react-icons/fa6";
import { IoIosBatteryFull } from "react-icons/io";

const Navbar = ({currentDateAndTime}) => {
  return (
    <div className='flex justify-between items-center font-medium	'>
      <div className=''>{ moment().format('h:mm')
}</div>
      <div className='flex gap-1'>
      <FaWifi />
      <FaSignal/>
      <IoIosBatteryFull/>
      </div>
      
    </div>
  )
}

export default Navbar
