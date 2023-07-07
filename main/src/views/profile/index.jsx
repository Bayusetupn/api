import { IoArrowBack, IoBackspace } from "react-icons/io5";
import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import { MdArrowBack, MdArrowBackIosNew } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import ComplexTable from "../admin/default/components/ComplexTable";
import { useState,useEffect } from "react";
import api from '../../api/axios.js';
import { useNavigate } from "react-router";


const ProfileOverview = () => {

  const navigate = useNavigate()
  const [totalAgen,setTotalAgen] = useState()
  const [totalUstad,setTotalUstad] = useState()
  const [dataAgen,setDataAgen] = useState([''])
  const [dataUstad,setDataUstad] = useState([''])
  const [infoAdmin,setinfoAdmin] = useState([''])

  const totalA = async()=>{
    try {
      await api.get('/agen',{ withCredentials: true}).then(res=>{
        setDataAgen(res.data.userData)
        setTotalAgen(res.data.userData.length)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const info = async()=>{
    try {
      await api.get('/admin',{withCredentials: true}).then(res=>{
        setinfoAdmin(res.data)
      })
    } catch (err) {
      
    }
  }

  const totalU = async()=>{
    try {
      await api.get('/ustad',{ withCredentials: true}).then(res=>{
        setDataUstad(res.data.userData)
        setTotalUstad(res.data.userData.length)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    info()
    totalA()
    totalU()
  },[])

  return (
    <div className="flex w-full flex-col h-screen gap-5 p-5 dark:!bg-navy-900">
      <div className="w-fit mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-1">
          <div className="flex flex-direction-row items-center cursor-pointer dark:text-white" onClick={()=>navigate('/admin/dashboard')}>
            <IoMdArrowRoundBack className="h-7 w-7 mr-2"/>
            <p className="text-md font-bold">Back to Dashboard</p>
          </div>
      </div>
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-3 lg:!mb-0">
          <Banner totalAgen={totalAgen} totalUstad={totalUstad} nama={infoAdmin.nama} username={infoAdmin.username}/>
        </div>
        <div className="col-span-9">
        <div className="flex flex-col gap-5">
        <ComplexTable
          title={"Daftar Agen"}
          data={dataAgen}
          limit={5}
          side={"Lihat Selengkapnya"}
          navigate={'/admin/agen'}
          replaces={true}
        />
        <ComplexTable
          title={"Daftar Ustad"}
          data={dataUstad}
          limit={5}
          side={"Lihat Selengkapnya"}
          navigate={'/admin/ustad'}
          replaces={true}
        />
        </div>
        </div>
      </div>
      </div>
  );
};

export default ProfileOverview;
