import * as Yup from "yup";

import {
  Dropdown,
  DropdownContent,
  DropdownDivider,
  DropdownFooter,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Lucide,
  Modal,
  ModalBody,
  Tippy,
  TomSelect
} from "@/base-components";
import { Fragment, useEffect, useState } from "react";
import { deleteShippingInfo, getSpecificUser, updateUser , clearShippingInfo} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

import { helper as $h } from "@/utils";
import ShippingAddressModal from "./ShippingAddressModal";
import classnames from "classnames";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";

import alternateImage from "../../assets/images/user.png"


function Main() {
  const [select, setSelect] = useState("1");
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [activeTab, setActiveTab] = useState("personalInformation");
  const [updateEnabled, setUpdateEnabled] = useState(false);
  const [Address, setAddress] = useState();
  const [imageEditEnabled, setImageEditEnabled] = useState(false);

  const maxFileSize = 5242880;

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState({
    show: false,
    data: null
  });

  const [addUpdateModal, setAddUpdateModal] = useState({
    show: false,
    type: "",
    data: null
  });

  const { getRootProps, getInputProps } = useDropzone({
    maxSize: maxFileSize,
    multiple: false,
    accept: {
      "image/png": [],
      "image/jpeg": []
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        if (rejectedFiles.length > 0 && rejectedFiles[0].size > maxFileSize) {
          setError("File size is too large");
        } else {
          setError("File type is not supported");
        }
      } else {
        setError(null);
        if (acceptedFiles.length === 0) {
          return;
        } else {
          // setFiles([
          //   ...files,
          //   ...acceptedFiles.map((file) =>
          //     Object.assign(file, {
          //       preview: URL.createObjectURL(file)
          //     })
          //   )
          // ]);
        }
      }
    }
  });

  const handleRemoveFile = (file) => {
    // const uploadedFiles = files;
    // const filtered = uploadedFiles.filter((i) => i.name !== file.filename);
    // setFiles([...filtered]);
    // setError(null);
    // dispatch(clearSingleImage(file.filename));
  };

  const callbackFunc = (rec) => setAddUpdateModal(rec);


  const handlePhoneChange = (event) => {

     const { value } = event.target;
    
      // regex that contains all the symbols and symbols except backspace and numbers
    
   const regex = /[!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?~`a-zA-Z]/;
    
    
    
     if (regex.test(value)) {
    
   event.preventDefault();
    
   return false;
    
    }
    
    
   setFieldValue("phoneNumber", value);

  }

  

  const { user, loading, updated, error , shippingInfoDeleted } = useSelector((state) => state.ManageUsersReducer);

  // case UPDATE_NEW_USER:
  //     return {
  //       ...state,
  //       loading: true,
  //       updated: false
  //     };

  useEffect(() => {
    if (updated || shippingInfoDeleted) {
      dispatch(getSpecificUser(`/${user._id}`));
      dispatch(clearShippingInfo());
      setUpdateEnabled(false);
      setSubmit(false);
    }else if(error){
      setSubmit(false);
      setUpdateEnabled(false);
    }


  }, [updated ,loading ,error]);

  const initalValues = {
    name: "",
    email: "",
    userId: "",
    company_name: "",
    phoneNumber: "",
    mainAddress: ""
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required")
      .min(11, "11 digits required")
      .max(13, "13 digits required atmost"),

    mainAddress: Yup.string().required("Address is required")
  });

  const { values, errors, handleSubmit, handleChange, handleBlur, setFieldValue, setValues } =
    useFormik({
      initialValues: initalValues,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        setSubmit(false);

        const body = {
          name: values.name,
          phoneNumber: values.phoneNumber,
          mainAddress: values.mainAddress
        };

        dispatch(
          updateUser({
            code: user._id,
            data: body
          })
        );
        // dispatch(updateUser(values));
      }
    });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) {
      if ($h.isNullObject(user) || user._id !== id) {
        dispatch(getSpecificUser(`/${id}`));
      }
    }
  }, [dispatch]);



  useEffect(() => {
    if (!$h.isNullObject(user)) {
      setValues({
        name: user?.name || "",
        email: user?.email || "",
        userId: user?.userId || "",
        company_name: user?.company_name || "",
        phoneNumber: user?.phoneNumber || "",
        mainAddress: user?.mainAddress || ""
      });
    }
  }, [user]);

  return (
    <Fragment>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">PROFILE</h2>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Profile Menu */}
        <div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
          <div className="intro-y box mt-5">
            <div className="relative flex items-center p-5">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 image-fit">
                  <img
                    target="_blank"
                    alt="Image Not Found"
                    className="rounded-full"
                    src={
                      alternateImage
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src =
                      alternateImage
                    }}
                  />
                </div>
                {/*<div
                  className="text-center text-primary font-base mt-2"
                  onClick={() => {
                    setImageEditEnabled(true);
                  }}
                >
                  Edit
                </div>*/}
              </div>
              <div className="ml-4 mr-auto">
                <div className="font-medium text-base">{user?.name}</div>
                <div className="text-slate-500">{user?.email}</div>
              </div>
              {/* <Dropdown>
                <DropdownToggle tag="a" className="w-5 h-5 block" href="#">
                  <Lucide icon="MoreHorizontal" className="w-5 h-5 text-slate-500" />
                </DropdownToggle>
                <DropdownMenu className="w-56">
                  <DropdownContent>
                    <DropdownHeader> Export Options</DropdownHeader>
                    <DropdownDivider />
                    <DropdownItem>
                      <Lucide icon="Activity" className="w-4 h-4 mr-2" />
                      English
                    </DropdownItem>
                    <DropdownItem>
                      <Lucide icon="Box" className="w-4 h-4 mr-2" />
                      Indonesia
                      <div className="text-xs text-white px-1 rounded-full bg-danger ml-auto">
                        10
                      </div>
                    </DropdownItem>
                    <DropdownItem>
                      <Lucide icon="Layout" className="w-4 h-4 mr-2" />
                      English
                    </DropdownItem>
                    <DropdownItem>
                      <Lucide icon="Sidebar" className="w-4 h-4 mr-2" />
                      Indonesia
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownFooter>
                      <button type="button" className="btn btn-primary py-1 px-2">
                        Settings
                      </button>
                      <button type="button" className="btn btn-secondary py-1 px-2 ml-auto">
                        View Profile
                      </button>
                    </DropdownFooter>
                  </DropdownContent>
                </DropdownMenu>
                </Dropdown>*/}
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <div
                className={classnames({
                  "cursor-pointer flex items-center mt-5": true,
                  "text-primary font-medium": activeTab == "personalInformation"
                })}
                onClick={() => setActiveTab("personalInformation")}
              >
                <Lucide icon="Activity" className="w-4 h-4 mr-2" /> Personal Information
              </div>
              <div
                className={classnames({
                  "cursor-pointer flex items-center mt-5": true,
                  "text-primary font-medium": activeTab == "shipmentSettings"
                })}
                onClick={() => setActiveTab("shipmentSettings")}
              >
                <Lucide icon="Box" className="w-4 h-4 mr-2" /> Shipping Information
              </div>
              {/* 
              <div
                className={classnames({
                  "flex items-center mt-5": true,
                  "text-primary font-medium": activeTab == "changePassword"
                })}
                onClick={() => setActiveTab("changePassword")}
              >
                <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Change Password
              </div>
                         <a className="flex items-center mt-5" href="">
                <Lucide icon="Settings" className="w-4 h-4 mr-2" /> User Settings
                </a>*/}
            </div>
            {/*            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <a className="flex items-center" href="">
                <Lucide icon="Activity" className="w-4 h-4 mr-2" /> Email Settings
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Box" className="w-4 h-4 mr-2" /> Saved Credit Cards
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Social Networks
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Settings" className="w-4 h-4 mr-2" /> Tax Information
              </a>
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400 flex">
              <button type="button" className="btn btn-primary py-1 px-2">
                New Group
              </button>
              <button type="button" className="btn btn-outline-secondary py-1 px-2 ml-auto">
                New Quick Link
              </button>
            </div>

              */}{" "}
          </div>
        </div>
        {/* END: Profile Menu */}
        <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
          {activeTab === "personalInformation" ? (
            <div className="intro-y box mt-5">
              <form
                className="form form-vertical"
                onSubmit={(e) => {
                  e.preventDefault();

                  setSubmit(true);
                  handleSubmit();
                }}
              >
                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="font-medium text-base mr-auto">Personal Information</h2>
                </div>
                <div className="p-5">
                  <div className="flex flex-col-reverse xl:flex-row flex-col">
                    <div className="flex-1 mt-6 xl:mt-0">
                      <div className="grid grid-cols-12 gap-x-5">
                        <div className="col-span-12 xl:col-span-6">
                          <div>
                            <label htmlFor="update-profile-form-6" className="form-label">
                              Name
                            </label>
                            <input
                              id="update-profile-form-7"
                              type="text"
                              className="form-control"
                              placeholder="Not Available"
                              value={values.name}
                              name="name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={updateEnabled ? false : true}
                            />
                            {submit && errors.name && (
                              <div className="text-danger mt-2">{errors.name}</div>
                            )}
                          </div>
                          <div className="mt-3">
                            <label htmlFor="update-profile-form-7" className="form-label">
                              Email
                            </label>

                            <input
                              id="update-profile-form-6"
                              type="email"
                              className="form-control"
                              placeholder="Not Available"
                              value={values.email}
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled
                            />
                            {submit && errors.email && (
                              <div className="text-danger mt-2">{errors.email}</div>
                            )}
                          </div>
                          <div className="mt-3">
                            <label htmlFor="update-profile-form-9" className="form-label">
                              User ID
                            </label>

                            <input
                              id="update-profile-form-9"
                              type="text"
                              className="form-control"
                              placeholder="Not Available"
                              disabled
                              value={values.userId}
                              name="userId"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {submit && errors.userId && (
                              <div className="text-danger mt-2">{errors.userId}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-span-12 xl:col-span-6">
                          <div className="mt-3 xl:mt-0">
                            <label htmlFor="update-profile-form-10" className="form-label">
                              Company
                            </label>
                            <input
                              id="update-profile-form-10"
                              type="text"
                              className="form-control"
                              placeholder="Not Available"
                              value={values.company_name}
                              name="company_name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled
                            />
                            {submit && errors.company_name && (
                              <div className="text-danger mt-2">{errors.company_name}</div>
                            )}
                          </div>

                          <div className="mt-3">
                            <label htmlFor="update-profile-form-10" className="form-label">
                              Phone Number
                            </label>

                            <input
                              id="update-profile-form-10"
                              type="text"
                              className="form-control"
                              placeholder="Not Available"
                              disabled={updateEnabled ? false : true}
                              value={values.phoneNumber}
                              name="phoneNumber"
                                                      onChange={(event) => handlePhoneChange(event)}
                              // onChange={handleChange}
                              onBlur={handleBlur}
                              // pattern only numbers and + sign
                              pattern="^[0-9+]*$"
                            />
                            {submit && errors.phoneNumber && (
                              <div className="text-danger mt-2">{errors.phoneNumber}</div>
                            )}
                          </div>
                          <div className="mt-3">
                            <label htmlFor="update-profile-form-11" className="form-label">
                              Address
                            </label>

                            <input
                              id="update-profile-form-11"
                              type="text"
                              className="form-control"
                              placeholder="Not Available"
                              disabled={updateEnabled ? false : true}
                              value={values.mainAddress}
                              name="mainAddress"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {submit && errors.mainAddress && (
                              <div className="mt-2 text-danger">{errors.mainAddress}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-8">
                        {updateEnabled ? (
                          <div className="flex">
                            <button type="submit" className="btn btn-primary flex items-center">
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 ml-3"
                              onClick={() => {
                                setUpdateEnabled(false);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="flex items-center btn btn-primary"
                            onClick={() => {
                              setSubmit(false);
                              setUpdateEnabled(true);
                            }}
                          >
                            Update Profile
                          </button>
                        )}

                        {/* <a href="" className="text-danger flex items-center">
                  <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete Account
                      </a>*/}
                      </div>
                    </div>

                    {imageEditEnabled ? (
                      <div className="w-52 mx-auto xl:mr-0 xl:ml-6">
                        <div className="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                          <div className="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                            <img
                              target="_blank"
                              alt="Image Not Found"
                              className="rounded-md"
                              src={
                                alternateImage
                              }
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src =
                                alternateImage
                              }}
                            />
                            <Tippy
                              tag="div"
                              content="Remove this profile photo?"
                              className="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                            >
                              <Lucide icon="X" className="w-4 h-4" />
                            </Tippy>
                          </div>
                          <div className="cursor-pointer">
                            <div {...getRootProps({ className: "dropzone" })}>
                              <input {...getInputProps()} />
                              <button type="button" className="btn btn-primary w-full">
                                Change Photo
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </form>
            </div>
          ) : activeTab === "shipmentSettings" ? (
            <div className="intro-y box mt-5">
              <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 className="font-medium text-base mr-auto">Shipping Information</h2>
              </div>
              <div className="p-5">
                <div className="intro-y grid grid-cols-9 gap-4">
                  {user?.shippingInfo && user.shippingInfo.length > 0 ? (
                    user.shippingInfo.map((rec, index) => {
                      return (
                        <div
                          name="selectedAddress"
                          key={index}
                          className="col-span-12 lg:col-span-6 2xl:col-span-3"
                          onClick={() => {}}
                        >
                          <div
                            className={classnames("box p-5 rounded-md mt-5", {
                              "bg-[#1E40AF]": false,
                              "text-[#f8fafc]": false
                            })}
                          >
                            <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5">
                              <div className="font-medium text-base truncate">
                                Address {index + 1}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Lucide
                                icon="Clipboard"
                                className={classnames("w-4 h-4 text-slate-500 mr-2", {
                                  "text-[#fff]": false
                                })}
                              />
                              Name : {rec.name}
                            </div>
                            <div className="flex items-center mt-3">
                              <Lucide
                                icon="Calendar"
                                className={classnames("w-4 h-4 text-slate-500 mr-2", {
                                  "text-[#fff]": false
                                })}
                              />
                              Phone Number : {rec.phoneNumber}
                            </div>

                            <div className="flex items-center mt-3">
                              <Lucide
                                icon="MapPin"
                                className={classnames("w-4 h-4 text-slate-500 mr-2", {
                                  "text-[#fff]": false
                                })}
                              />
                              Address : {rec.address}
                            </div>
                            <div className="flex justify-center lg:justify-end items-center p-5 border-t border-slate-200/60 dark:border-darkmode-400 mt-4">
                              <div
                                className="cursor-pointer flex items-center mr-3"
                                onClick={() => {
                                  setAddUpdateModal({
                                    show: true,
                                    type: "edit",
                                    data: rec
                                  });
                                }}
                              >
                                <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" /> Edit
                              </div>
                              <div
                                className="cursor-pointer flex items-center text-danger"
                                onClick={() => {
                                  setDeleteConfirmationModal({ show: true, data: rec });
                                }}
                              >
                                <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-12 lg:col-span-6 2xl:col-span-3 mt-5">
                      <div className="flex items-center pb-5 mb-5">
                        <div className="font-medium text-base truncate">No Address Available</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    className="flex items-center btn btn-primary"
                    onClick={() => {
                      setAddUpdateModal({
                        show: true,
                        type: "add",
                        data: null
                      });
                    }}
                    
                  >
                    Add New Address
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Modal
        show={deleteConfirmationModal.show}
        onHidden={() => {
          setDeleteConfirmationModal({
            show: false,
            data: null
          });
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide icon="XCircle" className="w-16 h-16 text-danger mx-auto mt-3" />
            <div className="text-3xl mt-5">Are you sure?</div>
            <div className="text-slate-500 mt-2">
              Do you really want to delete these record? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmationModal({
                  show: false,
                  data: null
                });
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger w-24"
              onClick={() => {
                // url.SHIPPING_INFO +
                //   "/" +
                //   payload.userId +
                //   "/shippingInfo/" +
                //   payload.specificInfoId,
                //   payload.data;

                const payload = {
                  userId: user._id,
                  specificInfoId: deleteConfirmationModal?.data?._id
                };

                dispatch(deleteShippingInfo(payload));
                setDeleteConfirmationModal({
                  show: false,
                  data: null
                });
              }}
            >
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      <ShippingAddressModal
        show={addUpdateModal.show}
        type={addUpdateModal.type}
        Func={callbackFunc}
        data={addUpdateModal.type == "add" ? null : addUpdateModal.data}
      />
    </Fragment>
  );
}

export default Main;
