import React from "react";
import Card from "components/card";
import user from '../../../assets/img/user.jpg'

const Banner = (props) => {

  const {totalAgen,totalUstad,nama,username} = props;

  return (
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
          {"Admin"}
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
          <p className="text-md font-bold text-navy-700 dark:text-white mr-2">Total Agen</p>
          <p className="text-sm font-normal text-gray-700  dark:text-white">{totalAgen}</p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className="text-md font-bold text-navy-700 dark:text-white mr-2">Total Ustad</p>
          <p className="text-sm font-normal text-gray-700  dark:text-white">{totalUstad}</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
