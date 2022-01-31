import { Schema, Validator } from 'jsonschema';

const partitionSchema: Schema = {
    id: '/partition',
    type: 'object',
    properties: {
        partition: { required: true, type: 'string' },
        size: { required: true, type: 'number' }
    }
};

const logDirSchema: Schema = {
    id: '/logdir',
    type: 'object',
    properties: {
        partitions: {
            required: true,
            type: 'array',
            items: { $ref: '/partition' }
        }
    }
};

const brokerSchema = {
    id: '/broker',
    type: 'object',
    properties: {
        logDirs: { required: true, type: 'array', items: { $ref: '/logdir' } },
        broker: { required: true, type: 'number' }
    }
};

const KafkaLogDirsSchema = {
    id: '/KafkaLogDirs',
    type: 'object',
    properties: {
        brokers: { required: true, type: 'array', items: { $ref: '/broker' } }
    }
};

const validator = new Validator();
validator.addSchema(partitionSchema, '/partition');
validator.addSchema(logDirSchema, '/logdir');
validator.addSchema(brokerSchema, '/broker');
validator.addSchema(KafkaLogDirsSchema, '/KafkaLogDirs');

/**
 * Validates the given object against the json schema of kafka log dirs.
 *
 * @param kafkaLogDirs the object to validate
 * @returns {boolean} indicating wether the object is a valid kafka log dirs
 */
export function validateKafkaLogDirs(kafkaLogDirs: object): boolean {
    const result = validator.validate(kafkaLogDirs, KafkaLogDirsSchema);
    return result.valid;
}
