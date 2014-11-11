
######2014Nov10 23:23:08+0900

using credential helpers.

---

<http://git-scm.com/docs/gitcredentials>

<https://help.github.com/articles/caching-your-github-password-in-git/>

---

i ve got an error of 'signal 11'.. @ OSX Lion

workaround for this.

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

if all set, do..

```
git config --global credential.helper osxkeychain
```

once give a passphrase for a ssh key it will be saved in the keychain of the system.
Applications--> Utilities--> Keychain Access to check.
entries starting with SSH: xxx are them.

---

######2014Nov11 01:34:52+0900

multiple account git pushing

well, first check out this..

<https://help.github.com/articles/set-up-git/>

which is basic steps for setting up 'git'

which is not enough because it uses --global...

what is global and what exactly that means?

check out 'man git_config' or 'man git_config | col -b > git_config.man' and open it with preferred editor to read.

```
FILES
       If not set explicitly with --file, there are three files where git
       config will search for configuration options:

       $GIT_DIR/config
	   Repository specific configuration file. (The filename is of course
	   relative to the repository root, not the working directory.)

       ~/.gitconfig
	   User-specific configuration file. Also called "global"
	   configuration file.

       $(prefix)/etc/gitconfig
	   System-wide configuration file.

       If no further options are given, all reading options will read all of
       these files that are available. If the global or the system-wide
       configuration file are not available they will be ignored. If the
       repository configuration file is not available or readable, git config
       will exit with a non-zero error code. However, in neither case will an
       error message be issued.

       All writing options will per default write to the repository specific
       configuration file. Note that this also affects options like
       --replace-all and --unset. git config will only ever change one file at
       a time.

       You can override these rules either by command line options or by
       environment variables. The --global and the --system options will limit
       the file used to the global or system-wide file respectively. The
       GIT_CONFIG environment variable has a similar effect, but you can
       specify any filename you want.

ENVIRONMENT
       GIT_CONFIG
	   Take the configuration from the given file instead of .git/config.
	   Using the "--global" option forces this to ~/.gitconfig. Using the
	   "--system" option forces this to $(prefix)/etc/gitconfig.

       See also the section called "FILES".
```

so if u do with --global then what happens is..

```
       --global
	   For writing options: write to global ~/.gitconfig file rather than
	   the repository .git/config.

	   For reading options: read only from global ~/.gitconfig rather than
	   from all available files.

	   See also the section called "FILES".
```

'For writing options: write to global ~/.gitconfig file rather than the repository .git/config.'

so, thing is that you should omit --global for repo specific configuration.
if you wanna have different accounts associated with each repo.. then don't do --global.. do it without it.

for example...

<http://knitatoms.net/2013/10/automatically-use-correct-ssh-key-for-remote-git-repo/>

```
git config user.name "user1"
git config user.email "user1@example.com"
```

like this..

---

on top of this idea, let's move on..

we gonna use SSH keys for github access..

general procedure is like...

<https://help.github.com/articles/generating-ssh-keys/>

```
ssh-keygen -t rsa -C "your_email@example.com"
# Creates a new ssh key, using the provided email as a label
# Generating public/private rsa key pair.
# Enter file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
```

but again.. here we are using '/Users/you/.ssh/id_rsa' and '/Users/you/.ssh/id_rsa.pub'for saving the key pair.
well, it is ok until now.. but if you wanna have different account set up.. so try ssh-keygen -t rsa -C "your_email@example.com" same again.. then it will be rejected..
it will say sth. like there's already a file named like that.

so you should do use -f option..
actually, better practice is using.. more descriptive name for the keys.. like...

```
ssh-keygen -t rsa -C "pilotedeguerre@gmail.com" -f ~/.ssh/github_doohoyi_rsa
ssh-keygen -t rsa -C "pilotedeguerre@gmail.com" -f ~/.ssh/github_applecargo_rsa
```

check out '-f' @ 'man ssh-keygen' or 'man ssh-keygen | col -b > ssh-keygen.man' and open it with preferred editor to read.

```
SYNOPSIS
     ssh-keygen [-q] [-b bits] -t type [-N new_passphrase] [-C comment]
		[-f output_keyfile]
```
and
```
     -f filename
	     Specifies the filename of the key file.
```

and 'pbcopy < ~/.ssh/github_doohoyi_rsa.pub' and 'pbcopy < ~/.ssh/github_applecargo_rsa.pub' for registering the public keys @ github.com

-

