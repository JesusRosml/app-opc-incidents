import PropTypes from 'prop-types';
import { NavBar } from '../components/NavBar';
import { FormIncidents } from '../components/incidents/FormIncidents';
import { HistoricalIncidents } from '../components/incidents/HistoricalIncidents';

export const Home = ({ user }) => {
    const { isAdmin, name, surname, secondSurname, id, email, department: { id_department, name_department } } = user;

    return (
        <div className="h-screen w-screen relative">
            <NavBar />

            <main className="h-[93%] w-full flex justify-center relative">
                {
                    ( isAdmin ) ? <FormIncidents /> : <HistoricalIncidents />
                }
            </main>
        </div>
    );
}

Home.propTypes = {
    user: PropTypes.object
}