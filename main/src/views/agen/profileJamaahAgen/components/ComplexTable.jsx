import Card from "../../../components/card";
import { useNavigate } from "react-router";
import { IoOpenOutline } from "react-icons/io5";
const ComplexTable = (props) => {

  const navigate = useNavigate()
  const { title, data, limit } = props;

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-between pt-4">
        <div class="text-xl font-bold text-navy-700 dark:text-white">
          {title}
        </div>
      </div>
      <div class="mt-8 overflow-x-scroll xl:overflow-hidden">
        <table className="w-full table-auto">
          <thead>
            <tr>
            <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  No Ktp
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Nama
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-2 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Jenis Kelamin
                </p>
              </th>
              <th
                className="border-b border-gray-200 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Alamat
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  No Telepon
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Paket
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Bergabung pada tanggal
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Berangkat
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                 
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, limit).map((list, index) => {
              return <tr className="font-md text-md font-medium text-gray-700 dark:text-white" key={index} >
                <td className="py-2">{list.ktp}</td>
                <td className="py-2" >{list.nama}</td>
                <td className="py-2" >{list.jenis_kelamin}</td>
                <td className="py-2 pr-5" >{list.alamat}</td>
                <td className="py-2" >{list.no_telepon}</td>
                <td className="py-2" >{list.paket}</td>
                <td className="py-2" >{list.dibuat_pada}</td>
                <td className="py-2" >{list.berangkat}</td>
                <td className="py-2">
                  <IoOpenOutline className="w-6 h-6 cursor-pointer hover:scale-125 transition-all" 
                  onClick={()=>{
                    console.log("A")
                  }
                } />
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComplexTable;
