import { createSlice } from '@reduxjs/toolkit';

// Crea uno slice
const loginSlice = createSlice({
  name: 'login', // Nome dello slice
  initialState: {
    isLoggedIn : false, 
    isVerified : false
  }, 

  reducers: {
    // Definisci azioni per manipolare lo stato
    switchIsLoggedIn: (state, action) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    switchIsVerified: (state, action) => {
      state.isVerified = !state.isVerified;
    },
  },
});

// Esporta azioni e riduttori generati da createSlice
export const { switchIsLoggedIn,switchIsVerified  } = loginSlice.actions;
export default loginSlice.reducer;