# detect-native-overrides

## Bookmarklet
Copy the source of [detect-native-overrides.js](./TODO.js).

Paste the source into a [bookmarklet maker](http://bookmarklets.org/maker/).

Explore to a page and click the bookmarklet. 

## Tampermonkey
Install [Tampermonkey](https://tampermonkey.net/).

Click the + to create a new userscript.

Copy the source of [detect-native-overrides.tm.js](./TODO.js) and paste it into the new userscript.

Explore to a page, right click anywhere in the page, 

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)

## Expected output
In the console, you will see a `warn` with an array of overriden methods.

Example:

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "www.google.com")
