import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Container, Form, NavItem, NavLink, Progress, Row, TabContent, TabPane, UncontrolledTooltip } from 'reactstrap';
import classnames from 'classnames';
import Dropzone, { useDropzone } from 'react-dropzone';
import { formatBytes } from '../../../../components/Common/CommonLogic';
import { Figma } from 'feather-icons-react/build/IconComponents';

export default function UploadFreightData() {
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'text/html': ['.html', '.htm'],
        }
    });
    const [activeTabProgress, setActiveTabProgress] = useState(1);
    const [progressValue, setProgressValue] = useState(33);
    // const [selectedFiles, setselectedFiles] = useState([]);
    const navigate = useNavigate();    
    const inputArr = [
        {
            id: 1,
            surcharges_name: 'OBS',
            destination: 'All Destination',
            payment_type: 'Prepaid',
            gp1: '',
            gp2: '',
            hq1: '',
            hq2: '',
            rf1: '',
            rf2: ''
        }
    ]
    const [surcharges, setSurcharges] = useState(inputArr);

    const toggleTabProgress = (tab) => {
        if (activeTabProgress !== tab) {
            if (tab >= 1 && tab <= 3) {
                setActiveTabProgress(tab)

                if (tab === 1) { setProgressValue(33) }
                if (tab === 2) { setProgressValue(66) }
                if (tab === 3) { setProgressValue(100) }
            }
        }
    }

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));
    
      const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map(e => (
              <li key={e.code}>{e.message}</li>
            ))}
          </ul>
        </li>
    ));

    // function handleAcceptedFiles(files) {
    //     files.map((file) =>
    //         Object.assign(file, {
    //             preview: URL.createObjectURL(file),
    //             formattedSize: formatBytes(file.size),
    //         })
    //     );
    //     setselectedFiles(files);
    //     console.log(selectedFiles,"selectedFiles===")
    // }

    const downloadFormateHandler = () => {
        console.log("download");
        const texts = ["line 1", "line 2", "line 3"];
        const file = new Blob(texts, {type: 'text/plain'});
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "freight-" + Date.now() + ".txt";
        document.body.appendChild(element);
        element.click();
    }

    // ------------- dynamic field ------------------------
    let count = 1;
    const addHandler = () => {
        setSurcharges(s => {
            return [
                ...s,
                {
                    surcharges_name: 'obs',
                    destination: 'all',
                    payment_type: 'prepaid',
                    gp1: '',
                    gp2: '',
                    hq1: '',
                    hq2: '',
                    rf1: '',
                    rf2: ''
                }
            ]
        })
    }

    const removeInputFields = (index)=>{
        console.log(index,"index")
        const rows = [...surcharges];
        rows.splice(index, 1);
        setSurcharges(rows);
    }

    const handleChange = (e, name,index) => {
        const list = [...surcharges];
        list[index][name] = e.target.value;
        setSurcharges(list);
    }

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        <button type="button" className='btn border mb-3' onClick={() => {navigate(-1)}}>Back</button>
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        {/* <h4 className="card-title mb-4">Wizard with progressbar</h4> */}

                                        <div id="progrss-wizard" className="twitter-bs-wizard upload_freight_wrap">
                                            <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 1 })} onClick={() => { toggleTabProgress(1); }} >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="SellerDetails">
                                                            <i className="bx bx-list-ul"></i>
                                                            <UncontrolledTooltip placement="top" target="SellerDetails">
                                                                Carrier Details
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 2 })} onClick={() => { toggleTabProgress(2); }} >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="CompanyDocument">
                                                            <i className="bx bx-book-bookmark"></i>
                                                            <UncontrolledTooltip placement="top" target="CompanyDocument">
                                                                Freight Upload
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink className={classnames({ active: activeTabProgress === 3 })} onClick={() => { toggleTabProgress(3); }} >
                                                        <div className="step-icon" data-bs-toggle="tooltip" id="BankDetails">
                                                            <i className="bx bxs-bank"></i>
                                                            <UncontrolledTooltip placement="top" target="BankDetails">
                                                                Surcharges
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </NavLink>
                                                </NavItem>
                                            </ul>

                                            <div id="bar" className="mt-4">
                                                <Progress color="primary" striped animated value={progressValue} />
                                            </div>
                                            <TabContent activeTab={activeTabProgress} className="twitter-bs-wizard-tab-content">
                                                <TabPane tabId={1}>
                                                    <div className="text-center mb-4">
                                                        <h5>Carrier Details</h5>
                                                        {/* <p className="card-title-desc">Fill all information below</p> */}
                                                    </div>
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Rate Type</label>
                                                                    <select className="form-select">
                                                                        <option defaultValue="spot">Spot</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Rate Source</label>
                                                                    <select className="form-select">
                                                                        <option defaultValue="carrier">Carrier Website</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Vendor Type</label>
                                                                    <select className="form-select">
                                                                        <option>Select vendor type </option>
                                                                        <option defaultValue="vendor">Vendor</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Vendor Name</label>
                                                                    <select className="form-select">
                                                                        <option>Select vendor name </option>
                                                                        <option defaultValue="vendor">Vendor</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Carrier Name</label>
                                                                    <select className="form-select">
                                                                        <option>Select carrier name </option>
                                                                        <option defaultValue="vendor">Vendor</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Validity Application</label>
                                                                    <select className="form-select">
                                                                        <option>Select validity application </option>
                                                                        <option defaultValue="vendor">Vendor</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Validity From</label>
                                                                    <select className="form-select">
                                                                        <option>Select validity </option>
                                                                        <option defaultValue="vendor">Vendor</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Validity To</label>
                                                                    <select className="form-select">
                                                                        <option>Select validity </option>
                                                                        <option defaultValue="vendor">Vendor</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </TabPane>
                                                <TabPane tabId={2}>
                                                    <div>
                                                        <div className="text-center mb-4">
                                                            <h5>Freight Upload</h5>
                                                        </div>
                                                        <div className='mb-3 d-flex justify-content-end'>
                                                            <button className="download_formate btn btn-primary" onClick={downloadFormateHandler} type='button'>Download Format</button>
                                                        </div>
                                                        <Form>
                                                            {/* <Dropzone
                                                                onDrop={(acceptedFiles) => {
                                                                    handleAcceptedFiles(acceptedFiles);
                                                                }}
                                                            >
                                                                {({ getRootProps, getInputProps }) => ( */}
                                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                                        <div
                                                                            className="dz-message needsclick mt-2"
                                                                        >
                                                                            <input {...getInputProps()} />
                                                                            <div className="mb-3">
                                                                                <i className="display-4 text-muted bx bx-cloud-upload" />
                                                                            </div>
                                                                            <h4>Upload <b>Freight</b> file by dragging or selecting a file from browser.</h4>
                                                                        </div>
                                                                    </div>
                                                                    <aside>
                                                                        <h4 className='my-2'>Accepted files</h4>
                                                                        <ul>{acceptedFileItems}</ul>
                                                                        {/* <h4>Rejected files</h4>
                                                                        <ul>{fileRejectionItems}</ul> */}
                                                                    </aside>
                                                                {/* )}
                                                            </Dropzone> */}
                                                            {/* <div className="dropzone-previews mt-3" id="file-previews">
                                                                {selectedFiles.map((f, i) => {
                                                                    return (
                                                                        <Card
                                                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                                            key={i + "-file"}
                                                                        >
                                                                            <div className="p-2">
                                                                                <Row className="align-items-center">
                                                                                    <Col className="col-auto">
                                                                                        <img
                                                                                            data-dz-thumbnail=""
                                                                                            height="80"
                                                                                            className="avatar-sm rounded bg-light"
                                                                                            alt={f.name}
                                                                                            src={f.preview}
                                                                                        />
                                                                                    </Col>
                                                                                    <Col>
                                                                                        <Link
                                                                                            to="#"
                                                                                            className="text-muted font-weight-bold"
                                                                                        >
                                                                                            {f.name}
                                                                                        </Link>
                                                                                        <p className="mb-0">
                                                                                            <strong>{f.formattedSize}</strong>
                                                                                        </p>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                        </Card>
                                                                    );
                                                                })}
                                                            </div> */}
                                                        </Form>
                                                    </div>
                                                </TabPane>
                                                <TabPane tabId={3}>
                                                    <div>
                                                        <div className="text-center mb-4">
                                                            <h5>Surcharges</h5>
                                                            {/* <p className="card-title-desc">Fill all information below</p> */}
                                                        </div>
                                                        {console.log(surcharges,"surcharges")}
                                                        <form>
                                                            {surcharges?.map((item,index) => (
                                                                <div key={item?.id} className='upload_surcharges_row'>
                                                                    <div className="row">
                                                                        <div className="col-lg-4">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="surcharges_name" className="form-label">Select Surcharge Name</label>
                                                                                <select id='surcharges_name' className="form-select" value={item?.surcharges_name} onChange={(e) => {handleChange(e,'surcharges_name',index)}}>
                                                                                    <option defaultValue="obs">OBS</option>
                                                                                    <option value="obs2">OBS2</option>
                                                                                    <option value="obs3">OBS3</option>
                                                                                    <option value="obs4">OBS4</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <div className="mb-3">
                                                                                <label htmlFor='destination' className="form-label">Surcharge Applicable on destination</label>
                                                                                <select id='destination' className="form-select" value={item?.destination} onChange={(e) => {handleChange(e,'destination',index)}}>
                                                                                    <option defaultValue="all">All Destination</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <div className="mb-3">
                                                                                <label htmlFor='payment_type' className="form-label">Select Payment Type For the surcharge</label>
                                                                                <select id='payment_type' className="form-select" onChange={(e) => {handleChange(e,'payment_type',index)}}>
                                                                                    <option defaultValue="prepaid">Prepaid</option>
                                                                                    <option value="postpaid">Postpaid</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="gp1" className="form-label">20 GP</label>
                                                                                <input type="number" className="form-control" id="gp1" placeholder="Enter value" onChange={(e) => {handleChange(e,'gp1',index)}} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="gp2" className="form-label">40 GP</label>
                                                                                <input type="number" className="form-control" id="gp2" placeholder="Enter value" onChange={(e) => {handleChange(e,'gp2',index)}} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="hq1" className="form-label">40 HQ</label>
                                                                                <input type="number" className="form-control" id="hq1" placeholder="Enter value" onChange={(e) => {handleChange(e,'hq1',index)}} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="hq2" className="form-label">45 HQ</label>
                                                                                <input type="number" className="form-control" id="hq2" placeholder="Enter value" onChange={(e) => {handleChange(e,'hq2',index)}} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="rf1" className="form-label">20 RF</label>
                                                                                <input type="number" className="form-control" id="rf1" placeholder="Enter value" onChange={(e) => {handleChange(e,'rf1',index)}} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="rf2" className="form-label">40 RF</label>
                                                                                <input type="number" className="form-control" id="rf2" placeholder="Enter value" onChange={(e) => {handleChange(e,'rf2',index)}} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="btn_wrap">
                                                                        {(surcharges.length!==1) ? <button type='button' onClick={() => {removeInputFields(index)}} className="btn border border-2 border-danger text-danger p-0"><i className='bx bx-minus'></i></button> : null}                                                                        
                                                                    </div>
                                                                </div>
                                                            ))}  
                                                            <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => {addHandler();}}> <i className='bx bx-plus'></i> Add Charges</button>                                                          
                                                        </form>
                                                    </div>
                                                </TabPane>
                                            </TabContent>
                                            <ul className="pager wizard twitter-bs-wizard-pager-link">
                                                <li className={activeTabProgress === 1 ? "previous disabled" : "previous"}>
                                                    <Link
                                                        to="#"
                                                        className={activeTabProgress === 1 ? "btn btn-primary disabled" : "btn btn-primary"}
                                                        onClick={() => {
                                                            toggleTabProgress(activeTabProgress - 1);
                                                        }}
                                                    >
                                                        <i className="bx bx-chevron-left me-1"></i> Previous
                                                    </Link>
                                                </li>

                                                <li className={activeTabProgress === 3 ? "next disabled" : "next"}>
                                                    <Link
                                                        to="#"
                                                        className="btn btn-primary"
                                                        onClick={() => {
                                                            toggleTabProgress(activeTabProgress + 1);
                                                        }}
                                                    >
                                                        Next <i className="bx bx-chevron-right ms-1"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    )
}