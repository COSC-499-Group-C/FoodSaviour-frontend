import React, { useEffect, useState } from 'react';
import {
  MDBDropdownToggle,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';
import axiosInstance from '../axios';

function RoleDropdown(props) {
  const [name, setName] = useState('Select Role');
  const [role_id, setRole_id] = useState(1);
  const [roleList, setRoleList] = useState([]);

  const roleName = (e, role_id) => {
    setName(e.target.innerHTML);
    setRole_id(role_id);
    props.onRoleSelected(role_id);
    e.preventDefault();
  }

  function dropDown() {
    return (
      <MDBDropdown group className="mb-3">
        <MDBDropdownToggle onClick={(event) => event.preventDefault()}>
          {name}
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          {roleList
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((role, index) => (
              <MDBDropdownItem key={index} link onClick={(event) => roleName(event, role.id)}>
                {role.name}
              </MDBDropdownItem>
            ))}
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosInstance
      .get('roleName/')
      .then((response) => {
        setRoleList(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }

  return (
    <div>
      {dropDown()}
    </div>
  );
}

export default RoleDropdown;
