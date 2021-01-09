# snowpack-plugin-swc

[swc is a faster tsc and babel alternative written in rust](https://swc.rs)
configurable with a `.swcrc` file

```
npm install --save-dev snowpack-plugin-swc
```

```js
// snowpack.config.json
{
  "plugins": [
    [
      "snowpack-plugin-swc",
      {
        "input": ['.js', '.mjs', '.jsx', '.ts', '.tsx'], // (optional) specify files for swc to transform
        transformOptions: {
          // swc transform options
        }
      }
    ]
  ]
}
```

#### Plugin Options

| Name               | Type       | Description                                                                                                                                        |
| :----------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`            | `string[]` | (optional) By default, swc scans & transfoms these extensions: `['.js', '.jsx', '.ts', '.tsx']`. Modify this array if you’d like to change this.   |
| `transformOptions` | `object`   | (optional) See [https://swc.rs/docs/usage-core](https://swc.rs/docs/usage-core)                                                                    |
