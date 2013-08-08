## About
A simple Node/Redis app which list a collection of web modules for Node.js

## How to add a Node web framework?

* Just fork this repository, edit the `modules.json` file adding only your github `user/module` suffix there.

See this example:
``` javascript
    "connect": "senchalabs/Connect"
```

* Take a screenshot about main site or blog module, put it in the `public/images` directory.
The image must be a PNG format with 220x160 size and named with the same github repository name.
Using the example before, if I added the `connect` module, my printscreen must be named as `connect.png`.

* All modules data is consumed and updated daily from a Github API (http://developer.github.com) and stored in a Redis key-store database.

## Rules

Only web modules for node.js will be included.

## TODO

* Create scaffold apps using each web module.

## About the author

Caio Ribeiro Pereira <caio.ribeiro.pereira@gmail.com>

Twitter: <http://twitter.com/crp_underground>

Blog: <http://udgwebdev.com> or <http://udglinux.com>

MIT Licence: <http://caio-ribeiro-pereira.mit-license.org>