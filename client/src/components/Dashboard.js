import React, { useRef, useState } from 'react';
import Lottie from "lottie-react";
import searchingAnimation1 from "./lottie/95621-verification-status1.json";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import axios from 'axios';
import './Dashboard.css';


export default function Dashboard(props) {

    const [file, setFile] = useState({ name: 'No File Chosen' });
    const [noDupes, setNoDupes] = useState([]);
    const [unrealSerial, setUnrealSerial] = useState([]);
    const [duplicates, setDuplicates] = useState([]);
    const [dupeFromDB, setDupesFromDB] = useState([]);
    const tableRefDatabase = useRef(null);
    const tableRefSheets = useRef(null);

    const style = {
        height: 220,
        width: 400,
    };

    const hiddenFileInput = useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    function uploadfile(e) {
        // let temp = Array.prototype.slice.call()
        setFile(e.target.files[0])
    };

    function checkForDupes(getdata) {
        let tempget = [];
        getdata.map((res) => { return res.map((ares) => { return tempget.push(ares) }) });
        console.log(tempget)
        setDuplicates(tempget.filter((res, index) => tempget.indexOf(res) !== index))
    };

    function otherThanDupes(getdata) {
        let tempget = [];
        getdata.map((res) => { return res.map((ares) => { return tempget.push(ares) }) });
        setUnrealSerial(tempget.slice(1).filter((res, index) => res.length !== 15)) 
        setNoDupes(tempget.filter((res, index) => tempget.indexOf(res) === index &&  res.length === 15))
    }

    function submitFile(e) {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('file', file);
        axios.post('http://172.16.0.100:3007/', formdata).then((res) => { otherThanDupes(res.data); checkForDupes(res.data); })
    }

    function saveWithoutDuplicates() {
        const serialnos = noDupes;
        console.log(serialnos)
        axios.post('http://172.16.0.100:3007/savewithoutduplicates', { stb: props.stb, accessories: props.accessories, vendor: props.vendor, serialnos }).then((res) => setDupesFromDB(res.data.data));
        alert('Datas are saved');
    }
    console.log(dupeFromDB)

    return (
        <div className="tab-content tab-transparent-content">
            <div className="tab-pane fade show active" id="business-1" role="tabpanel" aria-labelledby="business-tab">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-sm-6 grid-margin stretch-card" >
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Excel File Upload</h4>
                                {/* <p className="card-description"> Basic form layout </p> */}
                                <form className="forms-sample" id='Fileupload'>
                                    <div class="form-group">
                                        <label className='text-secondary'>File upload</label>
                                        <input type="file" name="img[]" ref={hiddenFileInput} onChange={(e) => uploadfile(e)} class="file-upload-default" />
                                        <div className="input-group col-xs-12">
                                            <input type="text" className="form-control file-upload-info" disabled placeholder={file.name} />
                                            <span className="input-group-append">
                                                <button className="file-upload-browse btn btn-primary" onClick={handleClick} type="button">Upload</button>
                                            </span>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-primary mr-2" onClick={(e) => submitFile(e)} >Check for duplicates in this file</button>
                                    <button type="button" className="btn btn-light text-white" onClick={() => setFile({ name: 'No File Chosen' })}>Cancel</button>
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <div className="d-flex flex-row justify-content-center align-items-center">
                                            <Lottie animationData={searchingAnimation1} loop={true} style={style} />
                                            {/* <Lottie animationData={searchingAnimation2} loop={true} style={style} /> */}
                                        </div>
                                        <div className="d-flex flex-row">
                                            <button type="button" className="btn btn-primary mr-2 mb-1" onClick={saveWithoutDuplicates} >Save Removed Duplicates</button>
                                            <DownloadTableExcel filename={file.name} sheet="Sheet Dupes" currentTableRef={tableRefSheets.current}>
                                                <button type="button" className="btn btn-success mr-2 mb-1" >Dowload Duplicates Found in Sheets</button>
                                            </DownloadTableExcel>
                                            <DownloadTableExcel filename='Database Dupes' sheet="Database Dupes" currentTableRef={tableRefDatabase.current}>
                                                <button type="button" className="btn btn-success mr-2 mb-1" >Dowload Duplicates Found in Database</button>
                                            </DownloadTableExcel>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* <div className="col-xl-6 col-lg-6 col-sm-6 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body d-flex justify-content-center align-items-center">
                        <div>
                            <Lottie animationData={groovyWalkAnimation} loop={true} style={style} />
                            <button type="submit" className="btn btn-primary mr-2" >Dowload Duplicates</button>
                            <button className="btn btn-danger" onClick={saveWithoutDuplicates} >Remove Duplicates And Save</button>
                        </div>
                    </div>
                </div>
            </div> */}
                    <div className="col-xl-6 col-lg-6 col-sm-6 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Unreal Serial Numbers</h4>
                                {/* <p class="card-description"> Add class <code>table-hover</code> */}
                                {/* </p> */}
                                <div className='table-responsive' id='overflowtry'>
                                    <table className="table table-hover">
                                        <thead className='sticky-top bg-white'>
                                            <tr className='text-center'>
                                                <th>#</th>
                                                <th>STB</th>
                                                <th>Accessories</th>
                                                <th>Vendor</th>
                                                <th>Serial No</th>
                                                <th>Length</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                       {unrealSerial.map((res,index) => 
                                            <tr className='text-center'>
                                               <td>{index + 1}</td>
                                               <td>{props.stb}</td>
                                               <td>{props.accessories}</td>
                                               <td>{props.vendor}</td>
                                               <td>{res}</td>
                                               <td><label className='badge badge-warning text-dark font-weight-bold'>{res.length}</label></td>
                                            </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-sm-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body" >
                                <h4 className="card-title">Removed Duplicates & Unreal S.No Length</h4>
                                {/* <p class="card-description"> Add class <code>table-hover</code> */}
                                {/* </p> */}
                                <div className='table-responsive' id='overflowtry'>
                                    <table className="table table-hover">
                                        <thead className='sticky-top bg-white'>
                                            <tr className='text-center'>
                                                <th>#</th>
                                                <th>STB</th>
                                                <th>Accessories</th>
                                                <th>Vendor</th>
                                                <th>Serial No</th>
                                                <th>Replica</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {noDupes.map((res, index) =>
                                                <tr className='text-center'>
                                                    <td>{index + 1}</td>
                                                    <td>{props.stb}</td>
                                                    <td>{props.accessories}</td>
                                                    <td>{props.vendor}</td>
                                                    <td>{res}</td>
                                                    <td>{duplicates.find((bing) => bing === res) ? <label class="badge badge-danger">Duplicate</label> : <label class="badge badge-success">No Duplicate</label>}</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-sm-6 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Duplicates Found in Sheets</h4>
                                {/* <p class="card-description"> Add class <code>table-hover</code> */}
                                {/* </p> */}
                                <div className='table-responsive' id='overflowtry'>
                                    <table ref={tableRefSheets} className="table table-hover">
                                        <thead className='sticky-top bg-white'>
                                            <tr className='text-center'>
                                                <th>#</th>
                                                <th>STB</th>
                                                <th>Accessories</th>
                                                <th>Vendor</th>
                                                <th>Serial No</th>
                                                <th>Replica</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {duplicates.map((res, index) =>
                                                <tr className='text-center'>
                                                    <td>{index + 1}</td>
                                                    <td>{props.stb}</td>
                                                    <td>{props.accessories}</td>
                                                    <td>{props.vendor}</td>
                                                    <td>{res}</td>
                                                    <td><label class="badge badge-danger">Duplicate</label></td></tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-sm-6 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Duplicates Found in Database</h4>
                                {/* <p class="card-description"> Add class <code>table-hover</code>
                        </p> */}
                                <div className='table-responsive' id='overflowtry'>
                                    <table ref={tableRefDatabase} className="table table-hover">
                                        <thead className='sticky-top bg-white'>
                                            <tr className='text-center'>
                                                <th>#</th>
                                                <th>STB</th>
                                                <th>Accessories</th>
                                                <th>Vendor</th>
                                                <th>Serial No</th>
                                                <th>Replica</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {dupeFromDB.map((res, index) =>
                                                <tr className='text-center'>
                                                    <td>{index + 1}</td>
                                                    <td>{res.stb}</td>
                                                    <td>{res.accessories}</td>
                                                    <td>{res.vendor}</td>
                                                    <td>{res.serialno}</td>
                                                    <td><label class="badge badge-danger">Duplicate</label></td></tr>)
                                                    }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
