# detect-native-overrides

## Bookmarklet
Copy the source of [detect-native-overrides.js](https://raw.githubusercontent.com/cvazac/detect-native-overrides/master/src/detect-native-overrides.js).

Paste the source into a [bookmarklet maker](https://caiorss.github.io/bookmarklet-maker/).

Explore to a page and click the bookmarklet. 

## Expected output
In the console, you will see a `warn` with an array of overriden methods. If you see a method name with a namespace, presume `window`.

*Example:*

![alt text](https://raw.githubusercontent.com/cvazac/detect-native-overrides/master/img/output.png "newrelic.com")

## Limitations
This bookmarket won't work on pages with strict CSPs, like twitter.com.

We currently rely on `Object.getOwnPropertyNames` which has decent [browser support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames#Browser_compatibility).

You might see some `Illegal invocation` errors in the console.

![alt text](https://raw.githubusercontent.com/cvazac/detect-native-overrides/master/img/error.png "Illegal invocation")
