
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState} from "react";
import { useLocation, useNavigate } from "react-router";
import api from '../../../api/axios.js';

const ProfileOverview = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [errMsg,setErrMsg] = useState('')
    const [formData,setFormData] = useState({
        nama: '',
        ktp: '',
        jenis_kelamin: 'Laki-Laki',
        no_telepon: '',
        alamat: '',
        paket: 'Premium',
    })

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            await api.post('/jamaah/tambah',formData,{withCredentials: true}).then(res=>{
                navigate('/ustad/jamaah')
            })
        } catch (err) {
            setErrMsg(err.response.data.message)
        }
    }

    return (
        <div className="flex w-full flex-col h-screen overflow-scroll gap-5 p-5 dark:!bg-navy-900">
            <div className="w-fit mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-1">
                <div className="flex flex-direction-row items-center cursor-pointer dark:text-white" onClick={() => navigate(-1)}>
                    <IoMdArrowRoundBack className="h-7 w-7 mr-2" />
                    <p className="text-md font-bold">Back</p>
                </div>
            </div>
            <div className="w-ful mt-3 flex h-fit sm:w-full flex-col gap-2 lg:grid lg:grid-cols-12">
                <div className="col-span-2">
                </div>
                <div className=" p-5 col-span-8 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none ">
                    <h1 className="text-xl font-bold text-navy-700 dark:text-white">Tambah Jamaah</h1>
                    <p className="text-md font-sm mb-4">Masukkan Informasi Jamaah yang akan di tambah !</p>
                    <div className="flex flex-row justify-between flex-wrap gap-5">
                        <form onChange={()=>setErrMsg('')} onSubmit={(e)=>{
                            handleSubmit(e)
                            navigate('/ustad/jamaah')
                        }} className="flex-grow">
                            <label className="text-sm" >Nama Jamaah</label>
                            <input onChange={e=>setFormData({...formData,nama: e.target.value  })} required placeholder="Nama Jamaah" className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <label className="text-sm" >No Ktp</label>
                            <input onChange={e=>setFormData({...formData,ktp: e.target.value})} required placeholder="3242" type="number" className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <div className="flex flex-col gap-2 mb-2">
                                <label className="text-sm">Jenis Kelamin</label>
                                <select onChange={e=>setFormData({...formData,jenis_kelamin: e.target.value})} required className="border-2 border-solid border-grey-200 rounded-xl py-3 px-2" >
                                    <option value={"Laki-Laki"}>
                                        Laki-Laki
                                    </option>
                                    <option value={"Perempuan"}>
                                        Perempuan
                                    </option>
                                </select>
                            </div>
                            <label className="text-sm" >No Telepon</label>
                            <input onChange={e=>setFormData({...formData,no_telepon: e.target.value})} required placeholder="08112233445566" type="number" className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <label className="text-sm" >Alamat Domisili</label>
                            <input onChange={e=>setFormData({...formData,alamat: e.target.value})} required placeholder="Jl.Nama Jalan" type="text" className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm">Pilihan Paket</label>
                                <select onChange={e=>setFormData({...formData,paket: e.target.value})} required className="border-2 border-solid border-grey-200 rounded-xl py-3 px-2" >
                                    <option value={"Premium"}>
                                        Umroh Premium
                                    </option>
                                    <option value={"Premium Maulid Nabi"}>
                                        Umroh Premium Maulid Nabi
                                    </option>
                                    <option value={"Plus Turki"}>
                                        Umroh Plus Turki
                                    </option>
                                    <option value={"Plus Dubai"}>
                                        Umroh Plus Dubai
                                    </option>
                                    <option value={"Private"}>
                                        Umroh Private
                                    </option>
                                    <option value={"Family"}>
                                        Umroh Family
                                    </option>
                                </select>
                            </div>
                            <p className="text-red-500">{errMsg}</p>
                            <div className="mt-4">
                                <button type="submit" className=" linear flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-4 py-3  text-white bg-brand-500">
                                    Tambah
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileOverview;
