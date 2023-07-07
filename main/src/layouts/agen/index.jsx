import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "components/navbarAgen";
import Sidebar from "components/sidebarAgen";
import {agen} from "routes.js";
import api from "../../api/axios.js";

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  const [nama,setNama] = useState()
  const [foto,setFoto] = useState()

  const user = async()=>{
    try {
      await api.get('/user',{ withCredentials: true}).then(res=>{
        setNama(res.data.response)
        setFoto(res.data.foto)
      })
    } catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() => {
    user()
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(agen);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/agen") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              name={nama}
              foto={foto}
              onOpenSidenav={() => setOpen(true)}
              logoText={"A"}
              brandText={currentRoute}
              secondary={getActiveNavbar(agen)}
              {...rest} 
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(agen)}

                <Route
                  path="/"
                  element={<Navigate to={'/agen/dashboard'}/>}
                />
              </Routes>
            </div>
            <div className="p-3">
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
