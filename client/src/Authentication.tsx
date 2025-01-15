// import { useNavigate } from "react-router";
import logoOpc from './images/opc-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useFormState } from './hooks/useFormState';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast, Toaster } from 'sonner';

const formStyle = {
  parentDivInput: 'h-12 w-full mb-5 rounded-sm border-2 border-gray-300 flex items-center justify-center',
  input: 'h-full w-4/5 pl-2 outline-none',
  parentDivIcon: 'h-full w-1/5 border-l-2 border-gray-300 bg-gray-100 flex justify-center items-center',
  icon: 'text-gray-300 text-xl'
}

export const Authentication = () => {
  const [ viewPassword, setViewPassword ] = useState( false );
  const { valueInputs, setChangeValueInputs, cleanValueInputs } = useFormState({
    email: '',
    password: ''
  });

  const { email, password } = valueInputs;

  const onChangeValueInputs = ( event: ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = event.target;

    setChangeValueInputs( name, value );
  }

  const changeTypeInput = () => setViewPassword( !viewPassword );

  const onSubmitForm = ( event: FormEvent<HTMLFormElement> ) => {
    const isEmptyOrWhitespace: RegExp = /^\s*$/;
    event.preventDefault();

    if ( isEmptyOrWhitespace.test( email ) ) return toast.error('El campo de correo electronico es obligatorio.');
    if ( isEmptyOrWhitespace.test( password ) ) return toast.error('El campo de contraseña es obligatorio.');
    if ( email.length < 15 ) return toast.error('')
  }

  return (
    <main className="h-screen w-screen flex flex-col lg:flex-row justify-center items-center ">
      <section className="h-1/4 w-full flex justify-center items-center">
        <img className="w-3/5 md:w-2/5" src={ logoOpc } alt="" />
      </section>

      <section className="h-3/4 lg:h-full w-full flex lg:justify-center items-center flex-col lg:border-l-2 lg:border-gray-200">
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

          <button className="h-12 w-full rounded my-5 bg-orange-800 text-white">Iniciar sesión</button>
        </form>

        <Toaster position="bottom-center" richColors />
        <span className='absolute bottom-6 font-semibold text-gray-900 font-sans select-none'>¿Olvidaste tu contraseña?</span>
      </section>
    </main>
  );
};
