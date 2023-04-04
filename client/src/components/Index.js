import React, { useState } from 'react';
import logo from "./img/RURUTEK-LogoOriginal.svg";
import Dashboard from './Dashboard';
import Dashboard2 from './Dashboard2';
import {FiHardDrive} from "react-icons/fi";
// import Dashboard2 from './Dashboard2';
import { BsFillPersonFill } from "react-icons/bs";
import { TbDeviceRemote } from "react-icons/tb";
import { RiPlug2Line } from "react-icons/ri";
import Dashboard3 from './Dashboard3';
export default function Dashboard1(props) {

    const [showExcelChecker, setShowExcelChecker] = useState(true);
    const [showDB, setShowDb] = useState(false);
    const [showSearchInputChecker, setShowSearchInputChecker] = useState(false);
    
    let allstb = ['GTPL', 'SCV', 'JIO'];
    let allaccessories = ['Remote', 'Adapter'];
    let allvendor = ['LIT','LRIPL', 'TIANYIN' , 'JULIO'];
    const [stb,setSTB] = useState('')
    const [accessories,setAccessories] = useState('')
    const [vendor,setVendor] = useState('')
 
    const show = (getSEC, getDB, getSIC) => {
        setShowExcelChecker(getSEC)
        setShowDb(getDB)
        setShowSearchInputChecker(getSIC)
    }

    return (
        <div className="container-scroller">
            {/* partial:partials/_navbar.html */}
            <nav className="navbar p-0 fixed-top bg-dark bg-gradient">

                <div className="row navbar-menu-wrapper d-flex align-items-center justify-content-between">
                    <div className="col-lg-2 text-center navbar-brand-wrapper bg-dark">
                        <a className="navbar-brand" href="/"><img src={logo} alt="logo" /></a>
                    </div>
                    {/* <div className="col-lg-4 text-sm-left text-md-left text-lg-center"> */}
                        <h4 className=" mx-auto my-1 text-white">DATA CHECKER</h4>
                    {/* </div> */}
                    <ul className="col-lg-6 navbar-nav navbar-nav-right">
                        <li className="nav-item  dropdown d-none d-md-block">
                            <a className="nav-link dropdown-toggle text-white" id="reportDropdown" href="#" data-toggle="dropdown" aria-expanded="false"> STB </a>
                            <div className="dropdown-menu navbar-dropdown" aria-labelledby="reportDropdown">
                               {allstb.map((stbs) =><><a className="dropdown-item" href="#" onClick={() => {setSTB(stbs)}}>
                                    <i className="mr-2"><FiHardDrive /></i>{stbs}</a>
                                <div className="dropdown-divider" /></>)}
                            </div>
                        </li>
                        <li className="nav-item  dropdown d-none d-md-block">
                            <a className="nav-link dropdown-toggle text-white" id="projectDropdown" href="#" data-toggle="dropdown" aria-expanded="false"> Accessories </a>
                            <div className="dropdown-menu navbar-dropdown" aria-labelledby="projectDropdown">
                               {allaccessories.map((accessory) => <> <a className="dropdown-item" href="#" onClick={() => {setAccessories(accessory)}}>
                                    {accessory === 'Remote' ? <i className="mr-2"><TbDeviceRemote/></i>:<i className="mr-2"><RiPlug2Line/></i>}{accessory}</a>
                                <div className="dropdown-divider" /></>)}
                            </div>
                        </li>
                        <li className="nav-item nav-language dropdown d-none d-md-block">
                            <a className="nav-link dropdown-toggle text-white" id="languageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">Vendor</a>
                            <div className="dropdown-menu navbar-dropdown" aria-labelledby="languageDropdown">
                                {allvendor.map((vendors) => <a className="dropdown-item" href="#" onClick={() => {setVendor(vendors)}}>
                                    <div className="nav-language-icon mr-2">
                                        <i><BsFillPersonFill /></i>
                                    </div>
                                    <div className="nav-language-text">
                                        <p className="mb-1 text-black" >{vendors}</p>
                                    </div>
                                </a>)}
                            </div>
                        </li>
                        <li className="nav-item  dropdown d-none d-md-block">
                            <input className='form-control' value={stb}></input>
                        </li>
                        <li className="nav-item  dropdown d-none d-md-block">
                            <input className='form-control' value={accessories}></input>
                        </li>
                        <li className="nav-item  dropdown d-none d-md-block">
                            <input className='form-control' value={vendor}></input>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* partial */}
            <div className="container-fluid page-body-wrapper">
                <div className="content-wrapper">
                    {/* <div className="d-xl-flex justify-content-between align-items-start">
                        <h2 className="text-dark font-weight-bold mb-2"> Duplicate Checker </h2>
                    </div> */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-sm-flex justify-content-center align-items-center transaparent-tab-border">
                                <ul className="nav nav-tabs tab-transparent" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="performance-tab" data-toggle="tab" onClick = {() => show(true,false,false)} role="tab" aria-selected="false">Data Check</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="conversion-tab" data-toggle="tab" onClick = {() => show(false,false,true)}  role="tab" aria-selected="false">Search Input Checker</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="conversion-tab" data-toggle="tab" onClick = {() => show(false,true,false)}  role="tab" aria-selected="false">Access all data</a>
                                    </li>
                                </ul>
                            </div>
                            {showExcelChecker && <Dashboard stb = {stb} accessories ={accessories} vendor ={vendor}></Dashboard>}
                            {showDB && <Dashboard2 ></Dashboard2>}
                            {showSearchInputChecker && <Dashboard3></Dashboard3>}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
