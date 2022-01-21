import { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_STATE } from '../default-state';
import { StoreAction } from '../../_enums/store-action';

export type UpdateKafkaLogDirsReducerPayload = PayloadAction<object>;

/**
 * Updates kafkaLogDirs in the store
 * @param state the current store state
 * @param action the action to execute
 * @returns the updated state
 */
export function updateKafkaLogDirsReducer(
    state = DEFAULT_STATE,
    action: UpdateKafkaLogDirsReducerPayload
) {
    if (action.type === StoreAction.UPDATE_KAFKA_LOG_DIRS) {
        console.log(state);
        return { ...action.payload };
    }

    return state;
}
