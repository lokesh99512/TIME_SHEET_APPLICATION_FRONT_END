import PropTypes from "prop-types"
import React, { useEffect, useRef, useCallback } from "react"

//Import Icons
import FeatherIcon from "feather-icons-react";

//Import images
import giftBox from "../../assets/images/giftbox.png"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { Link, useLocation } from "react-router-dom"
import withRouter from "../Common/withRouter"

//i18n
import { withTranslation } from "react-i18next"

const option = [
  {}
]

const SidebarContent = props => {
  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/#" className="has-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                  <path d="M2 7.25C2 5.73122 3.23122 4.5 4.75 4.5H15.25C16.7688 4.5 18 5.73122 18 7.25V13.75C18 15.2688 16.7688 16.5 15.25 16.5H4.75C3.23122 16.5 2 15.2688 2 13.75V7.25ZM4 12C4 12.2761 4.22386 12.5 4.5 12.5H11.5C11.7761 12.5 12 12.2761 12 12C12 11.7239 11.7761 11.5 11.5 11.5H4.5C4.22386 11.5 4 11.7239 4 12ZM4.5 13.5C4.22386 13.5 4 13.7239 4 14C4 14.2761 4.22386 14.5 4.5 14.5H7.5C7.77614 14.5 8 14.2761 8 14C8 13.7239 7.77614 13.5 7.5 13.5H4.5ZM13 12C13 12.2761 13.2239 12.5 13.5 12.5H15.5C15.7761 12.5 16 12.2761 16 12C16 11.7239 15.7761 11.5 15.5 11.5H13.5C13.2239 11.5 13 11.7239 13 12ZM9.5 13.5C9.22386 13.5 9 13.7239 9 14C9 14.2761 9.22386 14.5 9.5 14.5H15.5C15.7761 14.5 16 14.2761 16 14C16 13.7239 15.7761 13.5 15.5 13.5H9.5Z" fill="#2D1C5B" />
                </svg>
                <span>Control Tower</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/dashboard" className="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                      <path d="M7.5 11.5C8.32843 11.5 9 12.1716 9 13V17C9 17.8284 8.32843 18.5 7.5 18.5H3.5C2.67157 18.5 2 17.8284 2 17V13C2 12.1716 2.67157 11.5 3.5 11.5H7.5ZM16.5 11.5C17.3284 11.5 18 12.1716 18 13V17C18 17.8284 17.3284 18.5 16.5 18.5H12.5C11.6716 18.5 11 17.8284 11 17V13C11 12.1716 11.6716 11.5 12.5 11.5H16.5ZM7.5 2.5C8.32843 2.5 9 3.17157 9 4V8C9 8.82843 8.32843 9.5 7.5 9.5H3.5C2.67157 9.5 2 8.82843 2 8V4C2 3.17157 2.67157 2.5 3.5 2.5H7.5ZM16.5 2.5C17.3284 2.5 18 3.17157 18 4V8C18 8.82843 17.3284 9.5 16.5 9.5H12.5C11.6716 9.5 11 8.82843 11 8V4C11 3.17157 11.6716 2.5 12.5 2.5H16.5Z" fill="#4848F7" />
                    </svg>
                    <span>{props.t("Dashboard")}</span>
                  </Link>
                </li>
                {/* <li>
                  <Link to="/analytics">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                      <path d="M5 3.5C3.89543 3.5 3 4.39543 3 5.5V15.5C3 16.6046 3.89543 17.5 5 17.5H15C16.1046 17.5 17 16.6046 17 15.5V5.5C17 4.39543 16.1046 3.5 15 3.5H5ZM10 10.5C10.2761 10.5 10.5 10.7239 10.5 11V14C10.5 14.2761 10.2761 14.5 10 14.5C9.72386 14.5 9.5 14.2761 9.5 14V11C9.5 10.7239 9.72386 10.5 10 10.5ZM6 9C6 8.72386 6.22386 8.5 6.5 8.5C6.77614 8.5 7 8.72386 7 9V14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14V9ZM13.5 6.5C13.7761 6.5 14 6.72386 14 7V14C14 14.2761 13.7761 14.5 13.5 14.5C13.2239 14.5 13 14.2761 13 14V7C13 6.72386 13.2239 6.5 13.5 6.5Z" fill="#6264A0" />
                    </svg>
                    <span>Analytics</span>
                  </Link>
                </li> */}
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                  <path d="M4.5 4.25C4.5 3.83579 4.16421 3.5 3.75 3.5C3.33579 3.5 3 3.83579 3 4.25V14.75C3 16.2688 4.23122 17.5 5.75 17.5H16.25C16.6642 17.5 17 17.1642 17 16.75C17 16.3358 16.6642 16 16.25 16H5.75C5.05964 16 4.5 15.4404 4.5 14.75V4.25ZM12.75 5.5C12.3358 5.5 12 5.83579 12 6.25C12 6.66421 12.3358 7 12.75 7H14.4393L11 10.4393L9.53033 8.96967C9.38968 8.82902 9.19892 8.75 9 8.75C8.80109 8.75 8.61032 8.82902 8.46967 8.96967L5.71967 11.7197C5.42678 12.0126 5.42678 12.4874 5.71967 12.7803C6.01256 13.0732 6.48744 13.0732 6.78033 12.7803L9 10.5607L10.4696 12.0303C10.6103 12.171 10.8011 12.25 11 12.25C11.1989 12.25 11.3896 12.171 11.5303 12.0303L15.5 8.06063V9.75C15.5 10.1642 15.8358 10.5 16.25 10.5C16.6642 10.5 17 10.1642 17 9.75V6.25C17 5.83579 16.6642 5.5 16.25 5.5H12.75Z" fill="#6264A0" />
                </svg>
                <span>Sales</span>
              </Link>
              <ul className="sub-menu">
                {/* <li>
                  <Link to="/sales/queries">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                      <path d="M8.50019 1.5C4.91034 1.5 2.00019 4.41015 2.00019 8C2.00019 9.15101 2.29978 10.2334 2.82544 11.1719L2.0297 13.2542C1.73642 14.0216 2.4424 14.7957 3.23352 14.5741L5.7209 13.8774C6.5641 14.2768 7.50671 14.5 8.50019 14.5C12.09 14.5 15.0002 11.5899 15.0002 8C15.0002 4.41015 12.09 1.5 8.50019 1.5ZM8.49279 5.40114C8.13479 5.4711 7.7439 5.70337 7.43474 6.24712C7.29826 6.48718 6.99301 6.57114 6.75296 6.43465C6.5129 6.29817 6.42894 5.99292 6.56543 5.75287C7.00628 4.97749 7.63328 4.5502 8.30099 4.4197C8.9539 4.2921 9.60296 4.45667 10.0932 4.78126C10.5768 5.1015 10.9679 5.62423 10.9804 6.25187C10.9934 6.90602 10.5946 7.49672 9.86123 7.93036C9.36263 8.2252 9.16869 8.42513 9.08626 8.55795C9.01687 8.66975 9.00009 8.77172 9.00009 9C9.00009 9.27614 8.77623 9.5 8.50009 9.5C8.22394 9.5 8.00009 9.27614 8.00009 9C8.00009 8.72827 8.01399 8.38929 8.2366 8.03061C8.44617 7.69295 8.80555 7.39287 9.35222 7.0696C9.88718 6.75326 9.98416 6.45168 9.98059 6.27173C9.97649 6.06527 9.83866 5.81208 9.54108 5.61505C9.25005 5.42235 8.86559 5.32828 8.49279 5.40114ZM8.75 12C8.33579 12 8 11.6642 8 11.25C8 10.8358 8.33579 10.5 8.75 10.5C9.16421 10.5 9.5 10.8358 9.5 11.25C9.5 11.6642 9.16421 12 8.75 12ZM6.53613 15.2402C7.72814 16.6239 9.49315 17.5 11.4628 17.5C12.4563 17.5 13.3989 17.2768 14.2421 16.8774L16.7295 17.5741C17.5206 17.7957 18.2266 17.0216 17.9333 16.2542L17.1375 14.1719C17.6632 13.2333 17.9628 12.151 17.9628 11C17.9628 9.0596 17.1125 7.31779 15.7643 6.1268C15.9095 6.69137 15.9905 7.28165 15.9993 7.88943C16.6071 8.77414 16.9628 9.84552 16.9628 11C16.9628 12.0508 16.6686 13.0313 16.1583 13.8655L16.0301 14.0752L16.9992 16.6111L14.1392 15.8101L13.965 15.8993C13.2149 16.2832 12.3649 16.5 11.4628 16.5C10.2837 16.5 9.19124 16.129 8.29584 15.4973C7.68851 15.481 7.09918 15.3926 6.53613 15.2402Z" fill="#6264A0" />
                    </svg>
                    <span>Queries</span>
                  </Link>
                </li> */}
                <li>
                  <Link to="/sales/quotation">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                      <path d="M2 4.5C2 3.39543 2.89543 2.5 4 2.5H11C12.1046 2.5 13 3.39543 13 4.5V10.5C13 11.6046 12.1046 12.5 11 12.5H9.42084L7.93984 15.2378C7.8527 15.3989 7.68444 15.4995 7.50128 15.4999C7.31812 15.5004 7.14938 15.4007 7.06145 15.24L5.56195 12.5H4C2.89543 12.5 2 11.6046 2 10.5V4.5ZM5.5 5.5C5.22386 5.5 5 5.72386 5 6V7C5 7.27614 5.22386 7.5 5.5 7.5C5.61192 7.5 5.71526 7.46322 5.79858 7.4011C5.59719 8.06709 5.29647 8.49643 5.14645 8.64645C4.95118 8.84171 4.95118 9.15829 5.14645 9.35355C5.34171 9.54882 5.65829 9.54882 5.85355 9.35355C6.28256 8.92455 7 7.7299 7 6C7 5.72386 6.77614 5.5 6.5 5.5H5.5ZM8.5 5.5C8.22386 5.5 8 5.72386 8 6V7C8 7.27614 8.22386 7.5 8.5 7.5C8.61192 7.5 8.71526 7.46322 8.79858 7.4011C8.59719 8.06709 8.29647 8.49643 8.14645 8.64645C7.95118 8.84171 7.95118 9.15829 8.14645 9.35355C8.34171 9.54882 8.65829 9.54882 8.85355 9.35355C9.28256 8.92455 10 7.7299 10 6C10 5.72386 9.77614 5.5 9.5 5.5H8.5ZM5.51653 14.5H2.5C2.22386 14.5 2 14.7239 2 15C2 15.2761 2.22386 15.5 2.5 15.5H6.06379L5.51653 14.5ZM8.93496 15.5H17.5C17.7761 15.5 18 15.2761 18 15C18 14.7239 17.7761 14.5 17.5 14.5H9.47589L8.93496 15.5ZM2 18C2 17.7239 2.22386 17.5 2.5 17.5H12.5C12.7761 17.5 13 17.7239 13 18C13 18.2761 12.7761 18.5 12.5 18.5H2.5C2.22386 18.5 2 18.2761 2 18Z" fill="#4848F7" />
                    </svg>
                    <span>Quotations</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                  <path d="M10.0001 8.46137L13.0289 7.24988L5.52875 4.24984L2.94291 5.28418C2.81019 5.33726 2.68812 5.40794 2.57894 5.49288L10.0001 8.46137ZM2.03542 6.35251C2.01215 6.4576 2 6.56624 2 6.67689V14.3228C2 14.9362 2.37343 15.4877 2.94291 15.7155L8.70013 18.0184C8.95942 18.1221 9.22802 18.1936 9.50015 18.2329V9.3384L2.03542 6.35251ZM10.5001 18.2328C10.7722 18.1936 11.0407 18.1221 11.2999 18.0184L17.0571 15.7155C17.6266 15.4877 18 14.9362 18 14.3228V6.67689C18 6.56628 17.9879 6.45767 17.9646 6.35262L10.5001 9.3384V18.2328ZM17.4212 5.49296L14.3751 6.71137L6.87504 3.71132L8.70013 2.98129C9.53457 2.64751 10.4654 2.64751 11.2999 2.98129L17.0571 5.28418C17.1898 5.33728 17.312 5.40798 17.4212 5.49296Z" fill="#6264A0" />
                </svg>
                <span>Procurement</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#" className="has-arrow">
                    <span>Ocean Freight</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/freight/ocean/fcl">
                        <span>FCL</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/freight/ocean/lcl">
                        <span>LCL</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/freight/ocean/portlocal">
                        <span>Port/Local Charges</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span>Air Freight</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/freight/air/masterbill">
                        <span>Master Waybill</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/freight/air/console">
                        <span>Console</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/freight/air/local">
                        <span>Airport/Local Charges</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/freight/inland">
                    <span>Inland Charges</span>
                  </Link>
                </li>
                {/* <li>
                  <Link to="/express">
                    <span className="menu_circle"></span>
                    <span>Express</span>
                  </Link>
                </li> */}
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                  <path d="M5.5 2.4989C5.08579 2.4989 4.75 2.83469 4.75 3.2489V3.58054C3.17741 3.92388 2 5.32444 2 7V7.28119C2 8.74639 2.84648 10.0797 4.17246 10.7031L4.75 10.9746V15.8384C4.01735 15.5418 3.5 14.8235 3.5 13.9838V12.9034C3.5 12.4892 3.16421 12.1534 2.75 12.1534C2.33579 12.1534 2 12.4892 2 12.9034V13.9838C2 15.6602 3.17826 17.0601 4.75 17.4033V17.7511C4.75 18.1653 5.08579 18.5011 5.5 18.5011C5.91421 18.5011 6.25 18.1653 6.25 17.7511V17.4032C7.82345 17.0597 9 15.6585 8.99999 13.9838L8.99999 13.7112C8.99999 12.2488 8.15508 10.9179 6.83156 10.2957L6.25 10.0223V5.14538C6.98295 5.44207 7.49999 6.16065 7.5 6.99999L7.5 8.09576C7.5 8.50997 7.83579 8.84576 8.25 8.84576C8.66422 8.84576 9 8.50997 9 8.09575L9 6.99998C8.99999 5.32443 7.82258 3.92388 6.25 3.58055V3.2489C6.25 2.83469 5.91421 2.4989 5.5 2.4989ZM3.5 7C3.5 6.16065 4.01704 5.44207 4.75 5.14538V9.31601C3.98496 8.92845 3.5 8.1426 3.5 7.28119V7ZM6.25 15.8384V11.6807C7.0149 12.0664 7.49999 12.851 7.49999 13.7112L7.49999 13.9838C7.49999 14.8228 6.98326 15.5416 6.25 15.8384ZM12.5046 10.5C12.5046 10.1651 12.5239 9.83837 12.5605 9.52192L14.2542 9.5215C14.6684 9.5214 15.0041 9.18553 15.004 8.77131C15.0039 8.3571 14.668 8.0214 14.2538 8.0215L12.8836 8.02184C13.0704 7.44725 13.3186 6.93336 13.6109 6.4999C14.2824 5.50407 15.1301 5 15.9691 5C16.273 5 16.6009 5.09295 16.8296 5.24868C17.172 5.48184 17.6385 5.39332 17.8717 5.05097C18.1048 4.70861 18.0163 4.24206 17.674 4.0089C17.1639 3.66155 16.5324 3.5 15.9691 3.5C14.4805 3.5 13.221 4.39504 12.3672 5.66127C11.9109 6.33795 11.5542 7.14005 11.3204 8.02223L10.7515 8.02237C10.3373 8.02248 10.0016 8.35835 10.0017 8.77256C10.0018 9.18678 10.3376 9.52248 10.7518 9.52237L11.0521 9.5223C11.0207 9.84254 11.0046 10.169 11.0046 10.5C11.0046 10.5083 11.0046 10.5165 11.0047 10.5248L10.7506 10.525C10.3364 10.5255 10.001 10.8616 10.0014 11.2758C10.0018 11.69 10.3379 12.0255 10.7522 12.025L11.1212 12.0247C11.3168 13.2835 11.7513 14.4254 12.3672 15.3387C13.221 16.605 14.4805 17.5 15.9691 17.5C16.5112 17.5 17.1611 17.3652 17.6925 16.9831C18.0288 16.7413 18.1054 16.2726 17.8636 15.9363C17.6218 15.6 17.1531 15.5234 16.8168 15.7652C16.6095 15.9143 16.2942 16 15.9691 16C15.1301 16 14.2824 15.4959 13.6109 14.5001C13.1647 13.8385 12.8213 12.9894 12.6423 12.0231L14.2547 12.0215C14.6689 12.0211 15.0044 11.685 15.0039 11.2707C15.0035 10.8565 14.6674 10.5211 14.2532 10.5215L12.5047 10.5233C12.5046 10.5155 12.5046 10.5078 12.5046 10.5Z" fill="#6264A0" />
                </svg>
                <span>Rate Management</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#" className="has-arrow">
                    <span>Surcharge Master</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/rate/surcharge/fcl">
                        <span>FCL Surcharge Master</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/freight/ocean/lcl">
                        <span>LCL Surcharge Master</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/freight/ocean/portlocal">
                        <span>Air Surcharge Master</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* <li>
                  <Link to="/#">
                    <span className="menu_circle"></span>
                    <span>Tariff</span>
                  </Link>
                </li>
                <li>
                  <Link to="/#">
                    <span className="menu_circle"></span>
                    <span>Charge Master</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link to="/#">
                    <span className="menu_circle"></span>
                    <span>Discount Master</span>
                  </Link>
                </li>
                <li>
                  <Link to="/#">
                    <span className="menu_circle"></span>
                    <span>Air Commicion Master</span>
                  </Link>
                </li> */}
              </ul>
            </li>
            <li>
            <Link to="/#" className="has-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                  <path d="M12.5 5C12.5 6.38071 11.3807 7.5 10 7.5C8.61929 7.5 7.5 6.38071 7.5 5C7.5 3.61929 8.61929 2.5 10 2.5C11.3807 2.5 12.5 3.61929 12.5 5ZM17.5 5.5C17.5 6.60457 16.6046 7.5 15.5 7.5C14.3954 7.5 13.5 6.60457 13.5 5.5C13.5 4.39543 14.3954 3.5 15.5 3.5C16.6046 3.5 17.5 4.39543 17.5 5.5ZM4.5 7.5C5.60457 7.5 6.5 6.60457 6.5 5.5C6.5 4.39543 5.60457 3.5 4.5 3.5C3.39543 3.5 2.5 4.39543 2.5 5.5C2.5 6.60457 3.39543 7.5 4.5 7.5ZM6 9.75C6 9.05964 6.55964 8.5 7.25 8.5H12.75C13.4404 8.5 14 9.05964 14 9.75V14.5C14 16.7091 12.2091 18.5 10 18.5C7.79086 18.5 6 16.7091 6 14.5V9.75ZM5 9.75C5 9.28746 5.13957 8.85752 5.37889 8.5H3.25C2.55964 8.5 2 9.05964 2 9.75V13.5C2 15.1569 3.34315 16.5 5 16.5C5.13712 16.5 5.27209 16.4908 5.40434 16.473C5.14412 15.8677 5 15.2007 5 14.5V9.75ZM15 14.5C15 15.2007 14.8559 15.8677 14.5957 16.473C14.7279 16.4908 14.8629 16.5 15 16.5C16.6569 16.5 18 15.1569 18 13.5V9.75C18 9.05964 17.4404 8.5 16.75 8.5H14.6211C14.8604 8.85752 15 9.28746 15 9.75V14.5Z" fill="#6264A0" />
                </svg>
                <span>Parties</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/parties/customers">
                    <span>Customers</span>
                  </Link>
                </li>
                <li>
                  <Link to="/parties/vendors">
                    <span>Vendors</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                  <path d="M1.91075 7.88266C2.28004 6.74053 2.88839 5.69213 3.69109 4.80364C3.82683 4.65339 4.03978 4.59984 4.23044 4.66802L6.14873 5.35392C6.6688 5.53977 7.24107 5.26883 7.42692 4.74875C7.4452 4.69762 7.45927 4.64507 7.469 4.59173L7.83446 2.58573C7.8708 2.38627 8.02398 2.2285 8.22227 2.1863C8.80246 2.0628 9.39734 2 10 2C10.6023 2 11.1968 2.06273 11.7767 2.18607C11.9749 2.22824 12.1281 2.38591 12.1645 2.58529L12.531 4.59165C12.6301 5.13497 13.1509 5.4951 13.6942 5.39601C13.7476 5.38627 13.8002 5.37219 13.8512 5.35395L15.7696 4.66802C15.9602 4.59984 16.1732 4.65339 16.3089 4.80364C17.1116 5.69213 17.72 6.74053 18.0893 7.88266C18.1516 8.07534 18.0915 8.28658 17.9371 8.41764L16.3823 9.73773C15.9613 10.0952 15.9098 10.7263 16.2673 11.1473C16.3024 11.1887 16.3409 11.2271 16.3823 11.2623L17.9371 12.5824C18.0915 12.7134 18.1516 12.9247 18.0893 13.1173C17.72 14.2595 17.1116 15.3079 16.3089 16.1964C16.1732 16.3466 15.9602 16.4002 15.7696 16.332L13.8513 15.6461C13.3312 15.4602 12.759 15.7312 12.5731 16.2512C12.5548 16.3024 12.5408 16.3549 12.531 16.4085L12.1645 18.4147C12.1281 18.6141 11.9749 18.7718 11.7767 18.8139C11.1968 18.9373 10.6023 19 10 19C9.39734 19 8.80246 18.9372 8.22227 18.8137C8.02398 18.7715 7.8708 18.6137 7.83446 18.4143L7.46902 16.4084C7.36993 15.865 6.84916 15.5049 6.30583 15.604C6.25241 15.6137 6.19987 15.6278 6.14881 15.6461L4.23044 16.332C4.03978 16.4002 3.82683 16.3466 3.69109 16.1964C2.88839 15.3079 2.28004 14.2595 1.91075 13.1173C1.84845 12.9247 1.90852 12.7134 2.06289 12.5824L3.61773 11.2623C4.03872 10.9048 4.09021 10.2737 3.73274 9.85274C3.69759 9.81135 3.65913 9.77288 3.61775 9.73775L2.06289 8.41764C1.90852 8.28658 1.84845 8.07534 1.91075 7.88266ZM8.00001 10.5C8.00001 11.6046 8.89544 12.5 10 12.5C11.1046 12.5 12 11.6046 12 10.5C12 9.39543 11.1046 8.5 10 8.5C8.89544 8.5 8.00001 9.39543 8.00001 10.5Z" fill="#6264A0" />
                </svg>
                <span>Settings</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/settings/company-settings">
                    <span>Company Settings</span>
                  </Link>
                </li>
                <li>
                  <Link to="/settings/users">
                    <span>Users</span>
                  </Link>
                </li>
                <li>
                  <Link to="/#">
                    <span>Products</span>
                  </Link>
                </li>
                <li>
                  <Link to="/#">
                    <span>Network</span>
                  </Link>
                </li>
                <li>
                  <Link to="/#">
                    <span>Integrations</span>
                  </Link>
                </li>
                <li>
                  <Link to="/#">
                    <span>Subscription</span>
                  </Link>
                </li>
              </ul>
              
            </li>

            {/* <li>
              <Link to="/#" className="has-arrow">
                <FeatherIcon
                  icon="grid"
                />
                <span>{props.t("Apps")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/apps-calendar">{props.t("Calendar")}</Link>
                </li>
                <li>
                  <Link to="/apps-chat">
                    {props.t("Chat")}
                  </Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span>{props.t("Email")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/email-inbox">{props.t("Inbox")}</Link>
                    </li>
                    <li>
                      <Link to="/email-read">{props.t("Read Email")} </Link>
                    </li>

                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    <span>{props.t("Invoices")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/invoices-list">{props.t("Invoice List")}</Link>
                    </li>
                    <li>
                      <Link to="/invoices-detail">{props.t("Invoice Detail")}</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/#" className="has-arrow ">
                    <span>{props.t("Contacts")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/contacts-grid">{props.t("User Grid")}</Link>
                    </li>
                    <li>
                      <Link to="/contacts-list">{props.t("User List")}</Link>
                    </li>
                    <li>
                      <Link to="/contacts-profile">{props.t("Profile")}</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/#" className="">
                    <span className="badge rounded-pill badge-soft-danger text-danger float-end">
                      New
                    </span>
                    <span>{props.t("Blog")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/blog-grid">{props.t("Blog Grid")}</Link>
                    </li>
                    <li>
                      <Link to="/blog-list">{props.t("Blog List")}</Link>
                    </li>
                    <li>
                      <Link to="/blog-details">{props.t("Blog Details")}</Link>
                    </li>
                  </ul>
                </li>

              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <FeatherIcon
                  icon="users"
                />
                <span>{props.t("Authentication")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/page-login">{props.t("Login")}</Link>
                </li>
                <li>
                  <Link to="/page-register">{props.t("Register")}</Link>
                </li>
                <li>
                  <Link to="/page-recoverpw">
                    {props.t("Recover Password")}
                  </Link>
                </li>
                <li>
                  <Link to="/page-logout">
                    {props.t("Log out")}
                  </Link>
                </li>
                <li>
                  <Link to="/page-lock-screen">{props.t("Lock Screen")}</Link>
                </li>
                <li>
                  <Link to="/page-confirm-mail">{props.t("Confirm Mail")}</Link>
                </li>
                <li>
                  <Link to="/page-email-verification">
                    {props.t("Email Verification")}
                  </Link>
                </li>
                <li>
                  <Link to="/page-two-step-verification">
                    {props.t("Two Step Verification")}
                  </Link>
                </li>
              </ul>
            </li>
            
            <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon
                  icon="file-text"
                />
                <span>{props.t("Pages")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/pages-starter">{props.t("Starter Page")}</Link>
                </li>
                <li>
                  <Link to="/pages-maintenance">{props.t("Maintenance")}</Link>
                </li>
                <li>
                  <Link to="/pages-comingsoon">{props.t("Coming Soon")}</Link>
                </li>
                <li>
                  <Link to="/pages-timeline">{props.t("Timeline")}</Link>
                </li>
                <li>
                  <Link to="/pages-faqs">{props.t("FAQs")}</Link>
                </li>
                <li>
                  <Link to="/pages-pricing">{props.t("Pricing")}</Link>
                </li>
                <li>
                  <Link to="/pages-404">{props.t("Error 404")}</Link>
                </li>
                <li>
                  <Link to="/pages-500">{props.t("Error 500")}</Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">{props.t("Elements")}</li>

            <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon
                  icon="briefcase"
                />
                <span>{props.t("Components")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/ui-alerts">{props.t("Alerts")}</Link>
                </li>
                <li>
                  <Link to="/ui-buttons">{props.t("Buttons")}</Link>
                </li>
                <li>
                  <Link to="/ui-cards">{props.t("Cards")}</Link>
                </li>
                <li>
                  <Link to="/ui-carousel">{props.t("Carousel")}</Link>
                </li>
                <li>
                  <Link to="/ui-dropdowns">{props.t("Dropdowns")}</Link>
                </li>
                <li>
                  <Link to="/ui-grid">{props.t("Grid")}</Link>
                </li>
                <li>
                  <Link to="/ui-images">{props.t("Images")}</Link>
                </li>
                <li>
                  <Link to="/ui-modals">{props.t("Modals")}</Link>
                </li>
                <li>
                  <Link to="/ui-offcanvas">{props.t("Offcanvas")}</Link>
                </li>
                <li>
                  <Link to="/ui-progressbars">{props.t("Progress Bars")}</Link>
                </li>
                <li>
                  <Link to="/ui-placeholders">{props.t("Placeholders")}</Link>
                </li>
                <li>
                  <Link to="/ui-tabs-accordions">
                    {props.t("Tabs & Accordions")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-typography">{props.t("Typography")}</Link>
                </li>
                <li>
                  <Link to="/ui-toasts">{props.t("Toasts")}</Link>
                </li>
                <li>
                  <Link to="/ui-video">{props.t("Video")}</Link>
                </li>
                <li>
                  <Link to="/ui-general">{props.t("General")}</Link>
                </li>
                <li>
                  <Link to="/ui-colors">{props.t("Colors")}</Link>
                </li>
                <li>
                  <Link to="/ui-utilities">{props.t("Utilities")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon
                  icon="gift"
                />
                <span>{props.t("Extended")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/extended-lightbox">{props.t("Lightbox")}</Link>
                </li>
                <li>
                  <Link to="/extended-rangeslider">{props.t("Range Slider")}</Link>
                </li>
                <li>
                  <Link to="/extended-session-timeout">{props.t("Session Timeout")}</Link>
                </li>
                <li>
                  <Link to="/extended-rating">{props.t("Rating")}</Link>
                </li>
                <li>
                  <Link to="/extended-notifications">{props.t("Notifications")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="">
                <FeatherIcon
                  icon="box"
                />
                <span className="badge rounded-pill badge-soft-danger text-danger float-end">
                  7
                </span>
                <span>{props.t("Forms")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/form-elements">{props.t("Basic Elements")}</Link>
                </li>
                <li>
                  <Link to="/form-validation">
                    {props.t("Validation")}
                  </Link>
                </li>
                <li>
                  <Link to="/form-advanced">{props.t("Advanced Plugins")}</Link>
                </li>
                <li>
                  <Link to="/form-editors">{props.t("Editors")}</Link>
                </li>
                <li>
                  <Link to="/form-uploads">{props.t("File Upload")} </Link>
                </li>
                <li>
                  <Link to="/form-wizard">{props.t("Form Wizard")}</Link>
                </li>
                <li>
                  <Link to="/form-mask">{props.t("Form Mask")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon
                  icon="sliders"
                />
                <span>{props.t("Tables")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/tables-basic">{props.t("Bootstrap Basic")}</Link>
                </li>
                <li>
                  <Link to="/tables-datatable">{props.t("DataTables")}</Link>
                </li>
                <li>
                  <Link to="/tables-responsive">
                    {props.t("Responsive")}
                  </Link>
                </li>
                <li>
                  <Link to="/tables-editable">{props.t("Editable")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon
                  icon="pie-chart"
                />
                <span>{props.t("Charts")}</span>
              </Link>

              <ul className="sub-menu">
                <li>
                  <Link to="/charts-apex">{props.t("Apexcharts")}</Link>
                </li>
                <li>
                  <Link to="/charts-echart">{props.t("Echarts")}</Link>
                </li>
                <li>
                  <Link to="/charts-chartjs">{props.t("Chartjs")}</Link>
                </li>
                <li>
                  <Link to="/charts-knob">{props.t("Jquery Knob")}</Link>
                </li>
                <li>
                  <Link to="/charts-sparkline">{props.t("Sparkline")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon
                  icon="cpu"
                />
                <span>{props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/icons-boxicons">{props.t("Boxicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-materialdesign">
                    {props.t("Material Design")}
                  </Link>
                </li>
                <li>
                  <Link to="/icons-dripicons">{props.t("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-fontawesome">{props.t("Font awesome")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon
                  icon="map"
                />
                <span>{props.t("Maps")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/maps-google">{props.t("Google")}</Link>
                </li>
                <li>
                  <Link to="/maps-vector">{props.t("Vector")}</Link>
                </li>
                <li>
                  <Link to="/maps-leaflet">{props.t("Leaflet")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <FeatherIcon
                  icon="share-2"
                />
                <span>{props.t("Multi Level")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("Level 1.1")}</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Level 1.2")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/#">{props.t("Level 2.1")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{props.t("Level 2.2")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li> */}
          </ul>
          <div className="card sidebar-alert border-0 text-center mx-4 mb-0 mt-5">
            <div className="card-body">
              <img src={giftBox} alt="" />
              <div className="mt-4">
                <h5 className="alertcard-title font-size-16">Unlimited Access</h5>
                <p className="font-size-13">Upgrade your plan from a Free trial, to select ‘Business Plan’.</p>
                <a href="#!" className="btn btn-primary mt-2">Upgrade Now</a>
              </div>
            </div>
          </div>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
