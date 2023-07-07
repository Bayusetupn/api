import React, { useState } from "react";
import avatar from "assets/img/avatars/avatar11.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import { TbCheck, TbPencil, TbReplace, TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router";
import user from '../../../assets/img/user.jpg'
import api from "../../../api/axios.js";

const Banner = (props) => {
  const navigate = useNavigate()
  const [konfir, setkonfir] = useState(false)
  const [jadwal,setJadwal] = useState('')
  const [atur,setAtur] = useState(false)

  const { id, ktp, nama, jenis, telp, alamat, gabung, dp, agen, paket, berangkat } = props;

  const dpHandle = () => {
    if (!dp) {
      return <div onClick={() => setkonfir(true)} className="linear flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">
        <TbCheck className="w-6 h-6 mr-1 text-md font bold" />
        <p>Tandai Sudah Dp</p>
      </div>
    }
  }

  const ubahDp = async () => {
    try {
      await api.put('/jamaah/dp', { id: id }, { withCredentials: true }).then(res => {
        setkonfir(false)
        return navigate(-1)
      })
    } catch (err) {

    }
  }

  const ubahBerangkat = async () => {
    try {
      await api.put('/jamaah/berangkat', { id: id,berangkat: jadwal }, { withCredentials: true }).then(res => {
        return navigate(-1)
      })
    } catch (err) {
    }
  }

  const aturHandle = () =>{
    if(atur){
      return <div className="flex flex-row w-full gap-5 items-center">
      <input type="date" lang="id" placeholder="red"  onChange={(e)=>setJadwal(e.target.value)} className="dark:focus:border-white transition-all flex h-12  items-center justify-center focus:border-navy-200 rounded-xl border border-3 border-grey-800 bg-white/0 p-3 text-sm outline-none focus:border-4" />
      <div onClick={ubahBerangkat} className="linear flex px-7 flex-row w-fit h-fit items-center justify-center cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">
        <p>Atur</p>
      </div>
    </div>
    }
  }

  const konfirHandle = () => {
    if (konfir) {
      return <Card extra={"items-center w-full h-fit p-[16px] bg-cover mb-4 "} >
        <div className="flex flex-col gap-3 items-center">
          <p>Tandai Jamaah {nama} sudah dp ? </p>
          <div className="flex gap-3">
            <button onClick={() => ubahDp()} className="linear flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">Tandai</button>
            <button onClick={() => setkonfir(false)} className="linear flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-4 py-2 text-white bg-red-500" >Batal</button></div>
        </div>
      </Card>
    }
  }


  return (
    <div>
      {konfirHandle()}
      <Card extra={"items-center w-full h-fit p-[16px] bg-cover"}>
        {/* Background and profile */}
        <div className="relative flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={user} alt="avatar" />
        </div>

        {/* Name and position */}
        <div className="mt-3 mb-3 flex flex-col items-center">
          <div className="flex flex-row" >
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {nama}
            </h4>
          </div>
          <p className="text-base font-normal text-gray-700 dark:text-white">
            {"Jamaah"}
          </p>
        </div>

        <div className="w-full border-solid border-y border-grey-700">

        </div>

        {/* Post followers */}
        <div className="mt-6 mb-3 w-full flex flex-col items-start gap-2 md:!gap-2">

          <div className="flex flex-row items-center justify-center">
            <p className="text-md font-bold text-navy-700 dark:text-white mr-2">No Ktp :</p>
            <p className="text-sm font-normal text-gray-700  dark:text-white">{ktp}</p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <p className="text-md font-bold text-navy-700 dark:text-white mr-2">Alamat Domisili :</p>
            <p className="text-sm font-normal text-gray-700  dark:text-white">{alamat}</p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <p className="text-md font-bold text-navy-700 dark:text-white mr-2">Jenis Kelamin :</p>
            <p className="text-sm font-normal text-gray-700  dark:text-white">{jenis}</p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <p className="text-md font-bold text-navy-700 dark:text-white mr-2">No Telepon :</p>
            <p className="text-sm font-normal text-gray-700  dark:text-white">{telp}</p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <p className="text-md font-bold text-navy-700 dark:text-white mr-2">Bergabung pada tanggal:</p>
            <p className="text-sm font-normal text-gray-700  dark:text-white">{gabung}</p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <p className="text-md font-bold text-navy-700 dark:text-white mr-2">Berangkat :</p>
            <p className="text-sm font-normal text-gray-700  dark:text-white">{berangkat ? berangkat : "Belum ditentukan"}</p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <p className="text-md font-bold text-navy-700 dark:text-white mr-2">Paket :</p>
            <p className="text-sm font-normal text-gray-700  dark:text-white">{paket}</p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <p className="text-md font-bold text-navy-700 dark:text-white mr-2">Keterangan :</p>
            <p className="text-sm font-normal text-gray-700  dark:text-white">{dp ? "Lunas" : "Belum Lunas"}</p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <p className="text-md font-bold text-navy-700 dark:text-white mr-2">di Daftarkan :</p>
            <p className="text-sm font-normal text-gray-700  dark:text-white">{agen}</p>
          </div>
          {dpHandle()}
          <div onClick={()=>atur? setAtur(false):setAtur(true)} className="linear flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">
            <TbPencil className="w-6 h-6 mr-1 text-md font bold" />
            <p>Atur Jadwal Berangkat </p>
          </div>
            {aturHandle()}
        </div>
      </Card>
    </div>
  );
};

export default Banner;
