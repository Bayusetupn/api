
import { MdArrowBack, MdArrowBackIosNew } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, redirect } from "react-router";
import { useSignOut } from "react-auth-kit";
import api from '../../../api/axios.js';
import Checkbox from "components/checkbox/index.jsx";

const ProfileOverview = () => {
    const location = useLocation()
    const logot = useSignOut()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ id: location.state.ids, nama: location.state.nama, alamat: location.state.alamat, no_telepon: location.state.no_telepon, username: location.state.username, password: '' })
    const [konfir, setKonfir] = useState('')
    const [errMsg, setErrMsg] = useState()
    const [status, setStatus] = useState(false)

    const edit = async () => {
        if (status) {
            if (!formData.nama || !formData.alamat || !formData.no_telepon || !formData.username || !formData.password) {
                setErrMsg("Form tidak boleh kosong ! ")
                return
            } else if (formData.password.length < 8) {
                setErrMsg("Password minimal 8 karakter !")
                return
            } else if (formData.password !== konfir) {
                setErrMsg("Password dan Konfirmasi Password tidak sama !")
                return
            }
            else if (formData.no_telepon < 10) {
                setErrMsg("Masukkan nomer telepon yang valid !")
                return
            }
        } else {
            if (!formData.nama || !formData.alamat || !formData.no_telepon || !formData.username) {
                setErrMsg("Form tidak boleh kosong!")
                return;
            } else if (formData.nama == location.state.nama && formData.username == location.state.username && formData.alamat == location.state.alamat && formData.no_telepon == location.state.no_telepon) {
                setErrMsg("Tidak ada perubahan")
                return
            }
        }
        try {
            await api.put('/agen/edit', formData, { withCredentials: true }).then(res => {
                switch (formData.password) {
                    case "":
                        navigate(-1)
                        break;
                    default:
                        logot()
                        break;
                }
            })
        } catch (err) {
            return setErrMsg(err.response.data.message)
        }
    }

    const pass = () => {
        if (status) {
            return <div>
                <label className="text-sm" >Password</label>
                <input type="password" onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value })
                    setErrMsg('')
                }} placeholder="Password" className=" dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                </input>
                <label className="text-sm" >Konfirmasi Password</label>
                <input type="password" onChange={(e) => setKonfir(e.target.value)} placeholder="Ulangi Password" className="dark:focus:border-white sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border focus:border-4 transition-all border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none" >
                </input>
            </div>
        }
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
                    <h1 className="text-xl font-bold text-navy-700 dark:text-white">Edit Agen</h1>
                    <p className="text-md font-sm mb-4">Masukkan Informasi Agen untuk Edit Agen !</p>
                    <div className="flex flex-row justify-between flex-wrap gap-1 lg:gap-5 xl:gap-5 xxl:gap-5">
                        <div className="flex-grow">
                            <label className="text-sm" >Nama</label>
                            <input defaultValue={formData.nama} onChange={(e) => {
                                setFormData({ ...formData, nama: e.target.value })
                                setErrMsg('')
                            }} className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <label className="text-sm" >Alamat</label>
                            <input defaultValue={formData.alamat} onChange={(e) => {
                                setFormData({ ...formData, alamat: e.target.value })
                                setErrMsg('')
                            }} className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <label className="text-sm" >No Telepon</label>
                            <input type="number" defaultValue={formData.no_telepon} onChange={(e) => {
                                setFormData({ ...formData, no_telepon: e.target.value })
                                setErrMsg('')
                            }} className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            <div className="flex flex-row gap-3 my-4">
                                <Checkbox status={status} klik={() => setStatus(status ? false : true)} />
                                <p>Ganti Password ?</p>
                            </div>
                        </div>
                        <div className="flex-grow flex-4" >
                            <label className="text-sm" >Username</label>
                            <input defaultValue={formData.username} onChange={(e) => {
                                setFormData({ ...formData, username: e.target.value })
                                setErrMsg('')
                            }} className=" dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
                            </input>
                            {pass()}
                            <p className="text-red-500">{errMsg}</p>
                            <div className="mt-4">
                                <button onClick={edit} className=" linear flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-4 py-3  text-white bg-brand-500">
                                    Edit
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
