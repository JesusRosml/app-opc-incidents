import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";

export const MenuItems = ({ sections }) => {
    const { pathname } = useLocation();

    return (
        <ul className="h-auto w-full relative pl-2">
            {
                sections.map( ( { name, path }, index ) => (
                    <li key={ `${ name }${ index }-nav` } className="py-1 font-medium">
                        <NavLink to={ path } className={ ( pathname === path ) ? 'text-blue-500' : 'text-gray-500' }>
                            { name }
                        </NavLink>
                    </li>
                ) )
            }
        </ul>
    )
}

MenuItems.propTypes = {
    sections: PropTypes.array.isRequired
}
