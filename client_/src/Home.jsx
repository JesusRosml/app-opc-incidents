import PropTypes from 'prop-types';

export const Home = ({ user }) => {
    console.log( user );
    return (
        <div>
            <h1>Bienvenido { user.name } { user.surname } { user.secondSurname }</h1>
            <h2>Rol: { ( user.isAdmin ) ? 'Administrador' : 'Usuario' }</h2>
        </div>
    );
}

Home.propTypes = {
    user: PropTypes.object
}