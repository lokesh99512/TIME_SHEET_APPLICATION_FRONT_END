import React, { useCallback, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";
import { Card, Col, Container, Form, Modal, Row } from 'reactstrap';
import fileData from '../../../../assets/extra/FclUplaodFormat.xlsx';
import inlandfileData from '../../../../assets/extra/Inlandcharge_Upload.xlsx';
import { optionRateType, optionVendorType } from '../../../../common/data/procurement';
import { formatBytes, isExcelFile } from '../../../../components/Common/CommonLogic';
import { addAirConsoleData, postconsoleCarrierDetails } from '../../../../store/Procurement/actions';
import { BLANK_CARRIER_DATA } from '../../../../store/Procurement/actiontype';

export default function UploadAirConsoleData() {
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [selectedFiles, setselectedFiles] = useState([]);
    const navigate = useNavigate();
    const [fileError, setfileError] = useState('');
    const addAirConsole = useSelector((state) => state?.procurement?.addAirConsole);
    const dispatch = useDispatch();
    const navigateState = useLocation();
    const [AllVendors, setAllVendors] = useState([]);
    const [filteredVendors, setFilteredValue] = useState([]);
    const {
        vendor_data
    } = useSelector((state) => state?.globalReducer);

    useEffect(() => {
        const vendorMap = new Map();
        if (vendor_data?.content) {
            vendor_data.content.forEach((item) => {
                const vendorType = item.vendorType;
                const vendor = {
                    label: item.name,
                    value: item.name,
                    version: item.version,
                    id: item.id,
                };

                const vendorsForType = vendorMap.get(vendorType) || [];
                vendorsForType.push(vendor);
                vendorMap.set(vendorType, vendorsForType);
            });

            setAllVendors(vendorMap);
        }
    }, [vendor_data]);

    const openSaveConfirmModal = () => {
        setOpenSaveModal(!openSaveModal);
    }

    const finalSaveButton = () => {
        setselectedFiles([]);
        dispatch({ type: BLANK_CARRIER_DATA });
        setOpenSaveModal(false);
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
    const handleAddAirWayBill = useCallback((name, opt) => {
        dispatch(addAirConsoleData(name, opt));
    }, [addAirConsole])

    const handleSaveCarrierDetails = () => {

        const vendorInfo = {
            id: addAirConsole?.carrierDetails?.vendor_name?.id || '',
            version: addAirConsole?.carrierDetails?.vendor_name?.version || 0,
        };

        const data = {
            rateType: addAirConsole?.carrierDetails?.rate_type?.value || '',
            validFrom: addAirConsole?.carrierDetails?.validity_from || '',
            validTo: addAirConsole?.carrierDetails?.validity_to || '',
            status: addAirConsole?.carrierDetails?.status || 'ACTIVE'
        };

        const consoleCarrierDetails = {
            ...data,
            'tenantVendor': vendorInfo,
        };

        let xlxsfile = selectedFiles[0]
        const formData = new FormData();
        formData.append('file', xlxsfile);


        const newData = {
            'consoleCarrierDetails': consoleCarrierDetails,
            'formData': formData,
        };
        console.log("going to save data air console data");
        console.log(newData);
        // dispatch(postconsoleCarrierDetails({ newData }));
        // setselectedFiles([]);

    }
    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="main_freight_wrapper">
                        <button type="button" className='btn border mb-3' onClick={() => { navigate(-1) }}>Back</button>
                        <Row>
                            <Col lg="12">
                                <div id="progrss-wizard" className="twitter-bs-wizard upload_freight_wrap">

                                    <div className="text-center mb-4">
                                        <h5>Carrier Details</h5>
                                    </div>
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Rate Type</label>
                                                    <Select
                                                        value={addAirConsole?.carrierDetails?.rate_type || ''}
                                                        name='rate_type'
                                                        onChange={(opt) => {
                                                            handleAddAirWayBill('carrierDetails', { ...addAirConsole?.carrierDetails, rate_type: opt });
                                                        }}
                                                        options={optionRateType}
                                                        classNamePrefix="select2-selection form-select"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Vendor Type</label>
                                                    <Select
                                                        value={addAirConsole?.carrierDetails?.vendor_type || ''}
                                                        name='vendor_type'
                                                        onChange={(opt) => {
                                                            if (AllVendors) {
                                                                let vendors = AllVendors?.get(opt?.value);
                                                                setFilteredValue(vendors);
                                                            }
                                                            handleAddAirWayBill('carrierDetails', { ...addAirConsole?.carrierDetails, vendor_name: '', vendor_type: opt });

                                                        }}
                                                        options={optionVendorType}
                                                        classNamePrefix="select2-selection form-select"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Vendor/Carrier Name</label>
                                                    <Select
                                                        value={addAirConsole?.carrierDetails?.vendor_name || ''}
                                                        name='vendor_name'
                                                        onChange={(opt) => {
                                                            handleAddAirWayBill('carrierDetails', { ...addAirConsole?.carrierDetails, vendor_name: opt });

                                                        }}
                                                        options={filteredVendors}
                                                        classNamePrefix="select2-selection form-select"
                                                    />
                                                </div>
                                            </div>

                                        </div>


                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <label htmlFor='validity_from' className="form-label">Validity From</label>
                                                    <input type="date" name="validity_from" id="validity_from" className='form-control' value={addAirConsole?.carrierDetails?.validity_from || ''} onChange={(e) => {
                                                        handleAddAirWayBill('carrierDetails', { ...addAirConsole?.carrierDetails, validity_from: e.target.value });
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="mb-3">
                                                    <label htmlFor='validity_to' className="form-label">Validity To</label>
                                                    <input type="date" name="validity_to" id="validity_to" className='form-control' value={addAirConsole?.carrierDetails?.validity_to || ''} onChange={(e) => {
                                                        handleAddAirWayBill('carrierDetails', { ...addAirConsole?.carrierDetails, validity_to: e.target.value });
                                                    }} />

                                                </div>
                                            </div>
                                        </div>
                                    </form>


                                    <div>

                                        <div className='mb-3 d-flex justify-content-end'>
                                            {navigateState?.state?.id === "inland" ? (
                                                <a href={inlandfileData} className="download_formate btn btn-primary" download="Inland Upload Format">Download Format</a>
                                            ) : (
                                                <a href={fileData} className="download_formate btn btn-primary" download="Fcl Uplaod Format">Download Format</a>
                                            )}
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

                                        <ul className="pager wizard twitter-bs-wizard-pager-link d-flex align-items-center justify-content-center">
                                            <li>
                                                <button onClick={handleSaveCarrierDetails} className="d-flex align-items-center btn btn-primary">
                                                    Save
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="btn btn-primary d-flex align-items-center ms-3">Cancel
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>

            {/* modal */}
            <Modal
                isOpen={openSaveModal}
                toggle={() => {
                    openSaveConfirmModal();
                }}
                className='confirm_modal_wrap'
            >
                <div className="modal-header">
                    <button
                        type="button"
                        onClick={() => {
                            setOpenSaveModal(false);
                        }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body pb-5">
                    <h4 className='text-center'>Are you sure?</h4>
                </div>
                <div className="modal-footer justify-content-center">
                    <button
                        type="button"
                        onClick={() => {
                            openSaveConfirmModal();
                        }}
                        className="btn btn-secondary "
                        data-dismiss="modal"
                    >
                        Cancel
                    </button>
                    <button type="button" onClick={() => { finalSaveButton(); }} className="btn btn-primary ">
                        Save changes
                    </button>
                </div>
            </Modal>
        </>
    )
}