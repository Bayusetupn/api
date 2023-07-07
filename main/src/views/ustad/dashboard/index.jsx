import { IoPeople,  } from "react-icons/io5";
import { MdCalendarToday, MdPeopleAlt } from "react-icons/md";
import Widget from "components/widget/Widget";
import ComplexTable from "./components/ComplexTable";
import TableJamaah from './components/TableJamaah'
import api from "../../../api/axios.js";
import { useEffect, useState } from "react";

const Dashboard = () => {

  const [totalUstad,setTotalUstad] = useState()
  const [dataUstad,setDataUstad] = useState([''])
  const [dataJamaah,setDataJamaah] = useState([''])
    
  const agen = async() =>{
    try {
      await api.get('/ustad',{withCredentials: true}).then(res=>{
        setDataUstad(res.data.userData)
        setTotalUstad(res.data.userData.length)
      })
    } catch (err) {
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
          title={"Total Ustad"}
          subtitle={totalUstad}
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
        title={"Daftar Ustad"}
        data={dataUstad}
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
