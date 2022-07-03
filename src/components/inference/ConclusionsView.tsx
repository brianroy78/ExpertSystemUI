import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { TableHeader } from "../custom/CustomTypographys";

export default function ConclusionsView(props_: any) {
    const [props, setProps] = useState(props_)

    useEffect(() => {
    }, [props_]);
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell><TableHeader>Variable</TableHeader></TableCell>
                        <TableCell><TableHeader>Valor</TableHeader></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.conclusions.map((row: any, index: number) => (
                        <TableRow hover key={index}                                            >
                            <TableCell>{row.variable_name}</TableCell>
                            <TableCell>{row.value_name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}