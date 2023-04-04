import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import './Dashboard.css';
import { AiFillCaretRight,AiFillCaretLeft } from "react-icons/ai";
export default function Dashboard2(props) {

    const [data, setData] = useState([]);
    const [count, setCount] = useState();
    const [pages ,setPages] = useState(0);
    const [searchPage, setSearchPage] = useState(0)
    const [searchedDupes, setSearchedDupes] = useState([]);
    const [searchCount, setSearchCount] = useState()
    const [searches , setSearches] = useState({
        stb: '',
        accessories: '',
        vendor:''
    })
    let pageCount1 = Math.ceil(count / 30);
    let pageCount2 = Math.ceil(searchCount / 30);
    const startIndex = (pages) * 30;
    const startIndexforSearch = (searchPage) * 30;
    console.log(searchedDupes)
    let STB = ['GTPL', 'SCV', 'JIO'];
    let Accessories = ['Remote', 'Adapter'];
    let Vendor = ['LIT', 'LRIPL', 'TIANYIN', 'JULIO'];

    useEffect(()=>{
        axios.get(`http://172.16.0.100:3007/getsorted/${searches.stb}/${searches.accessories}/${searches.vendor}?page=${searchPage}`).then((res) => {setSearchedDupes(res.data.data);setSearchCount(res.data.count)})
    },[searchPage,searches])
    
    useEffect(() => {
        axios.get(`http://172.16.0.100:3007/getLimited?page=${pages}`).then((res) => {setData(res.data.data); setCount(res.data.count)})
    }, [pages])
    
    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setSearches(prevSearches => ({ ...prevSearches, [name]: value }));
      }
      
    const handlepageclick = (event) => {
        let newPageClick = (event.selected * 1) % pageCount1;
        setPages(newPageClick);
    }
    const handleselectpageclick = (event) => {
        let newPageClick = (event.selected * 1) % pageCount2;
        setSearchPage(newPageClick);
    }
    return (
        <div className="tab-content tab-transparent-content">
            <div className="tab-pane fade show active" id="business-1" role="tabpanel" aria-labelledby="business-tab">
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body" >
                                <div className='d-flex flex-row justify-content-between mb-3 '>
                                    <h4 className="card-title">Datas Maintained</h4>
                                    <div className="search-field d-none d-xl-block ">
                                        <form className="d-flex align-items-center h-75 b">
                                            <div className="input-group my-0" >
                                                {/* <div className="input-group-prepend bg-transparent">
                                                    <i className="input-group-text border-0 mdi mdi-magnify"></i>
                                                </div> */}
                                                <select name="stb" value={searches.stb} onChange={handleSelectChange} className="form-control border mr-2">
                                                    <option value="">STB search</option>
                                                    {STB.map((stbs) =>
                                                        <option key={stbs} value={stbs}>{stbs}</option>
                                                    )}
                                                </select>
                                                <select name="accessories" value={searches.accessories} onChange={handleSelectChange} className="form-control border mr-2">
                                                    <option value="">Accessories search</option>
                                                    {Accessories.map((accessory) =>
                                                        <option key={accessory} value={accessory}>{accessory}</option>
                                                    )}
                                                </select>
                                                <select name="vendor" value={searches.vendor} onChange={handleSelectChange} className="form-control border">
                                                    <option value="">Vendor Search</option>
                                                    {Vendor.map((vend) =>
                                                        <option key={vend} value={vend}>{vend}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    {searchedDupes[0] ?
                                    <ReactPaginate
                                        activeClassName={'item pageactive '}
                                        breakClassName={'item break-me '}
                                        breakLabel={'...'}
                                        containerClassName={'pagination'}
                                        disabledClassName={'disabled-page'}
                                        marginPagesDisplayed={2}
                                        nextClassName={"item next "}
                                        nextLabel={<AiFillCaretRight style={{ fontSize: 18, width: 20, color: '#858796' }}></AiFillCaretRight>}
                                        onPageChange={handleselectpageclick}
                                        pageCount={pageCount2}
                                        pageClassName={'item pagination-page '}
                                        // onPageActive = {newDamagedOffset}
                                        pageRangeDisplayed={2}
                                        previousClassName={"item previous"}
                                        previousLabel={<AiFillCaretLeft style={{ fontSize: 18, width: 20, color: '858796' }}></AiFillCaretLeft>}
                                    />:
                                    <ReactPaginate
                                    activeClassName={'item pageactive '}
                                    breakClassName={'item break-me '}
                                    breakLabel={'...'}
                                    containerClassName={'pagination'}
                                    disabledClassName={'disabled-page'}
                                    marginPagesDisplayed={2}
                                    nextClassName={"item next "}
                                    nextLabel={<AiFillCaretRight style={{ fontSize: 18, width: 20, color: '#858796' }}></AiFillCaretRight>}
                                    onPageChange={handlepageclick}
                                    pageCount={pageCount1}
                                    pageClassName={'item pagination-page '}
                                    // onPageActive = {newDamagedOffset}
                                    pageRangeDisplayed={2}
                                    previousClassName={"item previous"}
                                    previousLabel={<AiFillCaretLeft style={{ fontSize: 18, width: 20, color: '858796' }}></AiFillCaretLeft>}
                                />}
                                </div>
                                <div className='table-responsive' id='overflowtry'>
                                    <table className="table table-hover table-bordered">
                                        <thead className='sticky-top bg-white'>
                                            <tr className='text-cente'>
                                                <th>#</th>
                                                <th>STB</th>
                                                <th>Accessories</th>
                                                <th>Vendor</th>
                                                <th>Serial No</th>
                                                {/* <th>Replica</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {searchedDupes[0] ?
                                            searchedDupes.map((res,index) => 
                                            <tr className='text-center'>
                                                 <td>{startIndexforSearch + index + 1}</td>
                                                 <td>{res.stb}</td>
                                                 <td>{res.accessories}</td>
                                                 <td>{res.vendor}</td>
                                                 <td>{res.serialno}</td>
                                            {/* <td>{dupes.find((bing) => bing.serialno === res.serialno)? <label class="badge badge-danger">Duplicate</label>: <label class="badge badge-success">No Duplicate</label>}</td> */}
                                            </tr>
                                            )
                                           :
                                            data.map((res, index) =>
                                                <tr className='text-center'>
                                                    <td>{startIndex + index + 1}</td>
                                                    <td>{res.stb}</td>
                                                    <td>{res.accessories}</td>
                                                    <td>{res.vendor}</td>
                                                    <td>{res.serialno}</td>
                                                    {/* <td>{dupes.find((bing) => bing.serialno === res.serialno)? <label class="badge badge-danger">Duplicate</label>: <label class="badge badge-success">No Duplicate</label>}</td> */}
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
