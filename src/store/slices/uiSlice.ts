import { createSlice } from '@reduxjs/toolkit';

export interface ui {
    isAllUserModalOpen: boolean;
    isMessageOpened: boolean;
    openedMessageName: string | null;
    currentUsername: string | null;
    enteredMessage: string | null;
    isOptimisticMessageExist: boolean;
}

const initialState = {
    isAllUserModalOpen: false,
    openedMessageName: null,
    isMessageOpened: false,
    currentUsername: '',
    enteredMessage: '',
    isOptimisticMessageExist: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleAllUserModal: (state) => {
            state.isAllUserModalOpen = !state.isAllUserModalOpen;
        },
        openMessage: (state, action) => {
            state.openedMessageName = action.payload.name;
        },
        closeMessage: (state) => {
            state.openedMessageName = null;
        },
        setCurrentUserName: (state, action: { payload: string }) => {
            state.currentUsername = action.payload;
        },
        setEnteredMessage: (state, action: { payload: string }) => {
            state.enteredMessage = action.payload;
        },
        setIsOptimisticMessageExist: (state, action: { payload: boolean }) => {
            state.isOptimisticMessageExist = action.payload;
        },
    },
});

export default uiSlice;
