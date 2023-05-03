import "toastr/build/toastr.min.css";

import axios from "axios";
import toastr from "toastr";

//apply base url for axios
const API_URL = import.meta.env.VITE_BASE_URL;
const currentPath = document.location.pathname.split("/")[1];

const axiosApi = axios.create({
  baseURL: API_URL + currentPath
});

const token = JSON.parse(localStorage.getItem("authUser")) || "";

axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token.accessToken}`;

axiosApi.interceptors.response.use(
  (res) => {
    // Add configurations here
    if (
      res.status === 201 &&
      res.config.url === "/order-management" &&
      res.config.method == "post"
    ) {
      toastr.success("Record has been created successfully");
    } else if (
      res.status === 200 &&
      res.config.url === "/auth/loginViaAzureSSO" &&
      res.config.method === "post"
    ) {
    } else if (
      res.status === 200 &&
      res.config.url === "/auth/signin" &&
      res.config.method === "post"
    ) {
    } else if (res.status === 200 && res.config.url === "/users" && res.config.method === "post") {
      toastr.error(res.data.data);
    } else if (res.status === 201) {
      toastr.success("Record Created", "success");
    } else if (res.status === 200 && res.config.url === "/signin") {
    } else if (res.status === 200 && res.config.method != "get") {
      toastr.success("Record Updated Successfully", "Record Updated");
    } else if (res.status === 202) {
      toastr.info("Record Deleted successfully", "Record Delete");
    } else if (
      res.config.url === "/paymentDetails/export/allPayments" ||
      res.config.url === "/order-management/export/AllOrders"
    ) {
      //toastr.info("Record Not Found", "Record Not Found");
    } else if (res.status === 204) {
    } else if (res.status === 204) {
      toastr.info("Record Not Found");
    } else if (res.status === 401) {
      toastr.error("Record Not Found");
    }
    return res;
  },
  (err) => {
    if (err.response) {
      const { data, status } = err.response;

      if (status === 401) {
        //unAuthorized
        toastr.error(data.message, "Unauthorized");
      } else if (status === 400) {
        //bad request
        //  toastr.error(data.message, "Bad Request");
      } else if (status === 403) {
        // Token Expired
        toastr.error(data.message, "Token Expired");
        localStorage.clear();
        window.location.href = "/login";
      } else if (status === 404) {
        // Not Found
        window.location.pathname = "/s/error-page";
      } else {
        toastr.error("Some thing went wrong", "error");
      }
      return Promise.reject(err);
    } else {
      // toastr.error("Some thing went wrong", "error");
      // return { message: "ERROR" };
    }
  }
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, config).then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config }).then((response) => response.data);
}

export async function postwithnotoken(url, data, config = {}) {
  let res = await axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data)
    .catch((err) => err);
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;
  return res;
}

export async function postformData(url, data, config = {}) {
  return axiosApi.post(url, data, { ...config }).then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config }).then((response) => response.data);
}

// patch request
export async function patch(url, data, config = {}) {
  return axiosApi.patch(url, { ...data }, { ...config }).then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config }).then((response) => response.data);
}
