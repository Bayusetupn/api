import Card from "components/card";
import { TbPencil, TbTrash } from "react-icons/tb";
import { useEffect, useState } from "react";
import api from "../../../../api/axios.js";
import { IoOpenOutline, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router";

const ComplexTable = (props) => {
  const [name,setname] = useState()
  const [iduser,setID] = useState({id: ""})
  const [modal,setModal] = useState(false)
  const [role,setRole] = useState()
  const [search,setSearch] = useState()
  const navigate = useNavigate()
  const { title, data, limit, side, klik} = props;

  const deleteA = async() =>{
    if (role == "agen") {
      await api.post('agen/delete',iduser,{withCredentials: true}).then(()=>{
        return navigate('/admin/dashboard',{replace: true})
      }).catch(err=>{
        return console.log(err)
      })
    }else{
      await api.post('ustad/delete',iduser,{withCredentials: true}).then(()=>{
        return navigate('/admin/dashboard',{replace: true})
      }).catch(err=>{
        return console.log(err)
      })
    }
  }

  const confirm = () =>{
    if (modal) {
      return <div>
      <Card extra={"w-full h-full p-6 mb-4"}>
          <div className="flex flex-row items-center gap-2 flex-wrap">
          <TbTrash className="w-7 h-7"/>
          <p>Apakah Anda yakin ingin menghapus {name} ? </p>
          <button onClick={deleteA} className="bg-red-500 px-4 py-2 border-radius rounded-[10px] text-white">
            Hapus
          </button>
          <button onClick={()=>setModal(false)} className="bg-brand-500 px-4 py-2 border-radius rounded-[10px] text-white">
            Batal
          </button>
          </div>
        </Card>
    </div>
    }
  }

  useEffect(()=>{
    setSearch('')
  },[])

  return (
    <div>
      {confirm()}
      <Card extra={"w-full h-fit px-6 pb-6 sm:overflow-x-auto"  }>
      <div class="relative flex items-center justify-between pt-4 flex-wrap" >
        <div class="text-xl font-bold text-navy-700 dark:text-white">
          <div className="flex flex-col">
          <p className="flex-1">
          {title}
          </p>
          <div className="flex items-center mt-2" >
            <IoSearch className="absolute ml-2 w-5 h-5"/>
          <input onChange={(e)=>setSearch(e.target.value)} className="pl-8 my-2 text-md font-medium text-black dark:focus:border-white transition-all sm:w-full flex h-10 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-gray-900 bg-white/0 text-sm outline-none focus:border-3" />
          </div>
          </div>
        </div>
        <div>
        <p onClick={klik} className="cursor-pointer font-bold linear mt-2 rounded-xl bg-brand-500 py-[12px] px-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          {side}
        </p>
        </div>
      </div>
      <div class="mt-5 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th
                className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Nama
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Alamat
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  No Telepon
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Total Jamaah
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">

                </p>
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll h-9/12">
            {data.filter(nama=>{
              return !search || search.toLowerCase() === ''? nama : nama.nama.toLowerCase().includes(search)
            }).slice(0, limit).map((list, index) => {
              console.log(list)
              return <tr className="font-md text-md font-medium text-gray-700 dark:text-white overflow-scroll" key={index} >
                <td className="py-2" >{list.nama}</td>
                <td className="py-2" >{list.alamat}</td>
                <td className="py-2" >{list.no_telepon}</td>
                <td className="py-2" >{list.total_jamaah}</td>
                <td className="py-2 flex flex-row">
                  <IoOpenOutline className="w-6 h-6 cursor-pointer hover:scale-125 transition-all" onClick={()=>navigate('profile', {state: {id: list.id}})} />
                  <TbPencil onClick={() => {
                    return navigate('edit',{state: {id: list.id ,nama : list.nama, alamat: list.alamat, no_telepon: list.no_telepon, username: list.username}})
                  }} className="w-6 h-6 mx-2 cursor-pointer hover:scale-125 transition-all" />
                  <TbTrash className="hover:scale-125 w-6 h-6 cursor-pointer transition-all" onClick={()=>{
                    setname(list.nama)
                    setModal(true)
                    setID({...iduser,id: list.id})
                    setRole(list.role)
                  }} /></td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </Card>
    </div>
  );
};

export default ComplexTable;
