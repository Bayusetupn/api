import Card from './components/Card'
import Checkbox from './components/CheckBox';
import api from '../../../api/axios.js'
import { useLocation, useNavigate } from 'react-router';
import { IoMdArrowBack } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { TbPencil } from 'react-icons/tb';

const Perkab = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [dataBaru, setDataBaru] = useState({})

    const perkab = async () => {
        try {
            await api.post('/perkab', { id: location.state.id }, { withCredentials: true }).then((res) => {
                setData(res.data.data)
                setDataBaru(res.data.data)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const edit = async() =>{
        try {
            await api.put('/editPerkab',{
                id: location.state.id, 
                koper_dll: dataBaru.koper_dll,
                kain_batik: dataBaru.kain_batik,
                kain_ihram: dataBaru.kain_ihram,
                mukena: dataBaru.mukena,
                syal: dataBaru.syal,
                buku_panduan: dataBaru.buku_panduan,
                buku_doa: dataBaru.buku_doa,
                booklet_sholawat: dataBaru.booklet_sholawat,
                booklet_peta: dataBaru.booklet_peta
            }, {withCredentials: true}).then(res=>{
                return navigate(-1)
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        perkab()
    }, [])

    return (
        <div className="flex flex-col h-screen overflow-y-scroll gap-5 p-5 dark:!bg-navy-900" >
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
                                Perlengkapan Sebelumnya
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={data.koper_dll} />
                                <p className="ml-3">
                                    Koper + Tas Paspor
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={data.kain_batik} />
                                <p className="ml-3">
                                    Kain Batik
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={data.kain_ihram} />
                                <p className="ml-3">
                                    Kain Ihram
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={data.mukena} />
                                <p className="ml-3">
                                    Mukena
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={data.syal} />
                                <p className="ml-3">
                                    Syal
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={data.buku_panduan} />
                                <p className="ml-3">
                                    Buku Panduan
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={data.buku_doa} />
                                <p className="ml-3">
                                    Buku Doa
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={data.booklet_sholawat} />
                                <p className="ml-3">
                                    Booklet Sholawat
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={data.booklet_peta} />
                                <p className="ml-3">
                                    Booklet Peta Jannatul Baqi
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='col-span-5 lg:!mb-0 w-full'>
                    <Card extra={"w-full h-fit px-6 pb-6 sm:overflow-x-auto"}>
                        <div class="relative flex flex-col items-start justify-between pt-4">
                            <div class="text-xl font-bold text-navy-700 dark:text-white">
                                <p>Perlengkapan</p>
                            </div>
                            <div class="text-md font-sm text-grey-200 dark:text-white">
                                <p>Ceklis untuk mengubah perlengkapan jamaah</p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={dataBaru.koper_dll} klik={() => setDataBaru({ ...dataBaru, koper_dll: !dataBaru.koper_dll })} />
                                <p className="ml-3">
                                    Koper + Tas Paspor
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={dataBaru.kain_batik} klik={() => setDataBaru({ ...dataBaru, kain_batik: !dataBaru.kain_batik })} />
                                <p className="ml-3">
                                    Kain Batik
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={dataBaru.kain_ihram} klik={() => setDataBaru({ ...dataBaru, kain_ihram: !dataBaru.kain_ihram })} />
                                <p className="ml-3">
                                    Kain Ihram
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={dataBaru.mukena} klik={() => setDataBaru({ ...dataBaru, mukena: !dataBaru.mukena })} />
                                <p className="ml-3">
                                    Mukena
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={dataBaru.syal} klik={() => setDataBaru({ ...dataBaru, syal: !dataBaru.syal })} />
                                <p className="ml-3">
                                    Syal
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={dataBaru.buku_panduan} klik={() => setDataBaru({ ...dataBaru, buku_panduan: !dataBaru.buku_panduan })} />
                                <p className="ml-3">
                                    Buku Panduan
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={dataBaru.buku_doa} klik={() => setDataBaru({ ...dataBaru, buku_doa: !dataBaru.buku_doa })} />
                                <p className="ml-3">
                                    Buku Doa
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={dataBaru.booklet_sholawat} klik={() => setDataBaru({ ...dataBaru, booklet_sholawat: !dataBaru.booklet_sholawat })} />
                                <p className="ml-3">
                                    Booklet Sholawat
                                </p>
                            </div>
                            <div className="mt-4 flex flex-row">
                                <Checkbox status={dataBaru.booklet_peta} klik={() => setDataBaru({ ...dataBaru, booklet_peta: !dataBaru.booklet_peta })} />
                                <p className="ml-3">
                                    Booklet Peta Jannatul Baqi
                                </p>
                            </div>
                            <div onClick={()=>edit()} className="mt-4 linear flex flex-row w-full items-center justify-center cursor-pointer rounded-xl px-5 py-2 text-white bg-brand-500">
                                <TbPencil className="w-6 h-6 mr-1 text-md font bold" />
                                <p>Edit</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Perkab;