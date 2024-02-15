import { createSlice } from '@reduxjs/toolkit';

export interface ui {
    isAllUserModalOpen: boolean;
    isMessageOpened: boolean;
    openedMessageId: string | null;
    openedMessageName: string | null;
}

const initialState = {
    isAllUserModalOpen: false,
    openedMessageId: null,
    openedMessageName: null,
    isMessageOpened: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleAllUserModal: (state) => {
            state.isAllUserModalOpen = !state.isAllUserModalOpen;
        },
        openMessage: (state, action) => {
            state.openedMessageId = action.payload.id;
            state.openedMessageName = action.payload.name;
        },
        closeMessage: (state) => {
            state.openedMessageId = null;
            state.openedMessageName = null;
        },
    },
});

export default uiSlice;
