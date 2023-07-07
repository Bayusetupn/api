import { url } from '../../../api/url.js'
import api from '../../../api/axios.js'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Card from './components/Card.jsx'
import notFound from '../../../assets/img/Belum di Upload.jpg'
import { IoMdArrowBack } from 'react-icons/io'
import { TbTrash, TbUpload } from 'react-icons/tb'
import { MdPhotoCamera, MdUpload } from 'react-icons/md'


const Dokumen = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [files, setFiles] = useState({})
    const [ktp, setKtp] = useState(files.ktp)
    const [ktps, setKtps] = useState()
    const [kk, setKK] = useState(files.kk)
    const [kks, setKKs] = useState()
    const [paspor, setPaspor] = useState(files.passport)
    const [paspors, setPaspors] = useState()
    const [pas, setPas] = useState(files.foto)
    const [pass, setPass] = useState()
    const [akteN, setAkteN] = useState(files.akteN)
    const [akteNs, setAkteNs] = useState()
    const [akteK, setAkteK] = useState(files.akteK)
    const [akteKs, setAkteKs] = useState()
   

    let formData = new FormData()

    

    const file = async () => {
        try {
            await api.get(`/file/${location.state.id}`, { withCredentials: true }).then((res) => {
                setFiles(res.data.data)
            })
        } catch (err) {
            console.log(err)
        }
    }

    formData.append('id',location.state.id)
    formData.append('ktp', ktp)
    formData.append('kk', kk)
    formData.append('paspor', paspor)
    formData.append('foto', pas)
    formData.append('akteN', akteN)
    formData.append('akteK', akteK)

    const editDoc = async () => {
        try {
            await api.put('/file/edit', formData , { withCredentials: true }).then(res => {
                return navigate(-1)
            })
        } catch (err) {
        }
    }

    useEffect(() => {
        file()
    }, [])

    return (
        <div className='className="flex flex-col h-screen overflow-y-scroll gap-5 p-5 dark:!bg-navy-900 '>
            <div className="w-fit mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-1">
                <div className="flex flex-direction-row items-center cursor-pointer dark:text-white" onClick={() => navigate(-1)}>
                    <IoMdArrowBack className="h-7 w-7 mr-2" />
                    <p className="text-md font-bold">Back</p>
                </div>
            </div>
            <div className="w-full mt-3 flex flex-row flex-wrap gap-5 lg:grid lg:grid-cols-12">
                <div className='col-span-4 lg:!mb-0 w-full'>
                    <Card extra={"w-full h-fit px-6 pb-6 sm:overflow-x-auto"}>
                        <div class="relative flex flex-col items-start justify-between pt-4">
                            <div class="text-xl font-bold text-navy-700 dark:text-white">
                                Dokumen Sebelumnya
                            </div>
                            <div className="mt-4 w-full">
                                <div className="flex-row flex items-center  gap-2">
                                    <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                                    <p>KTP (Kartu Tanda Penduduk) </p>
                                </div>
                                <div >
                                    <img src={files.ktp ? `${url}/${files.ktp}` : notFound} className=" h-40 " />
                                </div>
                            </div>
                            <div className="mt-4 w-full ">
                                <div className="flex-row flex  w-full items-center  gap-2">
                                    <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                                    <p>KK (Kartu Keluarga)</p>
                                </div>
                                <div >
                                    <img src={files.kk ? `${url}/${files.kk}` : notFound} className=" h-40 " />
                                </div>
                            </div>
                            <div className="mt-4 w-full ">
                                <div className="flex-row flex items-center  gap-2">
                                    <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                                    <p>PASPOR</p>
                                </div>
                                <div className=" h-40 " >
                                    <img src={files.passport ? `${url}/${files.passport}` : notFound} className=" h-40 " />
                                </div>
                            </div>
                            <div className="mt-4 w-full">
                                <div className="flex-row flex items-center  gap-2">
                                    <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                                    <p>PASS FOTO</p>
                                </div>
                                <div className=" h-40 " >
                                    <img src={files.foto ? `${url}/${files.foto}` : notFound} className=" h-40 " />
                                </div>
                            </div>
                            <div className="mt-4 w-full">
                                <div className="flex-row flex items-center  gap-2">
                                    <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                                    <p>AKTE NIKAH</p>
                                </div>
                                <div className=" h-40 " >
                                    <img src={files.akteN ? `${url}/${files.akteN}` : notFound} className=" h-40 " />
                                </div>
                            </div>
                            <div className="mt-4 w-full">
                                <div className="flex-row flex items-center  gap-2">
                                    <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                                    <p>AKTE KELAHIRAN</p>
                                </div>
                                <div className=" h-40 " >
                                    <img src={files.akteK ? `${url}/${files.akteK}` : notFound} className=" h-40 " />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='col-span-4 lg:!mb-0 w-full' >
                    <Card extra={"w-full h-fit px-6 pb-6 sm:overflow-x-auto"}>
                        <div class="relative flex flex-col items-start justify-between pt-4">
                            <div class="text-xl font-bold text-navy-700 dark:text-white">
                                <p>Dokumen</p>
                            </div>
                            <div class="text-md font-sm text-grey-500 dark:text-white">
                                <p>Upload dokumen baru atau ganti dokumen</p>
                            </div>
                            <div className="mt-4 w-full">
                                <div className="flex-row flex items-center  gap-2">
                                    <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                                    <p>KTP (Kartu Tanda Penduduk) </p>
                                </div>
                                <div >
                                    <img src={ktps ? ktps : files.ktp ? `${url}/${files.ktp}` : notFound} className=" h-40 " />
                                </div>
                                <div className='flex flex-row gap-2 items-center'>
                                    <div className="linear w-fit mt-3 cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">
                                        <label className="flex flex-row gap-2 items-center">
                                            <MdPhotoCamera className="h-5 w-5" />
                                            <div>
                                                <span class="mt-2 text-base leading-normal">Plih Foto</span>
                                                <input type='file' accept="image/*" class="hidden" onChange={e => {
                                                    setKtp(e.target.files[0])
                                                    setKtps(URL.createObjectURL(e.target.files[0]))
                                                }
                                                } />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 w-full ">
                                <div className="flex-row flex  w-full items-center  gap-2">
                                    <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                                    <p>KK (Kartu Keluarga)</p>
                                </div>
                                <div >
                                    <img src={kks ? kks : files.kk ? `${url}/${files.kk}` : notFound} className=" h-40 " />
                                </div>
                                <div className='flex flex-row gap-2 items-center'>
                                    <div className="linear w-fit mt-3 cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">
                                        <label className="flex flex-row gap-2 items-center">
                                            <MdPhotoCamera className="h-5 w-5" />
                                            <div>
                                                <span class="mt-2 text-base leading-normal">Plih Foto</span>
                                                <input type='file' accept="image/*" class="hidden" onChange={e => {
                                                    setKK(e.target.files[0])
                                                    setKKs(URL.createObjectURL(e.target.files[0]))
                                                }
                                                } />
                                            </div>
                                        </label>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="mt-4 w-full ">
                                <div className="flex-row flex items-center  gap-2">
                                    <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                                    <p>PASPOR</p>
                                </div>
                                <div className=" h-40 " >
                                    <img src={paspors ? paspors : files.passport ? `${url}/${files.passport}` : notFound} className=" h-40 " />
                                </div>
                                <div className='flex flex-row gap-2 items-center'>
                                    <div className="linear w-fit mt-3 cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">
                                        <label className="flex flex-row gap-2 items-center">
                                            <MdPhotoCamera className="h-5 w-5" />
                                            <div>
                                                <span class="mt-2 text-base leading-normal">Plih Foto</span>
                                                <input type='file' accept="image/*" class="hidden" onChange={e => {
                                                    setPaspor(e.target.files[0])
                                                    setPaspors(URL.createObjectURL(e.target.files[0]))
                                                }
                                                } />
                                            </div>
                                        </label>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="mt-4 w-full">
                                <div className="flex-row flex items-center  gap-2">
                                    <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                                    <p>PASS FOTO</p>
                                </div>
                                <div className=" h-40 " >
                                    <img src={pass ? pass : files.foto ? `${url}/${files.foto}` : notFound} className=" h-40 " />
                                </div>
                                <div className='flex flex-row gap-2 items-center'>
                                    <div className="linear w-fit mt-3 cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">
                                        <label className="flex flex-row gap-2 items-center">
                                            <MdPhotoCamera className="h-5 w-5" />
                                            <div>
                                                <span class="mt-2 text-base leading-normal">Plih Foto</span>
                                                <input type='file' accept="image/*" class="hidden" onChange={e => {
                                                    setPas(e.target.files[0])
                                                    setPass(URL.createObjectURL(e.target.files[0]))
                                                }
                                                } />
                                            </div>
                                        </label>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="mt-4 w-full">
                                <div className="flex-row flex items-center  gap-2">
                                    <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                                    <p>AKTE NIKAH</p>
                                </div>
                                <div className=" h-40 " >
                                    <img src={akteNs ? akteNs : files.akteN ? `${url}/${files.akteN}` : notFound} className=" h-40 " />
                                </div>
                                <div className='flex flex-row gap-2 items-center'>
                                    <div className="linear w-fit mt-3 cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">
                                        <label className="flex flex-row gap-2 items-center">
                                            <MdPhotoCamera className="h-5 w-5" />
                                            <div>
                                                <span class="mt-2 text-base leading-normal">Plih Foto</span>
                                                <input type='file' accept="image/*" class="hidden" onChange={e => {
                                                    setAkteN(e.target.files[0])
                                                    setAkteNs(URL.createObjectURL(e.target.files[0]))
                                                }
                                                } />
                                            </div>
                                        </label>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="mt-4 w-full">
                                <div className="flex-row flex items-center  gap-2">
                                    <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                                    <p>AKTE KELAHIRAN</p>
                                </div>
                                <div className=" h-40 " >
                                    <img src={akteKs ? akteKs : files.akteK ? `${url}/${files.akteK}` : notFound} className=" h-40 " />
                                </div>
                                <div className='flex flex-row gap-2 items-center'>
                                    <div className="linear w-fit mt-3 cursor-pointer rounded-xl px-4 py-2 text-white bg-brand-500">
                                        <label className="flex flex-row gap-2 items-center">
                                            <MdPhotoCamera className="h-5 w-5" />
                                            <div>
                                                <span class="mt-2 text-base leading-normal">Plih Foto</span>
                                                <input type='file' accept="image/*" class="hidden" onChange={e => {
                                                    setAkteK(e.target.files[0])
                                                    setAkteKs(URL.createObjectURL(e.target.files[0]))
                                                }
                                                } />
                                            </div>
                                        </label>
                                    </div>
                                    
                                </div>
                            </div>
                            <div onClick={() => editDoc()} className='linear w-full flex flex-row justify-center mt-3 cursor-pointer rounded-xl px-4 py-3 text-white bg-brand-700'>
                                <MdUpload className='w-6 h-6' />
                                <p>Upload Dokumen</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Dokumen