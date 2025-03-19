export default  {
    '*.{ts,tsx}': [
        () => 'tsc --project tsconfig.app.json --skipLibCheck --noEmit',
        'eslint -c .eslintrc.cjs --cache --fix'
    ],
}
