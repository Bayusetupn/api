import React, { useState } from "react";

import Card from "components/card";
import user from '../../../../assets/img/user.jpg'

const Banner = (props) => {

  const { id, ktp, nama, jenis, telp, alamat, gabung, dp, agen, paket, berangkat } = props;

  return (
    <div>
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
        </div>
      </Card>
    </div>
  );
};

export default Banner;
