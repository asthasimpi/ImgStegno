import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Encode from './component/Encode.jsx'
import Decode from './component/Decode.jsx'
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from './component/Home.jsx'
const router=createBrowserRouter(
  createRoutesFromElements(
   <Route path='/' element={<App/>}>
    <Route path='/' element={<Home/>}/>
    <Route path='/encode' element={<Encode/>}/>
    <Route path='/decode' element={<Decode/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
