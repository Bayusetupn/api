
import { MdArrowBack, MdArrowBackIosNew } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { useLocation, useNavigate,redirect } from "react-router";
import { useSignOut } from "react-auth-kit";
import api from '../../../api/axios.js';

const ProfileOverview = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ nama: '',alamat: '',no_telepon: '', username: '', password: '' })
    const [konfir, setKonfir] = useState('')
    const [errMsg, setErrMsg] = useState()

    const tambah = async()=>{
        if(!formData.nama || !formData.alamat || !formData.no_telepon || !formData.username || !formData.password){
            setErrMsg("Form tidak boleh kosong ! ")
            return
        }else if(formData.password.length < 8){
            setErrMsg("Password minimal 8 karakter !")
            return
        }else if(formData.password !== konfir){
            setErrMsg("Password dan Konfirmasi Password tidak sama !")
            return
        } 
        else if(formData.no_telepon < 10){
            setErrMsg("Masukkan nomer telepon yang valid !")
            return
        }else{
        try {
            await api.post('/ustad/create',formData,{withCredentials: true}).then(res=>{
                return navigate('/admin/ustad',{replace: true})
            })
        } catch (err) {
            setErrMsg(err.response.data.message)
        }}
    }


    return (
        <div className="flex w-full flex-col h-screen overflow-scroll gap-5 p-5 dark:!bg-navy-900">
            <div className="w-fit mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-1">
                <div className="flex flex-direction-row items-center cursor-pointer dark:text-white" onClick={() => navigate(-1, { replace: true })}>
                    <IoMdArrowRoundBack className="h-7 w-7 mr-2" />
                    <p className="text-md font-bold">Back</p>
                </div>
            </div>
            <div className="w-ful mt-3 flex h-fit sm:w-full flex-col gap-2 lg:grid lg:grid-cols-12">
                <div className="col-span-2">
                </div>
                <div className=" p-5 col-span-8 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none ">
                    <h1 className="text-xl font-bold text-navy-700 dark:text-white">Tambah Ustad</h1>
                    <p className="text-md font-sm mb-4">Masukkan Informasi Ustad yang akan di tambah !</p>
                    <div className="flex flex-row justify-between flex-wrap gap-5">
                        <div className="flex-grow">
                            <label className="text-sm" >Nama</label>
                            <input placeholder="Nama Ustad" onChange={(e) => {
                                setFormData({ ...formData, nama: e.target.value })
                                setErrMsg('')
                            }} className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <label className="text-sm" >Alamat</label>
                            <input placeholder="Jl.Nama Jalan" onChange={(e) => {
                                setFormData({ ...formData, alamat: e.target.value })
                                setErrMsg('')
                            }} className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <label className="text-sm" >No Telepon</label>
                            <input placeholder="08511223344" onChange={(e) => {
                                setFormData({ ...formData, no_telepon: e.target.value })
                                setErrMsg('')
                            }} className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                        </div>
                        <div className="flex-grow flex-4" >
                            <label  className="text-sm" >Username</label>
                            <input placeholder="Username" onChange={(e) => {
                                setFormData({ ...formData, username: e.target.value })
                                setErrMsg('')
                            }} className=" dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <label className="text-sm" >Password</label>
                            <input type="password" onChange={(e) => {
                                setFormData({ ...formData, password: e.target.value })
                                setErrMsg('')
                            }} placeholder="Password" className=" dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <label className="text-sm" >Konfirmasi Password</label>
                            <input type="password" onChange={(e) => setKonfir(e.target.value)} placeholder="Ulangi Password" className="dark:focus:border-white sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border focus:border-4 transition-all border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none" >
                            </input>
                            <p className="text-red-500">{errMsg}</p>
                            <div className="mt-4">
                                <button onClick={tambah} className=" linear flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-4 py-3  text-white bg-brand-500">
                                    Tambah
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileOverview;
