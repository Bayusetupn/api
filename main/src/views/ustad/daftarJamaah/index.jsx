
import { IoAdd} from "react-icons/io5";
import JamaahTable from './components/TableJamaah'
import api from "../../../api/axios.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const DaftarAgen = () => {

  const navigate = useNavigate()
  const [dataJamaah,setDataJamaah] = useState([])

  const jamaah = async()=>{
    try {
      await api.get('/jamaahku',{withCredentials: true}).then(res=>{
        setDataJamaah(res.data.data)
      })
    } catch (err) {
    }
  }
  
  useEffect(()=>{
    jamaah()
  },[])

  return (
    <div>
      <div className="mt-5 grid grid-cols-1  gap-5 xl:grid-cols-1">
      <JamaahTable
          title={"Daftar Jamaah Anda"}
          data={dataJamaah}
          limit={dataJamaah.length}
          side={
            <div className="flex flex-direction-row"><IoAdd className="h-6 w-6 mr-2"/><p>Tambah Jamaah</p></div>
          }
        />
      </div>
    </div>
  );
};

export default DaftarAgen;
