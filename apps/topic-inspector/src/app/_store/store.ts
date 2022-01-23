import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setKafkaLogDirsReducer } from './_reducers/update-kafka-log-dirs.reducer';
import { updateThemeReducer } from './_reducers/update-theme.reducer';

const rootReducer = combineReducers({
    updateKafkaLogDirsReducer: setKafkaLogDirsReducer,
    themeMode: updateThemeReducer
});

export const GlobalStore = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof GlobalStore.getState>;
export type AppDispatch = typeof GlobalStore.dispatch;
