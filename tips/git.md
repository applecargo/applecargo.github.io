
######2014Nov10 23:23:08+0900

configuration.

---

error of signal 11..

workaround.

<http://stackoverflow.com/questions/14272634/error-git-credential-osxkeychain-died-of-signal-11>

```
I am using Mac OS X 10.7.5. I recently downloaded git 1.8.1.2 for Mac. Having it installed, I bumped into the same signal 11 error message when running:

$git credential-osxkeychain

which in turn runs:

/usr/local/git/bin/git-credential-osxkeychain

Signal 11 is SEGFAULT which might indicate a bug (e.g. dereferencing a null pointer) with the git-credential-osxkeychain program.

I followed instructions on caching your github password and grabbed a new copy of git-credential-osxkeychain from S3. That resolved the problem. The new copy is of different size which makes me guess the bug has been patched.

In the meantime, I believe using a URL like git@github.com:yang3wei/octopress-3-in-one in the config should also work around the problem as it bypasses HTTPS and uses SSH instead where the key chain helper is not invoked any more.
```

<https://help.github.com/articles/caching-your-github-password-in-git/>

```
curl -s -O \
https://github-media-downloads.s3.amazonaws.com/osx/git-credential-osxkeychain
# Download the helper
chmod u+x git-credential-osxkeychain
# Fix the permissions on the file so it can be run

Install the helper into the same directory where Git itself is installed:

sudo mv git-credential-osxkeychain \
"$(dirname $(which git))/git-credential-osxkeychain"
# Move the helper to the path where git is installed
# Password: [enter your password]
```

and then, do it again..

```
Find out if the osxkeychain credential helper is already installed by trying to run it:

git credential-osxkeychain
# Test for the cred helper
# Usage: git credential-osxkeychain <get|store|erase>
```
