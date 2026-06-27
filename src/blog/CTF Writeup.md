---
title: "Various CTF Writeup"
desc: "Various CTF Lab writeup from the cybersec club, by usually yours truly."
date: "Last Modified"
tags: ["post", "cybersec", "writeup", "ctf", "club"]
permalink: "/blog/ctf-writeup.html"
---

# Various CTF Writeup

Editorial of CTF that (*usually*) I made. I might link the lesson to here, due to class time restriction.

Will be updated.

## Cryptography

### Lab 8: "uwu-cipher"

 - Score: 100 (It's all 100)

Made to test [Cyberchef](https://gchq.github.io/CyberChef/) skills and pattern recognition. Optional, you're not expected to solve this (club beginner). Honestly, I probably won't bother with this in real CTF. 

#### Encoded message (Flag format: SKR-CTF{...})

```text
uuwUuwWUuuwWwWUuuwwUuuuwuwuWuUWUwUwUuWUWuWwUuWUUuWuwuWuuwWWUwUuuuUuuuWwWuUUu
```

#### Answer
 - To Hex (Delimiter: None)
 - Find / Replace (Find: 5, Replace: 1)
 - Find / Replace (Find: 7, Replace: 0)
 - From Binary (Delimiter: None)

[Recipe](https://gchq.github.io/CyberChef/#recipe=To_Hex('None',0)Find_/_Replace(%7B'option':'Regex','string':'5'%7D,'1',true,false,true,false)Find_/_Replace(%7B'option':'Simple%20string','string':'7'%7D,'0',true,false,true,false)From_Binary('None',8))

#### Observation
There are only 4 possible characters inside encoded string 'u', 'U', 'w', 'W'. If you look at the [ASCII table](https://commons.wikimedia.org/wiki/File:ASCII-Table-wide.svg) of these character.

Another observation that can be done is, maybe capitalization is encoding something. That's isn't how I came up with it, but it still works.

| Hex | Char |
| --- | ---- |
| 55  | U    |
| 57  | W    |
| 75  | u    |
| 77  | w    |

Noticed how there's only 2 digits in Hex column, 7 & 5?

Well, which encoding has 2 digits switching? That's right, binary. Replace either, (7 -> 1 and 5 -> 0) or (7 -> 0 and 5 -> 1). And that's it.

The flag is:
```text
SKR-CTF{3ncode+5ub}
```
*(Flag content might look odd, but that's normal.)*

Also obligatory Soatok (Cryptogra-fur) mention: [How To Learn Cryptography as a Programmer](https://soatok.blog/2020/06/10/how-to-learn-cryptography-as-a-programmer/).