on github tutorial, says

```
# start the ssh-agent in the background
eval "$(ssh-agent -s)"
# Agent pid 59566
ssh-add ~/.ssh/id_rsa
```

but actually, osx lion already is running an ssh-agent so don't do 'eval "$(ssh-agent -s)"'.. 
and 'ssh-add ~/.ssh/id_rsa' should be respectively 'ssh-add ~/.ssh/github_doohoyi_rsa' or 'ssh-add ~/.ssh/github_applecargo_rsa'
which loads manually those keys for testing..
do it one by one.
you can use -d option with ssh-add for unloading a key.. -D also.. check man ssh-add for this.

-

try connection with 'ssh -T git@github.com' for both accounts.

if all set, go on for configuring ssh and gir-repo for automatic key pickup..

if u get, a permission denied error..

check..<https://help.github.com/articles/error-permission-denied-publickey/#verify-the-public-key-is-attached-to-your-github-account>

u should use registered key for that account.

---

by the way, openssh's manpage is worth to read..

especially this part..

```

SSH(1)			  BSD General Commands Manual			SSH(1)

NAME
     ssh -- OpenSSH SSH client (remote login program)

.
.
.
AUTHENTICATION
     The OpenSSH SSH client supports SSH protocols 1 and 2.  The default is to
     use protocol 2 only, though this can be changed via the Protocol option
     in ssh_config(5) or the -1 and -2 options (see above).  Both protocols
     support similar authentication methods, but protocol 2 is the default
     since it provides additional mechanisms for confidentiality (the traffic
     is encrypted using AES, 3DES, Blowfish, CAST128, or Arcfour) and
     integrity (hmac-md5, hmac-sha1, umac-64, hmac-ripemd160).	Protocol 1
     lacks a strong mechanism for ensuring the integrity of the connection.

     The methods available for authentication are: GSSAPI-based authentica-
     tion, host-based authentication, public key authentication, challenge-
     response authentication, and password authentication.  Authentication
     methods are tried in the order specified above, though protocol 2 has a
     configuration option to change the default order:
     PreferredAuthentications.

     Host-based authentication works as follows: If the machine the user logs
     in from is listed in /etc/hosts.equiv or /etc/shosts.equiv on the remote
     machine, and the user names are the same on both sides, or if the files
     ~/.rhosts or ~/.shosts exist in the user's home directory on the remote
     machine and contain a line containing the name of the client machine and
     the name of the user on that machine, the user is considered for login.
     Additionally, the server must be able to verify the client's host key
     (see the description of /etc/ssh/ssh_known_hosts and ~/.ssh/known_hosts,
     below) for login to be permitted.	This authentication method closes
     security holes due to IP spoofing, DNS spoofing, and routing spoofing.
     [Note to the administrator: /etc/hosts.equiv, ~/.rhosts, and the
     rlogin/rsh protocol in general, are inherently insecure and should be
     disabled if security is desired.]

     Public key authentication works as follows: The scheme is based on pub-
     lic-key cryptography, using cryptosystems where encryption and decryption
     are done using separate keys, and it is unfeasible to derive the decryp-
     tion key from the encryption key.	The idea is that each user creates a
     public/private key pair for authentication purposes.  The server knows
     the public key, and only the user knows the private key.  ssh implements
     public key authentication protocol automatically, using either the RSA or
     DSA algorithms.  Protocol 1 is restricted to using only RSA keys, but
     protocol 2 may use either.  The HISTORY section of ssl(8) contains a
     brief discussion of the two algorithms.

     The file ~/.ssh/authorized_keys lists the public keys that are permitted
     for logging in.  When the user logs in, the ssh program tells the server
     which key pair it would like to use for authentication.  The client
     proves that it has access to the private key and the server checks that
     the corresponding public key is authorized to accept the account.

     The user creates his/her key pair by running ssh-keygen(1).  This stores
     the private key in ~/.ssh/identity (protocol 1), ~/.ssh/id_dsa (protocol
     2 DSA), or ~/.ssh/id_rsa (protocol 2 RSA) and stores the public key in
     ~/.ssh/identity.pub (protocol 1), ~/.ssh/id_dsa.pub (protocol 2 DSA), or
     ~/.ssh/id_rsa.pub (protocol 2 RSA) in the user's home directory.  The
     user should then copy the public key to ~/.ssh/authorized_keys in his/her
     home directory on the remote machine.  The authorized_keys file corre-
     sponds to the conventional ~/.rhosts file, and has one key per line,
     though the lines can be very long.  After this, the user can log in with-
     out giving the password.

     A variation on public key authentication is available in the form of cer-
     tificate authentication: instead of a set of public/private keys, signed
     certificates are used.  This has the advantage that a single trusted cer-
     tification authority can be used in place of many public/private keys.
     See the CERTIFICATES section of ssh-keygen(1) for more information.

     The most convenient way to use public key or certificate authentication
     may be with an authentication agent.  See ssh-agent(1) for more informa-
     tion.

     Challenge-response authentication works as follows: The server sends an
     arbitrary "challenge" text, and prompts for a response.  Protocol 2
     allows multiple challenges and responses; protocol 1 is restricted to
     just one challenge/response.  Examples of challenge-response authentica-
     tion include BSD Authentication (see login.conf(5)) and PAM (some non-
     OpenBSD systems).

     Finally, if other authentication methods fail, ssh prompts the user for a
     password.	The password is sent to the remote host for checking; however,
     since all communications are encrypted, the password cannot be seen by
     someone listening on the network.

     ssh automatically maintains and checks a database containing identifica-
     tion for all hosts it has ever been used with.  Host keys are stored in
     ~/.ssh/known_hosts in the user's home directory.  Additionally, the file
     /etc/ssh/ssh_known_hosts is automatically checked for known hosts.  Any
     new hosts are automatically added to the user's file.  If a host's iden-
     tification ever changes, ssh warns about this and disables password
     authentication to prevent server spoofing or man-in-the-middle attacks,
     which could otherwise be used to circumvent the encryption.  The
     StrictHostKeyChecking option can be used to control logins to machines
     whose host key is not known or has changed.

     When the user's identity has been accepted by the server, the server
     either executes the given command, or logs into the machine and gives the
     user a normal shell on the remote machine.  All communication with the
     remote command or shell will be automatically encrypted.

     If a pseudo-terminal has been allocated (normal login session), the user
     may use the escape characters noted below.

     If no pseudo-tty has been allocated, the session is transparent and can
     be used to reliably transfer binary data.	On most systems, setting the
     escape character to ``none'' will also make the session transparent even
     if a tty is used.

     The session terminates when the command or shell on the remote machine
     exits and all X11 and TCP connections have been closed.

```

