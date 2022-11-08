import Amplify, { API } from 'aws-amplify'
import config from '../aws-exports'
import { withAuthenticator } from '@aws-amplify/ui-react'
import React, { useEffect } from 'react';

Amplify.configure(config);


function Form() {
    const [name, setName] = React.useState('');
    const [birthDate, setBirthDate] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [patients, setPatients] = React.useState([]);

    //fazer otimizacao na renderizacao da lista de patients

    useEffect(() => {
        API.get('patientRegisterAPI', '/patients/name')
            .then((res => setPatients([...patients, ...res])))
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        API.post('patientRegisterAPI', '/patients', {
            body: {
                name,
                birthDate,
                email,
                address
            }
        }).then(() => {
            setPatients([...patients, { name, birthDate, email, address }])
        });
    }

    const deletePatient = (patient) => {
        return patients.filter(obj => obj.name !== patient.name);
    }

    const handleDelete = async (patient) => {
        const response = await API.del('patientRegisterAPI', '/patients/object' + `/${patient.name}/${patient.email}`)
        if (response.data === 'deleted') {
            let newPatients = deletePatient(patient)
            setPatients([...newPatients])
        } else {
            <div>Error</div>
        }
    }

    return (
        <div className="Form">
            <section>
                <form onSubmit={handleSubmit}>
                    <input value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
                    <input value={birthDate} placeholder="Birth-Date" onChange={(e) => setBirthDate(e.target.value)}></input>
                    <input value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                    <input value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)}></input>
                    <button>
                        Add Patient
                    </button>
                </form>
                <table>
                    <thead className='table_header'>
                        <tr>
                            <th>Name</th>
                            <th>Birth Date</th>
                            <th>Email</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody className='table_body'>
                        {patients.map((patient, index) =>
                            <tr key={index}>
                                <td>{patient.name}</td>
                                <td>{patient.birthDate}</td>
                                <td>{patient.email}</td>
                                <td>{patient.address}</td>
                                <td>
                                    <button onClick={() => handleDelete(patient)}
                                    >
                                        Delete Patient
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default withAuthenticator(Form);
