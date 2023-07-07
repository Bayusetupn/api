import React, { useEffect, useState } from "react";
import Card from "components/card";
import { useNavigate } from "react-router";
import FsLightbox from "fslightbox-react";

const Banner = (props) => {
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const { foto } = props

  return (
    <Card extra={"items-center w-fit h-fit p-[16px] bg-cover"}>
      <div className="relative flex h-[200px] w-[200px] bg-white items-center justify-center border-[4px] border-white dark:!border-navy-700">
        <img className="h-full w-full object-cover" onClick={()=>setOpen(!open)}  src={foto} alt="avatar" />
      </div>
      <FsLightbox type="image" toggler={open} sources={[`${foto}`]}/>
    </Card>
  );
};

export default Banner;
