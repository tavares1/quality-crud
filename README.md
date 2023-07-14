# quality-crud

## Instructions

- install typescript: 
    > npm install typescript -D

- create basic setup of typescript project:
    > npx tsc --init
    - large number of configurations for typescript

- install types for node
    > npm install -D @types/node

## CommmonJS vs ES6 imports:

- commonjs: 
```js
    const fs = require('fs')
```

- ES6:
```js
    import fs from "fs"
```

## scripts:

- script to run once(start:crud):
    > npx ts-node ./core/crud.ts

- script to run hotreload(dev:crud):
    > nodemon --ext(passando as extensões) ts, tsx (extensões utilizadas) --exec(para executar o comando do start) 'npm run start:crud'
