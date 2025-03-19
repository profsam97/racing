export default  {
    '*.{ts,tsx}': [
        'tsc --skipLibCheck --noEmit',
        'eslint -c .eslintrc.cjs --cache --fix'
    ],
}
