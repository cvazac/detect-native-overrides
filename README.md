# detect-native-overrides

## Bookmarklet
Copy the source of [detect-native-overrides.js](https://raw.githubusercontent.com/cvazac/detect-native-overrides/master/src/detect-native-overrides.js).

Paste the source into a [bookmarklet maker](http://bookmarklets.org/maker/).

Explore to a page and click the bookmarklet. 

## Tampermonkey
Install [Tampermonkey](https://tampermonkey.net/).

Click the + to create a new userscript.

Copy the contents of [detect-native-overrides.tm.js](https://raw.githubusercontent.com/cvazac/detect-native-overrides/master/dist/detect-native-overrides.tm.js) and paste it into the new userscript.

Explore to a page, right click anywhere, click TamperMonkey | detect-native-overrides.tm.js.

![alt text](https://raw.githubusercontent.com/cvazac/detect-native-overrides/master/img/tampermonkey.png)

## Expected output
In the console, you will see a `warn` with an array of overriden methods. If you see a method name with a namespace, presume `window`.

*Example:*

![alt text](https://raw.githubusercontent.com/cvazac/detect-native-overrides/master/img/output.png "www.google.com")
