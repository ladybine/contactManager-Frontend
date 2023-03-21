import AccountCircle from '@mui/icons-material/AccountCircle'
import React, { useState } from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import {
  Box,
  InputLabel,
  FormControl,
  Input,
  InputAdornment,
  TextField,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { addContacts } from '../../features/contacts/action'

export default function AddContact() {
  const dispatch = useDispatch()
  const [first_name, setFirst_name] = useState('')
  const [middle_name, setMiddle_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [emails, setEmails] = useState([''])
  const [country, setCountry] = useState('')
  const [town, setTown] = useState('')
  const [adress, setAdress] = useState('')
  const [company, setCompany] = useState('')
  const [groupe, setGroupe] = useState('')
  const [flashApId, setFlashApId] = useState('')
  const [phones, setPhones] = useState([''])
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState('')
  const [province, setProvince] = useState('')
  const adding = () => {
    dispatch(
      addContacts({
        first_name,
        last_name,
        middle_name,
        emails,
        country,
        town,
        province,
        adress,
        company,
        groupe,
        flashApId,
        phones,
        status,
        category,
      })
    ),
      setFirst_name('')
    setMiddle_name('')
    setLast_name('')
    setEmails('')
    setCountry('')
    setTown('')
    setAdress('')
    setCompany('')
    setGroupe('')
    setFlashApId('')
    setStatus('')
    setPhones('')
    setCategory('')
    setProvince('')
  }

  return (
    <div>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '18ch' },
        }}
      >
        {/* <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">
            First Name
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />


           value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
        </FormControl> */}
        <TextField
          id="input-with-icon-textfield"
          label="First Name"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Middle Name"
          value={middle_name}
          onChange={(e) => setMiddle_name(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Last Name"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Email"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Téléphone"
          value={phones}
          onChange={(e) => setPhones(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Categorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BedroomChildOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Compagny"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ApartmentOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Pays"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PlaceOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        <TextField
          id="input-with-icon-textfield"
          label="Province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PlaceOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Ville"
          value={town}
          onChange={(e) => setTown(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PlaceOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Adress"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PlaceOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MilitaryTechOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Groupe"
          value={groupe}
          onChange={(e) => setGroupe(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GroupsOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="input-with-icon-textfield"
          label="flashApId"
          value={flashApId}
          onChange={(e) => setFlashApId(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PermIdentityOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Box>
      <button
        className="bg-blue-600 mt-4 px-4 py-2  items-center text-white rounded-md"
        onClick={adding}
      >
        <PermIdentityOutlinedIcon />
        <FontAwesomeIcon icon={faAdd} color="white" className="mr-2" />
        Enregistrer
      </button>
    </div>
  )
}
