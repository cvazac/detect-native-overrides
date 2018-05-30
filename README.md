# detect-native-overrides

## Bookmarklet
Using the content of [src/detect-native-overrides.js](https://raw.githubusercontent.com/cvazac/detect-native-overrides/master/src/detect-native-overrides.js), create the bookmarklet using a [bookmarklet maker](https://caiorss.github.io/bookmarklet-maker/). 

Explore to a page and click the bookmarklet. 

## Expected output
In the console, you will see a `warn` with an array of overriden methods. 

If you see a method name without a namespace, presume `window`.

*Example:*

![alt text](https://raw.githubusercontent.com/cvazac/detect-native-overrides/master/img/output.png "newrelic.com")

## Limitations
This bookmarket won't work on pages with strict CSPs, like twitter.com.

We currently rely on `Object.getOwnPropertyNames` which has decent [browser support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames#Browser_compatibility).

You will probably see some `Illegal invocation` errors in the console, sorry about that.

![alt text](https://raw.githubusercontent.com/cvazac/detect-native-overrides/master/img/error.png "Illegal invocation")

[Tampermonkey](https://tampermonkey.net/) is a wonderful tool that I highly encourage everyone to try out. That said, it overrides many natives, so I recommend that you disable it before running the bookmarklet. 