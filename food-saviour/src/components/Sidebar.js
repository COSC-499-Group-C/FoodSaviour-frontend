import { useState } from 'react';

function Sidebar() {
  const [activeLink, setActiveLink] = useState(-1);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const links = [
    { text: 'Date 0' },
    { text: 'Date 1' },
    { text: 'Date 2' },
    { text: 'Date 3' },
    { text: 'Date 4' },
    { text: 'Date 5' },
    { text: 'Date 6' },
    { text: 'Date 7' },
    { text: 'Date 8' },
    { text: 'Date 9' },
    { text: 'Date 10' },
  ];

  return (
    <div className="list-group list-group-light" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
      {links.map((link, index) => (
        <a
          key={index}
          href="#"
          className={`list-group-item list-group-item-action px-3 border-0 ${
            activeLink === index ? 'active' : ''
          }`}
          onClick={() => handleLinkClick(index)}
        >
          {link.text}
        </a>
      ))}
    </div>
  );
}

export default Sidebar;