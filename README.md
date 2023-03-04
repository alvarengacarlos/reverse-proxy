# __Reverse proxy__
## __What is it?__
This is a simple reverse proxy library built with Redis database. If you do not know why it is used, here is a simple explanation:

Proxies are used to cache the local network, avoiding requesting the same resource over the Internet many times. So a reverse proxy uses the same idea, but on the server side, in other words, you consume the application server's response only once and then cache it. This minimizes the processing on your application server.

> __NOTE__: Currently only GET Http method is supported.

## __How to use__
- Import `CacheService`, `Request` and `Cache` classes and bootstrap function located in `scr/index.js`.
- Use and `Request` class to abstract the request and `Cache` class to abstract the cache.
- Use `CacheService` to get and set the cache.
- Now execute the bootstrap function to initialize the reverse proxy.
- Create a .env based in .env-example and configure the IS_DEV_MODE to 'false'.

## __Usage example__
```javascript
const express = require('express')

//Import the classes and functions
const {
    CacheService,
    Cache,
    Request,
    bootstrap
} = require('./index')

const app = express()
app.use(express.json())

//Currently supports only GET method
app.get('/', async (req, res) => {  
    const cacheService = new CacheService()
    const request = new Request(
        req.originalUrl,
        req.method
    )
    
    try {
        const cache = await cacheService.getCache(request)
        
        return res.status(200).end(cache)        
    
    } catch (error) {
        console.log('error: ', error.message)
    }
    
    //Request for resource and save it. 
    //Change bellow by your request. In this example the newCache is a html but it can be any data.
    const newCache = `
        <html>
            <head>
                <title>Test</title>
            </head>
        <body>
            <h1>Test</h1>
        </body>
        </html>
    `
    await cacheService.setCache(request, new Cache(newCache))
    
    return res.status(200).end(newCache)
})
    
app.listen(3000, () => {
    bootstrap()

    console.log('server is running')
})
```

## __Benchmark__
...TODO

## __Development__
- Use the docker-compose.yaml file to initialize the environment.
- The environment is composed of node and redis containers.
- Create a .env based in .env-example and configure the IS_DEV_MODE to 'true'.