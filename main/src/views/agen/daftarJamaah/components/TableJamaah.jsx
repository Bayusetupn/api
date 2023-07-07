import { useState } from "react";
import Card from "../../../../components/card";
import { useNavigate } from "react-router";
import { IoOpenOutline, IoSearch } from "react-icons/io5";
import { TbTrash } from "react-icons/tb";
import api from '../../../../api/axios.js'

const ComplexTable = (props) => {

  const [search, setSearch] = useState()
  const navigate = useNavigate()
  const [name,setname] = useState()
  const [modal,setModal] = useState(false)
  const [jamaahId,setID] = useState()
  const { title, data, limit, nama,side } = props;

  const deleteJamaah = async()=>{
    try {
      await api.post('/jamaah/hapus',{id: jamaahId},{withCredentials:true}).then(()=>{
        
      })
    } catch (err) {
      
    }
  }

  const confirm = () =>{
    if (modal) {
      return <div>
      <Card extra={"w-full h-full p-6 mb-4"}>
          <div className="flex flex-row items-center gap-2 flex-wrap">
          <TbTrash className="w-7 h-7"/>
          <p>Apakah Anda yakin ingin menghapus {name} ? </p>
          <button onClick={()=>{
            deleteJamaah()
            navigate('/agen/dashboard')
            }} className="bg-red-500 px-4 py-2 border-radius rounded-[10px] text-white">
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

  return (
    <div>
      {confirm()}
      <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-between pt-4">
        <div className="flex flex-col">
        <div class="text-xl font-bold text-navy-700 dark:text-white">
          {title}
        </div>
        <div className="flex items-center mt-2" >
            <IoSearch className="absolute ml-2 w-5 h-5"/>
          <input onChange={(e)=>setSearch(e.target.value)} className="pl-8 my-2 text-md font-medium text-black dark:focus:border-white transition-all sm:w-full flex h-10 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-gray-900 bg-white/0 text-sm outline-none focus:border-3" />
          </div>
        </div>
        <div>
          <p onClick={() => navigate('tambah')} className=" cursor-pointer font-bold linear mt-2 rounded-xl bg-brand-500 py-[12px] px-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            {side}
          </p>
        </div>
      </div>
      <div class="mt-8 overflow-scroll overflow-y-hidden">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  No Ktp
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Nama
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Jenis Kelamin
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Alamat Domisili
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  No Telepon
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Paket
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Bergabung pada Tanggal
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Berangkat
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Keterangan
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">

                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.filter(nama=>{
              return !search || search.toLowerCase() === ''? nama : nama.nama.toLowerCase().includes(search)
            }).slice(0, limit).map((list, index) => {
              return <tr className="font-md text-md font-medium text-gray-700 dark:text-white" key={index} >
                <td className="py-2">{list.ktp}</td>
                <td className="py-2" >{list.nama}</td>
                <td className="py-2" >{list.jenis_kelamin}</td>
                <td className="py-2 pr-5" >{list.alamat}</td>
                <td className="py-2" >{list.no_telepon}</td>
                <td className="py-2" >{list.paket}</td>
                <td className="py-2" >{list.dibuat_pada}</td>
                <td className="py-2" >{list.berangkat ? list.berangkat : "Belum ditentukan"}</td>
                <td className="py-2" >{list.dp ? "Lunas" : "Belum Lunas"}</td>
                <td className="py-2 flex flex-row gap-2">
                  <IoOpenOutline className="w-6 h-6 cursor-pointer hover:scale-125 transition-all" onClick={() => {
                    navigate('profile', {
                      state: {
                        ids: list.id,
                        berangkat: list.berangkat,
                        ktp: list.ktp,
                        nama: list.nama,
                        jenis_kelamin: list.jenis_kelamin,
                        alamat: list.alamat,
                        no_telepon: list.no_telepon,
                        paket: list.paket,
                        dibuat: list.dibuat_pada,
                        berangkat: list.berangkat,
                        dp: list.dp,
                        di_daftarkan: nama

                      }
                    })
                  }} />
                  <TbTrash className="hover:scale-125 w-6 h-6 cursor-pointer transition-all" onClick={()=>{
                    setname(list.nama)
                    setModal(true)
                    setID(list.id)
                  }} />
                </td>
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
