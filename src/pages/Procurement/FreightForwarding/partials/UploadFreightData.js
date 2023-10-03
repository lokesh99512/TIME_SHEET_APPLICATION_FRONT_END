import classnames from 'classnames';
import React, { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Link, useNavigate } from 'react-router-dom';
import Select from "react-select";
import { Card, CardBody, Col, Container, Form, NavItem, NavLink, Progress, Row, TabContent, TabPane, UncontrolledTooltip } from 'reactstrap';
import fileData from '../../../../assets/extra/upload_Formats.xlsx';
import { delete_icon } from '../../../../assets/images';
import { optionCarrierName, optionMultiDestination, optionPaymentType, optionRateSource, optionRateType, optionSurchargesName, optionValidityApp, optionVendorName, optionVendorType } from '../../../../common/data/procurement';
import { formatBytes, isAnyValueEmpty, isExcelFile } from '../../../../components/Common/CommonLogic';

export default function UploadFreightData() {
    const [activeTabProgress, setActiveTabProgress] = useState(1);
    const [progressValue, setProgressValue] = useState(33);
    const [selectedFiles, setselectedFiles] = useState([]);
    const navigate = useNavigate();
    const [surcharges, setSurcharges] = useState([]);
    const [fileError, setfileError] = useState('');
    const [removeValue, setRemoveValue] = useState('');
    const [carrierDetails, setCarrierDetails] = useState(
        {
            rate_type: 'spot',
            rate_source: '',
            vendor_type: '',
            vendor_name: '',
            carrier_name: '',
            validity_application: '',
            validity_from: '',
            validity_to: ''
        }
    );

    const toggleTabProgress = (tab) => {
        if (activeTabProgress !== tab) {
            if (tab >= 1 && tab <= 3) {
                setActiveTabProgress(tab)

                if (tab === 1) { setProgressValue(33) }
                if (tab === 2) { setProgressValue(66) }
                if (tab === 3) { setProgressValue(100); }
            }
        }
        if (tab === 4) {
            console.log(carrierDetails, "carrierDetails step1");
            console.log(selectedFiles, "selectedFiles step2");
            console.log(surcharges, "surcharges step3");
        }
    }

    function handleAcceptedFiles(files) {
        if (files && files.length) {
            var file = files[0];
            var fileName = file.name;
            if (isExcelFile(fileName)) {
                setfileError("");
                files.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        formattedSize: formatBytes(file.size),
                    })
                );
                setselectedFiles(files);
            } else {
                setfileError("The file type is not supported. Upload an Excel file.");
                setselectedFiles();
            }
        } else {
            setfileError("File is required");
        }
    }
    // ------------- dynamic field ------------------------
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

    const removeInputFields = (index) => {
        const rows = [...surcharges];
        rows.splice(index, 1);
        setSurcharges(rows);
    }

    const handleChange = (e, name, index) => {
        const list = [...surcharges];
        list[index][name] = e.target.value;
        setSurcharges(list);
    }

    const handleSelectGroup = useCallback((name, opt) => {
        let newObj = {
            ...carrierDetails,
            [name]: opt
        }
        setCarrierDetails(newObj);
        console.log(carrierDetails?.vendor_type?.value,"vaue--------------");
        console.log(opt,"opt----------------")
        if(carrierDetails?.vendor_type?.value === 'agent'){
            setRemoveValue('carrier_name');
        } else {
           setRemoveValue('vendor_name');
        }
    }, [carrierDetails]);

    const handleSelectGroup2 = useCallback((opt, name, index) => {
        const list = [...surcharges];
        list[index][name] = opt;
        setSurcharges(list);
    }, [surcharges]);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        <button type="button" className='btn border mb-3' onClick={() => { navigate(-1) }}>Back</button>
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
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
                                                    </div>
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Rate Type</label>
                                                                    <Select
                                                                        value={carrierDetails.rate_type}
                                                                        name='rate_type'
                                                                        onChange={(opt) => {
                                                                            handleSelectGroup('rate_type', opt);
                                                                        }}
                                                                        options={optionRateType}
                                                                        classNamePrefix="select2-selection form-select"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Rate Source</label>
                                                                    <Select
                                                                        value={carrierDetails.rate_source}
                                                                        name='rate_source'
                                                                        onChange={(opt) => {
                                                                            handleSelectGroup('rate_source', opt)
                                                                        }}
                                                                        options={optionRateSource}
                                                                        classNamePrefix="select2-selection form-select"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Vendor Type</label>
                                                                    <Select
                                                                        value={carrierDetails.vendor_type}
                                                                        name='vendor_type'
                                                                        onChange={(opt) => {
                                                                            handleSelectGroup('vendor_type', opt)
                                                                        }}
                                                                        options={optionVendorType}
                                                                        classNamePrefix="select2-selection form-select"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Vendor Name</label>
                                                                    <Select
                                                                        value={carrierDetails.vendor_name}
                                                                        name='vendor_name'
                                                                        onChange={(opt) => {
                                                                            handleSelectGroup('vendor_name', opt)
                                                                        }}
                                                                        options={optionVendorName}
                                                                        classNamePrefix="select2-selection form-select"
                                                                        // isDisabled={carrierDetails?.vendor_type?.value === 'carrier'}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Carrier Name</label>
                                                                    <Select
                                                                        value={carrierDetails.carrier_name}
                                                                        name='carrier_name'
                                                                        onChange={(opt) => {
                                                                            handleSelectGroup('carrier_name', opt)
                                                                        }}
                                                                        options={optionCarrierName}
                                                                        // isDisabled={carrierDetails?.vendor_type?.value === 'agent'}
                                                                        classNamePrefix="select2-selection form-select"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Validity Application</label>
                                                                    <Select
                                                                        value={carrierDetails.validity_application}
                                                                        name='validity_application'
                                                                        onChange={(opt) => {
                                                                            handleSelectGroup('validity_application', opt)
                                                                        }}
                                                                        options={optionValidityApp}
                                                                        classNamePrefix="select2-selection form-select"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label htmlFor='validity_from' className="form-label">Validity From</label>
                                                                    <input type="date" name="validity_from" id="validity_from" className='form-control' value={carrierDetails.validity_from} onChange={(e) => handleSelectGroup('validity_from', e.target.value)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label htmlFor='validity_to' className="form-label">Validity To</label>
                                                                    <input type="date" name="validity_to" id="validity_to" className='form-control' value={carrierDetails.validity_to} onChange={(e) => handleSelectGroup('validity_to', e.target.value)} />
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
                                                            <a href={fileData} className="download_formate btn btn-primary" download>Download Format</a>
                                                        </div>
                                                        <Form>
                                                            <Dropzone
                                                                onDrop={(acceptedFiles) => {
                                                                    handleAcceptedFiles(acceptedFiles);
                                                                }}
                                                            >
                                                                {({ getRootProps, getInputProps }) => (
                                                                    <div className="dropzone">
                                                                        <div
                                                                            className="dz-message needsclick mt-2"
                                                                            {...getRootProps()}
                                                                        >
                                                                            <input {...getInputProps()} />
                                                                            <div className="mb-3">
                                                                                <i className="display-4 text-muted bx bx-cloud-upload" />
                                                                            </div>
                                                                            <h4>Upload <b>Freight</b> file by dragging or selecting a file from browser.</h4>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Dropzone>
                                                            <p className='text-danger mt-2'>{fileError}</p>
                                                            <div className="dropzone-previews mt-3" id="file-previews">
                                                                {selectedFiles?.map((f, i) => {
                                                                    return (
                                                                        <Card
                                                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                                            key={i + "-file"}
                                                                        >
                                                                            <div className="p-2">
                                                                                <Row className="align-items-center">
                                                                                    <Col className="col-auto">
                                                                                        <i className='mdi mdi-file-document-outline'></i>
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
                                                            </div>
                                                        </Form>
                                                    </div>
                                                </TabPane>
                                                <TabPane tabId={3}>
                                                    <div>
                                                        <div className="text-center mb-4">
                                                            <h5>Surcharges</h5>
                                                        </div>
                                                        <form>
                                                            {surcharges?.map((item, index) => (
                                                                <div key={index} className='upload_surcharges_row'>
                                                                    <div className="row">
                                                                        <div className="col-lg-4">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="surcharges_name" className="form-label">Select Surcharge Name</label>
                                                                                {/* <select id='surcharges_name' className="form-select" value={item?.surcharges_name} onChange={(e) => { handleChange(e, 'surcharges_name', index) }}>
                                                                                    <option defaultValue="obs">OBS</option>
                                                                                    <option value="obs2">OBS2</option>
                                                                                    <option value="obs3">OBS3</option>
                                                                                    <option value="obs4">OBS4</option>
                                                                                </select> */}
                                                                                <Select
                                                                                    value={carrierDetails.surcharges_name}
                                                                                    name='surcharges_name'
                                                                                    onChange={(opt) => {
                                                                                        handleSelectGroup2(opt, 'surcharges_name', index);
                                                                                    }}
                                                                                    options={optionSurchargesName}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <div className="mb-3">
                                                                                <label htmlFor='destination' className="form-label">Surcharge Applicable on destination</label>
                                                                                {/* <select id='destination' className="form-select" value={item?.destination} onChange={(e) => { handleChange(e, 'destination', index) }}>
                                                                                    <option defaultValue="all">All Destination</option>
                                                                                </select> */}
                                                                                <Select
                                                                                    // value={carrierDetails.destination}
                                                                                    isMulti
                                                                                    options={optionMultiDestination}
                                                                                    className="basic-multi-select"
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <div className="mb-3">
                                                                                <label htmlFor='payment_type' className="form-label">Select Payment Type For the surcharge</label>
                                                                                {/* <select id='payment_type' className="form-select" onChange={(e) => { handleChange(e, 'payment_type', index) }}>
                                                                                    <option defaultValue="prepaid">Prepaid</option>
                                                                                    <option value="postpaid">Postpaid</option>
                                                                                </select> */}
                                                                                <Select
                                                                                    value={carrierDetails.payment_type}
                                                                                    name='payment_type'
                                                                                    onChange={(opt) => {
                                                                                        handleSelectGroup2(opt, 'payment_type', index);
                                                                                    }}
                                                                                    options={optionPaymentType}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="gp1" className="form-label">20 GP</label>
                                                                                <input type="number" className="form-control" id="gp1" placeholder="Enter value" onChange={(e) => { handleChange(e, 'gp1', index) }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="gp2" className="form-label">40 GP</label>
                                                                                <input type="number" className="form-control" id="gp2" placeholder="Enter value" onChange={(e) => { handleChange(e, 'gp2', index) }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="hq1" className="form-label">40 HQ</label>
                                                                                <input type="number" className="form-control" id="hq1" placeholder="Enter value" onChange={(e) => { handleChange(e, 'hq1', index) }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="hq2" className="form-label">45 HQ</label>
                                                                                <input type="number" className="form-control" id="hq2" placeholder="Enter value" onChange={(e) => { handleChange(e, 'hq2', index) }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="rf1" className="form-label">20 RF</label>
                                                                                <input type="number" className="form-control" id="rf1" placeholder="Enter value" onChange={(e) => { handleChange(e, 'rf1', index) }} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="rf2" className="form-label">40 RF</label>
                                                                                <input type="number" className="form-control" id="rf2" placeholder="Enter value" onChange={(e) => { handleChange(e, 'rf2', index) }} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="btn_wrap">
                                                                        {(surcharges.length !== 0) ? <button type='button' onClick={() => { removeInputFields(index) }} className="btn border p-0"><img src={delete_icon} alt="Delete" /></button> : null}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="add_btn_box d-flex align-items-center justify-content-center">
                                                                <div className="add_btn_wrap">
                                                                    <button type='button' className="btn btn-primary add_btn d-flex align-items-center" onClick={() => { addHandler(); }}> <i className='bx bx-plus me-2'></i> Add Charges</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </TabPane>
                                            </TabContent>
                                            {console.log(removeValue,"removeValue----------------")}
                                            <ul className="pager wizard twitter-bs-wizard-pager-link d-flex align-items-center justify-content-between">
                                                <li className={`previous ${activeTabProgress === 1 ? "disabled" : ""}`}>
                                                    <Link
                                                        to="#"
                                                        className={`d-flex align-items-center ${activeTabProgress === 1 ? "btn btn-primary disabled" : "btn btn-primary"}`}
                                                        onClick={() => {
                                                            toggleTabProgress(activeTabProgress - 1);
                                                        }}
                                                    >
                                                        <i className="bx bx-chevron-left me-1"></i> Previous
                                                    </Link>
                                                </li>

                                                <li className={`${activeTabProgress === 1 ? isAnyValueEmpty(carrierDetails,removeValue) ? "disabled" : "" : activeTabProgress === 2 ? selectedFiles?.length === 0 ? "disabled" : "" : ""}`}>
                                                    <Link
                                                        to="#"
                                                        className={`btn btn-primary d-flex align-items-center ${activeTabProgress === 1 ? isAnyValueEmpty(carrierDetails) ? "disabled" : "" : activeTabProgress === 2 ? selectedFiles?.length === 0 ? "disabled" : "" : ""}`}
                                                        onClick={() => {
                                                            toggleTabProgress(activeTabProgress + 1);
                                                        }}
                                                    >
                                                        {activeTabProgress === 3 ? 'Save' : (
                                                            <>
                                                                Next
                                                                <i className="bx bx-chevron-right ms-1"></i>
                                                            </>
                                                        )}
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