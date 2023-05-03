import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { enter, leave, linkTo, nestedMenu } from "./index";
import { useEffect, useState } from "react";

import { helper as $h } from "@/utils";
import Chat from "@/components/chat-section/Main";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import { Lucide } from "@/base-components";
import MainColorSwitcher from "@/components/main-color-switcher/Main";
import MobileMenu from "@/components/mobile-menu/Main";
import SideMenuTooltip from "@/components/side-menu-tooltip/Main";
import TopBar from "@/components/top-bar/Main";
import { Transition } from "react-transition-group";
import classnames from "classnames";
import jwt from "jwt-decode";
import logoUrl from "@/assets/images/k.png";
import { useRecoilValue } from "recoil";
import { sideMenuforAdmin as useSideMenuStoreforAdmin } from "@/stores/side-menu-admin";
import { sideMenuforUser as useSideMenuStoreforUser } from "@/stores/side-menu-user";

// import { sideMenu as useSideMenuStore } from "@/stores/side-menu";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState([]);

  const sideMenuStoreUser = useRecoilValue(useSideMenuStoreforUser);
  const sideMenuStoreAdmin = useRecoilValue(useSideMenuStoreforAdmin);

  const sideMenuforUser = () => nestedMenu($h.toRaw(sideMenuStoreUser.menuforUser), location);
  const sideMenuforAdmin = () => nestedMenu($h.toRaw(sideMenuStoreAdmin.menuforAdmin), location);

  useEffect(() => {
    dom("body").removeClass("error-page").removeClass("login").addClass("main");

    if (getRole() === "admin") {
      setFormattedMenu(sideMenuforAdmin());
    }
    if (getRole() === "customer") {
      setFormattedMenu(sideMenuforUser());
    }
  }, [sideMenuStoreUser, sideMenuStoreAdmin, location.pathname]);

  const getRole = () => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const accessToken = JSON.parse(authUser).accessToken;

      if (accessToken) {
        return jwt(accessToken).role;
      }
    }
    return "";
  };

  return (
    <div className="py-2">
      <DarkModeSwitcher />
      <Chat />
      {/* <MainColorSwitcher /> */}
      <MobileMenu />
      <div className="flex mt-[4.7rem] md:mt-0">
        {/* BEGIN: Side Menu */}
        <nav className="side-nav">
          <div className="intro-x flex items-center pl-5 pt-4">
            <img alt="Customer Portal - KAISPE" className="w-6" src={logoUrl} />
            <span className="hidden xl:block text-white text-lg ml-3">KAISPE</span>
          </div>
          <div className="my-12"></div>
          <ul>
            {/* BEGIN: First Child */}
            {formattedMenu.map((menu, menuKey) =>
              menu == "devider" ? (
                <li className="side-nav__devider my-6" key={menu + menuKey}></li>
              ) : (
                <li key={menu + menuKey}>
                  <SideMenuTooltip
                    tag="a"
                    content={menu.title}
                    href={menu.subMenu ? "#" : menu.pathname}
                    className={classnames({
                      "side-menu": true,
                      "side-menu--active": menu.active,
                      "side-menu--open": menu.activeDropdown
                    })}
                    onClick={(event) => {
                      event.preventDefault();
                      linkTo(menu, navigate);
                      setFormattedMenu($h.toRaw(formattedMenu));
                    }}
                  >
                    <div className="side-menu__icon">
                      <Lucide icon={menu.icon} />
                    </div>
                    <div className="side-menu__title">
                      {menu.title}
                      {menu.subMenu && (
                        <div
                          className={classnames({
                            "side-menu__sub-icon": true,
                            "transform rotate-180": menu.activeDropdown
                          })}
                        >
                          <Lucide icon="ChevronDown" />
                        </div>
                      )}
                    </div>
                  </SideMenuTooltip>
                  {/* BEGIN: Second Child */}
                  {menu.subMenu && (
                    <Transition
                      in={menu.activeDropdown}
                      onEnter={enter}
                      onExit={leave}
                      timeout={300}
                    >
                      <ul
                        className={classnames({
                          "side-menu__sub-open": menu.activeDropdown
                        })}
                      >
                        {menu.subMenu.map((subMenu, subMenuKey) => (
                          <li key={subMenuKey}>
                            <SideMenuTooltip
                              tag="a"
                              content={subMenu.title}
                              href={subMenu.subMenu ? "#" : subMenu.pathname}
                              className={classnames({
                                "side-menu": true,
                                "side-menu--active": subMenu.active
                              })}
                              onClick={(event) => {
                                event.preventDefault();
                                linkTo(subMenu, navigate);
                                setFormattedMenu($h.toRaw(formattedMenu));
                              }}
                            >
                              <div className="side-menu__icon">
                                <Lucide icon="Activity" />
                              </div>
                              <div className="side-menu__title">
                                {subMenu.title}
                                {subMenu.subMenu && (
                                  <div
                                    className={classnames({
                                      "side-menu__sub-icon": true,
                                      "transform rotate-180": subMenu.activeDropdown
                                    })}
                                  >
                                    <Lucide icon="ChevronDown" />
                                  </div>
                                )}
                              </div>
                            </SideMenuTooltip>
                            {/* BEGIN: Third Child */}
                            {subMenu.subMenu && (
                              <Transition
                                in={subMenu.activeDropdown}
                                onEnter={enter}
                                onExit={leave}
                                timeout={300}
                              >
                                <ul
                                  className={classnames({
                                    "side-menu__sub-open": subMenu.activeDropdown
                                  })}
                                >
                                  {subMenu.subMenu.map((lastSubMenu, lastSubMenuKey) => (
                                    <li key={lastSubMenuKey}>
                                      <SideMenuTooltip
                                        tag="a"
                                        content={lastSubMenu.title}
                                        href={lastSubMenu.subMenu ? "#" : lastSubMenu.pathname}
                                        className={classnames({
                                          "side-menu": true,
                                          "side-menu--active": lastSubMenu.active
                                        })}
                                        onClick={(event) => {
                                          event.preventDefault();
                                          linkTo(lastSubMenu, navigate);
                                        }}
                                      >
                                        <div className="side-menu__icon">
                                          <Lucide icon="Zap" />
                                        </div>
                                        <div className="side-menu__title">{lastSubMenu.title}</div>
                                      </SideMenuTooltip>
                                    </li>
                                  ))}
                                </ul>
                              </Transition>
                            )}
                            {/* END: Third Child */}
                          </li>
                        ))}
                      </ul>
                    </Transition>
                  )}
                  {/* END: Second Child */}
                </li>
              )
            )}
            {/* END: First Child */}
          </ul>
        </nav>
        {/* END: Side Menu */}
        {/* BEGIN: Content */}
        <div className="content">
          <TopBar />
          <Outlet />
        </div>
        {/* END: Content */}
      </div>
    </div>
  );
}

export default Main;
