module.exports = {
    // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
    // This option interrupts the configuration hierarchy at this file
    // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
    root: true,

    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module' // Allows for the use of imports
    },

    env: {
        browser: true,
        node: true,
        'vue/setup-compiler-macros': true
    },

    // Rules order is important, please avoid shuffling them
    extends: [
        // Base ESLint recommended rules
        // 'eslint:recommended',

        // Uncomment any of the lines below to choose desired strictness,
        // but leave only one uncommented!
        // See https://eslint.vuejs.org/rules/#available-rules
        'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
        // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
        // 'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

        // https://github.com/prettier/eslint-config-prettier#installation
        // usage with Prettier, provided by 'eslint-config-prettier'.
        'prettier'
    ],

    plugins: [
        // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
        // required to lint *.vue files
        'vue'

        // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
        // Prettier has not been included as plugin to avoid performance impact
        // add it as an extension for your IDE

    ],

    globals: {
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        __statics: 'readonly',
        __QUASAR_SSR__: 'readonly',
        __QUASAR_SSR_SERVER__: 'readonly',
        __QUASAR_SSR_CLIENT__: 'readonly',
        __QUASAR_SSR_PWA__: 'readonly',
        process: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly'
    },

    // add your custom rules here
    // 'no-multi-spaces': ['error'], --> para que me cambie automáticamente cuando pones espacios de más, tipo "params.filter = Object.assign(params.filter,   { bbox: params.bbox })"
    // 'indent': ['error', 2, { 'SwitchCase': 1 }],  --> Esta la pongo para que me indente el código igualito, la parte del SwitchCase para que los cases los indente
    // 'keyword-spacing': ['error', { 'after': true, 'before': true }],  --> Esta la pongo para que cosas como "}else{" me las cambie automaticamente a "} else {"
    // 'key-spacing': ['error', { 'afterColon': true }], --> Esta me quita espacios al asignar valor en propiedades; cambia cosas como  "Object.assign(params.filter, { bbox:    params.bbox })" por "Object.assign(params.filter, { bbox: params.bbox })"
    // 'space-before-blocks': 'error',  --> Obliga a que haya un espacio en los ifs esto "if (this.map){" lo convierte a "if (this.map) {"
    // 'space-infix-ops': 'error',  --> Obliga a que haya espacios alrededor de operador tipo "const a={b:1};" debe ser "const a = {b: 1}"
    // 'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],  --> las strings se ponen con comilla simple y no doble; allowTemplateLiterals permite las definiciones con acento grave (´)
    // 'comma-spacing': ["error", { "before": false, "after": true }], --> Obliga a que haya un espacio después de cada coma
    // 'space-in-parens': ['error', 'never'], --> para que no haya espacios en los parentesis y quitar cosaas como ( a, b) o (a, b )
    // 'no-undef': 'error', --> Obliga a que las variables estén definidas
    rules: {
        'prefer-promise-reject-errors': 'off',
        'no-multi-spaces': ['error'],
        'indent': ['error', 2, { 'SwitchCase': 1 }],
        'keyword-spacing': ['error', { 'after': true, 'before': true }],
        'key-spacing': ['error', { 'afterColon': true }],
        'space-before-blocks': 'error',
        'space-infix-ops': 'error',
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
        'comma-spacing': ['error', { 'before': false, 'after': true }],
        'space-in-parens': ['error', 'never'],
        'no-undef': 'error',

        // allow console.log during development only
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // allow debugger during development only
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}
