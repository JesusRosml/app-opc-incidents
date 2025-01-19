import { useState } from 'react';

export const useRequestPost = () => {
    const [ isLoading, setIsLoading ] = useState( false );

    const sendRequestToServer = async( url, data ) => {
        if ( !url ) throw new Error('El url es obligatorio');
        if ( !data ) throw new Error( 'La data es obligatoria' );

        setIsLoading( true );

        try {
            const request = await fetch( url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( data )
            });

            if ( !request.ok ) throw new Error(`Error: ${ request.status } ${ request.statusText }`);

            const jsonResponse = await request.json();

            return jsonResponse;
        } catch ( error ) {
            console.error( error );

            return {
                message: 'Error interno del servidor, por favor, intentelo mas tarde.',
                authentication: false
            }
        } finally {
            setIsLoading( false );
        }
    }

    return {
        sendRequestToServer,
        isLoading
    }
}