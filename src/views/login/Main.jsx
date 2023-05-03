import * as Yup from "yup";

import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row
} from "reactstrap";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { loginUser as PostLogin, loginWithAzure as PostLoginWithAzure } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import illustrationUrl from "@/assets/images/illustration.svg";
import logoUrl from "@/assets/images/k.png";
import { useFormik } from "formik";

const Login = (props) => {
  const history = useNavigate();

  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  const dispatch = useDispatch();

  const [errorResponse, setErrorResponse] = useState({
    isOpen: false,
    message: ""
  });

  const { error } = useSelector((state) => ({
    error: state.LoginReducer.error
  }));

  function handleAzureLokgin() {
    dispatch(PostLoginWithAzure(history));
  }

  useEffect(() => {
    if (error && error?.response?.status == 401) {
      setErrorResponse({
        isOpen: true,
        message: "Your Id or password is incorrect"
      });
      setTimeout(() => {
        setErrorResponse({ isOpen: false, message: "" });
      }, 3000);
    }
  }, [error]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: ""
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password")
    }),

    onSubmit: (values) => {
      dispatch(PostLogin(values, history));
    }
  });

  return (
    <>
      <Form
        className="form-horizontal"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <div>
          <DarkModeSwitcher />

          <div className="container sm:px-10">
            <div className="block xl:grid grid-cols-2 gap-4">
              {/* BEGIN: Login Info */}
              <div className="hidden xl:flex flex-col min-h-screen">
                <Link to="#" className="-intro-x flex items-center pt-5">
                  <img alt="Customer Portal - KAISPE" className="w-6" src={logoUrl} />
                  <span className="text-white text-lg ml-3"> KAISPE </span>
                </Link>
                <div className="my-auto">
                  <img
                    alt="Customer Portal - KAISPE"
                    className="-intro-x w-1/2 -mt-16"
                    src={illustrationUrl}
                  />
                  <div className="-intro-x text-white font-medium text-2xl leading-tight mt-10">
                    Seamless access. Secure login.
                    <br />
                    Your personalized solutions await in our <br /> customer portal.
                  </div>
                </div>
              </div>
              {/* END: Login Info */}
              {/* BEGIN: Login Form */}

              <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                  <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                    Sign In
                  </h2>
                  <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                    Seamless access. Secure login. Your personalized solutions await in our customer
                    portal.
                  </div>
                  <Alert color="danger" isOpen={errorResponse.isOpen}>
                    {errorResponse.message}
                  </Alert>
                  <div className="intro-x mt-8">
                    <Input
                      name="email"
                      className="intro-x login__input form-control py-3 px-4 block"
                      placeholder="Enter email"
                      type="email"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.email || ""}
                      invalid={validation.touched.email && validation.errors.email ? true : false}
                    />
                    {validation.touched.email && validation.errors.email ? (
                      <FormFeedback className="text-danger" type="invalid">
                        {validation.errors.email}
                      </FormFeedback>
                    ) : null}
                    <Input
                      name="password"
                      className="intro-x login__input form-control py-3 px-4 block mt-4"
                      value={validation.values.password || ""}
                      type="password"
                      placeholder="Enter Password"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      invalid={
                        validation.touched.password && validation.errors.password ? true : false
                      }
                    />
                    {validation.touched.password && validation.errors.password ? (
                      <FormFeedback className="text-danger" type="invalid">
                        {validation.errors.password}
                      </FormFeedback>
                    ) : null}
                  </div>
                  {/* <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                    <div className="flex items-center mr-auto">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="form-check-input border mr-2"
                      />
                      <label className="cursor-pointer select-none" htmlFor="remember-me">
                        Remember me
                      </label>
                    </div>
                    <Link id="forgotPassword" to="#">
                      Forgot Password?
                    </Link>
                  </div> */}
                  {/* <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">*/}
                  <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                    <button
                      className="btn btn-primary py-3 px-4 w-full xl:w-25 xl:mr-3 align-top"
                      type="submit"
                    >
                      Sign In
                    </button>

                    <h2 className="intro-x font-bold text-center xl:text-center">
                      <p className="mt-5">Or sign in with </p>
                    </h2>

                    <button
                      type="button"
                      className="btn btn-primary py-3 px-4 mr-3 w-full xl:w-25 align-top mt-6"
                      onClick={handleAzureLokgin}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="28"
                        height="28"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#ff5722"
                          d="M6 6H22V22H6z"
                          transform="rotate(-180 14 14)"
                        ></path>
                        <path
                          fill="#4caf50"
                          d="M26 6H42V22H26z"
                          transform="rotate(-180 34 14)"
                        ></path>
                        <path
                          fill="#ffc107"
                          d="M26 26H42V42H26z"
                          transform="rotate(-180 34 34)"
                        ></path>
                        <path
                          fill="#03a9f4"
                          d="M6 26H22V42H6z"
                          transform="rotate(-180 14 34)"
                        ></path>
                      </svg>
                      <span className="ml-2">Sign In with Azure AD</span>
                    </button>
                  </div>

                  {/*  <button className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top">
                        Register
                </button>*/}

                  {/*<div className="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left">
                    By signin up, you agree to our{"  "}
                    <Link
                      id="TermsAndConditions"
                      className="text-primary dark:text-slate-200"
                      to="#"
                    >
                      Terms and Conditions{" "}
                    </Link>
                    &
                    <Link className="text-primary dark:text-slate-200" to="#">
                      {"  "}
                      Privacy Policy
                    </Link>
              </div>*/}
                </div>
              </div>

              {/* END: Login Form */}
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Login;
