import SidebarMenu from 'react-bootstrap-sidebar-menu';

function Sidebar() {
    return (
        <ul className="list-group list-group-light">
            <li className="list-group-item px-3 border-0 active" aria-current="true">
                An active item
            </li>
            <li className="list-group-item px-3 border-0">A second item</li>
            <li className="list-group-item px-3 border-0">A third item</li>
            <li className="list-group-item px-3 border-0">A fourth item</li>
            <li className="list-group-item px-3 border-0">And a fifth one</li>
        </ul>
    )
}

export default Sidebar;