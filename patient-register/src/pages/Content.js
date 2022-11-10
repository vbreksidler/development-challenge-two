import Amplify, { API } from 'aws-amplify'
import config from '../aws-exports'
import { withAuthenticator } from '@aws-amplify/ui-react'
import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { useForm } from "react-hook-form"
import { regexAddress, regexDate, regexEmail, regexName } from '../utils/regex'

Amplify.configure(config);

function Content() {
    // mudar para context se possivel
    const [name, setName] = React.useState('');
    const [birthDate, setBirthDate] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [patients, setPatients] = React.useState([]);
    const [edit, setEdit] = React.useState(false)
    const [add, setAdd] = React.useState(false)
    const [newBirthDate, setNewBirthDate] = React.useState('')
    const [newAddress, setNewAddress] = React.useState('')
    const [newButton, setNewButton] = React.useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        API.get('patientRegisterAPI', '/patients/name')
            .then((res => setPatients([...patients, ...res])))
    }, []);

    const isValidEmail = (emails) => {
        if (emails.find((e) => e === email)) {
            setEmail('This email is already registered, try another one!')
        }
    }

    const onSubmit = () => {
        API.post('patientRegisterAPI', '/patients', {
            body: {
                name,
                birthDate,
                email,
                address
            }
        }).then(() => {
            setPatients([...patients, { name, birthDate, email, address }])
        }).then(
            setAdd(false),
            setNewButton(true));
    }

    const handleSubmitEdit = () => {
        const response = API.put('patientRegisterAPI', '/patients', {
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

    const handleDelete = async (patient) => {
        const response = await API.del('patientRegisterAPI', '/patients/object' + `/${patient.name}/${patient.email}`)
        if (response.data === 'deleted') {
            let newPatients = patients.filter(obj => obj.name !== patient.name)
            setPatients([...newPatients])
        } else {
            <div>Error</div>
        }
    }

    const addEditForm = () => {
        if (edit) {
            let editField =
                <form onSubmit={handleSubmit(handleSubmitEdit)}>
                    <input className={styles.input} value={name} placeholder={name} disabled></input>
                    <input
                        {...register("newBirthDate", {
                            required: true,
                            pattern: regexDate,
                        })}
                        value={newBirthDate}
                        placeholder="New Birth-Date"
                        onChange={(e) => setNewBirthDate(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        {...register("newAddress", {
                            required: true,
                            pattern: regexAddress,
                        })}
                        value={newAddress}
                        placeholder="New Address"
                        onChange={(e) => setNewAddress(e.target.value)}
                        className={styles.input}
                    />
                    <button>
                        Save
                    </button>
                    <div className={styles.span_content}>
                        {errors.newBirthDate?.type === 'required' && <span className={styles.span_}> Birth-date field is required.</span>}
                        {errors.newBirthDate?.type === 'pattern' && <span className={styles.span_}> Invalid date, please use the format: 12/01/1994</span>}
                        {errors.newAddress?.type === 'required' && <span className={styles.span_}> Address field is required.</span>}
                        {
                            errors.newAddress?.type === 'pattern' && <span> Invalid date, please use the format:
                                Rua Exemplo, 999 - apt454, Bairro - Cidade, Estado
                            </span>
                        }
                    </div>
                </form>
            return editField
        } else {
            let editField = null
            return editField
        }
    }

    const addNewPatient = () => {
        const validationEmail = patients.map(e => `${e.email}`)
        if (add) {
            let addField =
                <section>
                    <form className={styles.form_add_new_patient} onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("name", {
                                required: true,
                                pattern: regexName,
                            })}
                            value={name}
                            placeholder="Full Name"
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                        />
                        <input
                            {...register("email", {
                                required: true,
                                pattern: regexEmail,
                            })}
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                        />
                        <input
                            {...register("birthDate", {
                                required: true,
                                pattern: regexDate,
                            })}
                            value={birthDate}
                            placeholder="Birth-Date"
                            onChange={(e) => setBirthDate(e.target.value)}
                            className={styles.input}
                        />
                        <input
                            {...register("address", {
                                required: true,
                                pattern: regexAddress,
                            })}
                            value={address}
                            placeholder="Address"
                            onChange={(e) => setAddress(e.target.value)}
                            className={styles.input}
                        />
                        <a href="#down">
                            <button onClick={isValidEmail(validationEmail)}>
                                Add Patient
                            </button>
                        </a>
                    </form>
                    <div className={styles.span_content}>
                        {errors.name?.type === 'required' && <span className={styles.span_}> Name field is required.</span>}
                        {errors.name?.type === 'pattern' && <span className={styles.span_}> Please insert your full name.</span>}
                        {errors.email?.type === 'required' && <span className={styles.span_}> Email field is required.</span>}
                        {errors.email?.type === 'pattern' && <span className={styles.span_}> Invalid email, please use the format: your_email@hotmail.com</span>}
                        {errors.birthDate?.type === 'required' && <span className={styles.span_}> Birth-date field is required.</span>}
                        {errors.birthDate?.type === 'pattern' && <span className={styles.span_}> Invalid date, please use the format: 12/01/1994</span>}
                        {errors.address?.type === 'required' && <span className={styles.span_}> Address field is required.</span>}
                        {errors.address?.type === 'pattern' && <span className={styles.span_}> Invalid date, please use the format:
                            Rua Exemplo, 999 - apt454, Bairro - Cidade, Estado
                        </span>}
                    </div>
                </section>
            return addField
        }
    }

    const addButtonAddNewPatient = () => {
        if (newButton) {
            let newPatient =
                <button className={styles.button_add} onClick={() => {
                    setAdd(true)
                    setNewButton(false)
                }}
                >
                    Add New Patient
                </button>
            return newPatient
        }
    }


    return (
        <div className={styles.content}>
            Patients Manager
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Birth Date</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) =>
                        <tr key={index}>
                            <td>{patient.name}</td>
                            <td>{patient.birthDate}</td>
                            <td>{patient.email}</td>
                            <td>{patient.address}</td>
                            <td>
                                <button className={styles.button_table_del} onClick={() => handleDelete(patient)}
                                >
                                    Delete
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
                                    Edit
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>{addEditForm()}</div>
            <div>{addButtonAddNewPatient()}</div>
            <div>
                {addNewPatient()}
            </div>
        </div>
    );
}

export default withAuthenticator(Content);
