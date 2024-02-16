import { createSlice } from '@reduxjs/toolkit';
import { Session } from 'next-auth';

export interface ui {
    isAllUserModalOpen: boolean;
    isMessageOpened: boolean;
    openedMessageId: string | null;
    openedMessageName: string | null;
    currentUsername: string | null;
}

const initialState = {
    isAllUserModalOpen: false,
    openedMessageId: null,
    openedMessageName: null,
    isMessageOpened: false,
    currentUsername: '',
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
        setCurrentUserName: (state, action: { payload: string }) => {
            state.currentUsername = action.payload;
        }
    },
});

export default uiSlice;
