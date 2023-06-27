/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
    },
    plugins: ['@typescript-eslint'],
    root: true,
    ignorePatterns: [
        "examples/",
        "pack/",
        ".eslintrc.js",
        "webpack.config.js"
    ],
    rules: {
        "@typescript-eslint/naming-convention": "warn",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/semi": "warn",
        "curly": "warn",
        "eqeqeq": "warn",
        "no-throw-literal": "warn",
        "semi": "warn"
    }
};
