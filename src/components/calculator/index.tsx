import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper';
import { Button, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import CustomBox from '../custom/CustomBox';

export default function Calculator() {

    const [hardwares, setHardwares] = React.useState<any>([])
    const [selectedHardwares, setSelectedHardwares] = React.useState([])
    const [usageTimes, setUsageTimes] = React.useState<any>([])
    const [selectedUsageTime, setSelectedUsageTime] = React.useState<any>({})

    const addHardware = (hardware: any) => {
        console.log({ ...hardware, time: selectedUsageTime })
        setSelectedHardwares(selectedHardwares.concat({ ...hardware, time: selectedUsageTime }))
    }

    const removeHardware = (index: number) => {
        let clone = [...selectedHardwares];
        clone.splice(index, 1)
        setSelectedHardwares(clone)
    }

    const onUsageTimeChange = (event: any) => {
        console.log(event.target)
        setSelectedUsageTime(event.target.value)
    }

    const calc = () => {
        let energies = selectedHardwares.map((h: any) => h.consumption * h.time)
        return energies.reduce((a: any, b: any) => a + b, 0) / 1000
    }

    useEffect(() => {
        setHardwares([
            { name: 'Heladera Grande', consumption: 180 },
            { name: 'Heladera Pequeña', consumption: 120 },
            { name: 'Aire Acondicionado Grande', consumption: 350 },
            { name: 'Aire Acondicionado pequeño', consumption: 210 },
        ])
        setUsageTimes([1, 2, 4, 8, 16, 24])
        setSelectedUsageTime(1)
    }, []);

    return (
        <div style={{ display: 'flex', margin: 'auto' }}>
            <CustomBox style={{ borderStyle: "solid", padding: '20px', borderWidth: '1px' }} >
                <Typography variant="h6" style={{ display: ' inline-block' }}>Tiempo de consumo (hrs)</Typography>
                <Select
                    value={selectedUsageTime || ""}
                    label="Tiempo"
                    onChange={onUsageTimeChange}
                    defaultValue={1}
                >
                    {usageTimes.map((time: any) => (
                        <MenuItem key={time} value={time}>{time}</MenuItem>
                    ))}
                </Select>
                <TableContainer component={Paper}>
                    <Typography variant="h6">Equipos</Typography>
                    <Table aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Equipo</TableCell>
                                <TableCell>Consumo (Wh)</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hardwares.map((row: any, index: number) => (
                                <TableRow
                                    key={index.toString()}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell component="th" scope="row">{row.consumption}</TableCell>
                                    <TableCell component="th" scope="row">
                                        <Button onClick={() => { addHardware(row) }}>Agregar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CustomBox>
            <CustomBox style={{ borderStyle: "solid", padding: '20px', borderWidth: '1px 1px 1px 0px' }} >
                <Typography variant="h6" style={{ display: ' inline-block' }}>Consumo Total: {calc()} KWh</Typography>
                <TableContainer component={Paper}>
                    <Typography variant="h6">Equipos Seleccionados</Typography>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Equipo</TableCell>
                                <TableCell>Consumo (Wh)</TableCell>
                                <TableCell>Tiempo (hr)</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedHardwares.map((row: any, index: number) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.consumption}</TableCell>
                                    <TableCell>{row.time}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => { removeHardware(index) }}>Quitar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CustomBox>
        </div>
    );
}
