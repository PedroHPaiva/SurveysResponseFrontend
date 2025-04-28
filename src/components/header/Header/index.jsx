/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

//Primereact
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

import { Toast } from 'primereact/toast';

//Icons
import { MdOutlineDashboard, MdLogout } from 'react-icons/md';

//COntext
import { AuthContext } from '../../../context/auth';

//Styles
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import './styles.css';

export default function Header({ visible, setVisible }) {
  const toast = useRef(null);
  const { user, signOut } = useContext(AuthContext);
  const actualPage = useLocation();

  //Header Content data
  const [ContentData, setContentData] = useState([]);

  const pagesArray = [
    {
      actualPages: actualPage.pathname === '/dashboard',
      url: `/dashboard`,
      iconDesk: <MdOutlineDashboard className="menu-item-icon" />,
      iconNotExpandedDesk: <MdOutlineDashboard size={25} />,
      iconMobile: <MdOutlineDashboard size={20} className="mr-2 iconHeader" />,
      title: 'Dashboard',
    },
  ];

  useEffect(() => {
    setContentData(pagesArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const toggleSidebar = () => {
    setVisible(!visible);
  };

  const mobileHeader = (
    <div className="mobileHeader">
      <Sidebar
        className="mobileSidebar"
        visible={visible}
        onHide={() => setVisible(false)}
        content={({ closeIconRef, hide }) => (
          <div className="min-h-screen flex relative  surface-ground">
            <div
              id="app-sidebar-2"
              className="surface-section h-screen lg:block flex-shrink-0 absolute  left-0 top-0 z-1 border-right-1 surface-border select-none"
              style={{ width: '100%' }}
            >
              <div className="flex flex-column h-full">
                <div className="flex align-items-center justify-content-between px-2 pt-3 flex-shrink-0">
                  <span className="font-bold text-base text-900">Ilumeo</span>
                  <span>
                    <Button
                      type="button"
                      ref={closeIconRef}
                      onClick={(e) => hide(e)}
                      icon="pi pi-times"
                      className="h-2rem w-2rem text-900 bg-white border-transparent"
                    ></Button>
                  </span>
                </div>

                <div className="overflow-y-auto mt-3 flex-1">
                  <ul className="list-none p-0 m-0 overflow-hidden px-2">
                    {ContentData &&
                      ContentData.map((item) => (
                        <li key={item.title} className="mb-2">
                          <a
                            href={item.url}
                            className={`flex align-items-center cursor-pointer p-2 border-round text-700 transition-duration-150 w-full no-underline ${item.actualPages ? 'bgButtonActualPageDesktopNotExpanded' : null}`}
                          >
                            {item.mobileIcon}
                            <span className="font-medium">{item.title}</span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>

                <hr className="mb-1 mx-1 border-top-1 border-none surface-border" />
                <div className="mt-auto px-2 p-2 py-2 mb-2">
                  <a
                    onClick={() => signOut(history)}
                    className="flex align-items-center cursor-pointer border-round text-700 w-full no-underline"
                  >
                    <MdLogout size={20} className="mr-3" />
                    <span className="font-medium">Sair</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      ></Sidebar>

      <div className="menuBar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            className="buttonStyle"
            icon="pi pi-align-justify"
            onClick={() => setVisible(true)}
          />

          <span className="font-bold text-base">Ilumeo</span>
        </div>
      </div>
      <div className="HeaderPage">
        <Toast ref={toast} />
      </div>
    </div>
  );

  const deskHeader = (
    <>
      <div className="HeaderPage min-h-screen flex relative surface-ground">
        <div
          style={{ background: '#fff', width: '5rem', height: '100vh' }}
        ></div>
        <div
          id="app-sidebar-2"
          className={`surface-section h-screen lg:block flex-shrink-0 absolute left-0 top-0 z-5 border-right-1 surface-border select-none ${visible ? 'expandedDesktop fadeinleft-animation animation-duration-200' : 'notExpandedDesktop fadeinright-animation animation-duration-200'}`}
        >
          {visible ? (
            <>
              <div className="flex flex-column h-full">
                <div className="flex align-items-center justify-content-between mt-5 flex-shrink-0">
                  <span className="font-bold text-base mr-1 ml-2">Ilumeo</span>
                  <span>
                    <Button
                      type="button"
                      onClick={toggleSidebar}
                      icon="pi pi-angle-left"
                      rounded
                      outlined
                      className="buttonNotExpandDesktop"
                    ></Button>
                  </span>
                </div>

                <div className="userContainerDesktop "></div>

                <div className="overflow-y-auto flex-1">
                  <ul className="list-none p-0 m-0 overflow-hidden px-2">
                    {ContentData &&
                      ContentData.map((item) => (
                        <li key={item.title} className="mb-2">
                          <a
                            className={`menu-item p-2 border-round text-700 w-full no-underline ${item.actualPages ? 'bgButtonActualPageDesktopNotExpanded' : null}`}
                            href={item.url}
                          >
                            {item.iconDesk}
                            <span className="menu-item-text">{item.title}</span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mt-auto px-2 py-2">
                  <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                  <a
                    onClick={() => signOut(history)}
                    className="flex align-items-center cursor-pointer p-2 border-round text-700 w-full no-underline"
                  >
                    <MdLogout size={25} />
                    <span className="font-medium pl-2">Sair</span>
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={`flex flex-column h-full`}>
                <div className="flex align-items-center justify-content-between mt-5 flex-shrink-0">
                  <span className="font-bold text-sm mr-1 ml-2">Ilumeo</span>
                  <span>
                    <Button
                      type="button"
                      onClick={toggleSidebar}
                      icon="pi pi-angle-right"
                      rounded
                      outlined
                      className="buttonExpandDesktop"
                    ></Button>
                  </span>
                </div>

                <div className="userContainerDesktop "></div>

                <div className="overflow-y-auto">
                  <ul className="list-none p-0 m-0 overflow-hidden px-2">
                    {ContentData &&
                      ContentData.map((item) => (
                        <li key={item.title} className="mb-2">
                          <a
                            onClick={toggleSidebar}
                            className={`flex align-items-center justify-content-center cursor-pointer p-2 border-round text-700 w-full ${item.actualPages ? 'bgButtonActualPageDesktopNotExpanded' : null}`}
                          >
                            {item.iconNotExpandedDesk}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mt-auto px-2 py-2">
                  <hr className="mb-3 w-full border-top-1 border-none surface-border" />
                  <a
                    onClick={toggleSidebar}
                    className="flex align-items-center justify-content-center cursor-pointer p-2 border-round text-700 w-full"
                  >
                    <MdLogout size={25} />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        <div>
          <Toast ref={toast} />
        </div>
      </div>
    </>
  );

  return window.innerWidth < 768 ? mobileHeader : deskHeader;
}
