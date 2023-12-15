import React, { useState } from "react";
import pic1 from "../Images/1.png";
import "../AuthAppComponent/Static/AuthenticationComponent.css";
import { RegisterComponent } from '../AuthAppComponent/RegisterComponent';
import { LoginComponent } from "./LoginComponent";

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

export function AuthenticationComponent() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container-fluid px-2" style={{ height: '100vh' }}>
      <div className="row">
        <div className="pic col-lg-7 col-md-12" style={{ backgroundImage: `url(${pic1})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}></div>
        <div className="col-lg-5 col-md-12" style={{ padding: '12px' }}>
          <div className="card" style={{ width: '100%', height: '100%' }}>
            <div style={{ margin: '0 3px', minHeight: '550px' }}>
              <div style={{ borderBottom: '1px solid #dee2e6' }}>
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <button className={`nav-link ${value === 0 ? 'active' : ''}`} onClick={() => handleChange(null, 0)} style={{ cursor: 'pointer', textTransform: 'none', fontWeight: 'bold' }}>
                      Login
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className={`nav-link ${value === 1 ? 'active' : ''}`} onClick={() => handleChange(null, 1)} style={{ cursor: 'pointer', textTransform: 'none', fontWeight: 'bold' }} >
                      Registration
                    </button>
                  </li>
                </ul>
              </div>
              <TabPanel value={value} index={0}>
                <LoginComponent />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <RegisterComponent />
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
