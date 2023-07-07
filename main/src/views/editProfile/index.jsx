import { IoArrowBack, IoBackspace } from "react-icons/io5";
import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import { MdArrowBack, MdArrowBackIosNew } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import ComplexTable from "../admin/default/components/ComplexTable";
import { useState, useEffect } from "react";
import api from '../../api/axios.js';
import { useLocation, useNavigate } from "react-router";
import { useSignOut } from "react-auth-kit";
import Checkbox from "components/checkbox";

const ProfileOverview = () => {

  const logout = useSignOut()
  const location = useLocation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ nama: location.state.name, username: location.state.user, password: "" })
  const [konfir, setKonfir] = useState('')
  const [totalAgen, setTotalAgen] = useState()
  const [totalUstad, setTotalUstad] = useState()
  const [errMsg, setErrMsg] = useState()
  const [status, setStatus] = useState(false)

  const edit = async () => {
    if(status){
      if (!formData.username || !formData.password || !formData.nama) {
        setErrMsg("Form tidak boleh kosong!")
        return;
      } else if (formData.password.length < 8) {
        setErrMsg("Password minimal 8 karakter !")
        return;
      }
      else if (formData.password !== konfir) {
        setErrMsg("Password dan Konfirmasi password tidak sama!")
        return;
      }
    }else{
      if (!formData.username ||  !formData.nama) {
        setErrMsg("Form tidak boleh kosong!")
        return;
      }else if(formData.nama == location.state.name && formData.username == location.state.user){
        setErrMsg("Tidak ada perubahan")
        return
      }
    }
    try {
      await api.put('/admin/edit', formData, { withCredentials: true }).then(res => {
        return logout()
      })
    } catch (err) {
      return setErrMsg(err.response.data.message)

    }
  }

  const pass = () => {
    if (status) {
      return <div>
        <label className="text-sm">Password</label>
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

  const totalA = async () => {
    try {
      await api.get('/agen', { withCredentials: true }).then(res => {
        setTotalAgen(res.data.userData.length)
      })
    } catch (err) {
      console.log(err)
    }
  }
  const totalU = async () => {
    try {
      await api.get('/ustad', { withCredentials: true }).then(res => {
        setTotalUstad(res.data.userData.length)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {

    totalA()
    totalU()
    const interval = setInterval(() => {
      totalA()
      totalU()
    }, 500000);

    return () => {
      clearInterval(interval);
    };
  }, [])

  return (
    <div className="flex h-screen overflow-scroll flex-col gap-5 p-5 dark:!bg-navy-900">
      <div className="w-fit mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-1">
        <div className="flex flex-direction-row items-center cursor-pointer dark:text-white" onClick={() => navigate(-1, { replace: true })}>
          <IoMdArrowRoundBack className="h-7 w-7 mr-2" />
          <p className="text-md font-bold">Back</p>
        </div>
      </div>
      <div className="w-ful mt-3 flex h-fit  sm:w-full flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-3 lg:!mb-0">
          <Banner totalAgen={totalAgen} totalUstad={totalUstad} nama={location.state.name} username={location.state.user} />
        </div>
        <div className="p-5 col-span-5 rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none ">
          <h1 className="text-xl font-bold text-navy-700 dark:text-white">Edit Admin</h1>
          <p className="text-md font-sm mb-4">Masukkan Informasi Admin yang akan di edit!</p>
          <div>
          <p className="text-red-500 mb-2">{errMsg}</p>
          </div>
          <label className="text-sm" >Nama</label>
          <input onChange={(e) => {
            setFormData({ ...formData, nama: e.target.value })
            setErrMsg('')
          }} defaultValue={formData.nama} className="dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
          </input>
          <label className="text-sm" >Username</label>
          <input onChange={(e) => {
            setFormData({ ...formData, username: e.target.value })
            setErrMsg('')
          }} defaultValue={formData.username} className=" dark:focus:border-white transition-all sm:w-full my-2 flex h-12 w-full items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" >
          </input>
          <div className="my-5 flex-row flex gap-3" >
          <Checkbox klik={() => setStatus(status ? false : true)} status={status} />
          <p>Ganti Password ? </p>
          </div>
          {pass()}
          <button onClick={edit} className=" linear flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-4 py-3  text-white bg-brand-500">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
