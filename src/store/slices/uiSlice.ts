import { createSlice } from '@reduxjs/toolkit';

export interface ui {
    isAllUserModalOpen: boolean;
}

const initialState = {
    isAllUserModalOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleAllUserModal: (state) => {
            state.isAllUserModalOpen = !state.isAllUserModalOpen;
        },
    },
});

export default uiSlice;
