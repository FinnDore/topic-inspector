import { PayloadAction } from '@reduxjs/toolkit';
import { StoreAction } from '../../_enums/store-action';
import TEST_DATA from '../../../static/kafka-log-dirs-output';
import { environment } from '../../../environments/environment';

export type setKafkaLogDirsReducerPayload = PayloadAction<object>;

/**
 * The default state
 */
export const DEFAULT_STATE = environment.production
    ? null
    : {
          ...TEST_DATA
      };

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
