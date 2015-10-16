# guid
A Guid generator and validator.

###
THIS 'GUID' FORMAT LIKE 'Il9Bq9ZXtojcdPNm'(REG: /^[A-Za-z0-9]+$/).

## Example && APIS
```javascript

const Guid = require('shimo-guid');

Guid.isGuid('Il9Bq9ZXtojcdPNm'); // true
Guid.fromInt(10000); // 'lS', the first argument must be an unsigned integer
Guid.toInt('BAC'); // 1 * 62 * 62 + 0 + 2 = 3846
Guid.new(16); // generate a new one, default length is 16

```
## To begin

 1. Install it:

    ```bash
    $ npm install shimo-guid --save
    ```
 2. Require it and use:

    ```js
    var Guid = require('shimo-guid');
    var guid = Guid.new();
    ```

## License

 MIT &copy; ChuXin Tech
