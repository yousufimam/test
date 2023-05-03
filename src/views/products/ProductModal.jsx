import * as Yup from "yup";

import { Fragment, useEffect, useState } from "react";
import { Lucide, Tippy } from "@/base-components";
import { Modal, ModalBody, ModalHeader } from "@/base-components";
import {
  addNewProductList,
  clearProductImages,
  clearSingleImage,
  getProductList,
  resetStatus,
  updateProductList,
  uploadProductImage,
  uploadProductImageSuccess
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";

const ProductModal = ({ show, type, Func, data }) => {
  const [submit, setSubmit] = useState(false);

  // const [data, setData] = useState({});
  //   const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const exceptThisSymbolsforPrice = ["e", "E", "+", "-"];
  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  const { imageUrls, uploaded, added, updated, deleted } = useSelector(
    (state) => state.ProductListReducer
  );

  const dispatch = useDispatch();

  const maxFileSize = 5242880;

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (imageUrls.length > 0) {
      setFieldValue("productImage", imageUrls);
    }
  }, [imageUrls]);

  const { getRootProps, getInputProps } = useDropzone({
    maxSize: maxFileSize,
    multiple: true,
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
        }

        else {
          setFiles([
            ...files,
            ...acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              })
            )
          ]);
        }
      }
    }
  });

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.filename);
    setFiles([...filtered]);
    setError(null);
    dispatch(clearSingleImage(file.filename));
  };

  // files = current images
  // imageUrls = uploaded images
  //  if imageUrls.length < files.length then upload images
  // images successfully uploaded then clear files

  useEffect(() => {
    if (files.length > 0 && !error && imageUrls.length + files.length <= 5) {
      dispatch(uploadProductImage(files));

      // if success then clear files
    } else if (files.length > 0 && !error && imageUrls.length + files.length > 5) {
      setError("You can only upload a maximum of 5 files");
    }

    // if (
    //   files &&
    //   files.length > 0 &&
    //   files.length <= 5 &&
    //   !error &&
    //   imageUrls.length + files.length <= 5
    // ) {
    //   dispatch(uploadProductImage(files));
    // }
  }, [files]);

  // useEffect for after upload success
  useEffect(() => {
    if (uploaded || error) {
      setFiles([]);
    }
  }, [uploaded, error]);

  // useEffect after form submit success , update success and delete success then clear files and imageUrls
  useEffect(() => {
    if (added || updated || deleted) {
      setFiles([]);
      dispatch(resetStatus());
      dispatch(getProductList(""));
      Func({
        show: false,
        type: "",
        data: null
      });

      resetForm();
      // clear added, updated and deleted
    }
  }, [added, updated, deleted]);

  useEffect(() => {
    // populate data in form

    if (data) {
      setFieldValue("name", data.name || "");
      setFieldValue("productId", data.productId || "");
      setFieldValue("status", data.status || "available");
      setFieldValue("category", data.category || "");
      setFieldValue("price", data.price || "");
      setFieldValue("quantity", data.quantity || "");
      setFieldValue("stockQuantity", data.stockQuantity || "");
      setFieldValue("unitOfMeasure", data.unitOfMeasure || "");
      setFieldValue("productImage", data.productImage || []);

      dispatch(clearProductImages());

      // add images to imageUrls
      dispatch(uploadProductImageSuccess(data.productImage));
    } else {
      setFieldValue("name", "");
      setFieldValue("productId", "");
      setFieldValue("status", "available");
      setFieldValue("category", "");
      setFieldValue("price", "");
      setFieldValue("quantity", "");
      setFieldValue("stockQuantity", "");
      setFieldValue("unitOfMeasure", "");
      setFieldValue("productImage", []);
    }
  }, [data]);

  const initialValues = {
    name: "",
    productId: "",
    status: "available",
    category: "",
    price: "",
    // productImage: ImagesURL,
    quantity: "",
    stockQuantity: "",
    unitOfMeasure: "",
    productImage: imageUrls
  };

  //   const exceptThisSymbols = ["e", "E", "+", "-", "."];

  //   const validationSchema = Yup.object().shape({
  //     // cannot be empty and never less than given value qty
  //     quantity: Yup.number()
  //       .required("Quantity is required")
  //       .min(Math.max(limit || 5, 5), "Quantity cannot be less than " + Math.max(limit || 5, 5))
  //   });

  const { values, errors, handleSubmit, handleChange, handleBlur, setFieldValue, resetForm } =
    useFormik({
      initialValues,
      validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is required"),
        productId: Yup.string().required("Product ID is required"),
        status: Yup.string().required("Status is required"),
        price: Yup.string().required("Price is required"),
        category: Yup.string().required("Category is required"),
        quantity: Yup.number().required("Quantity is required"),
        stockQuantity: Yup.number().required("Stock Quantity is required"),
        unitOfMeasure: Yup.string().required("Unit of Measure is required"),
        productImage: Yup.array().of(
          Yup.object().shape({
            name: Yup.string(),
            url: Yup.string()
          })
        )

        // at least one object in productImage array is required
        // productImage: Yup.array()
        //   .of(
        //     Yup.object().shape({
        //       name: Yup.string().required("Name is required"),
        //       url: Yup.string().required("URL is required")
        //     })
        //   )
        //   .min(1, "At least one image is required")
      }),

      onSubmit: (values, { resetForm }) => {
        if (type === "add") {
          dispatch(addNewProductList(values));
        } else if (type === "edit") {
          dispatch(
            updateProductList({
              param: data?._id,
              data: values
            })
          );
        }

        setSubmit(false);
      }
    });


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
          {type === "edit" ? "Update Product" : "Add Product"}
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
              {/* BEGIN: Upload Product */}

              <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                  <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Upload Product
                </div>
                <div className="mt-5">
                  <div className="form-inline items-start flex-col xl:flex-row">
                    <div className="w-full xl:mt-0 flex-1 rounded-md">
                      <div className="grid grid-cols-10 gap-5 pl-4 pr-5">
                        {values.productImage.map((image, index) => {
                          return (
                            <div
                              key={index}
                              className="col-span-5 md:col-span-2 h-28 relative image-fit cursor-pointer zoom-in"
                            >
                              <img className="rounded-md" alt={image.filename} src={image.url} />
                              <Tippy
                                content="Remove this image?"
                                className="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                                onClick={() => {
                                  handleRemoveFile(image);
                                }}
                              >
                                <Lucide icon="X" className="w-4 h-4" />
                              </Tippy>
                            </div>
                          );
                        })}
                        {values.productImage.length === 0 || values.productImage.length > 4 ? (
                          ""
                        ) : (
                          <div className="w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in">
                            <div className="flex flex-col text-center items-center justify-center rounded-md border-dashed border-2 border-theme-1 dark:border-darkmode-400 w-full h-full ">
                              <div
                                {...getRootProps({ className: "dropzone" })}
                                className="w-full h-full p-5 text-center flex flex-col items-center justify-center"
                              >
                                <Lucide icon="Plus" className="w-4 h-4 mr-2" />
                                <input {...getInputProps()} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {values.productImage.length > 0 ? (
                        ""
                      ) : (
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input {...getInputProps()} />
                          <div className="w-full h-full p-5 text-center flex flex-col items-center justify-center">
                            <Lucide icon="Upload" className="w-4 h-4 mr-2 mb-4" />
                            <h4 className="text-primary text-md">
                              <a href="/" onClick={(e) => e.preventDefault()}>
                                Drop Files here or click to upload
                              </a>
                            </h4>
                            <span className="text-gray-600 dark:text-darkmode-400">
                              Maximum file size is 5 MB <br />
                              Only .jpg, .jpeg & .png files are allowed
                            </span>
                          </div>
                        </div>
                      )}
                      {error && <div className="text-danger text-center">{error}</div>}
                      {submit && errors.productImage && (
                        <span className="text-danger">{errors.productImage}</span>
                      )}

                      {/* <div className="px-4 pb-4 mt-3 flex items-center justify-center cursor-pointer relative">
                        <Lucide icon="Image" className="w-4 h-4 mr-2" />
                        <span className="text-primary mr-1">Upload a file</span> or drag and drop
                      </div>*/}
                    </div>
                  </div>
                </div>
              </div>

              {/* END: Uplaod Product */}
              <div className="mt-3">
                <label htmlFor="vertical-form-2" className="form-label">
                  Product Name*
                </label>
                <input
                  id="vertical-form-2"
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {submit && errors.name && <span className="text-danger">{errors.name}</span>}
              </div>
              <div className="mt-3">
                <label htmlFor="vertical-form-3" className="form-label">
                  Product Id*
                </label>
                <input
                  id="vertical-form-3"
                  type="text"
                  className="form-control"
                  placeholder="Product Id"
                  name="productId"
                  value={values.productId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {submit && errors.productId && (
                  <span className="text-danger">{errors.productId}</span>
                )}
              </div>
              <div className="mt-3">
                <label htmlFor="vertical-form-4" className="form-label">
                  Category*
                </label>
                <input
                  id="vertical-form-4"
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {submit && errors.category && (
                  <span className="text-danger">{errors.category}</span>
                )}
              </div>
              <div className="mt-3">
                <label htmlFor="vertical-form-3" className="form-label">
                  Price*
                </label>
                <div className="input-group">
                  <div className="input-group-text">$</div>
                  <input
                    min={0}
                    type="number"
                    className="form-control mt-2 sm:mt-0"
                    placeholder="Price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={(e) =>
                      exceptThisSymbolsforPrice.includes(e.key) && e.preventDefault()
                    }
                  />
                  {submit && errors.price && (
                    <div className="input-group-text w-full ">{errors.price}</div>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <label htmlFor="vertical-form-4" className="form-label">
                  Stock Quantity*
                </label>

                <input
                  min={0}
                  type="number"
                  className="form-control mt-2 sm:mt-0"
                  placeholder="Stock Quantity"
                  name="stockQuantity"
                  value={values.stockQuantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => exceptThisSymbolsforPrice.includes(e.key) && e.preventDefault()}
                />
                {submit && errors.stockQuantity && (
                  <div className="text-danger">{errors.stockQuantity}</div>
                )}
              </div>
              <div className="mt-3">
                <label htmlFor="vertical-form-4" className="form-label">
                  Quantity Limit*
                </label>

                <input
                  type="number"
                  id="product-weight"
                  className="form-control mt-2 sm:mt-0"
                  placeholder="Quantity"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min={0}
                  onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                />
                {submit && errors.quantity && <div className="text-danger">{errors.quantity}</div>}
              </div>
              <div className="mt-3">
                <label htmlFor="vertical-form-4" className="form-label">
                  Unit of Measure*
                </label>

                <input
                  type="text"
                  id="product-weight"
                  className="form-control mt-2 sm:mt-0"
                  placeholder="Unit of Measure"
                  name="unitOfMeasure"
                  value={values.unitOfMeasure}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {submit && errors.unitOfMeasure && (
                  <div className="text-danger">{errors.unitOfMeasure}</div>
                )}
              </div>
              <div className="mt-3">
                <label htmlFor="vertical-form-4" className="form-label">
                  Status*
                </label>

                <div className="w-full mt-2 xl:mt-0 flex-1">
                  <div className="flex flex-col sm:flex-row">
                    <div className="form-check mr-4">
                      <input
                        id="shipping-service-standard"
                        className="form-check-input"
                        type="radio"
                        name="status"
                        value="available"
                        checked={values.status === "available"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="shipping-service-standard">
                        Available
                      </label>
                    </div>
                    <div className="form-check mr-4 mt-2 sm:mt-0">
                      <input
                        id="shipping-service-custom"
                        className="form-check-input"
                        type="radio"
                        name="status"
                        value="outOfStock"
                        checked={values.status === "outOfStock"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="shipping-service-custom">
                        Out of Stock
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/*<div className="form-check mt-5">
                <input id="vertical-form-3" className="form-check-input" type="checkbox" value="" />
                <label className="form-check-label" htmlFor="vertical-form-3">
                  Remember me
                </label>
      </div>*/}
              <button className="btn btn-primary mt-7 px-7" type="submit">
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

export default ProductModal;