catch this line..

```
     The methods available for authentication are: GSSAPI-based authentica-
     tion, host-based authentication, public key authentication, challenge-
     response authentication, and password authentication.  Authentication
     methods are tried in the order specified above, though protocol 2 has a
     configuration option to change the default order:
     PreferredAuthentications.
```

so, this clears out.. what is ssh's behaviour..
there are steps for trials..
and what we are using (generally) is rsa protocol 2 / public authentication.

---

what we gonna do now for 'git'.. is seting up 'ssh' for him.
cause git doesn't care about which keys to pick up or dependent on 'ssh' for that task.
instead, configuring git's remote repo from ssh setting is completely valid.

so first set up ssh for each accounts..

<http://stackoverflow.com/questions/7927750/specify-an-ssh-key-for-git-push-without-using-ssh-config/7927828#7927828>

```
Host gitolite-as-alice
  HostName git.company.com
  User git
  IdentityFile /home/whoever/.ssh/id_rsa.alice
  IdentitiesOnly yes

Host gitolite-as-bob
  HostName git.company.com
  User git
  IdentityFile /home/whoever/.ssh/id_dsa.bob
  IdentitiesOnly yes
```

and..

use those alias name for git config.

for my case, this is like below.

~/.ssh/config (you should create this with 'touch')

```
#applecargo account
Host github.com-applecargo
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_applecargo_rsa
    IdentitiesOnly yes

#doohoyi account
Host github.com-doohoyi
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_doohoyi_rsa
    IdentitiesOnly yes
```

and..

for git repos

1) applecargo.github.io (acount applecargo)
```
[user]
	name = applecargo
	email = pilotedeguerre@gmail.com
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = false
[remote "origin"]
	url = git@github.com-applecargo:applecargo/applecargo.github.io.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
```

2) bring-your-own-phone
```
[user]
	name = applecargo
	email = pilotedeguerre@gmail.com
[core]
	bare = false
	repositoryformatversion = 0
	filemode = true
	ignorecase = true
	precomposeunicode = true
	logallrefupdates = true
[remote "origin"]
	url = git@github.com-applecargo:applecargo/BYOP.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
```

