# Emmet File

<center>
    <img src="https://raw.githubusercontent.com/Crunchitect/emmet-file/master/md_assets/emmetfile.png">
    <h3 style="margin:0;padding:0">A powerful way to setup project scaffolds.</h3>
    <p>Using Familiar Emmet syntax.</p>
</center>

## Features

Emmet File is a extension to scaffold different file & folder structure with [Emmet-style syntax](https://emmet.io/).

From creating multiple files at once.
<center>
    <img src="https://raw.githubusercontent.com/Crunchitect/emmet-file/master/md_assets/emmetfile1.png">
</center>

To a whole project scaffolding
<center>
    <img src="https://raw.githubusercontent.com/Crunchitect/emmet-file/master/md_assets/showoff.gif">
</center>

## How to use?
Call the `Track Files` in the Command Pallete (`Ctrl+Shift+P`).

## Grammar

<h3 style="margin:0;padding:0;">
    <span style="color:#FF6188">+</span> 
    Sibling Files
</h3>
<hr />

Create multiple sibling files using `+`, try `index.html+styles.css`!
<center>
    <img src="https://raw.githubusercontent.com/Crunchitect/emmet-file/master/md_assets/emmetfile2.png">
</center>

<h3 style="margin:0;padding:0;">
    <span style="color:#FF6188">!</span> 
    Directory
</h3>
<hr />

Create Directories with `!`, as `dirname!file`.
<center>
    <img src="https://raw.githubusercontent.com/Crunchitect/emmet-file/master/md_assets/emmetfile3.png">
</center>
<h3 style="margin:0;padding:0;">
    <span style="color:#FF6188">^</span> 
    Repitition,
    <span style="color:#FF6188">$</span> 
    Number
</h3>
<hr />

Same as Emmet, but replace `*` with `^`, you can have as many `$` as you want.
<center>
    <img src="https://raw.githubusercontent.com/Crunchitect/emmet-file/master/md_assets/emmetfile4.png">
</center>

<h3 style="margin:0;padding:0;">
    <span style="color:#FF6188">{}</span> 
    Contents
</h3>
<hr />

Add inner contents of the file via `{}`, `$`s are supported
<center>
    <img src="https://raw.githubusercontent.com/Crunchitect/emmet-file/master/md_assets/emmetfile5.png">
</center>

<h3 style="margin:0;padding:0;">
    <span style="color:#FF6188">@</span> 
    Range
</h3>
<hr />

For more control of the `^` command, You can specify its range with `^[stop]@[start],[step]`
<center>
    <img src="https://raw.githubusercontent.com/Crunchitect/emmet-file/master/md_assets/emmetfile6.png">
</center>

## Exceptions

> Please make an active file to parse your directory!

You need to open at least 1 file in the editor for the extension to register and save your workspace path.

> Invalid Parsing!

Self Explantory, but ***note that `{}` will not throw a `Invalid Parsing` error even if parsing is invalid***.
