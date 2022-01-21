import { StoreAction } from '../../_enums/store-action';
import { GlobalStore } from '../store';
import { UpdateKafkaLogDirsReducerPayload } from '../_reducers/update-kafka-log-dirs.reducer';

/**
 * Updates kafkaLogDirs with a new value
 * @param kafkaLogDirs the new value to use
 */
export function updateKafkaLogDirs(
    kafkaLogDirs: UpdateKafkaLogDirsReducerPayload['payload']
): void {
    GlobalStore.dispatch<UpdateKafkaLogDirsReducerPayload>({
        type: StoreAction.UPDATE_KAFKA_LOG_DIRS,
        payload: kafkaLogDirs
    });
}
