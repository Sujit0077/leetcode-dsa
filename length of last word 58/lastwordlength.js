var lengthOfLastWord = function(s) {
    let words = s.trim().split(" ");
    return words[words.length - 1].length;


    // let words = s.trim().split(" ");
    // return words[words.length - 1].length;
};

let s = "Hello World";
console.log(lengthOfLastWord(s));


/*      


Why /\s+/?
\s → any whitespace character (space, tab, newline)
+ → one or more

So:

"fly me   to   the moon".split(/\s+/)

returns

["fly", "me", "to", "the", "moon"]

No empty strings are created.



*/


/*


Problem with multiple spaces

Consider:

s = "   fly me   to   the moon  "

After trim():

"fly me   to   the moon"

Now:

split(" ")

gives

[
  "fly",
  "me",
  "",
  "",
  "to",
  "",
  "",
  "the",
  "moon"
]

Notice the empty strings ("") caused by consecutive spaces.

In this example, the last element is still "moon", so your code returns 4.



*/