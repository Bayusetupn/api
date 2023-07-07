
import { IoAdd} from "react-icons/io5";

import AgenTable from "../default/components/Table";

import api from "../../../api/axios.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const DaftarAgen = () => {

  const navigate = useNavigate()
  const [dataAgen,setDataAgen] = useState([''])
  const [totalAgen,setTotalAgen] = useState()

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

 

  useEffect(()=>{
    
    totalA()
  },[])
    

  return (
    <div>
      <div className="mt-5 grid grid-cols-1  gap-5 xl:grid-cols-1">
        <AgenTable
          title={"Cari Agen"}
          data={dataAgen}
          limit={totalAgen}
          side={<div onClick={()=>navigate('/admin/plusagen')} className="flex flex-direction-row"><IoAdd className="h-6 w-6 mr-2"/><p>Tambah Agen</p></div>}
        />
      </div>
    </div>
  );
};

export default DaftarAgen;
