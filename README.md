# Starter template for simple lit projects built with Vite

> Created with `npm create vite@latest vite-app-lit -- --template lit` by [rudifa](https://github.com/rudifa) and tweaked.

References:

[Vite
Next Generation Frontend Tooling](https://vitejs.dev/)

[Getting Started](https://vitejs.dev/guide/)

[Vite.js Tutorial – How to Install and Use Vite in Your Web Projects](https://www.freecodecamp.org/news/get-started-with-vite/)

## Using decorators in vite project

1. add dependencies
   npm i @babel/plugin-proposal-decorators --save-dev
   npm i @babel/plugin-proposal-class-properties --save-dev
   npm i vite-plugin-babel --save-dev

2. vite.config.js: add babel settings

```
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: [
          [
            "@babel/plugin-proposal-decorators",
            { decoratorsBeforeExport: true },
          ],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
  ],
  build: {
...
});

```

3. add jsconfig.json

```
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

## Debugging

Watch out for the trap:

```
    console.log(`response: ${response}`); // response: [object Object] - almost useless
    console.log('response', response); // can be examined in the browser console
```

## Open for further study

### fetch() error handling

> study this:

[error-handling-with-fetch](https://gist.github.com/odewahn/5a5eeb23279eed6a80d7798fdb47fe91)

[Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

### using properties

Look up properties with custom getters and setters.

### CORS

[Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

Fetch API follows the same-origin policy. This means that a web application using those APIs
can only request resources from the same origin the application was loaded from
unless the response from other origins includes the right CORS headers.

[How to use a CORS proxy to avoid “No Access-Control-Allow-Origin header” problems](https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141)

[How to Make a Fetch Proxy in Javascript to Avoid CORS Errors with APIs](https://kennethscoggins.medium.com/how-to-make-a-fetch-proxy-in-javascript-to-avoid-cors-errors-with-apis-2b93c4ed0e78)
