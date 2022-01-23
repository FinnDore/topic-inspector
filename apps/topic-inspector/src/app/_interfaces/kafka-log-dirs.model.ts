/**
 * The output from running [kafka-log-dirs](https://docs.cloudera.com/runtime/7.2.1/kafka-managing/topics/kafka-manage-cli-logdir.html).
 */
export interface KafkaLogDirs {
    /**
     * {@property} List of brokers.
     */
    brokers: Broker[];
}

/**
 * A individual broker
 */
export interface Broker {
    /**
     * {@property} The ID of the broker.
     */
    broker: number;
    /**
     * {@property} List of logDirs for the given broker.
     */
    logDirs: LogDir[];
}

/**
 * A individual LogDir
 */
export interface LogDir {
    /**
     * {@property} Indicates if there is a problem with the disk that hosts the topic partition. If an error is detected.
     */
    error: null;
    /**
     * {@property} The location of the log directory (an absolute path).
     */
    logDir: string;
    /**
     * {@property} The partitions on the broker.
     */
    partitions: Partition[];
}

/**
 * A individual Partition ( or topic )
 */
export interface Partition {
    isFuture: boolean;
    /**
     * {@property} The offset lag of the partition.
     */
    offsetLag: number;
    /**
     * {@property} The name of the partition.
     */
    partition: string;
    /**
     * {@property} The size of the partition in bytes
     */
    size: number;
}
