
######2014Nov11 01:49:48+0900

when there is troubles.. doing brew install..

check out..

<https://github.com/Homebrew/homebrew/blob/master/share/doc/homebrew/Troubleshooting.md#troubleshooting>

brew update

&

chown -R $(whoami) /usr/local

&

brew doctor


```
Run brew update — then try again.
Run brew doctor — the doctor diagnoses common issues.
Read through the Common Issues page.
If you’re installing something Java-related, maybe you need the Java Developer Update or JDK 7?
Check that Command Line Tools for Xcode (CLT) and/or Xcode are up to date.
If things fail with permissions errors, check the permissions in /usr/local. If you’re unsure what to do, you can sudo chown -R $(whoami) /usr/local.
```