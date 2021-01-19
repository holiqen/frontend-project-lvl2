# Difference Calculator ![Node.js CI](https://github.com/holiqen/frontend-project-lvl2/workflows/Node%20CI/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/48470a4b746fea776f96/maintainability)](https://codeclimate.com/github/holiqen/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/48470a4b746fea776f96/test_coverage)](https://codeclimate.com/github/holiqen/frontend-project-lvl2/test_coverage)

### Description:

Difference calculator is a program that determines the difference between two data structures. This is a popular problem, for which there are many online services http://www.jsondiff.com/. A similar mechanism, for example, is used when outputting tests or when automatically tracking changes in configuration files.

```
# plain
$ gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# stylish
$ gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```

### Languages and Tools:

<img align="left" alt="Visual Studio Code" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />
<img align="left" alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />
<img align="left" alt="Npm" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/npm/npm.png" />
<img align="left" alt="Eslint" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/eslint/eslint.png" />
<img align="left" alt="Node.js" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
<img align="left" alt="Git" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" />
<img align="left" alt="GitHub" width="26px" src="https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png" />
<img align="left" alt="Terminal" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/terminal/terminal.png" /></br>

### Asciinema:

[![asciicast](https://asciinema.org/a/XN5bFZcglzGATpXgyWanIYDGZ.svg)](https://asciinema.org/a/XN5bFZcglzGATpXgyWanIYDGZ)
[![asciicast](https://asciinema.org/a/0vuqlec2kR3z3LqLjtQQE1XoL.svg)](https://asciinema.org/a/0vuqlec2kR3z3LqLjtQQE1XoL)
[![asciicast](https://asciinema.org/a/p0GkFWhzojGVkpuhP7zPskamz.svg)](https://asciinema.org/a/p0GkFWhzojGVkpuhP7zPskamz)
[![asciicast](https://asciinema.org/a/OxZeDufdkH6yHBZEVtbHAu6ly.svg)](https://asciinema.org/a/OxZeDufdkH6yHBZEVtbHAu6ly)
[![asciicast](https://asciinema.org/a/mYLNJ3DWSeW64WkVkd7FQagik.svg)](https://asciinema.org/a/mYLNJ3DWSeW64WkVkd7FQagik)
