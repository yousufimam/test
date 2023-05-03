import * as Yup from "yup";

import { Fragment, useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "@/base-components";
import {
  addNewShippingInfo,
  clearShippingInfo,
  getSpecificUser,
  updateShippingInfo
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

import { Lucide } from "@/base-components";
import { useFormik } from "formik";

const ShippingAddressModal = ({ show, type, Func, data }) => {
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();

  const { user, shippingInfoUpdated, shippingInfoAdded, error, loading } = useSelector(
    (state) => state.ManageUsersReducer
  );

  useEffect(() => {
    if (shippingInfoUpdated || shippingInfoAdded) {
      resetForm();
      Func({
        show: false,
        type: "",
        data: null
      });
      setSubmit(false);
      dispatch(getSpecificUser("/" + user._id));
      dispatch(clearShippingInfo());
    }

    if (error) {
      resetForm();
      Func({
        show: false,
        type: "",
        data: null
      });
      setSubmit(false);
      dispatch(clearShippingInfo());
    }
  }, [shippingInfoUpdated, shippingInfoAdded, error]);

  useEffect(() => {
    // populate data in form

    if (data) {
      setFieldValue("name", data.name || "");
      setFieldValue("phoneNumber", data.phoneNumber || "");
      setFieldValue("address", data.address || "");
    } else {
      setFieldValue("name", "");
      setFieldValue("phoneNumber", "");
      setFieldValue("address", "");
    }
  }, [data]);

  const initialValues = {
    name: "",
    phoneNumber: "",
    address: ""
  };

  const { values, errors, handleSubmit, handleChange, handleBlur, setFieldValue, resetForm } =
    useFormik({
      initialValues,
      validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is required"),
        phoneNumber: Yup.string()
          .required("Phone Number is required")
          .min(11, "11 digits required")
          .max(13, "13 digits required atmost"),
        address: Yup.string().required("Address is required")
      }),

      onSubmit: (values, { resetForm }) => {
        if (type === "add") {
          const payload = {
            userId: user._id,
            data: values
          };

          dispatch(addNewShippingInfo(payload));
          // dispatch(addNewProductList(values));
        } else if (type === "edit") {
          // url.SHIPPING_INFO + "/" + payload.userId + "/shippingInfo/" + payload.specificInfoId,
          //   payload.data;

          const payload = {
            userId: user._id,
            specificInfoId: data._id,
            data: values
          };

          dispatch(updateShippingInfo(payload));

          // dispatch(
          //   updateProductList({
          //     param: data?._id,
          //     data: values
          //   })
          // );
        }

        setSubmit(false);
      }
    });

  const handlePhoneChange = (event) => {
    const { value } = event.target; // regex that contains all the symbols and symbols except backspace and numbers

    const regex = /[!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?~`a-zA-Z]/;

    if (regex.test(value)) {
      event.preventDefault();

      return false;
    }

    setFieldValue("phoneNumber", value);
  };

  return (
    <Modal
      size="modal-lg"
      slideOver={true}
      show={show}
      onHidden={() => {
        Func({
          show: false,
          type: "",
          data: null
        });
        setSubmit(false);
        //  resetForm();
      }}
    >
      <ModalHeader className="p-5">
        <h1 className="font-medium text-lg mr-auto">
          {" "}
          {type === "edit" ? "Update Shipping Information" : "Add Shipping Information"}
        </h1>
      </ModalHeader>
      <ModalBody>
        <Fragment>
          <form
            className="form form-vertical"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmit(true);
              handleSubmit();
            }}
          >
            <div className="p-3">
              <div className="mt-3">
                <label htmlFor="vertical-form-2" className="form-label">
                  Name*
                </label>
                <input
                  id="vertical-form-2"
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {submit && errors.name && <span className="text-danger">{errors.name}</span>}
              </div>
              <div className="mt-3">
                <label htmlFor="vertical-form-3" className="form-label">
                  Phone Number*
                </label>
                <input
                  id="vertical-form-3"
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={(event) => handlePhoneChange(event)}
                  // onChange={handleChange}
                  onBlur={handleBlur}
                  // pattern only numbers and + sign
                  pattern="^[0-9+]*$"
                />
                {submit && errors.phoneNumber && (
                  <span className="text-danger">{errors.phoneNumber}</span>
                )}
              </div>
              <div className="mt-3">
                <label htmlFor="vertical-form-4" className="form-label">
                  Address*
                </label>
                <input
                  id="vertical-form-4"
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {submit && errors.address && <span className="text-danger">{errors.address}</span>}
              </div>

              <button className="btn btn-primary mt-7 px-7" type="submit" disabled={loading}>
                {type === "edit" ? "Update" : "Add"}
              </button>
              <button
                className="btn btn-outline-secondary mt-5 ml-2 px-7"
                type="button"
                onClick={() => {
                  Func({
                    show: false,
                    type: "",
                    data: null
                  });
                  setSubmit(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </Fragment>
      </ModalBody>
    </Modal>
  );
};

export default ShippingAddressModal;
