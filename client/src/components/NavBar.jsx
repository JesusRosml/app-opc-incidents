import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logoOpc from '../images/opc-logo.svg';
import { NavBarMobile } from './navigation-bar/NavBarMobile';

const sections = [
    {
        name: 'Incidencias',
        path: '/home'
    },
    {
        name: 'Solicitudes de mantenimiento',
        path: '/maintenance-requests'
    },
    {
        name: 'Historial',
        path: '/history'
    }
];

export const NavBar = () => {
    const [ isOpen, setIsOpen ] = useState( false );

    const handelOpenMenu = () => setIsOpen( !isOpen );

    return (
        <header className="h-[7%] w-full relative border-b-2 border-gray-100">
            <nav className="h-full w-full flex items-center justify-between px-5">
                <img className="w-1/4 absolute left-2 md:w-2/5" src={ logoOpc } alt="Logo de OPC Ingeniería y Construcción" />

                <ul className="hidden">

                </ul>

                <div className="h-9 w-9 absolute right-2 flex items-center justify-center rounded-full hover:bg-gray-200">
                    <button onClick={ handelOpenMenu }>
                        <FontAwesomeIcon icon={ faBars } className="text-black text-xl" />
                    </button>
                </div>

                {
                    ( isOpen ) && <NavBarMobile handelOpenMenu={ handelOpenMenu } sections={ sections } />
                }
            </nav>
        </header>
    )
}
