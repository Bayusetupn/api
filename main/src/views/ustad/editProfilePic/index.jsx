import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import user from '../../../assets/img/user.jpg'
import { url } from '../../../api/url.js';
import api from '../../../api/axios.js'
import FsLightbox from "fslightbox-react";
import Banner from './component/Banner'
import {  useState } from "react";
import {  MdPhotoCamera, MdUpload } from "react-icons/md";

const ProfileOverview = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [img, setImg] = useState()
    const [imgs,setImgs] = useState()

    let formData = new FormData()

    formData.append('id',location.state.id)
    formData.append('image',imgs)

    const upload = async()=>{
        try {
            await api.post('/profilePic',formData,{withCredentials: true} ).then(res=>{
                return navigate(-1)
            })
        } catch (err) {
            console.log(err)
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
            <div className="flex items-center flex-col gap-5">
                <Banner foto={img ? img : location.state.foto ? `${url}/${location.state.foto}` : user} />
                <div className="linear cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">
                    <label className="flex flex-row gap-2 items-center">
                        <MdPhotoCamera className="h-5 w-5" />
                        <div>
                            <span class="mt-2 text-base leading-normal">Plih Foto</span>
                            <input type='file' accept="image/*" class="hidden" onChange={e => {setImgs(e.target.files[0])
                                setImg(URL.createObjectURL(e.target.files[0]))}
                                 }/>
                        </div>
                    </label>
                </div>
                {img? <div onClick={()=>upload()} className="flex flex-row gap-2 linear cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">
                    <MdUpload className="h-5 w-5  " />
                    <p>Upload Foto</p>
                </div> : null}
            </div>
        </div>
    )
};

export default ProfileOverview;