(only 'BYOP.git' is different)

3) doohoyi.github.io
```
[user]
	name = doohoyi
	email = pilotedeguerre@gmail.com
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = false
[remote "origin"]
	url = git@github.com-doohoyi:doohoyi/doohoyi.github.io.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
```

here actually, user.name / user.email seems used for signing only..
actually my email that is registered for github.com for doohoyi account is not that same email of course..
you need to have different emails to set up different account..
but no problem at all. just works fine.

check 'man git_config'...
there are so many variables..
and officially explaining what is the syntax of config file of .git/config...
so very important desc.

```
CONFIGURATION FILE
       The git configuration file contains a number of variables that affect
       the git command's behavior. The .git/config file in each repository is
       used to store the configuration for that repository, and
       $HOME/.gitconfig is used to store a per-user configuration as fallback
       values for the .git/config file. The file /etc/gitconfig can be used to
       store a system-wide default configuration.

       The configuration variables are used by both the git plumbing and the
       porcelains. The variables are divided into sections, wherein the fully
       qualified variable name of the variable itself is the last
       dot-separated segment and the section name is everything before the
       last dot. The variable names are case-insensitive, allow only
       alphanumeric characters and -, and must start with an alphabetic
       character. Some variables may appear multiple times.

   Syntax
       The syntax is fairly flexible and permissive; whitespaces are mostly
       ignored. The # and ; characters begin comments to the end of line,
       blank lines are ignored.

       The file consists of sections and variables. A section begins with the
       name of the section in square brackets and continues until the next
       section begins. Section names are not case sensitive. Only alphanumeric
       characters, - and . are allowed in section names. Each variable must
       belong to some section, which means that there must be a section header
       before the first setting of a variable.

       Sections can be further divided into subsections. To begin a subsection
       put its name in double quotes, separated by space from the section
       name, in the section header, like in the example below:

		   [section "subsection"]


       Subsection names are case sensitive and can contain any characters
       except newline (doublequote " and backslash have to be escaped as \"
       and \\, respectively). Section headers cannot span multiple lines.
       Variables may belong directly to a section or to a given subsection.
       You can have [section] if you have [section "subsection"], but you
       don't need to.

       There is also a deprecated [section.subsection] syntax. With this
       syntax, the subsection name is converted to lower-case and is also
       compared case sensitively. These subsection names follow the same
       restrictions as section names.

       All the other lines (and the remainder of the line after the section
       header) are recognized as setting variables, in the form name = value.
       If there is no equal sign on the line, the entire line is taken as name
       and the variable is recognized as boolean "true". The variable names
       are case-insensitive, allow only alphanumeric characters and -, and
       must start with an alphabetic character. There can be more than one
       value for a given variable; we say then that the variable is
       multivalued.

       Leading and trailing whitespace in a variable value is discarded.
       Internal whitespace within a variable value is retained verbatim.

       The values following the equals sign in variable assign are all either
       a string, an integer, or a boolean. Boolean values may be given as
       yes/no, 1/0, true/false or on/off. Case is not significant in boolean
       values, when converting value to the canonical form using --bool type
       specifier; git config will ensure that the output is "true" or "false".

       String values may be entirely or partially enclosed in double quotes.
       You need to enclose variable values in double quotes if you want to
       preserve leading or trailing whitespace, or if the variable value
       contains comment characters (i.e. it contains # or ;). Double quote "
       and backslash \ characters in variable values must be escaped: use \"
       for " and \\ for \.

       The following escape sequences (beside \" and \\) are recognized: \n
       for newline character (NL), \t for horizontal tabulation (HT, TAB) and
       \b for backspace (BS). No other char escape sequence, nor octal char
       sequences are valid.

       Variable values ending in a \ are continued on the next line in the
       customary UNIX fashion.

       Some variables may require a special value format.
```

