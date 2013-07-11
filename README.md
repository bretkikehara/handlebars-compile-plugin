

## Handlebars compiler
This is used in conjunction with the YUI shifter tool.

##### Install Dependencies
* nodejs
* npm

##### Build Dependency

> make

### How to install
Run this command in the project directory:

> make install

To do an install without make, run:

> npm install -g .

### How to use:

> handlebars-compile [folder1] [folder2] ...

If no folders are specified, then the compiler will search in the `template` folder for *.handlebars files.

##### Setup with YUI Shifter

For each YUI module, add the handlebars-compile command to the build.json under the exec option.

```javascript
"exec": [
  "handlebars-compile"
]
```