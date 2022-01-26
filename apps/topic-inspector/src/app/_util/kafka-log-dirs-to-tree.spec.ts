import { kafkaLogDirsToTree } from './kafka-log-dirs-to-tree';

describe('KafkaLogDirs', () => {
    it('Parse the kafka log dirs to a tree correctly', () => {
        const dirs = {
            brokers: [
                {
                    broker: 1,
                    logDirs: [
                        {
                            error: null,
                            logDir: '/var/local/kafka/data',
                            partitions: [
                                {
                                    isFuture: false,
                                    offsetLag: 0,
                                    partition: 'CLIENT.TO.BINGO',
                                    size: 100000
                                },
                                {
                                    isFuture: false,
                                    offsetLag: 0,
                                    partition: 'CLIENT.TO.RACOON',
                                    size: 200000
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        const result = kafkaLogDirsToTree(dirs);
        expect(result).toEqual([
            [
                {
                    id: 'root',
                    parent: null,
                    size: null
                },
                {
                    id: 'broker-0-CLIENT.TO.BINGO',
                    parent: 'root',
                    size: 100000,
                    topicSize: '97.66 KB',
                    topicName: 'CLIENT.TO.BINGO'
                },
                {
                    id: 'broker-0-CLIENT.TO.RACOON',
                    parent: 'root',
                    size: 200000,
                    topicSize: '195.31 KB',
                    topicName: 'CLIENT.TO.RACOON'
                }
            ]
        ]);
    });
    it('Parse the kafka log dirs to a tree correctly when no brokers are present', () => {
        const dirs = {
            brokers: []
        };

        const result = kafkaLogDirsToTree(dirs);
        expect(result).toEqual([]);
    });
    it('Parse the kafka log dirs to a tree correctly when some partitions are not present', () => {
        const dirs = {
            brokers: [
                {
                    broker: 1,
                    logDirs: [
                        {
                            error: null,
                            logDir: '/var/local/kafka/data',
                            partitions: []
                        }
                    ]
                },
                {
                    broker: 1,
                    logDirs: [
                        {
                            error: null,
                            logDir: '/var/local/kafka/data',
                            partitions: [
                                {
                                    isFuture: false,
                                    offsetLag: 0,
                                    partition: 'CLIENT.TO.BINGO',
                                    size: 100000
                                },
                                {
                                    isFuture: false,
                                    offsetLag: 0,
                                    partition: 'CLIENT.TO.RACOON',
                                    size: 200000
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        const result = kafkaLogDirsToTree(dirs);
        expect(result).toEqual([
            [
                {
                    id: 'root',
                    parent: null,
                    size: null
                }
            ],
            [
                {
                    id: 'root',
                    parent: null,
                    size: null
                },
                {
                    id: 'broker-1-CLIENT.TO.BINGO',
                    parent: 'root',
                    size: 100000,
                    topicSize: '97.66 KB',
                    topicName: 'CLIENT.TO.BINGO'
                },
                {
                    id: 'broker-1-CLIENT.TO.RACOON',
                    parent: 'root',
                    size: 200000,
                    topicSize: '195.31 KB',
                    topicName: 'CLIENT.TO.RACOON'
                }
            ]
        ]);
    });
});
