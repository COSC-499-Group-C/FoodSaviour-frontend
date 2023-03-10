

import { useState } from 'react';

function Sidebar() {
  const [activeLink, setActiveLink] = useState(0);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  return (
    <div className="list-group list-group-light">
      <a
        href="#"
        className={`list-group-item list-group-item-action px-3 border-0 ${
          activeLink === 0 ? 'active' : ''
        }`}
        onClick={() => handleLinkClick(0)}
        aria-current="true"
      >
        Date 0
      </a>
      <a
        href="#"
        className={`list-group-item list-group-item-action px-3 border-0 ${
          activeLink === 1 ? 'active' : ''
        }`}
        onClick={() => handleLinkClick(1)}
      >
        Date 1
      </a>
      <a
        href="#"
        className={`list-group-item list-group-item-action px-3 border-0 ${
          activeLink === 2 ? 'active' : ''
        }`}
        onClick={() => handleLinkClick(2)}
      >
        Date 2
      </a>
      <a
        href="#"
        className={`list-group-item list-group-item-action px-3 border-0 ${
          activeLink === 3 ? 'active' : ''
        }`}
        onClick={() => handleLinkClick(3)}
      >
        Date 3
      </a>
    </div>
  );
}

export default Sidebar;