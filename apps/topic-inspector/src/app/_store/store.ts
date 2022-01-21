import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { updateKafkaLogDirsReducer } from './_reducers/update-kafka-log-dirs.reducer';

const rootReducer = combineReducers({
    updateKafkaLogDirsReducer
});

export const GlobalStore = configureStore({
    reducer: rootReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof GlobalStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof GlobalStore.dispatch;
