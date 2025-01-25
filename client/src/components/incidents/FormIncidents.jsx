import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SearchUser } from './SearchUser';

export const FormIncidents = () => {
    const [ isActiveSearhcUser, setIsActiveSearchUser ] = useState( false );
    const [ userIncident, setUserIncident ] = useState( null );

    const onActiveSearchUser = () => setIsActiveSearchUser( !isActiveSearhcUser );
    const setUserIncidentState = ( user ) => setUserIncident( user );

    console.log( userIncident );

    return (
        <div className="h-full w-11/12">
            <h1 className="font-sans font-bold text-base pt-5 pb-3">Crear incidencia</h1>

            <p className="font-sans text-base">Por favor, complete todos los campos requeridos para autorizar la incidencia.</p>

            <div className="h-auto w-full flex flex-col mt-5">
                <span className="font-sans font-bold text-sm text-gray-500">Usuario al que se realizara la incidencia:</span>

                <button onClick={ onActiveSearchUser } className="h-auto w-11/12 flex items-center bg-slate-200 border border-gray-300 rounded mt-3 ">
                    <FontAwesomeIcon icon={ faMagnifyingGlass } className="text-gray-700 pl-3 pr-2 py-3" />

                    <span className="font-sans text-gray-500 font-semibold">Buscar Usuario</span>
                </button>
            </div>

            {
                ( isActiveSearhcUser ) && <SearchUser setUserIncidentState={ setUserIncidentState } onActiveSearchUser={ onActiveSearchUser } />
            }
        </div>
    )
}
