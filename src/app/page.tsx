"use client";
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button as MUIButton, TextField } from '@mui/material';
import { set } from 'react-hook-form';
import Snackbar from '@mui/material/Snackbar';
import Grow, { GrowProps } from '@mui/material/Grow';
import SnackbarAlert from './Snackbar';
export default function Home() {
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfbirth: string;
    gender: string;
    address: string;
  }
  
  const [users, setUsers] = useState<User[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenEdit, setDialogOpenedit] = useState(false);

  const [deleteUserIndex, setDeleteUserIndex] = useState<number | null>(null);
  const [editUserIndex,setEditUserIndex]=useState<number |null>(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('users');
      if (storedData) {
        setUsers(JSON.parse(storedData));
      }
    }
  }, []);
  
  const handleDeleteClick = (index: number) => {
    setDeleteUserIndex(index);
    setDialogOpen(true);
  };
  
  const handleDialogClose = () => {
    setDialogOpen(false);
    setDeleteUserIndex(null);
    setDialogOpenedit(false);
    setEditUserIndex(null);
  };

  
  const handleDialogConfirm = () => {
    if (deleteUserIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers.splice(deleteUserIndex, 1);
      setUsers(updatedUsers);
      setDeleteOpen(true)
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
    handleDialogClose();
  };
  const[editingUser,setEditingUser]=useState<User |null>(null)
  const handleEditClick = (index: number) => {
    setEditUserIndex(index);
    const foundUser = users[index];
    setEditingUser({ ...foundUser }); // Create a copy for editing
    setDialogOpenedit(true);
    console.log('data is ',foundUser)
  };
  const inputStyles = {
    marginBottom: '20px',
  }
  const [editMessage,setEditMessage]=useState<string>('')
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingUser) {
      const { name, value } = e.target;
      setEditingUser({
        ...editingUser,
        [name]: value,
      });
    }
    if(!editingUser)
      {
        setEditMessage('Profile not updated')
      }
  };
  // saving updated user
  const handleEditSave = () => {
    if (editUserIndex !== null && editingUser) {
      const updatedUsers = [...users];
      updatedUsers[editUserIndex] = editingUser;
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      handleDialogClose(); // Close the dialog after saving
      setEditMessage('Profile updated successfully')
    }


    setOpen(true)
  };
  const [open,setOpen]=useState<boolean>(false)
  const[DeleteOpen,setDeleteOpen]=useState<boolean>(false)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center py-3">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center">Welcome To The Home Page</h1>
      </div>
      <TableContainer component={Paper} className="overflow-x-auto">
      <Table size='medium' className="w-full">
      <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.dateOfbirth}</TableCell>
                <TableCell>
                  <div className="flex  gap-4">
                    <button onClick={()=>handleEditClick(index)}>
                      <Image src="/edit.svg" alt="Edit Icon" width={24} height={24} />
                    </button>
                    <button onClick={() => handleDeleteClick(index)}>
                      <Image src="/delete.svg" alt="Delete Icon" width={24} height={24} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        // PaperProps={{ className: 'bg-gray-100' }}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <p>This action cannot be undone.</p>
        </DialogContent>
        <DialogActions>
          <MUIButton onClick={handleDialogConfirm} variant="contained" color="error">
            Yes
          </MUIButton>
          <MUIButton onClick={handleDialogClose} variant="outlined">
            No
          </MUIButton>
        </DialogActions>
      </Dialog>
      {/* edit confirmation  */}
      <Dialog
        open={dialogOpenEdit}
        onClose={handleDialogClose}
        PaperProps={{ className: 'bg-gray-100' }}
        >
                  <DialogTitle>Edit Profile</DialogTitle>
<DialogContent>
<p className='text-base mb-4'>Make changes to your profile here. Click save when you're done.

</p>
<TextField label='First Name' name='firstName' value={editingUser?.firstName} fullWidth sx={inputStyles} onChange={handleEditInputChange}/>
<TextField label='Last Name' name='lastName' value={editingUser?.lastName} fullWidth sx={inputStyles} onChange={handleEditInputChange}/>
<TextField label='Email' name='email' value={editingUser?.email} fullWidth sx={inputStyles} onChange={handleEditInputChange}/>
<TextField label='Password' name='password' value={editingUser?.password} fullWidth sx={inputStyles} onChange={handleEditInputChange}/>

<div className='date edit flex gap-x-5'>
  <label>Date of Birth</label>
<input type="date" className='mb-4' name="dateOfbirth" id="" value={editingUser?.dateOfbirth} onChange={handleEditInputChange}  />
</div>
<TextField label='Address' value={editingUser?.address} onChange={handleEditInputChange} name='address'/>



</DialogContent>
<DialogActions>
  <MUIButton color='success' variant='contained' onClick={handleEditSave}>
    Save
  </MUIButton>
  <MUIButton  color='error' variant='outlined' onClick={handleDialogClose}>
    Cancel
  </MUIButton>
</DialogActions>
        </Dialog>
        {/* edit success */}
        <SnackbarAlert open={open} message={editMessage} onClose={()=>setOpen(false)} severity='success'>

        </SnackbarAlert>

              {/* delete */}
              <SnackbarAlert open={DeleteOpen} message='Deleted successfully' onClose={()=>setDeleteOpen(false)} severity='error'>

              </SnackbarAlert>
             
    </div>
  );
}
