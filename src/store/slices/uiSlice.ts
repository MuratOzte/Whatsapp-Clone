import { createSlice } from '@reduxjs/toolkit';

export interface ui {
    isAllUserModalOpen: boolean;
    isMessageOpened: boolean;
    openedMessageId: string | null;
    openedMessageName: string | null;
    currentUsername: string | null;
    enteredMessage: string | null;
    isOptimisticMessageExist: boolean;
}

const initialState = {
    isAllUserModalOpen: false,
    openedMessageId: '',
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
            state.openedMessageId = action.payload.id;
            state.openedMessageName = action.payload.name;
        },
        closeMessage: (state) => {
            state.openedMessageId = '';
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
