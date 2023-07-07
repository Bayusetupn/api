import Banner from "./components/Banner";
import { IoMdArrowRoundBack } from "react-icons/io";
import ComplexTable from "./components/ComplexTable";
import { useState, useEffect } from "react";
import api from '../../../api/axios.js';
import { useLocation, useNavigate } from "react-router";
import Card from "./components/Card";
import Checkbox from "./components/CheckBox";
import notFound from '../../../assets/img/Belum di Upload.jpg'
import {url} from '../../../api/url.js'


const ProfileOverview = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [dataperkab, setDataPerkab] = useState([''])
  const [files,setFiles] = useState('')

  const perkab = async () => {
    try {
      await api.post('/perkab', { id: location.state.ids }, { withCredentials: true }).then((res) => {
        setDataPerkab(res.data.data)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const file = async () => {
    try {
      await api.get(`/file/${location.state.ids}`, { withCredentials: true }).then((res) => {
        setFiles(res.data.data)
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    perkab()
    file()
  }, [])

  return (
    <div className="flex flex-col h-screen overflow-y-scroll gap-5 p-5 dark:!bg-navy-900">
      <div className="w-fit mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-1">
        <div className="flex flex-direction-row items-center cursor-pointer dark:text-white" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack className="h-7 w-7 mr-2" />
          <p className="text-md font-bold">Back</p>
        </div>
      </div>
      <div className="w-full mt-3 flex flex-row flex-wrap gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-4 lg:!mb-0 w-full">
          <Banner
            id={location.state.ids}
            ktp={location.state.ktp}
            nama={location.state.nama}
            jenis={location.state.jenis_kelamin}
            telp={location.state.no_telepon}
            alamat={location.state.alamat}
            gabung={location.state.dibuat}
            dp={location.state.dp}
            agen={location.state.di_daftarkan}
            paket={location.state.paket}
            berangkat={location.state.berangkat}
          />
        </div>
        <div className="col-span-4 lg:!mb-0 w-full">
          <Card extra={"w-full h-fit px-6 pb-6 sm:overflow-x-auto"}>
            <div class="relative flex flex-col items-start justify-between pt-4">
              <div class="text-xl font-bold text-navy-700 dark:text-white">
                Perlengkapan
              </div>
              <div className="mt-4 flex flex-row">
                <Checkbox status={dataperkab.koper_dll} />
                <p className="ml-3">
                  Koper + Tas Paspor
                </p>
              </div>
              <div className="mt-4 flex flex-row">
                <Checkbox status={dataperkab.kain_batik} />
                <p className="ml-3">
                  Kain Batik
                </p>
              </div>
              <div className="mt-4 flex flex-row">
                <Checkbox status={dataperkab.kain_ihram} />
                <p className="ml-3">
                  Kain Ihram
                </p>
              </div>
              <div className="mt-4 flex flex-row">
                <Checkbox status={dataperkab.mukena} />
                <p className="ml-3">
                  Mukena
                </p>
              </div>
              <div className="mt-4 flex flex-row">
                <Checkbox status={dataperkab.syal} />
                <p className="ml-3">
                  Syal
                </p>
              </div>
              <div className="mt-4 flex flex-row">
                <Checkbox status={dataperkab.buku_panduan} />
                <p className="ml-3">
                  Buku Panduan
                </p>
              </div>
              <div className="mt-4 flex flex-row">
                <Checkbox status={dataperkab.buku_doa} />
                <p className="ml-3">
                  Buku Doa
                </p>
              </div>
              <div className="mt-4 flex flex-row">
                <Checkbox status={dataperkab.booklet_sholawat} />
                <p className="ml-3">
                  Booklet Sholawat
                </p>
              </div>
              <div className="mt-4 flex flex-row">
                <Checkbox status={dataperkab.booklet_peta} />
                <p className="ml-3">
                  Booklet Peta Jannatul Baqi
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-4 lg:!mb-0 w-full">
          <Card extra={"w-full h-fit px-6 pb-6 sm:overflow-x-auto"}>
            <div class="relative flex flex-col items-start justify-between pt-4">
              <div class="text-xl font-bold text-navy-700 dark:text-white">
                Dokumen
              </div>
              <div className="mt-4 w-full">
                <div className="flex-row flex items-center  gap-2">
                  <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                  <p>KTP (Kartu Tanda Penduduk) </p>
                </div>
                <div >
                <img src={files.ktp? `${url}/${files.ktp}`: notFound} className=" h-40 "/>
                </div>
              </div>
              <div className="mt-4 w-full ">
                <div className="flex-row flex  w-full items-center  gap-2">
                  <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                  <p>KK (Kartu Keluarga)</p>
                </div>
                <div >
                  <img src={files.kk? `${url}/${files.kk}`: notFound} className=" h-40 " />
                </div>
              </div>
              <div className="mt-4 w-full ">
                <div className="flex-row flex items-center  gap-2">
                  <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                  <p>PASPOR</p>
                </div>
                <div className=" h-40 " >
                  <img src={files.passport? `${url}/${files.passport}`: notFound} className=" h-40 " />
                </div>
              </div>
              <div className="mt-4 w-full">
                <div className="flex-row flex items-center  gap-2">
                  <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                  <p>PASS FOTO</p>
                </div>
                <div className=" h-40 " >
                  <img src={files.foto? `${url}/${files.foto}`: notFound} className=" h-40 " />
                </div>
              </div>
              <div className="mt-4 w-full">
                <div className="flex-row flex items-center  gap-2">
                  <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                  <p>AKTE NIKAH</p>
                </div>
                <div className=" h-40 " >
                  <img src={files.akteN? `${url}/${files.akteN}`: notFound} className=" h-40 " />
                </div>
              </div>
              <div className="mt-4 w-full">
                <div className="flex-row flex items-center  gap-2">
                  <div className="bg-navy-700 w-2 h-2 rounded-[20px]" ></div>
                  <p>AKTE KELAHIRAN</p>
                </div>
                <div className=" h-40 " >
                  <img src={files.akteK? `${url}/${files.akteK}`: notFound} className=" h-40 " />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
