export interface KafkaLogDirs {
    brokers: Broker[];
}

export interface Broker {
    broker: number;
    logDirs: LogDir[];
}

export interface LogDir {
    error: null;
    logDir: string;
    partitions: Partition[];
}

export interface Partition {
    isFuture: boolean;
    offsetLag: number;
    partition: string;
    size: number;
}
