const off   = 'off';
const warn  = 'warn';
const error = 'error';

/*
 * Rules I'm not using, but should look at in the future
 *
 * complexity
 * no-console
 * no-control-regex
 * no-debugger
 * no-empty-pattern
 *   Specifically, are there useful pattern matching tools here?
 * no-div-regex
 * no-prototype-builtins
 * no-unused-labels
 *   I probably don't need this as long as I'm using no-labels
 * valid-jsdoc
 *
 * Rules I'm testing, but may change:
 *
 * guard-for-in
 *   I don't use for-in loops frequently, so I'm not sure about this.
 *   It seems like the new Map and WeakMap types may help you avoid
 *   many of these use cases.
 * no-extend-native
 *   I may need to turn this off if I need to put in some polyfills.
 * no-implicit-coercion
 *   This may take some getting used to. I will be analyzing the code
 *   that this rule forms, and reconsidering this later.
 * no-implicit-globals
 *   I fear this may cause problems with certain polyfills.
 * no-invalid-this
 *   Keep an eye out and make sure that this doesn't interfere with
 *   Crockford-style constructors. (It shouldn't, since he also
 *   advocates not using `this` at all.)
 * no-labels
 *   I'm considering the merits and dangers of labeled code blocks. If
 *   I wind up using them then I would want to avoid this rule. See
 *   no-lone-blocks for examples.
 * no-loop-func
 *   On the one hand, yes. This is an important error to avoid. On the
 *   other hand, `var` could become a useful tool here for threading.
 * no-magic-numbers
 *   I'm not sure if this will get in the way in high level app setup
 *   code. I do agree with this rule for low-level business logic.
 * no-multi-spaces
 *   I tend to change my spacing style based on the context and the
 *   values at hand. I consider this to frequently be a subjective
 *   question. I will see if these rules get in the way or not.
 * no-new-func
 *   I agree with this rule for day-to-day life. I'm wondering if the
 *   Function constructor could be useful for macros or something
 *   though.
 * no-new-wrappers
 *   See, the problem here is that reading these rules gives me so
 *   many ideas for ways to break JS!
 * no-self-assign
 *   I need to see some passing examples with the spread operator
 * no-unused-expressions
 *   I have turned on and allowed the short-circuit and ternary flags. Consider
 *   turning them off.
 *
 */

