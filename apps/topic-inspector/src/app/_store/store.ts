import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setKafkaLogDirsReducer } from './_reducers/update-kafka-log-dirs.reducer';

const rootReducer = combineReducers({
    updateKafkaLogDirsReducer: setKafkaLogDirsReducer
});

export const GlobalStore = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof GlobalStore.getState>;
export type AppDispatch = typeof GlobalStore.dispatch;
