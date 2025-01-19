import { useState } from 'react';

export const useFormState = ( stateForm ) => {
    const [ valueInputs, setValueInputs ] = useState( { ...stateForm } );

    const setChangeValueInputs = ( name, value  ) => {
        setValueInputs( prevValueIputs => ({
            ...prevValueIputs,
            [ name ]: value
        }));
    }

    const cleanValueInputs = () => setValueInputs( stateForm );

    return {
        valueInputs,
        ...valueInputs,
        setChangeValueInputs,
        cleanValueInputs
    }
}