import { IoPeople,  } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";


import Widget from "components/widget/Widget";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import api from "../../../api/axios.js";
import { useEffect, useState } from "react";

const Dashboard = () => {

  const [totalAgen,setTotalAgen] = useState()
  const [totalUstad,setTotalUstad] = useState()
  const [totalJamaah,setTotalJamaah] = useState()
  const [dataAgen,setDataAgen] = useState([''])
  const [dataUstad,setDataUstad] = useState([''])

  const totalA = async()=>{
    try {
      await api.get('/agen',{ withCredentials: true}).then(res=>{
        setDataAgen(res.data.userData)
        console.log(res.data.userData)
        setTotalAgen(res.data.userData.length)
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
      console.log("Err")
    }
  }

  const jamaah = async() =>{
    try {
      await api.get('/jamaah/all',{withCredentials: true}).then(res=>{
        setTotalJamaah(res.data.respon.length)
      })
    } catch (err) {
      console.log(err)
      setTotalJamaah(0)
    }
  }

  useEffect(()=>{
    
    totalA()
    totalU()
    jamaah()
    const interval = setInterval(() => {
      totalA()
      totalU()
    }, 500000);

    return () => {
      clearInterval(interval);
    };
  },[])
    
  
  
  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<IoPeople className="h-7 w-7" />}
          title={"Total Agen"}
          subtitle={totalAgen}
        />
        <Widget
          icon={<IoPeople className="h-6 w-6" />}
          title={"Total Ustad"}
          subtitle={totalUstad}
        />
        <Widget
          icon={<MdVerifiedUser className="h-7 w-7" />}
          title={"Total Jamaah"}
          subtitle={totalJamaah}
        />
      </div>

      {/* Tables & Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <DailyTraffic 
          title="Agen"
        />
                <DailyTraffic
          title="Ustad"
        />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">

        {/* Complex Table , Task & Calendar */}

        <ComplexTable
          title={"Daftar Agen"}
          data={dataAgen}
          limit={5}
          side={"Lihat Selengkapnya"}
          navigate={'/admin/agen'}
          replaces={false}
        />

        <ComplexTable
          title={"Daftar Ustad"}
          data={dataUstad}
          limit={5}
          side={"Lihat Selengkapnya"}
          navigate={'/admin/ustad'}
          replaces={false}
        />
      </div>
    </div>
  );
};

export default Dashboard;
