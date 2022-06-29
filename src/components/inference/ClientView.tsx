import { Autocomplete, Button, Grid, Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect } from "react";
import SmallTextField from "../custom/SmallTextField";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { insertClient, listClients } from "../fetcher";


export default function ClientView(props: any) {
    const [value, setValue] = React.useState(0);
    const [clientViewProps, setClientViewProps] = React.useState(props)
    const [client, setClient] = React.useState({
        id: null,
        name: '',
        last_name: '',
        phone_number: '',
        email: ''
    })
    const [clients, setClients] = React.useState<any>([])
    const [selectedClient, setSelectedClient] = React.useState<any>(null)

    const handleChange = (e: any, index: number) => { setValue(index); };
    const setName = (e: any) => { setClient({ ...client, name: e.target.value }) }
    const setLastName = (e: any) => { setClient({ ...client, last_name: e.target.value }) }
    const setPhoneNumber = (e: any) => { setClient({ ...client, phone_number: e.target.value }) }
    const setEmail = (e: any) => { setClient({ ...client, email: e.target.value }) }

    const createClient = () => {
        insertClient(client, (json: any) => {
            clientViewProps.setClientId({ ...client, id: json.data.id })
        })
    }

    const selectClient = (event: any, newValue: any) => { setClient(newValue) }
    const selectClientId = () => { clientViewProps.setClientId(client) }

    const clear = () => {
        setClient({
            id: null,
            name: '',
            last_name: '',
            phone_number: '',
            email: ''
        })
    }

    useEffect(() => {
        setClientViewProps(props);
        listClients((json: any) => {
            setClients(json.data)
        })
    }, [props]);

    return (
        <Grid container justifyContent="center" className='regular-container'>
            <Grid item xs={12}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Nuevo Cliente" value={0} onClick={clear} />
                    <Tab label="Buscar Cliente" value={1} onClick={clear} />
                </Tabs>
            </Grid>
            <Grid hidden={value !== 1} item xs={12}>
                <Autocomplete
                    size="small"
                    disablePortal
                    options={clients}
                    value={selectedClient || null}
                    sx={{ width: '100%' }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Nombres y Apellidos"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }}
                        />
                    )}
                    getOptionLabel={(option: any) => option.name + " " + option.last_name}
                    onChange={selectClient}
                />
            </Grid>
            <Grid item xs={12}>
                <SmallTextField
                    label="Nombres"
                    value={client.name}
                    onChange={setName}
                    disabled={value === 1}

                />
            </Grid>
            <Grid item xs={12}>
                <SmallTextField
                    label="Apellidos"
                    value={client.last_name}
                    onChange={setLastName}
                    disabled={value === 1}
                />
            </Grid>
            <Grid item xs={12}>
                <SmallTextField
                    label="Número Telefónico"
                    value={client.phone_number}
                    onChange={setPhoneNumber}
                    disabled={value === 1}
                />
            </Grid>
            <Grid item xs={12}>
                <SmallTextField
                    label="Email"
                    value={client.email}
                    onChange={setEmail}
                    disabled={value === 1}
                />
            </Grid>
            <Grid hidden={value !== 0} item xs={12}>
                <Button
                    variant="outlined"
                    style={{ width: '100%' }}
                    endIcon={<SaveOutlinedIcon />}
                    onClick={createClient}
                >
                    Guardar
                </Button >
            </Grid>
            <Grid hidden={value !== 1} item xs={12}>
                <Button
                    disabled={client.id == null}
                    variant="outlined"
                    style={{ width: '100%' }}
                    endIcon={<CheckIcon />}
                    onClick={selectClientId}
                >
                    Seleccionar
                </Button >
            </Grid>
        </Grid>
    )
}