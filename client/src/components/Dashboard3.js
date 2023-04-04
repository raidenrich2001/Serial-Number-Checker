import axios from 'axios';
import React, { useEffect, useState } from 'react';
import searchimg from './img/undraw_file_searching_re_3evy.svg';

export default function Dashboard3() {

  const [serialNo, setSerialNo] = useState('');
  const [text,setText] = useState('');
  const [data, setData] = useState([]);
  const [prevSerialno, setPrevSerialno] = useState('')
  const [serialLength, setSerialLength] = useState(0)

  const handleClearInput = () => {
    setText('');
  };

  const handleSerialLength = (e) => {
    if (e.target.value.length === 15) {
      setSerialLength(e.target.value.length);
      setSerialNo(e.target.value);
    }
    else {
      setSerialLength(e.target.value.length)
    }
  };

  useEffect(() => { axios.get(`http://172.16.0.100:3007/findserialno/${serialNo}`).then((res) => { setData(prevData => [...prevData, res.data.data]); setPrevSerialno(prevData => [...prevData, serialNo]) }) }, [serialNo])
  console.log(data)
  return (
    <div className="tab-content tab-transparent-content">
      <div className="tab-pane fade show active" id="business-1" role="tabpanel" aria-labelledby="business-tab">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body" >
                <h4 className="card-title">Serial Number Checker</h4>
                {/* <p className="card-description"> Basic form layout </p> */}
                <form className="forms-sample" id='Fileupload'>
                  <div class="form-group">
                    <label className='text-dark'>Serial No</label>
                    <div className="input-group col-xs-12">
                      <input type="text" className="form-control file-upload-info mr-2"
                        name='serialno' onChange={(e) => {handleSerialLength(e);setText(e.target.value)}}
                        value={text}/>
                    </div>
                  </div>
                      <button type="button" className={serialLength !== 15 ? "btn btn-danger mr-2" : "btn btn-success mr-2"}>Length of the Serial Number = {serialLength}</button>
                      <button type="button" className="btn btn-primary mr-2 text-white" onClick={handleClearInput}>Clear Input</button>
                      <button type="button" className="btn btn-warning mr-2 text-white" onClick={(e) => window.location.reload(false)}>Reload Page</button>
                  <div className="d-flex flex-row justify-content-center align-items-center img-fluid mt-3">
                    <img src={searchimg} className='img-fluid'></img>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body" >
                <h4 className="card-title">Serial No in Database</h4>
                <div className='table-responsive' id='overflowtry'>
                  <table className="table table-hover">
                    <thead className='sticky-top bg-white'>
                      <tr className='text-center'>
                        <th>#</th>
                        <th>STB</th>
                        <th>Accessories</th>
                        <th>Vendor</th>
                        <th>Serial No</th>
                        <th>P / A</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((res, index) =>

                        <tr className='text-center'>
                          {res !== null ?
                            <><td>{index + 1}</td>
                              <td>{res.stb}</td>
                              <td>{res.accessories}</td>
                              <td>{res.vendor}</td>
                              <td>{res.serialno}</td>
                              <td><label class="badge badge-success">Present</label></td>
                            </>
                            :
                            <>
                              <td>{index + 1}</td>
                              <td>No Data</td>
                              <td>No Data</td>
                              <td>No Data</td>
                              <td>{prevSerialno[index]}</td>
                              <td><label class="badge badge-danger">Absent</label></td>
                            </>
                          }
                        </tr>
                      )}
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
