######2015May31 22:22:57+0900

**echo.**

<http://www.linfo.org/echo.html>
```
The echo Command



echo is a built-in command in the bash and C shells that writes its arguments to standard output.

A shell is a program that provides the command line (i.e., the all-text display user interface) on Linux and other Unix-like operating systems. It also executes (i.e., runs) commands that are typed into it and displays the results. bash is the default shell on Linux.

A command is an instruction telling a computer to do something. An argument is input data for a command. Standard output is the display screen by default, but it can be redirected to a file, printer, etc.

The syntax for echo is

echo [option(s)] [string(s)]

The items in square brackets are optional. A string is any finite sequence of characters (i.e., letters, numerals, symbols and punctuation marks).

When used without any options or strings, echo returns a blank line on the display screen followed by the command prompt on the subsequent line. This is because pressing the ENTER key is a signal to the system to start a new line, and thus echo repeats this signal.

When one or more strings are provided as arguments, echo by default repeats those stings on the screen. Thus, for example, typing in the following and pressing the ENTER key would cause echo to repeat the phrase This is a pen. on the screen:

echo This is a pen.

It is not necessary to surround the strings with quotes, as it does not affect what is written on the screen. If quotes (either single or double) are used, they are not repeated on the screen.

Fortunately, echo can do more than merely repeat verbatim what follows it. That is, it can also show the value of a particular variable if the name of the variable is preceded directly (i.e., with no intervening spaces) by the dollar character ($), which tells the shell to substitute the value of the variable for its name.

For example, a variable named x can be created and its value set to 5 with the following command:

x=5

The value of x can subsequently be recalled by the following:

echo The number is $x.

Echo is particularly useful for showing the values of environmental variables, which tell the shell how to behave as a user works at the command line or in scripts (short programs).

For example, to see the value of HOME, the environmental value that shows the current user's home directory, the following would be used:

echo $HOME

Likewise, echo can be used to show a user's PATH environmental variable, which contains a colon-separated list of the directories that the system searches to find the executable program corresponding to a command issued by the user:

echo $PATH

echo, by default, follows any output with a newline character. This is a non-printing (i.e., invisible) character that represents the end of one line of text and the start of the next. It is represented by \n in Unix-like operating systems. The result is that the subsequent command prompt begins on a new line rather than on the same line as the output returned by echo.

The -e option is used to enable echo's interpretation of additional instances of the newline character as well as the interpretation of other special characters, such as a horizontal tab, which is represented by \t. Thus, for example, the following would produce a formatted output:

echo -e "\n Projects: \n\n\tplan \n\tcode \n\ttest\n"

(The above command should be written on a single line, although it may render as two lines on smaller display screens.) The -n option can be used to stop echo from adding the newline to output.

By making use of output redirection, echo provides a very simple way of creating a new file that contains text. This is accomplished by typing echo followed by the desired text, the output redirection operator (which is a rightward pointing angle bracket) and finally the name of the new file. The file can likewise be formatted by using special characters. Thus, for example, the formatted output from the above example could be used to create a new file called project1:

echo -e "\n Project1: \n\n\tplan \n\twrite \n\ttest\n" > project1

The contents of the new file, including any formatting, can be verified by using a command such as cat or less, i.e.,

less project1

echo can likewise be a convenient way of appending text to the end of a file by using it together with the the append operator, which is represented by two consecutive rightward pointing angle brackets. However, there is always the risk of accidentally using a single bracket instead of two, thereby overwriting all of the contents of the file, and thus, this feature is best reserved for use in scripts.

echo can also be used with pattern matching, such as the wildcard character, which is represented by the star character. For example, the following would return the phrase The gif files are followed by the names of all the .gif image files in the current directory:

echo -e The gif files are *.gif

echo is also commonly used to have a shell script display a message or instructions, such as Please enter Y or N in an interactive session with users.

echo is turned off automatically when passwords are entered so that they will not be shown on the screen.
```

<http://www.tecmint.com/echo-command-in-linux/>

<http://www.computerhope.com/unix/uecho.htm>
```
About echo

echo displays a line of text.
Overview

echo is a fundamental command found in most operating systems that offer a command line. It is frequently used in scripts, batch files, and as part of individual commands; anywhere you may need to insert text.

Many command shells such as bash, ksh and csh implement echo as a built-in command.

bash is the default command shell in nearly every major Linux distribution, so in this documentation we will look at the behavior, syntax, and options of bash's implementation of echo.
Syntax

echo [SHORT-OPTION]... [STRING]...
echo LONG-OPTION
Options

-n	Do not output a trailing newline.
-e	Enable interpretation of backslash escape sequences (see below for a list of these).
-E	Disable interpretation of backslash escape sequences (this is the default).
--help	Display a help message and exit.
--version	Output version information and exit.
If you specify the -e option, the following escape sequences are recognized:
\\	A literal backslash character ("\").
\a	An alert (The BELL character).
\b	Backspace.
\c	Produce no further output after this.
\e	The escape character; equivalent to pressing the escape key.
\f	A form feed.
\n	A newline.
\r	A carriage return.
\t	A horizontal tab.
\v	A vertical tab.
\0NNN	byte with octal value NNN (which can be 1 to 3 digits).
\xHH	byte with hexadecimal value HH (which can be either 1 or 2 digits)
NOTE: each shell generally has its own implementation of echo, which may be slightly different than the version described here. Refer to your shell's documentation for details about the options it supports.
Examples

echo Hello, World!
Outputs the following text:
Hello, world!
x=10
echo The value of x is $x.
Entering these two commands will output the following text:
The value of x is 10.
echo -e 'Here \bthe \bspaces \bare \bbackspaced.'
Outputs the following text:
Herethespacesarebackspaced.
(Note that in order for the escape sequence to be protected from the shell, we have enclosed the echo string in quotes.)
echo -e 'Here\nwe\nhave\ninserted\nnewlines.'
Outputs the following text:
Here
we
have
inserted
newlines.
echo -e 'Here\twe\thave\tinserted\thorizontal\ttabs.'
Outputs the following text:
Here     we      have    inserted        horizontal      tabs.
echo -e 'This line is not completely \cprinted.'
Outputs the following text:
This line is not completely 
echo 'This text is now in a text file.' > textfile.txt
Writes the text This text is now in a text file. to the file textfile.txt. If textfile.txt does not exist, it will be created; if textfile.txt already exists, it will be overwritten.
echo 'This text is now in a text file.' >> textfile.txt
Appends the text This text is now in a text file. to the file textfile.txt. If textfile.txt does not exist, it will be created.
echo *
Output a string comprising the name of each file in the working directory, with each name separated by a space. For example, if you have three files in your working directory, output may resemble the following:
flower.jpg document.doc readme.txt
echo * | wc -w
This command will output the three filenames, just as above, but instead of printing them to the terminal, it will pipe the output to the wc command, which will display a count of the number of words in the output; this is a quick and simple way to find out how many files are in the working directory. So if we have three files, the output of this command will be:
3
For more on this particular topic, see "How can I see how many files or directories are in a Linux directory?"
```

---

######2015May31 22:32:17+0900

**vi / vim을 배우고 싶다!**

언젠가는 꼭 마스터해야 할 것중 하나 인듯.

---


