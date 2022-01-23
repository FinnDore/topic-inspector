import { ThemeMode } from '../_enums/theme-mode';

/**
 * The sate for the global store
 */
export interface State {
    /**
     * {@property} The output from running [kafka-log-dirs](https://docs.cloudera.com/runtime/7.2.1/kafka-managing/topics/kafka-manage-cli-logdir.html)
     */
    kafkaLogDirs: object | null;
    /**
     *  {@property} The current theme mode
     */
    themeMode: ThemeMode;
}
