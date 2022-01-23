import { State } from './state';
import TEST_DATA from './../../static/kafka-log-dirs-output';
/**
 * The default store state
 */
export const DEFAULT_STATE: State = {
    kafkaLogDirs: { ...TEST_DATA.brokers }
};
