# ts-saved-config

Save config to a file or in the browser local storage. This package uses `configstore` for its file storage and `store2` for its browser local storage.

## Usage

```ts
import { Configuration, num, str } from '@cfstcyr/ts-saved-config';

const myConfig = Config('my-config', {
    apiKey: str({
        required: true,
    }),
    user: json<User>({}),
    count: num({
        default: 10,
    }),
});

myConfig.getApiKey(); // Returns string or throws an error if not set
myConfig.get('user'); // Returns User or undefined if not set
myConfig.get('count'); // Returns number or 10 if not set
```