import { Button, IconButton } from '@mui/material';
import React, { useEffect } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export function CustomButton(props: any) {
    const [btnProps, setProps] = React.useState(props)

    useEffect(() => {
        setProps(props);
    }, [props]);

    return (
        <Button
            style={{ width: '100%' }}
            variant="outlined"
            size="small"
            {...btnProps} />

    )
}


export function SaveButton(props: any) {
    const [btnProps, setProps] = React.useState(props)

    useEffect(() => {
        setProps(props);
    }, [props]);

    return (
        <Button
            variant="outlined"
            style={{ width: '100%' }}
            startIcon={<SaveOutlinedIcon />}
            size="small"
            {...btnProps}
        >
            Guardar
        </Button >
    )
}

export function AddButton(props: any) {
    const [btnProps, setProps] = React.useState(props)

    useEffect(() => {
        setProps(props);
    }, [props]);

    return (
        <IconButton
            color='primary'
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            {...btnProps}
        >
            <AddOutlinedIcon />
        </IconButton>
    )
}

export function DeleteButton(props: any) {
    const [btnProps, setProps] = React.useState(props)

    useEffect(() => {
        setProps(props);
    }, [props]);

    return (
        <IconButton
            color='error'
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            {...btnProps}
        >
            <DeleteOutlinedIcon />
        </IconButton>
    )
}

export function EditButton(props: any) {
    const [btnProps, setProps] = React.useState(props)

    useEffect(() => {
        setProps(props);
    }, [props]);

    return (
        <IconButton
            color='warning'
            variant="outlined"
            size="small"
            style={{ width: '100%' }}
            {...btnProps}
        >
            <EditOutlinedIcon />
        </IconButton>
    )
}
