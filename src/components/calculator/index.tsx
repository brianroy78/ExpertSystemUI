import React, { useEffect } from 'react';

import { Autocomplete, Button, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import SmallTextField from '../custom/SmallTextField';
import { listDevices } from '../fetcher';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Calculator(props_: any) {

    const [props, setProps] = React.useState(props_)
    const [selectedDevices, setSelectedDevices] = React.useState<any>([])
    const [allDevices, setAllDevices] = React.useState<any>([])
    const [devices, setDevices] = React.useState<any>([])
    const [device, setDevice] = React.useState<any>(null)
    const [usageTime, setUsageTime] = React.useState<any>(1)
    const [quantity, setQuantity] = React.useState<any>(1)
    const [categories, setCategories] = React.useState<any>([])
    const [category, setCategory] = React.useState<any>(null)


    const removeDevice = (index: number) => {
        let clone = [...selectedDevices];
        clone.splice(index, 1)
        setSelectedDevices(clone)
    }

    const onUsageTimeChange = (event: any) => { setUsageTime(event.target.value) }
    const onQuantityChange = (event: any) => { setQuantity(event.target.value) }
    const onDeviceSelect = (e: any, device: any) => { setDevice(device) }

    const calc = () => {
        let energies = selectedDevices.map((d: any) => d.rated_power * d.time * d.quantity)
        return energies.reduce((a: any, b: any) => a + b, 0) / 1000
    }

    const addDevice = () => {
        setSelectedDevices(
            [...selectedDevices, { ...device, time: usageTime, quantity }].sort(
                (a: any, b: any) => a.category.localeCompare(b.category) ||
                    a.rated_power - b.rated_power ||
                    a.bootstrap_factor - b.bootstrap_factor ||
                    a.quantity - b.quantity ||
                    a.time - b.time
            )

        )
        setCategory(null)
        setDevices([])
        setDevice(null)
        setQuantity(1)
        setUsageTime(1)
    }

    const onCategoryChange = (e: any, category: string) => {
        setCategory(category)
        setDevices(allDevices.filter((d: any) => d.category === category).sort())
        setDevice(null)
    }

    const respond = () => {
        props.respond(calc())
    }

    useEffect(() => {
        listDevices((json: any) => {
            setAllDevices(json.data)
        })
        setProps(props_);
    }, [props_]);

    useEffect(() => {
        let categories_ = allDevices.map((d: any) => d.category).sort()
        categories_ = categories_.filter((i: any, p: number) => categories_.indexOf(i) == p)
        categories_ = categories_
        setCategories(categories_)
    }, [allDevices])

    return (
        <Grid
            container spacing={2}
            justifyContent="center">
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" style={{ textAlign: 'center' }}>Consumo Total: {calc()} KWh</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            disabled={selectedDevices.length < 1}
                            key="scalar-btn"
                            onClick={respond}
                            variant='outlined'
                            style={{ width: '100%' }}
                        >
                            Responder</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            size="small"
                            sx={{ width: '100%' }}
                            disablePortal
                            options={categories}
                            value={category || null}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Categoría*"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password',
                                    }}
                                />
                            )}
                            getOptionLabel={(option: any) => option}
                            onChange={onCategoryChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            size="small"
                            sx={{ width: '100%' }}
                            disablePortal
                            options={devices}
                            isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
                            value={device || null}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Equipo*"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password',
                                    }}
                                />
                            )}
                            getOptionLabel={(option: any) => option.name}
                            onChange={onDeviceSelect}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SmallTextField
                            label="Cantidad*"
                            value={quantity}
                            onChange={onQuantityChange}
                            step="1"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SmallTextField
                            label="Tiempo(hrs)*"
                            value={usageTime}
                            onChange={onUsageTimeChange}
                            step="1"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            disabled={device == null}
                            key="scalar-btn"
                            onClick={addDevice}
                            variant='outlined'
                            style={{ width: '100%' }}
                        >
                            Agregar</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper} style={{ width: '100%' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Categoría</TableCell>
                                <TableCell>Equipo</TableCell>
                                <TableCell>Potencia Nominal</TableCell>
                                <TableCell>Factor de Arranque</TableCell>
                                <TableCell>Potencia Real</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Tiempo (hrs)</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedDevices.map((row: any, index: number) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.rated_power}</TableCell>
                                    <TableCell>{row.bootstrap_factor}</TableCell>
                                    <TableCell>{row.actual_power}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.time}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="error"
                                            size="small"
                                            onClick={() => { removeDevice(index) }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid >
    );
}
