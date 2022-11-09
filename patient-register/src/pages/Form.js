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
    const [edit, setEdit] = React.useState(false)
    const [add, setAdd] = React.useState(false)
    const [newBirthDate, setNewBirthDate] = React.useState('')
    const [newAddress, setNewAddress] = React.useState('')


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
        }).then(setAdd(false));
    }

    const handleSubmitEdit = async e => {
        e.preventDefault()
        const response = await API.put('patientRegisterAPI', '/patients', {
            body: {
                name,
                birthDate: newBirthDate,
                email,
                address: newAddress
            }
        })
        if (response.success === "put call succeed!") {
            setEdit(false)
            setPatients([...patients, { name, birthDate, email, address }])
            // por enquanto vou utilizar o reload para atualizar a tabela
            window.location.reload()
        } else {
            <span>Edit Failed</span>
        }
    }

    const addEditForm = () => {
        if (edit) {
            let editField =
                <form onSubmit={handleSubmitEdit}>
                    <input value={name} placeholder={name} disabled></input>
                    <input value={newBirthDate} placeholder="New Birth Date" onChange={(e) => setNewBirthDate(e.target.value)}></input>
                    <input value={newAddress} placeholder="New Address" onChange={(e) => setNewAddress(e.target.value)}></input>
                    <button>
                        Save
                    </button>
                </form>
            return editField
        } else {
            let editField = null
            return editField
        }
    }


    const handleDelete = async (patient) => {
        const response = await API.del('patientRegisterAPI', '/patients/object' + `/${patient.name}/${patient.email}`)
        if (response.data === 'deleted') {
            let newPatients = patients.filter(obj => obj.name !== patient.name)
            setPatients([...newPatients])
        } else {
            <div>Error</div>
        }
    }

    const addNewPatient = () => {
        if (add) {
            let addField =
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
                </section>
            return addField
        }
    }


    return (
        <div className="Form">
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
                            <td>
                                <button onClick={() => {
                                    setEdit(true)
                                    setName(patient.name)
                                    setBirthDate(patient.birthDate)
                                    setEmail(patient.email)
                                    setAddress(patient.address)
                                }}
                                >
                                    Edit Patient
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>{addEditForm()}</div>
            <button onClick={() => setAdd(true)}
            >
                Add New Patient
            </button>
            <div>
                {addNewPatient()}
            </div>
        </div>
    );
}

export default withAuthenticator(Form);
