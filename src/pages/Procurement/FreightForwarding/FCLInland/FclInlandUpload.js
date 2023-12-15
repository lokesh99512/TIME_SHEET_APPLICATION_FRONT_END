import classnames from 'classnames';
import React, { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Select from "react-select";
import { Card, CardBody, Col, Container, Form, Input, Modal, NavItem, NavLink, Progress, Row, TabContent, TabPane, UncontrolledTooltip } from 'reactstrap';

import { useEffect } from 'react';
import inlandfileData from '../../../../assets/extra/Inlandcharge_Upload.xlsx';
import { delete_icon } from '../../../../assets/images';
import { optionCalculationType, optionCarrierName, optionRateSource, optionRateType, optionValidityApp, optionVendorType } from '../../../../common/data/procurement';
import { formatBytes, isAnyValueEmpty, isExcelFile } from '../../../../components/Common/CommonLogic';
import { addInlandData, updateInlandActiveTab, uploadFclInlandCarrierAction } from '../../../../store/Procurement/actions';

export default function FclInlandUpload() {
    const [activeTabProgress, setActiveTabProgress] = useState(1);
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [progressValue, setProgressValue] = useState(33);
    const [selectedFiles, setselectedFiles] = useState([]);
    const navigate = useNavigate();
    const [surcharges, setSurcharges] = useState([]);
    const [fileError, setfileError] = useState('');
    const [vendorName, setVendorName] = useState([]);
    const inlandActiveTab = useSelector((state) => state?.procurement?.inlandActiveTab);
    const addInland = useSelector((state) => state?.procurement?.addInland);
    const vendor_data = useSelector((state) => state?.globalReducer?.vendor_data);
    const currency_data = useSelector((state) => state?.globalReducer?.currency_data);
    const UOM_data = useSelector((state) => state?.globalReducer?.UOM_data);
    const surchargeCode_data = useSelector((state) => state?.globalReducer?.surchargeCode_data);
    const dispatch = useDispatch();

    useEffect(() => {
        let vendorlist = vendor_data?.content?.map((item) => {
            return { label: item?.name, value: item?.name, version: item?.version, id: item?.id }
        })
        setVendorName(vendorlist);
    }, [vendor_data]);

    useEffect(() => {
        setActiveTabProgress(inlandActiveTab)
        if (inlandActiveTab === 1) { setProgressValue(33) }
        if (inlandActiveTab === 2) { setProgressValue(66) }
        if (inlandActiveTab === 3) { setProgressValue(100); }
        setSurcharges(addInland?.surcharges)
    }, [])

    const openSaveConfirmModal = () => {
        setOpenSaveModal(!openSaveModal);
    }

    const finalSaveButton = () => {
        if (activeTabProgress === 1) {
            console.log(addInland?.carrierDetails, "addInland?.carrierDetails");
            let data = {
                // "id": null,
                "rateSource": addInland?.carrierDetails?.rate_source?.label || '',
                "rateType": addInland?.carrierDetails?.rate_type?.label || '',
                "tenantVendor": {
                    "id": addInland?.carrierDetails?.vendor_name?.id || '',
                    "version": addInland?.carrierDetails?.vendor_name?.version || 0
                },
                // "tenantCarrierVendor": {
                //     "id": 1,
                //     "version": 0
                // },
                // "validityApplication": addInland?.carrierDetails?.validity_application?.value || '',
                "validFrom": addInland?.carrierDetails?.validity_from || '',
                "validTo": addInland?.carrierDetails?.validity_to || '',
                // "status": "ACTIVE",
                // "version": null
            }
            dispatch(uploadFclInlandCarrierAction({ ...data }));
            // dispatch({ type: BLANK_CARRIER_DATA });
        } else if (activeTabProgress === 2) {
            let xlxsfile = selectedFiles[0]
            const formData = new FormData();
            formData.append('file', xlxsfile);
            // dispatch(uploadFclFrightData(formData, fclChargeId));
            // setselectedFiles([]);
            // formData.append('tenantVendor', new Blob([JSON.stringify(projectUATRequestDTO)], { type: "application/json" }));
        }
        if (activeTabProgress === 3) {
            console.log(addInland?.surcharges, "addInland?.surcharges");
            console.log(surcharges, "surcharges");
            let data = addInland?.surcharges?.map((item) => {
                return {
                    "surchargeCodeId": item?.surcharges_name?.id,
                    "uomId": item?.uom?.id,
                    "destinationIds": item?.destination?.length !== 0 ? item?.destination?.map((item) => item?.id) : [],
                    "currencyId": item?.charge_currency?.id,
                    "containerWiseValues": {
                        "40GP": item?.gp2,
                        "40HQ": item?.hq1,
                        "45HQ": item?.hq2,
                        "20RF": item?.rf1,
                        "40RF": item?.rf2,
                        "20GP": item?.gp1
                    }
                }
            });
            // dispatch(uploadFclSurchargeData(data, fclChargeId));
            // setSurcharges([]);
        }
        setOpenSaveModal(false);
    }

    const toggleTabProgress = (tab) => {
        if (activeTabProgress !== tab) {
            if (tab >= 1 && tab <= 3) {
                setActiveTabProgress(tab)
                dispatch(updateInlandActiveTab(tab))

                if (tab === 1) { setProgressValue(33) }
                if (tab === 2) { setProgressValue(66) }
                if (tab === 3) { setProgressValue(100); }
            }
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
        const newSurcharge = {
            surcharges_name: '',
            charge_basis: '',
            calculation_type: '',
            rate: '',
            tax: '',
            currency: ''
        }
        setSurcharges(s => [...s, newSurcharge])
        handleAddInland("surcharges", [...surcharges, newSurcharge])
    }

    const removeInputFields = (index) => {
        const rows = [...surcharges];
        rows.splice(index, 1);
        setSurcharges(rows);
        handleAddInland("surcharges", rows)
    }

    const handleAddInland = useCallback((name, opt) => {
        dispatch(addInlandData(name, opt));
    }, [addInland])

    const handleSelectGroup2 = useCallback((opt, name, index) => {
        const list = [...surcharges];
        list[index][name] = opt;
        setSurcharges(list);
    }, [surcharges]);

    // ------------------ integration
    const uploadSaveHandler = () => {
        openSaveConfirmModal();
    }

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
                                                                        value={addInland?.carrierDetails?.rate_type || ''}
                                                                        name='rate_type'
                                                                        onChange={(opt) => {
                                                                            handleAddInland('carrierDetails', { ...addInland?.carrierDetails, rate_type: opt });
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
                                                                        value={addInland?.carrierDetails?.rate_source || ''}
                                                                        name='rate_source'
                                                                        onChange={(opt) => {
                                                                            handleAddInland('carrierDetails', { ...addInland?.carrierDetails, rate_source: opt });
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
                                                                        value={addInland?.carrierDetails?.vendor_type}
                                                                        name='vendor_type'
                                                                        onChange={(opt) => {
                                                                            handleAddInland('carrierDetails', { ...addInland?.carrierDetails, vendor_type: opt });
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
                                                                        value={addInland?.carrierDetails?.vendor_name || ''}
                                                                        name='vendor_name'
                                                                        onChange={(opt) => {
                                                                            handleAddInland('carrierDetails', { ...addInland?.carrierDetails, vendor_name: opt });
                                                                        }}
                                                                        options={vendorName}
                                                                        classNamePrefix="select2-selection form-select"
                                                                    // isDisabled={carrierData?.vendor_type?.value === 'carrier'}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Carrier Name</label>
                                                                    <Select
                                                                        value={addInland?.carrierDetails?.carrier_name || ''}
                                                                        name='carrier_name'
                                                                        onChange={(opt) => {
                                                                            handleAddInland('carrierDetails', { ...addInland?.carrierDetails, carrier_name: opt });
                                                                        }}
                                                                        options={optionCarrierName}
                                                                        // isDisabled={carrierData?.vendor_type?.value === 'agent'}
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
                                                                        value={addInland?.carrierDetails?.validity_application}
                                                                        name='validity_application'
                                                                        onChange={(opt) => {
                                                                            handleAddInland('carrierDetails', { ...addInland?.carrierDetails, validity_application: opt });
                                                                        }}
                                                                        options={optionValidityApp}
                                                                        classNamePrefix="select2-selection form-select"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label htmlFor='validity_from' className="form-label">Validity From</label>
                                                                    <input type="date" name="validity_from" id="validity_from" className='form-control' value={addInland?.carrierDetails?.validity_from || ''} onChange={(e) => handleAddInland('carrierDetails', { ...addInland?.carrierDetails, validity_from: e.target.value })} />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                    <label htmlFor='validity_to' className="form-label">Validity To</label>
                                                                    <input type="date" name="validity_to" id="validity_to" className='form-control' value={addInland?.carrierDetails?.validity_to || ''} onChange={(e) => handleAddInland('carrierDetails', { ...addInland?.carrierDetails, validity_to: e.target.value })} />
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
                                                            <a href={inlandfileData} className="download_formate btn btn-primary" download="Inland Upload Format">Download Format</a>
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
                                                            {addInland?.surcharges && addInland?.surcharges?.map((item, index) => (
                                                                <div key={index} className='upload_surcharges_row'>
                                                                    <div className="row">
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="surcharges_name" className="form-label">Surcharge Name</label>
                                                                                <Select
                                                                                    value={item.surcharges_name || ''}
                                                                                    name='surcharges_name'
                                                                                    onChange={(opt) => {
                                                                                        if (opt.label == "Add New") {
                                                                                            navigate("/freight/upload/inland/add-new")
                                                                                        }
                                                                                        handleSelectGroup2(opt, 'surcharges_name', index);
                                                                                    }}
                                                                                    options={[...surchargeCode_data,{ label: "Add New", value: "Add New" }]}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="charge_basis" className="form-label">Charge Basis</label>
                                                                                <Select
                                                                                    value={item.charge_basis || ''}
                                                                                    name='charge_basis'
                                                                                    onChange={(opt) => {
                                                                                        handleSelectGroup2(opt, 'charge_basis', index);
                                                                                    }}
                                                                                    options={UOM_data}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor="calculation_type" className="form-label">Calculation Type</label>
                                                                                <Select
                                                                                    value={optionCalculationType ? optionCalculationType.find(obj => obj.value === item.calculation_type) : ''}
                                                                                    name='calculation_type'
                                                                                    onChange={(opt) => {
                                                                                        handleSelectGroup2(opt.value, 'calculation_type', index);
                                                                                    }}
                                                                                    options={optionCalculationType}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        {/* Rate Value */}
                                                                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2">
                                                                            <div className="mb-3">
                                                                                <label className="form-label" htmlFor='rate'>
                                                                                    Rate
                                                                                </label>
                                                                                <Input
                                                                                    type="text"
                                                                                    name={`rate`}
                                                                                    placeholder="Enter Rate"
                                                                                    value={item?.rate || ''}
                                                                                    onChange={(e) => {
                                                                                        handleSelectGroup2(e.target.value, 'rate', index);
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        {/* Tax Value */}
                                                                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2">
                                                                            <div className="mb-3">
                                                                                <label className="form-label" htmlFor='tax'>
                                                                                    Tax
                                                                                </label>
                                                                                <Input
                                                                                    type="text"
                                                                                    name={`tax`}
                                                                                    placeholder="Enter tax"
                                                                                    value={item.tax || ''}
                                                                                    onChange={(e) => {
                                                                                        handleSelectGroup2(e.target.value, 'tax', index);
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <div className="mb-3">
                                                                                <label htmlFor='charge_currency' className="form-label">Currency</label>
                                                                                <Select
                                                                                    value={item.charge_currency || ''}
                                                                                    name='currency'
                                                                                    onChange={(opt) => {
                                                                                        handleSelectGroup2(opt, 'currency', index);
                                                                                    }}
                                                                                    options={currency_data}
                                                                                    classNamePrefix="select2-selection form-select"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="btn_wrap">
                                                                        {(addInland?.surcharges?.length !== 0) ? <button type='button' onClick={() => { removeInputFields(index) }} className="btn border p-0"><img src={delete_icon} alt="Delete" /></button> : null}
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
                                            <ul className="pager wizard twitter-bs-wizard-pager-link d-flex align-items-center justify-content-between">
                                                <li className={`previous ${activeTabProgress === 1 ? "disabled" : ""}`}>
                                                    <button
                                                        className={`d-flex align-items-center ${activeTabProgress === 1 ? "btn btn-primary disabled" : "btn btn-primary"}`}
                                                        onClick={() => {
                                                            toggleTabProgress(activeTabProgress - 1);
                                                        }}
                                                    >
                                                        <i className="bx bx-chevron-left me-1"></i> Previous
                                                    </button>
                                                </li>

                                                <li className={`d-flex`}>
                                                    <button
                                                        className={`btn btn-primary ${activeTabProgress === 1 ? isAnyValueEmpty(addInland?.carrierDetails) ? "disabled" : "" : activeTabProgress === 2 ? selectedFiles?.length === 0 ? "disabled" : "" : ""}`}
                                                        onClick={() => { uploadSaveHandler() }}
                                                    >Save</button>

                                                    {activeTabProgress !== 3 && (
                                                        <button
                                                            className={`btn btn-primary d-flex align-items-center ms-2`}
                                                            onClick={() => {
                                                                toggleTabProgress(activeTabProgress + 1);
                                                            }}
                                                        >Next <i className="bx bx-chevron-right ms-1"></i> </button>
                                                    )}
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