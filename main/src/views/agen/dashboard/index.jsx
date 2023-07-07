import { IoPeople,  } from "react-icons/io5";
import { MdCalendarToday, MdCalendarViewMonth, MdPeopleAlt, MdVerifiedUser } from "react-icons/md";
import Widget from "components/widget/Widget";
import ComplexTable from "views/agen/dashboard/components/ComplexTable.jsx";
import TableJamaah from './components/TableJamaah'
import api from "../../../api/axios.js";
import { useEffect, useState } from "react";

const Dashboard = () => {

  const [totalAgen,setTotalAgen] = useState()
  const [dataAgen,setDataAgen] = useState([''])
  const [dataJamaah,setDataJamaah] = useState([''])
    
  const agen = async() =>{
    try {
      await api.get('/agen',{withCredentials: true}).then(res=>{
        setDataAgen(res.data.userData)
        setTotalAgen(res.data.userData.length)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const jamaah = async()=>{
    try {
      await api.get('/jamaahku',{withCredentials: true}).then(res=>{
        setDataJamaah(res.data.data)
      })
    } catch (err) {
    }
  }
  
  useEffect(()=>{
    agen()
    jamaah()
  },[])

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdPeopleAlt className="h-7 w-7" />}
          title={"Total Agen"}
          subtitle={totalAgen}
        />
        <Widget
          icon={<IoPeople className="h-6 w-6" />}
          title={"Total Jamaah Anda"}
          subtitle={dataJamaah.length}
        />
        <Widget
          icon={<MdCalendarToday className="h-7 w-7" />}
          title={"Jamaah Bulan Ini"}
          subtitle={"+ " + dataJamaah.length}
        />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">

        {/* Complex Table , Task & Calendar */}

        <ComplexTable
        title={"Daftar Agen"}
        data={dataAgen}
        limit={5}
        side={"Lihat Selengkapnya"}
        />

        <TableJamaah
          title={"Daftar Jamaah Anda"}
          data={dataJamaah}
          limit={5}
          side={"Lihat Selengkapnya"}
        />

      </div>
    </div>
  );
};

export default Dashboard;
