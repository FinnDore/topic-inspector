import { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_STATE } from '../default-state';
import { StoreAction } from '../../_enums/store-action';

export type setKafkaLogDirsReducerPayload = PayloadAction<object>;

/**
 * Sets the value of  kafkaLogDirs in the store
 *
 * @param state the current store state
 * @param action the action to execute
 * @returns {object} the updated state
 */
export function setKafkaLogDirsReducer(
    state = DEFAULT_STATE,
    action: setKafkaLogDirsReducerPayload
) {
    if (action.type === StoreAction.UPDATE_KAFKA_LOG_DIRS) {
        return { ...action.payload };
    }

    return state;
}
