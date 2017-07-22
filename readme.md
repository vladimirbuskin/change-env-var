# change-env-var 

Allows to add/remove value to/from Envirounment Variable which has multiple semicolon separated values.
For example "Path" variable.

works in WINDOWS only

```
Usage: change-env-var <add|remove> <envVariable> <itemValue>

Commands:
  add <envVariable> <itemValue>     adds itemValue to envVariable
  remove <envVariable> <itemValue>  removes itemValue from envVariable

Options:
  --help  Show help                                                    [boolean]

Examples:
  add     change-env-var add Path c:PM2
  remove  change-env-var remove Path c:PM2
```

