module.exports = {
    root: true,
    ignorePatterns: ['projects/**/*'],
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: ['tsconfig.json'],
                createDefaultProgram: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:@angular-eslint/recommended',
                'plugin:@angular-eslint/template/process-inline-templates',
                'plugin:@typescript-eslint/recommended',
                'prettier',
            ],
            plugins: ['ban', '@typescript-eslint'],
            rules: {
                'no-constant-condition': [
                    'error',
                    {
                        checkLoops: false,
                    },
                ],
                'eqeqeq': ['error', 'always'],
                'ban/ban': [
                    'error',
                    {
                        name: 'fit',
                        message: 'This function is forbidden',
                    },
                    {
                        name: 'fdescribe',
                        message: 'This function is forbidden',
                    },
                ],
                '@typescript-eslint/explicit-module-boundary-types': 'error',
                '@typescript-eslint/no-explicit-any': 'error',
                'no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars': 'off',
                '@angular-eslint/component-selector': [
                    'error',
                    {
                        prefix: 'app',
                        style: 'kebab-case',
                        type: 'element',
                    },
                ],
                '@angular-eslint/directive-selector': [
                    'error',
                    {
                        prefix: 'app',
                        style: 'camelCase',
                        type: 'attribute',
                    },
                ],
            },
        },
        {
            files: ['**/*.spec.ts'],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
        {
            files: ['**/*.component.ts'],
            rules: {
                '@typescript-eslint/explicit-module-boundary-types': 'off',
            },
        },
        {
            files: ['*.html'],
            extends: ['plugin:@angular-eslint/template/recommended'],
            rules: {},
        },
    ],
};
