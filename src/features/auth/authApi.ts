import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'
import axiosInstance from '../../utils/axiosInstance'

interface LoginCredentials {
  email: string
  password: string
}

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://api.pasuseva.thundergits.com/api/auth/login', credentials)
      console.log(response.data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred')
    }
  }
)

