import { useNavigate } from "react-router";



export default function Error404() {
    const navigate = useNavigate()

    const onClickHandler = () =>{
        return navigate('/admin/dashboard',{replace: true})
    }

    return (
      <div>
        <div className="relative float-right h-screen min-h-screen w-full !bg-white dark:!bg-navy-900 flex items-center justify-center flex-col">
            <div>
                <p>
                404 Page Not Found!
                </p>
            </div>
            <div>
            <button onClick={onClickHandler} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] px-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Back to Dashboard
          </button>
            </div>
        </div>
      </div>
    );
  }