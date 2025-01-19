import { useNavigate } from 'react-router';
import logoOpc from './images/opc-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useFormState } from './hooks/useFormState';
import { toast, Toaster } from 'sonner';
import { useState } from 'react';
import { useRequestPost } from './hooks/useRequestPost';
import PropTypes from 'prop-types';

const formStyle = {
  parentDivInput: 'h-12 w-full mb-5 rounded-sm border-2 border-gray-300 flex items-center justify-center',
  input: 'h-full w-4/5 pl-2 outline-none',
  parentDivIcon: 'h-full w-1/5 border-l-2 border-gray-300 bg-gray-100 flex justify-center items-center',
  icon: 'text-gray-300 text-xl'
}

const URL = 'http://127.0.0.1:8000/api/auth/';
const isEmptyOrWhitespace = /^\s*$/;

export const Authentication = ({ setUserState }) => {
  const navigate = useNavigate();
  const [ viewPassword, setViewPassword ] = useState( false );
  const { isLoading, sendRequestToServer } = useRequestPost();
  const { email, password, setChangeValueInputs, cleanValueInputs } = useFormState({ email: '', password: '' });

  const onChangeValueInputs = ( event ) => {
    const { name, value } = event.target;

    setChangeValueInputs( name, value );
  }

  const changeTypeInput = () => setViewPassword( !viewPassword );

  const onSubmitForm = async( event ) => {
    event.preventDefault();

    if ( isEmptyOrWhitespace.test( email ) ) return toast.error('El campo de correo electrónico es obligatorio.');
    if ( isEmptyOrWhitespace.test( password ) ) return toast.error('El campo de contraseña es obligatorio');
    if ( email.length < 15 ) return toast.error('El correo electrónico no debe ser menor a 15 caracteres');
    if ( password.length < 5 ) return toast.error('La contraseña no debe ser menor a 5 caracteres');

    try {
      const response = await sendRequestToServer( URL, { email, password } );
      const { message, authentication, user } = response;

      if ( !authentication ) return toast.error( message );

      const USER = {
        id: user.User_id,
        name: user.Nombre,
        surname: user.Primer_apellido,
        secondSurname: user.Segundo_apellido,
        email: user.correo_electronico,
        isAdmin: user.isadmin,
        department: {
          id_department: user.id_departamento,
          name_department: user.nombre_departamento
        }
      }

      setUserState( USER );

      cleanValueInputs();
      navigate('/home');
    } catch ( error ) {
      toast.error('Error interno del servidor, por favor, intentelo mas tarde.');
      console.error( error );
    }
  }

  return (
    <main className="h-screen w-screen flex flex-col lg:flex-row justify-center items-center">
      <section className="h-1/4 w-full flex justify-center items-center">
        <img className="w-3/5 md:w-2/5" src={ logoOpc } alt="" />
      </section>

      <section
        className="h-3/4 lg:h-full w-full flex lg:justify-center items-center flex-col lg:border-l-2 
        lg:border-gray-200">
        <h1 className="text-2xl font-bold font-sans">Inicia sesión</h1>
        <p className="font-sans">Acceder al sistema de información</p>

        <form className="mt-10 h-auto w-11/12 md:w-3/4 flex flex-col justify-center items-center" onSubmit={ onSubmitForm } >
          <div className={ formStyle.parentDivInput }>
            <input
              className={ formStyle.input }
              onChange={ onChangeValueInputs }
              value={ email }
              type="email"
              name="email"
              placeholder="Correo electrónico"
            />

            <div className={ formStyle.parentDivIcon } >
              <FontAwesomeIcon icon={ faEnvelope } className={ formStyle.icon } />
            </div>
          </div>

          <div className={ formStyle.parentDivInput }>
            <input
              className={ formStyle.input }
              onChange={ onChangeValueInputs }
              value={ password }
              type={ ( !viewPassword ) ? "password" : "text" }
              name="password"
              placeholder="Contraseña"
            />

            <div className={ formStyle.parentDivIcon }>
              <FontAwesomeIcon icon={ faLock } className={ formStyle.icon } />
            </div>
          </div>

          <div className="h-10 w-full flex items-center">
            <input onChange={ changeTypeInput } className="h-5 w-5 mr-3" type="checkbox" name="viewPassword" id="viewPassword" />
            <label htmlFor="viewPassword" className="font-sans font-medium text-gray-500 select-none">Mostrar contraseña</label>
          </div>

          <button className="h-12 w-full rounded my-5 bg-orange-800 text-white" disabled={ ( isLoading ) ? true : false }>{ ( isLoading ) ? 'Cargando...' : 'Iniciar sesión' }</button>
        </form>

        <Toaster position="bottom-center" richColors />
        <span className='absolute bottom-6 font-semibold text-gray-900 font-sans select-none'>¿Olvidaste tu contraseña?</span>
      </section>
    </main>
  );
};

Authentication.propTypes = {
  setUserState: PropTypes.func.isRequired
};