const errorsAndPractices = {
  'accessor-pairs':               error,
  'array-callback-return':        error,
  'block-scoped-var':             error,
  'comma-dangle':               [ error, 'never' ],
  'consistent-return':            error,
  'curly':                      [ error, 'multi-line' ],
  'default-case':                 error,
  'dot-location':               [ error, 'property' ],
  'dot-notation':                 error,
  'eqeqeq':                       error,
  'guard-for-in':                 error,
  'no-alert':                     error,
  'no-caller':                    error,
  'no-case-declarations':         error,
  'no-cond-assign':             [ error, 'always' ],
  'no-constant-condition':        error,
  'no-dupe-args':                 error,
  'no-dupe-keys':                 error,
  'no-duplicate-case':            error,
  'no-else-return':               error,
  'no-empty':                     error,
  'no-empty-character-class':     error,
  'no-empty-function':            error,
  'no-eq-null':                   error,
  'no-eval':                      error,
  'no-ex-assign':                 error,
  'no-extend-native':             error,
  'no-extra-bind':                error,
  'no-extra-boolean-cast':        error,
  'no-extra-label':               error,
  // Really? Look up the nestedBinaryExpressions option
  'no-extra-parens':            [ error, 'all', {
    nestedBinaryExpressions: false
  }],
  'no-extra-semi':                error,
  'no-fallthrough':               error,
  'no-floating-decimal':          error,
  'no-func-assign':               error,
  'no-implicit-coercion':         error,
  'no-implicit-globals':          error,
  'no-implied-eval':              error,
  'no-inner-declarations':        error,
  'no-invalid-regexp':            error,
  'no-invalid-this':              error,
  'no-irregular-whitespace':      error,
  'no-iterator':                  error,
  'no-labels':                    error,
  'no-lone-blocks':               error,
  'no-loop-func':                 error,
  'no-magic-numbers':             [error, {"ignore": [0, 1]}],
  'no-multi-spaces':            [ error, {
    exceptions: {
      Property: true,
      VariableDeclarator: true,
    //ImportDeclaration: true
    }
  }],
  'no-multi-str':                 error, // Do you really need a string?
  'no-native-reassign':           error,
  'no-negated-in-lhs':            error,
  'no-new':                       error,
  'no-new-func':                  error,
  'no-new-wrappers':              error,
  'no-obj-calls':                 error,
  'no-octal':                     error,
  'no-octal-escape':              error,
  'no-param-reassign':            error,
  'no-proto':                     error,
  'no-redeclare':                 error,
  'no-regex-spaces':              error,
  'no-return-assign':             error,
  'no-script-url':                error,
  'no-self-assign':               error,
  'no-self-compare':              error,
  'no-sequences':                 error,
  'no-sparse-arrays':             error,
  'no-throw-literal':             error,
  'no-unexpected-multiline':      error,
  'no-unmodified-loop-condition': error,
  'no-unreachable':               error,
  'no-unsafe-finally':            error,
  'no-unused-expressions':      [ error, {
    allowShortCircuit: true,
    allowTernary: true
  }],
  'no-useless-call':              error,
  'no-useless-concat':            error,
  'no-useless-escape':            error,
  'no-void':                      error,
  'no-warning-comments':          warn,
  'no-with':                      error,
  'radix':                      [ error, 'as-needed' ],
  'semi':                       [ error, 'always' ],
  'strict':                       error,
  'use-isnan':                    error,
  'valid-typeof':                 error,
  'vars-on-top':                  error,
  'wrap-iife':                  [ error, 'inside' ],
  'yoda':                       [ error, 'never', { exceptRange: true }]
};

// For no-shadow, consider whitelisting the shadowing of resolve and reject.
const variables = {
  'no-shadow':                [ error, {
    builtinGlobals: true,
    hoist: 'all'
  }],
  'no-shadow-restricted-names': error,
  'no-undef':                   error,
  'no-undef-init':              error,
  'no-unused-vars':           [ error, {
    args: 'all',
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_',
    caughtErrors: 'all',
    caughtErrorsIgnorePattern: '^_'
  }],
  'no-use-before-define':       error
};

// In this section I include several rules relating to the common callback
// pattern in node. I intend not to produce APIs that use callbacks in this
// fasion, instead prefering the very similar 'event/listener' pattern, or
// promises. Still, I have added them in case I do come across a situation where
// I wish to use them.
//
// Feel free to turn off no-process-env for one particular file for loading
// environment information. The rule is set to error here for the rest of the
// project.

const nodeCommon = {
  'callback-return':     error,
  'global-require':      error,
  'handle-callback-err': error,
  'no-path-concat':      error,
  'no-process-env':      error,
  'no-process-exit':     error,
  'no-sync':             error
};

// Consider adding an id blacklist using id-blacklist
//
// Max-len can be adjusted if there are lines (like URLs) that just
//   can't be shortened.
//
// Really, be willing to change any of these as my code style develops
//
// newline-per-chained-call feels risky. I'll add it for now with an exception
//   of 2. I may bump that to three.
//
// I like bitwise operators. I have no-bitwise turned off. I don't expect to
//   need them on most of my projects, but I do have a couple ideas where they
//   would come in handy. Use well-written unit tests to cover the concerns of
//   the ability to mistake bitwise operators for their logical siblings.
//
// no-continue may take some getting used to. Give it an honest try.
//
// I also believe that inline comments have their place. Look up
//   no-inline-comments if that belief changes.

