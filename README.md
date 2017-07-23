# crawler
Web Crawler Implementation in Node JS

Running in Development Mode -> ./bin/dev_start.sh - Dependency - nodemon
Running in Production Mode -> ./bin/start.sh - Dependency - pm2


There are 2 implementation first is using recursion with throttling consecutive requests.
Second is using async library specifically using queue to throttle requests.

/crawl - Recursion implementation
/crawl/async - Async Queue implementation

