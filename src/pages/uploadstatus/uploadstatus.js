import {
    Col,
    Container, Row
} from "reactstrap";
import { useDispatch, useSelector } from 'react-redux'
import { getUploadData } from '../../store/Procurement/actions'

import React, { useRef,useEffect } from 'react';
import SimpleBar from "simplebar-react"

const UploadStatus = () => {
    const dispatch = useDispatch();
    const uploadStatus = useSelector((state) => state?.procurement?.uploadStatus);
    console.log(uploadStatus);
    const ref = useRef();
    useEffect(() => {
        dispatch(getUploadData());
    },[dispatch]);
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                <SimpleBar style={{ maxHeight: "400px", maxWidth: '100%' }} ref={ref}>
                                            <table style={{ minWidth: '800px' }}>
                                                <thead>
                                                    <tr>
                                                        {/* <th>Container Type</th> */}
                                                        <th>Id</th>
                                                        <th>status</th>
                                                        <th>description</th>
                                                        <th>createdDate</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                
                                                            {uploadStatus ? (
                                                  uploadStatus.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.id || '-'}</td>
                                                        <td>{item?.status}</td>
                                                        <td>{item?.description|| '-'}</td>
                                                        <td>{item?.createdDate|| '-'}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                            {uploadStatus ? (
                                                                <td colSpan={13} className="text-center">
                                                                    <div className='py-5'>
                                                                        <div className="spinner-border text-primary" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            ) : (
                                                                <td colSpan={13} className="text-center py-4"><b>No Record Found</b></td>
                                                            )}
                                                        </tr>
                                            )}

                                             
                                                 
                                                </tbody>
                                            </table>
                                        </SimpleBar>
                </Container>
            </div>
        </React.Fragment>
    );

}


export default UploadStatus;