const style = {
  'array-bracket-spacing':       [ warn, 'never' ],
  'block-spacing':                 warn,
  'brace-style':                 [ warn, '1tbs', { allowSingleLine: true }],
  'camelcase':                     warn,
  'comma-spacing':                 warn,
  'comma-style':                   warn,
  'computed-property-spacing':     warn,
  'consistent-this':             [ warn, 'self' ],
  'eol-last':                      warn,
  'func-names':                    off, // This breaks with IIFEs
  'func-style':                    warn,
  'indent':                      [ warn, 2, {
    'SwitchCase': 1,
    'VariableDeclarator': { 'var': 2, 'let': 2, 'const': 3 }
  }],
  'key-spacing':                 [ warn, {
    singleLine: {
      beforeColon: false,
      afterColon: true,
    },
    multiLine: {
      align: 'value'
    }
  }],
  'keyword-spacing':               warn,
  'linebreak-style':             [ warn, 'unix' ],
  'lines-around-comment':        [ warn, {
    beforeBlockComment: true,
    beforeLineComment: true
  }],
  'max-depth':                   [ warn, 3 ],
  'max-len':                     [ warn, 80 ],
  'max-lines':                   [ warn, 200 ],
  'max-nested-callbacks':        [ warn, 3 ],
  'max-params':                  [ warn, 3 ],
  'max-statements':                warn, // 10
  'max-statements-per-line':     [ warn, { max: 2 }],
  'new-cap':                       warn,
  'new-parens':                    error,
  'newline-after-var':             warn,
  'newline-before-return':         warn,
  'newline-per-chained-call':    [ warn, { ignoreChainWithDepth: 2 }],
  'no-array-constructor':          warn,
  'no-continue':                   warn,
  'no-lonely-if':                  warn,
  'no-mixed-operators':            warn,
  'no-mixed-spaces-and-tabs':      warn,
  'no-multiple-empty-lines':       warn,
  'no-negated-condition':          error,
  'no-nested-ternary':             error,
  'no-new-object':                 error,
  'no-restricted-syntax':        [ error,
    'ClassBody',
    'ClassDeclaration',
    'ClassExpression'
  ],
  'no-spaced-func':                error,
  'no-trailing-spaces':          [ error, { skipBlankLines: true }],
  'no-unneeded-ternary':           error,
  'no-whitespace-before-property': error,
  'object-curly-newline':        [ warn, { multiline: true }],
  'object-curly-spacing':        [ warn, 'always', {
    objectsInObjects: false,
    arraysInObjects: false
  }],
  'operator-assignment':           warn,
  'operator-linebreak':          [ error, 'none' ],
  'quote-props':                 [ warn,  'as-needed', { numbers: true }],
  'quotes':                      [ error, 'single' ],
  'semi-spacing':                  error,
  'space-before-blocks':           error,
  'space-before-function-paren': [ error, {
    anonymous: 'always',
    named: 'never'
  }],
  'space-in-parens':               warn,
  'space-unary-ops':               warn,
  'spaced-comment':                warn,
  'unicode-bom':                   error
};

const es6 = {
  'arrow-parens':          [ error, 'as-needed' ],
  'arrow-spacing':           error,
  'constructor-super':       error,
  'generator-star-spacing':  error,
  'no-class-assign':         error,
  'no-const-assign':         error,
  'no-dupe-class-members':   error,
  'no-new-symbol':           error,
  'no-this-before-super':    error,
  'no-useless-computed-key': error,
  'no-useless-constructor':  error,
  'no-useless-rename':       error,
  'no-var':                  error,
  'object-shorthand':      [ error, 'always', { avoidQuotes: true }],
  'prefer-arrow-callback':   error,
  'prefer-const':          [ warn,  { ignoreReadBeforeAssign: false }],
  'prefer-reflect':          error,
  'prefer-rest-params':      error,
  'prefer-spread':           error,
  'prefer-template':         error,
  'require-yield':           error,
  'rest-spread-spacing':     error,
  'template-curly-spacing':  error,
  'yield-star-spacing':      error
};

const rules = [
  errorsAndPractices,
  variables,
  nodeCommon,
  style,
  es6
];

module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'sourceType': 'module'
  },
  'rules': Object.assign({}, ...rules)
};
