import { StoreAction } from '../../_enums/store-action';
import { GlobalStore } from '../store';
import { setKafkaLogDirsReducerPayload } from '../_reducers/update-kafka-log-dirs.reducer';

/**
 * Sets kafkaLogDirs to the given value
 *
 * @param kafkaLogDirs the new value to use
 * @returns {void}
 */
export function setKafkaLogDirs(
    kafkaLogDirs: setKafkaLogDirsReducerPayload['payload']
): void {
    GlobalStore.dispatch<setKafkaLogDirsReducerPayload>({
        type: StoreAction.UPDATE_KAFKA_LOG_DIRS,
        payload: kafkaLogDirs
    });
}
