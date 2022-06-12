
# vue-typo-redirect

Make your users happy with catch typos with middleware and redirect to right one. 

Works with Vue

## Install 

```bash 
  npm i vue-typo-redirect
```
    
## Usage
Add wildcard route and set component as TypoRedirect. It gets the request path and analyzes it with rules and redirects.

```js
import TypoRedirect from "vue-typo-redirect";

const routes = [
    ...
  {
    path: "**",
    component: TypoRedirect,
    props: (route) => ({
      currentRoute: route,
      routes: [ "/chat", "/about/:id"],
    }),
  },
];

```

If you don't want to make an array with manuel processing then don't add prop it will gather all defined routes from this.$router except "**" and "/".

```js
import TypoRedirect from "vue-typo-redirect";

const routes = [
    ...
  {
    path: "**",
    component: TypoRedirect,
    props: (route) => ({
      currentRoute: route,
    }),
  },
];

```

## Demo

[Tests](https://github.com/snowron/vue-typo-redirect/blob/master/src/tests/TypoRedirect.spec.js)


```bash
➜ curl "http://localhost:3000/abouc/"           
Found. Redirecting to /about/%                                                                                                                                                                             

➜ curl "http://localhost:3000/abouct/"
Found. Redirecting to /about/%    

➜ curl "http://localhost:3000/chay/123"
Found. Redirecting to /chat/123%     
```

## Tests

```bash
  npm run test
```

## Options

| Parameter        | Type            | Desc                                                                                      |
| :--------------- | :-------------- | :---------------------------------------------------------------------------------------- |
| `routes`         | `array<string>` | whitelist routes                                                                          |
| `levenThreshold` | `number`        | the levenstein algorithm's threshold value                                                |
| `fuzzyThreshold` | `number`        | fuzzy comparasion algorithm's threshold value                                             |
| `currentRoute`   | `object`        | vue routers route prop                                                                    |
| `wildcardRoute`  | `string`        | if it cant redirect any route redirect to 404 page or another wildcard strategy component |

## Lisans

[MIT](https://choosealicense.com/licenses/mit/)

  