```
   Variables
       Note that this list is non-comprehensive and not necessarily complete.
       For command-specific variables, you will find a more detailed
       description in the appropriate manual page. You will find a description
       of non-core porcelain configuration variables in the respective
       porcelain documentation.

       advice.*
	   These variables control various optional help messages designed to
	   aid new users. All advice.*	variables default to true, and you can
	   tell Git that you do not need help by setting these to false:

	   pushNonFastForward
	       Advice shown when git-push(1) refuses non-fast-forward refs.

.
.
.
       user.email
	   Your email address to be recorded in any newly created commits. Can
	   be overridden by the GIT_AUTHOR_EMAIL, GIT_COMMITTER_EMAIL, and
	   EMAIL environment variables. See git-commit-tree(1).

       user.name
	   Your full name to be recorded in any newly created commits. Can be
	   overridden by the GIT_AUTHOR_NAME and GIT_COMMITTER_NAME
	   environment variables. See git-commit-tree(1).

       user.signingkey
	   If git-tag(1) is not selecting the key you want it to automatically
	   when creating a signed tag, you can override the default selection
	   with this variable. This option is passed unchanged to gpg's
	   --local-user parameter, so you may specify a key using any method
	   that gpg supports.

       web.browser
	   Specify a web browser that may be used by some commands. Currently
	   only git-instaweb(1) and git-help(1) may use it.
```

---

all of these steps are well described by this.

<https://gist.github.com/RichardBronosky/dc0ced21d6dc7be7d196>

but even though original one has a few flews, it has more infos in the comments.. really good practice cases..

worth to re-visit.

<https://gist.github.com/jexchan/2351996>

---

'git config -l'

is always very useful..

this one confirms in the end, what config is valid @ current path.

---

there might be alternative way for not even using SSH keys..

<http://www.davidhayden.org/blog/multiple-github-accounts-git-credential-osxkeychain>

useHttpPath..

i just want to stick with SSH, cause i believe that is quite strong for keeping myself from the crackers.
but this might be useful if SSH does not available.. so if that happens, dig this into..

```
Multiple GitHub Accounts and Git-Credential-OSXKeychain
posted by David Hayden
I am teaching my children Git via GitHub Pages. Each child is responsible for creating and maintaining their own website and blog to be hosted on GitHub Pages.

One of the problems I ran into right away was that there are times my children want to use my MacBook Pro to manage their Git repository to update their website and blog. Each time they tried to update their repository Git was using my GitHub username and password stored in the OSX Keychain. They were then getting forbidden access errors and Git was not prompting them for their own username and password.

Turns out that when using git-credentials-osxkeychain with multiple GitHub accounts you need to set useHttpPath to true in your global git.config file. This will tell Git to save the username and password credentials using the entire path of the GitHub repository as opposed to the domain, thus allowing you to use multiple GitHub accounts using the OS X Keychain!

You can find out more about useHttpPath and other options in the gitcredentials manual.

[credential]
	helper = osxkeychain
	useHttpPath = true
```

---

OSX.gitignore

<https://github.com/github/gitignore/blob/master/Global/OSX.gitignore>

use this for not pushing useless OS specific files.. (like .DS_Store)

this explains more.. on the subject.

<https://help.github.com/articles/ignoring-files/>

<http://augustl.com/blog/2009/global_gitignores/>

---

######2014Nov11 01:56:01+0900

an interesting debate...

"What does the term porcelain mean in Git?"

concept of porcelain / plumbing...

<http://stackoverflow.com/questions/6976473/what-does-the-term-porcelain-mean-in-git>

```
"Porcelain" is the material from which toilets are usually made (and sometimes other fixtures such as washbasins). This is distinct from "plumbing" (the actual pipes and drains), where the porcelain provides a more user-friendly interface to the plumbing.

Git uses this terminology in analogy, to separate the low-level commands that users don't usually need to use directly (the "plumbing") from the more user-friendly high level commands (the "porcelain").
```

also mentioned in the manpage of 'git'

```
HIGH-LEVEL COMMANDS (PORCELAIN)
       We separate the porcelain commands into the main commands and some
       ancillary user utilities.
.
.
.
LOW-LEVEL COMMANDS (PLUMBING)
       Although git includes its own porcelain layer, its low-level commands
       are sufficient to support development of alternative porcelains.
       Developers of such porcelains might start by reading about git-update-
       index(1) and git-read-tree(1).

       The interface (input, output, set of options and the semantics) to
       these low-level commands are meant to be a lot more stable than
       Porcelain level commands, because these commands are primarily for
       scripted use. The interface to Porcelain commands on the other hand are
       subject to change in order to improve the end user experience.

       The following description divides the low-level commands into commands
       that manipulate objects (in the repository, index, and working tree),
       commands that interrogate and compare objects, and commands that move
       objects and references between repositories.
```

---

######2014Nov11 03:41:19+0900

아직 해보진 못했는데...

gh-pages branch라는 걸 어떻게 써먹는지 알면 좋을 수도 있다.

<https://help.github.com/articles/creating-project-pages-manually/>

여기 참고...