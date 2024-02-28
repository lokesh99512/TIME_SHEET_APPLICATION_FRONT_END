import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { GET_CARGO_TYPE_DATA } from '../../../../../store/Global/actiontype';
import { GET_AIR_LOCATION_TYPE } from '../../../../../store/InstantRate/actionType';

const AirCompare = () => {
    const { cargoType_data } = useSelector((state) => state?.globalReducer);
    const { airLocation } = useSelector((state) => state.instantRate);
    const dispatch = useDispatch();
    
    const compareFormik = useFormik({
        initialValues: {
            airline: '',
            origin: '',
            destination: '',
            mode: '',
            cargotype: '',
            bookingmode: '',
            charge_wt: '',
        },
        onSubmit: (values) => {
            console.log(values,"values");
        }
    })

    useEffect(() => {
        dispatch({ type: GET_CARGO_TYPE_DATA });
        dispatch({ type: GET_AIR_LOCATION_TYPE });
    },[])

    return (
        <>
            <div className='row air_compare_form mb-5'>
                <div className="col-md-3">
                    <div className='field_wrap'>
                        <label className="form-label" htmlFor='airline'>Airline</label>
                        <Select
                            value={compareFormik?.values?.airline || ""}
                            name="airline"
                            onChange={compareFormik.handleChange}
                            options={[]}
                            classNamePrefix="select2-selection form-select"
                            menuPlacement="auto"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='field_wrap'>
                        <label className="form-label" htmlFor='origin'>Origin</label>
                        <Select
                            value={compareFormik?.values?.origin || ""}
                            name="origin"
                            onChange={(e) => {
                                compareFormik.setFieldValue('origin', e);
                            }}
                            options={airLocation || []}
                            classNamePrefix="select2-selection form-select"
                            isOptionDisabled={(option) => option.value === compareFormik?.values?.destination?.value}
                            menuPlacement="auto"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='field_wrap'>
                        <label className="form-label">Destination</label>
                        <Select
                            value={compareFormik?.values?.destination || ""}
                            name="destination"
                            onChange={(e) => {
                                compareFormik.setFieldValue('destination', e);
                            }}
                            options={airLocation || []}
                            classNamePrefix="select2-selection form-select"
                            isOptionDisabled={(option) => option.value === compareFormik?.values?.origin?.value}
                            menuPlacement="auto"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='field_wrap'>
                        <label className="form-label" htmlFor='mode'>Mode</label>
                        <Select
                            value={compareFormik?.values?.mode || ""}
                            name="mode"
                            onChange={compareFormik.handleChange}
                            options={[]}
                            classNamePrefix="select2-selection form-select"
                            menuPlacement="auto"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='field_wrap'>
                        <label className="form-label">Cargo Type</label>
                        <Select
                            value={compareFormik?.values?.cargotype || ""}
                            name="cargotype"
                            onChange={(e) => {
                                compareFormik.setFieldValue('cargotype', e)
                            }}
                            options={cargoType_data || []}
                            classNamePrefix="select2-selection form-select"
                            menuPlacement="auto"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='field_wrap'>
                        <label className="form-label" htmlFor='bookingmode'>Booking Mode</label>
                        <Select
                            value={compareFormik?.values?.bookingmode || ""}
                            name="bookingmode"
                            onChange={compareFormik.handleChange}
                            options={[]}
                            classNamePrefix="select2-selection form-select"
                            menuPlacement="auto"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='field_wrap'>
                        <label className="form-label" htmlFor='charge_wt'>Charge Wt(KG)</label>
                        <input type="text" name="charge_wt" id="charge_wt" className="form-control" value={compareFormik?.values?.charge_wt || ''} onChange={compareFormik.handleChange} />
                    </div>
                </div>
                <div className="col-md-3 d-flex align-items-end">
                    <button type="button" className='btn btn-primary' onClick={compareFormik.handleSubmit}>Compare</button>
                </div>
            </div>
        </>
    )
}

export default AirCompare
