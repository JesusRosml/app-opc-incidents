import PropTypes from 'prop-types';
import { MenuItems } from './MenuItems';
import { CardUser } from './CardUser';

export const NavBarMobile = ({ handelOpenMenu, sections }) => {
    return (
        <div
            onClick={ handelOpenMenu }
            className={`h-screen w-screen absolute top-0 left-0 bg-black bg-opacity-50 z-50`}
        >
            <div
                onClick={ (e) => e.stopPropagation() }
                className="h-screen w-3/5 bg-white absolute top-0 right-0 flex flex-col items-center"
            >
                <CardUser />
                <MenuItems sections={ sections } />
            </div>
        </div>
    );
};

NavBarMobile.propTypes = {
    handelOpenMenu: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired
}
