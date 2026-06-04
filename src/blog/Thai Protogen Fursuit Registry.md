---
title: "Thai Protogen Fursuit Registry"
desc: "I wanna document lists of electronic protogen fursuits in Thailand, since those are quite rare."
date: "Last Modified"
tags: ["post", "protogen", "thailand", "registry"]
permalink: "/blog/{{ title | slugify }}.html"
---

# Thai Protogen Fursuit Registry

---

## What is this?
This is where I list and categorize protogen fursuiters in Thailand. With *rough* technical info from online social media.
Focused only on the head.

## Why?
Making "standard" protogen head is quite difficult. Notably the visor. Usually made by [vacuum forming](https://en.wikipedia.org/wiki/Vacuum_forming) PETG/PolyCarbonate sheet.
*(possibly acrylic but not recommended, due to fragility when streched thin)*.

*[PETG]: PolyEthylene Terephthalate Glycol

 - PETG sheets are hard to find in Thailand (no import), the only source I found so far is from [RS-online](https://th.rs-online.com/web/p/plastic-sheets/3346450).
 - PolyCarbonate is highly-hygroscopic, causing bubbles to form in finished result. So drying sheet is requried.
 - Acrylic is fragile when streched thin, and PVC release toxic off-gas.

And also not everyone have access to vacuum forming machine, less than 3D printers. So usual method is to DIY.

There is also dying, but the most commonly used dye are "iDye Poly" and they do sell them on Shopee.

Electronics and Frame is standard, obtainable components. 

This is also a survey to collect electronics / displays, visor source / material and base model data.

## Categories
I don't know which material they used to make the visor, unfortunately.

 - Base: Protogen head base. Most commonly [M16 MK3](https://www.thingiverse.com/thing:4894173).
 - Visor style: Base visor shape, or custom.
 - Display: Usually 8x8 Matrix LED (MAX7219), or dense RGB LED Matrix (HUB75).
 - Electronics: Which microcontroller, and additional features.

### Protogen Reference

MandoArtstudio has protogen guide and references, which you can check out
[here](https://drive.google.com/drive/folders/1LM8m-aAwUzzANcs7_JfLZA5rJwNvIhM1).

*there's Facebook, Xitter, links here. Also fursona linked to respective owner.*

## Protogens I've found so far
Last updated: {{ page.date | postDate }}

### [Potato](https://x.com/Rusul1624)[^1]
![Potato the protogen](/assets/img/content/protogen_fursuits/potato.jpg)

So-called very first Thailand protogen, and it's a really cool one (electronic wise).

Built by [MangMuang Elektronik](https://x.com/MangMuang) (electronics), and [Yuzubu Furmaker & Clinic](https://x.com/YUZUBU_Furmaker) (fur & fabric).

*[FPGA]: Field-programmable gate array
*[OTA]: Over-the-air

 - Base: looks like M16 MK3
 - Visor style: probably M16 MK3 default
 - Display: HUB75 display, with side cheekplate addressable LED
 - Electronics: ESP32 & Intel Stratix FPGA! With audio processing, Wifi & Bluetooth connectivity, and OTA update. Custom ([Protogen Smart Core](https://github.com/MangMuang/ProtogenSmartCore/))software[^2].

### [TypeZeroOne](https://www.facebook.com/typezeroone)
![TypeZeroOne](/assets/img/content/protogen_fursuits/typezeroone.jpg)

Based on M16 MK3, 3D printed and vacuum formed using DIY Vacuum former[^3].

Built by TypeZeroOne (base & electronics at least)
 - Base: M16 MK3
 - Visor style: M16 MK3 default
 - Display: 8x8 LED Matrix (MAX7218), sometimes two colors
 - Electronic: possibly Arduino pro mini board[^4], software unknown.

#### NOT A SPONSORSHIP!
TypeZeroOne is considering selling protogen kit on Facebook. *(TypeZeroOne may have done commission before, but I can't confidentally prove it)*

### [Sanyo](https://www.facebook.com/prasertporn.changjai)
![Sanyo](/assets/img/content/protogen_fursuits/sanyo.jpg)

Probably M16 MK3, Not much to comment on construction.

Built by ??
 - Base: looks like M16 MK3
 - Visor style: looks like M16 MK3 default
 - Display: 8x8 LED Matrix (MAX7219) single color
 - Electronic: Unknown, software unknown

### [Vortex](https://guestdaprotogen.rf.gd)
![Vortex](/assets/img/content/protogen_fursuits/vortex.jpg)

Currently un-visored protogen, custom PCB and software!

Built by [Guest](https://x.com/GuestDaProtogen).
 - Base: looks like M16 MK3
 - Visor style: doesn't exist yet, probably will be M16 MK3 default
 - Display: 8x8 LED Matrix (MAX7219) single color, with side cheek LEDs
 - Electronic: ESP32, custom PCB[^5] with internal Oled display, custom software.

### [Theodor](https://www.facebook.com/thn.phl.sud.swath)
![Theodor](/assets/img/content/protogen_fursuits/theodor.jpg)

This protogen is a really unique one! Custom sawed-off visor. With custom frame, probably made out of foam.

Built by Theodor
 - Base: Custom! Probably made out of foam
 - Visor style: Custom! Probably made out of tinted plastic sheets
 - Display: 8x8 LED Matrix (MAX7219) single color
 - Electronic: Unknown, software unknown

### [Frosty](https://x.com/FrostDracopyre/)
![Frosty](/assets/img/content/protogen_fursuits/frost.jpg)

Probably M16 MK3, Not much to comment on construction

Built by ??
 - Base: looks like M16 MK3
 - Visor style: looks like M16 MK3 default
 - Display: 8x8 LED Matrix (MAX7219) single color
 - Electronic: Unknown, software: unknown

### [Kimmix](https://x.com/kimmix00/)
![Kimmix](/assets/img/content/protogen_fursuits/kimmix.jpg)

Very cool protogen! Custom PCB, Custom control software and acceleration & voice reactive and also boop-able. Check out their [Github](https://github.com/Kimmix/KMMX-Fursuit) for plenty technicals detail.

Built by Kimmix and [TasP0lar](https://x.com/P0larTas) (PCB)[^6].
 - Base: probably M16 MK3
 - Visor style: probably M16 MK3 default. Visor fabricated by TypeZeroOne[^7]
 - Display: HUB75 Display, with OLED HUD and side-cheeck LED
 - Electronic: Custom ESP32-S3 based board, with proximity sensor, accelerometer and bluetooth connectivity.
 Software: Custom with custom bitmap face creation tool, again they're on Github.[^8]


[^1]: Edited at 30-05-2026 (dd/MM/yyyy). I think Nikowari is the actual owner.
[^2]: <https://www.furaffinity.net/view/52226449/>
[^3]: Purple board <https://www.facebook.com/typezeroone/posts/pfbid0FmY8fvxszAKpS3dnN5Bj3WvPUoch2cLZHR7meBD2FEPdnQYJYVWiUd2uGb5CJqigl>
[^4]: <https://www.facebook.com/photo.php?fbid=122140578290052239>
[^5]: <https://x.com/GuestDaProtogen/status/2007837449536540718>
[^6]: <https://x.com/kimmix00/status/1717981851267338535>
[^7]: Author comment <https://www.facebook.com/photo.php?fbid=810328868701665>
[^8]: Like a lot of technical details on Github <https://github.com/Kimmix/KMMX-Fursuit>