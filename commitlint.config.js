const Configuration = {

    extends: ['@commitlint/config-conventional'],
    parserPreset: 'conventional-changelog-atom',
    formatter: '@commitlint/format',
};

export default Configuration;
