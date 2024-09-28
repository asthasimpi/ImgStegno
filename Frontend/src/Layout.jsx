import { NavLink, Outlet, useLocation } from "react-router-dom";

function Layout() {
    const l=useLocation()
    let design = l.pathname === "/encode" ? " bg-[#C77BF2]" : "bg-transparent"; 
    let design2 = l.pathname === "/decode" ? " bg-[#C77BF2]" : "bg-transparent"; 
    let display = l.pathname === "/" ? true : false ;

  return (
    <>
      <div className="w-full h-screen bg-[#E4C1F9]">
        {!display && (
          <div>
            <NavLink to="/">
              <div className="flex w-full h-48 text-8xl font-bold text-white bg-[#110D0D] justify-center items-center">
                Image Camouflager
              </div>
            </NavLink>
            <div className="flex justify-center items-center w-full h-16">
              <NavLink
                to="/encode"
                className={`w-[50%] text-xl cursor-pointer ${design} ease-out duration-500 font-semibold flex rounded-full h-full items-center justify-center`}
              >
                <span>Encode Image</span>
              </NavLink>
              <NavLink
                to="/decode"
                className={`w-[50%] flex cursor-pointer ${design2}  ease-out duration-500 justify-center text-xl rounded-full h-full items-center font-semibold`}
              >
                <span>Decode Image</span>
              </NavLink>
            </div>
          </div>
        )}
        <div className="h-[65%] w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
