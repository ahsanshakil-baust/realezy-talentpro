import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Stack } from '@mui/material';
import { Switch } from '@mui/material';
import { Chip } from '@mui/material';

function createData(
    accountTypeName: string,
    updateDate: string,
    permissions: string,
    action: string,
) {
    return { accountTypeName, updateDate, permissions, action };
}

const rows = [
    createData('1 Representative', '01-Sep-2023', 'Sub Account', 'Edit'),
    createData('2 Representative', '01-Sep-2023', 'Sub Account', 'Edit'),
    createData('3 Representative', '01-Sep-2023', 'Sub Account', 'Edit'),
    createData('4 Representative', '01-Sep-2023', 'Sub Account', 'Edit'),

];

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function AccountTypeTable() {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Account Type Name</TableCell>
                        <TableCell>Update Date</TableCell>
                        <TableCell>Permissions</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.accountTypeName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.accountTypeName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.updateDate}
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={1}>
                                    <Chip label="Sub Account" size="small" variant="outlined" />
                                    <Chip label="All Properties" size="small" variant="outlined" />
                                    <Chip label="Messages" size="small" variant="outlined" />
                                    <Chip label="3+" size="small" variant="outlined" />
                                </Stack>
                            </TableCell>
                            <TableCell>
                                <Stack spacing={2} direction="row">
                                    <Button variant="outlined">Edit</Button>
                                    <Button variant="outlined">Remove</Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AccountTypeTable