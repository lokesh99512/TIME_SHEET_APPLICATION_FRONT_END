import { useFormik } from 'formik'
import React from 'react'
import { Card, CardBody, Input } from 'reactstrap'
import Select from "react-select";

const ShipmentForm = () => {
    const shipmentDetailsFormik = useFormik({
        initialValues: {
            origin_city: "",
            destination_city: "",
            origin_port: "",
            destination_port: "",
            cargo_type: "",
            commodity: "",
            cargo_value: "",
            incoterms: "",

            container_type: "",
            quantity: "",
            length: "",
            width: "",
            height: "",
            gross_weight: "",
            volumentric_wt: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
    })
    
    return (
        <>
            <div className="customer_form_details">
                <Card>
                    <CardBody>
                        <form>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Origin City</label>
                                        <Input
                                            type="text"
                                            name="origin_city"
                                            value={shipmentDetailsFormik.values.origin_city}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Destination City</label>
                                        <Input
                                            type="text"
                                            name="destination_city"
                                            value={shipmentDetailsFormik.values.destination_city}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Origin Port</label>
                                        <Input
                                            type="text"
                                            name="origin_port"
                                            value={shipmentDetailsFormik.values.origin_port}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Destination Port</label>
                                        <Input
                                            type="text"
                                            name="destination_port"
                                            value={shipmentDetailsFormik.values.destination_port}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-3">
                                    <div className="mb-3">
                                        <label className="form-label">Cargo Type</label>
                                        <Input
                                            type="text"
                                            name="cargo_type"
                                            value={shipmentDetailsFormik.values.cargo_type}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-3">
                                    <div className="mb-3">
                                        <label className="form-label">Commodity</label>
                                        <Select
                                            name='commodity'
                                            onChange={shipmentDetailsFormik.handleChange}
                                            options={[]}
                                            classNamePrefix="select2-selection form-select"
                                            menuPlacement="auto"
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-3">
                                    <div className="mb-3">
                                        <label className="form-label">Cargo Value</label>
                                        <Input
                                            type="text"
                                            name="cargo_value"
                                            value={shipmentDetailsFormik.values.cargo_value}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-3">
                                    <div className="mb-3">
                                        <label className="form-label">Incoterms</label>
                                        <Input
                                            type="text"
                                            name="incoterms"
                                            value={shipmentDetailsFormik.values.incoterms}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-2">
                                    <div className="mb-3">
                                        <label className="form-label">Quantity</label>
                                        <Input
                                            type="text"
                                            name="quantity"
                                            value={shipmentDetailsFormik.values.quantity}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-2">
                                    <div className="mb-3">
                                        <label className="form-label">Container Type</label>
                                        <Input
                                            type="text"
                                            name="container_type"
                                            value={shipmentDetailsFormik.values.container_type}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-1">
                                    <div className="mb-3">
                                        <label className="form-label">Length</label>
                                        <Input
                                            type="text"
                                            name="length"
                                            value={shipmentDetailsFormik.values.length}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-1">
                                    <div className="mb-3">
                                        <label className="form-label">Width</label>
                                        <Input
                                            type="text"
                                            name="width"
                                            value={shipmentDetailsFormik.values.width}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-1">
                                    <div className="mb-3">
                                        <label className="form-label">Height</label>
                                        <Input
                                            type="text"
                                            name="height"
                                            value={shipmentDetailsFormik.values.height}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-2">
                                    <div className="mb-3">
                                        <label className="form-label">Gross Wt</label>
                                        <Input
                                            type="text"
                                            name="gross_weight"
                                            value={shipmentDetailsFormik.values.gross_weight}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-3">
                                    <div className="mb-3">
                                        <label className="form-label">Volumentric Wt</label>
                                        <Input
                                            type="text"
                                            name="volumentric_wt"
                                            value={shipmentDetailsFormik.values.volumentric_wt}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default ShipmentForm
