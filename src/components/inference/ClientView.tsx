import { Autocomplete, Button, Grid, Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { CustomTypography } from "../custom/CustomTypographys";
import SmallTextField from "../custom/SmallTextField";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { insertClient, listClients } from "../fetcher";


export default function ClientView(props: any) {
    const [value, setValue] = React.useState(0);
    const [clientViewProps, setClientViewProps] = React.useState(props)
    const [client, setClient] = React.useState({
        name: '',
        last_name: '',
        phone_number: '',
        email: ''
    })
    const [clients, setClients] = React.useState<any>([])

    const handleChange = (e: any, index: number) => { setValue(index); };
    const setName = (e: any) => { setClient({ ...client, name: e.target.value }) }
    const setLastName = (e: any) => { setClient({ ...client, last_name: e.target.value }) }
    const setPhoneNumber = (e: any) => { setClient({ ...client, phone_number: e.target.value }) }
    const setEmail = (e: any) => { setClient({ ...client, email: e.target.value }) }

    const createClient = () => {
        insertClient(client, (json: any) => {
            clientViewProps.setUserId(json.data.id)
        })
    }

    const selectClient = (event: any, newValue: string | null) => {
        clientViewProps.setUserId(newValue);
    }

    useEffect(() => {
        setClientViewProps(props);
        listClients((json: any) => {
            setClients(json.data)
        })
    }, [props]);

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <Tabs
                    value={value} onChange={handleChange}
                    centered>
                    <Tab label="Nuevo Cliente" value={0} />
                    <Tab label="Buscar Cliente" value={1} />
                </Tabs>
            </Grid>
            <Grid hidden={value != 0} item xs={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SmallTextField
                            label="Nombres"
                            value={client.name}
                            onChange={setName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SmallTextField
                            label="Apellidos"
                            value={client.last_name}
                            onChange={setLastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SmallTextField
                            label="Número Telefónico"
                            value={client.phone_number}
                            onChange={setPhoneNumber}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SmallTextField
                            label="Email"
                            value={client.email}
                            onChange={setEmail}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            style={{ width: '100%' }}
                            startIcon={<SaveOutlinedIcon />}
                            onClick={createClient}
                        >
                            Guardar
                        </Button >
                    </Grid>
                </Grid>
            </Grid>
            <Grid hidden={value != 1} item xs={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Autocomplete
                            size="small"
                            style={{ width: '100%' }}
                            disablePortal
                            options={clients}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Nombres y Apellidos"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                            getOptionLabel={(option: any) => option.name + " " + option.last_name}
                            onChange={selectClient}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}