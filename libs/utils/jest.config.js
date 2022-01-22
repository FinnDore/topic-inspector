module.exports = {
    displayName: 'utils',
    preset: '../../jest.preset.js',
    transform: {
        '^.+\\.[tj]s$': '@swc/jest'
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/libs/utils'
};
