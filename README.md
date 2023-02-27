# playwright-repro-repo-for-wrong-line
Repro-repo for playwright bug related to wrong line being shown by inspector when run from mocha with typescript

`npm test` - reproduces the bug: the inspector will show wrong line on pause() and wrong line will be reported when test fails

`npm run test:ok` - does not reproduce the bug: the inspector works as expected 

If the [test/wrong-line.uitest.ts](test/wrong-line.uitest.ts) is commented out then 
the [test/correct-line.test.ts](test/correct-line.test.ts) is reporting correct line for assertion fail. 

Including Playwright test causes also the test/correct-line.test.ts to report wrong line for assertion fail.
