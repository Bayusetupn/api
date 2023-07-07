import React, { useEffect, useState } from "react";
import user from 'assets/img/user.jpg'
import Card from "components/card";
import FsLightbox from "fslightbox-react";
import { useNavigate } from "react-router";
import { url } from "../../../../api/url.js";
import { TbPencil, TbPhoto } from "react-icons/tb";

const Banner = (props) => {
  const navigate = useNavigate()

  const { gabung, foto, alamat, no, nama, username, id } = props
  const [open,setOpen] = useState(false)
  
  return (
    <Card extra={"items-center w-full h-fit p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div onClick={()=>setOpen(!open)} className="relative flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
        <img className="h-full w-full rounded-full" src={foto ? `${url}/${foto}` : user} alt="avatar" />
      </div>
      <FsLightbox type="image" toggler={open} sources={[foto? `${url}/${foto}` : user]} />

      {/* Name and position */}
      <div className="mt-3 mb-3 flex flex-col items-center">
        <div className="flex flex-row" >
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            {nama}
          </h4>
        </div>
        <p className="text-base font-normal text-gray-700 dark:text-white">
          {"Ustad"}
        </p>
      </div>

      <div className="w-full border-solid border-y border-grey-700">

      </div>

      {/* Post followers */}
      <div className="mt-6 mb-3 w-full flex flex-col items-start gap-2 md:!gap-2">

        <div className="flex flex-row items-center justify-center">
          <p className="text-md font-bold text-navy-700 dark:text-white mr-2">Username :</p>
          <p className="text-sm font-normal text-gray-700  dark:text-white">{username}</p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className="text-md font-bold text-navy-700 dark:text-white mr-2">Alamat :</p>
          <p className="text-sm font-normal text-gray-700  dark:text-white">{alamat}</p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className="text-md font-bold text-navy-700 dark:text-white mr-2">No Telepon :</p>
          <p className="text-sm font-normal text-gray-700  dark:text-white">{no}</p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className="text-md font-bold text-navy-700 dark:text-white mr-2">Bergabung pada tanggal :</p>
          <p className="text-sm font-normal text-gray-700  dark:text-white">{gabung}</p>
        </div>
        <div onClick={() => navigate('edit', { state: { ids: id, nama: nama, username: username, alamat: alamat, no_telepon: no } })} className="linear flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">
          <TbPencil className="w-6 h-6 mr-1 text-md font bold" />
          <p>Edit</p>
        </div>
        <div onClick={()=>navigate('pic',{state: {foto: foto,id: id}})} className="linear flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">
          <TbPhoto className="w-6 h-6 mr-1 text-md font bold" />
          <p>Edit Foto Profile</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
