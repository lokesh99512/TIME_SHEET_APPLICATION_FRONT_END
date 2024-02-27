import { useFormik } from 'formik'
import React from 'react'
import Select from 'react-select'

const AirCompare = () => {
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

    return (
        <>
            <div className='row air_compare_form mb-5'>
                <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3">
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
                <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3">
                    <div className='field_wrap'>
                        <label className="form-label" htmlFor='origin'>Origin</label>
                        <Select
                            value={compareFormik?.values?.origin || ""}
                            name="origin"
                            onChange={compareFormik.handleChange}
                            options={[]}
                            classNamePrefix="select2-selection form-select"
                            menuPlacement="auto"
                        />
                    </div>
                </div>
                <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3">
                    <div className='field_wrap'>
                        <label className="form-label">Destination</label>
                        <Select
                            value={compareFormik?.values?.destination || ""}
                            name="destination"
                            onChange={compareFormik.handleChange}
                            options={[]}
                            classNamePrefix="select2-selection form-select"
                            menuPlacement="auto"
                        />
                    </div>
                </div>
                <div className="col-xxl-1 col-xl-2 col-lg-2 col-md-3">
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
                <div className="col-xxl-1 col-xl-2 col-lg-2 col-md-3">
                    <div className='field_wrap'>
                        <label className="form-label">Cargo Type</label>
                        <Select
                            value={compareFormik?.values?.cargotype || ""}
                            name="cargotype"
                            onChange={compareFormik.handleChange}
                            options={[]}
                            classNamePrefix="select2-selection form-select"
                            menuPlacement="auto"
                        />
                    </div>
                </div>
                <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3">
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
                <div className="col-xxl-1 col-xl-2 col-lg-2 col-md-3">
                    <div className='field_wrap'>
                        <label className="form-label" htmlFor='charge_wt'>Charge Wt(KG)</label>
                        <input type="text" name="charge_wt" id="charge_wt" className="form-control" value={compareFormik?.values?.charge_wt || ''} onChange={compareFormik.handleChange} />
                    </div>
                </div>
                <div className="col-xxl-1 col-xl-2 col-lg-2 col-md-3 d-flex align-items-end">
                    <button type="button" className='btn btn-primary w-100' onClick={compareFormik.handleSubmit}>Compare</button>
                </div>
            </div>
        </>
    )
}

export default AirCompare
