import Card from "components/card";
import { useNavigate } from "react-router";
const ComplexTable = (props) => {

  const navigate = useNavigate()
  const { title, data, limit, side } = props;

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-between pt-4">
        <div class="text-xl font-bold text-navy-700 dark:text-white">
          {title}
        </div>
        <div>
          <p onClick={() => navigate(props.navigate, { replace: props.replaces || true })} className=" cursor-pointer font-bold linear mt-2 rounded-xl bg-brand-500 py-[12px] px-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            {side}
          </p>
        </div>
      </div>
      <div class="mt-8 overflow-x-scroll xl:overflow-hidden">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th
                className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Nama
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Alamat
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  No Telepon
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">
                  Total Jamaah
                </p>
              </th>
              <th
                className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
              >
                <p className="text-md tracking-wide text-navy-700 font-bold text-md dark:text-white">

                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, limit).map((list, index) => {
              return <tr className="font-md text-md font-medium text-gray-700 dark:text-white" key={index} >
                <td className="py-2" >{list.nama}</td>
                <td className="py-2" >{list.alamat}</td>
                <td className="py-2" >{list.no_telepon}</td>
                <td className="py-2" >{list.total_jamaah}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComplexTable;
