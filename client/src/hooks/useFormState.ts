import { useState } from 'react';

interface ReturnUseFormState<T> {
    valueInputs: T;
    setChangeValueInputs: ( name: string, value: string ) => void;
    cleanValueInputs: () => void;
}

export const useFormState = <T extends object>( stateForm: T ): ReturnUseFormState<T> => {
    const [ valueInputs, setValueInputs ] = useState( { ...stateForm } );

    const setChangeValueInputs = ( name: string, value: string  ) => {
        setValueInputs( prevValueIputs => ({
            ...prevValueIputs,
            [ name ]: value
        }));
    }

    const cleanValueInputs = (): void => setValueInputs( stateForm );

    return {
        valueInputs,
        setChangeValueInputs,
        cleanValueInputs
    }
}