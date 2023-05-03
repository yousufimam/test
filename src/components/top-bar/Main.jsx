import {
  Dropdown,
  DropdownContent,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Lucide
} from "@/base-components";
import { darkMode as darkModeStore, darkModeValue } from "@/stores/dark-mode";
import { useDispatch, useSelector } from "react-redux";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { helper as $h } from "@/utils";
import { Fragment } from "react";
import alternateImage from "../../assets/images/gallery.png";
import classnames from "classnames";
import dom from "@left4code/tw-starter/dist/js/dom";
import { logoutUser } from "../../store/actions";
import { QuantityChange as onQuantityChange } from "../../store/actions";
import { useNavigate } from "react-router-dom";

function Main() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const darkMode = useRecoilValue(darkModeStore);
  const setDarkModeValue = useSetRecoilState(darkModeValue);

  const setDarkModeClass = () => {
    darkMode ? dom("html").addClass("dark") : dom("html").removeClass("dark");
  };

  const switchMode = () => {
    setDarkModeValue(() => !darkMode);
    localStorage.setItem("darkMode", !darkMode);
    setDarkModeClass();
  };

  setDarkModeClass();

  const { QuantityofEachProduct } = useSelector((state) => ({
    QuantityofEachProduct: state.ProductListReducer?.QuantityofEachProduct
  }));

  const removeElement = (from, product) => {
    dispatch(onQuantityChange({ record: product, action: from }));
  };

  return (
    <Fragment>
      <div className="top-bar">
        <nav aria-label="breadcrumb" className="-intro-x mr-auto hidden sm:flex"></nav>
        <div>
          <button
            id="theme-toggle"
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-5"
            onClick={switchMode}
          >
            {darkMode == true ? (
              <Lucide icon="Moon" className="notification__icon dark:text-slate-500"></Lucide>
            ) : (
              <Lucide icon="Sun" className="notification__icon dark:text-slate-500"></Lucide>
            )}
          </button>
        </div>

        {$h.getRole() == "customer" ? (
          <Dropdown className="intro-x mr-auto sm:mr-8">
            <DropdownToggle
              tag="div"
              role="button"
              className={classnames(" notification cursor-pointer", {
                "notification--bullet":
                  QuantityofEachProduct.filter((data) => data.CartVisibility == true).length > 0
                    ? true
                    : false
              })}
            >
              <Lucide
                icon="ShoppingCart"
                className="notification__icon dark:text-slate-500"
              ></Lucide>
            </DropdownToggle>
            <DropdownMenu className="notification-content pt-2">
              <DropdownContent tag="div" className="notification-content__box">
                <div className="notification-content__title"> Cart</div>
                {QuantityofEachProduct.filter((data) => data.CartVisibility == true).length == 0 ? (
                  <div>No items found</div>
                ) : null}
                {QuantityofEachProduct.filter((data) => data.CartVisibility == true).map(
                  (rec, index) => {
                    return (
                      <div
                        key={index}
                        className={classnames({
                          "cursor-pointer relative flex items-center": true,
                          "mt-5": index
                        })}
                      >
                        <div className="w-12 h-12 flex-none image-fit mr-1">
                          <img
                            alt="Image Not Found"
                            className="rounded-full"
                            src={
                              rec?.productImage[0]?.url ? rec.productImage[0].url : alternateImage
                            }
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src = alternateImage;
                            }}
                          />
                        </div>
                        <div className="flex-auto text-sm w-35 items-center m-1">
                          <div className="font-bold"> {rec.name}</div>
                          <div>Price : ${rec.price}</div>
                          <div className="text-gray-500">Qty : {rec.addToCart}</div>
                        </div>
                        <div className="flex flex-col w-18 font-medium items-end">
                          <div className="w-4 h-4 mb-8 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100%"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-trash-2 "
                              onClick={() => {
                                removeElement("remove", rec);
                              }}
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        ) : null}

        <Dropdown className="intro-x w-8 h-8">
          <DropdownToggle
            tag="div"
            role="button"
            className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in mt-1"
          >
            <Lucide icon="User" className="content-center w-full" />
          </DropdownToggle>
          <DropdownMenu className="w-56">
            <DropdownContent className="bg-primary text-white">
              <DropdownHeader tag="div" className="!font-normal">
                <div className="font-medium">{$h.getTokenData()?.name || "N/A"}</div>
                <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                  {$h.getTokenData()?.email || "N/A"}
                </div>
              </DropdownHeader>
              <DropdownDivider className="border-white/[0.08]" />
              <DropdownItem
                className="hover:bg-white/5"
                link={
                  $h.getRole() == "customer"
                    ? `/CustomerProfile?id=${$h.getTokenData().id}`
                    : `/AdminProfile?id=${$h.getTokenData().id}`
                }
              >
                <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
              </DropdownItem>

              <DropdownDivider className="border-white/[0.08]" />
              <DropdownItem
                className="hover:bg-white/5"
                onClick={() => {
                  dispatch(logoutUser(navigate));
                }}
              >
                <Lucide icon="ToggleRight" className="w-4 h-4 mr-2" />
                <div>Logout</div>
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Fragment>
  );
}

export default Main;
