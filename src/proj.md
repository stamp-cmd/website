# ProtoTracer Binary FBX Converter

It's side project I made to improve [ProtoTracer](https://github.com/coelacant1/ProtoTracer) tools a bit. This tool work with binary FBX, from [Blender's Spec](https://code.blender.org/2013/08/fbx-binary-file-format-specification/).
Written with native Python. So OS independent and works out of the box.

smoluwu used this tool, and taught others how to make custom face with this tool. So it's standard unofficial converter now.

Then I extended it to have multiple meshes and triangulation warning.

And Cytrixian made a Youtube tutorial on how to create custom face: [Custom Protogen Faces For ProtoTracer Tutorial](https://www.youtube.com/watch?v=0nRHVcIohTg).

Github Repo: [ProtoTracerBinFBXConverter](https://github.com/stamp-cmd/ProtoTracerBinFBXConverter)

---

# EV3 Direct Command library

I made a terrible finacial decision to buy 2 [EV3](https://en.wikipedia.org/wiki/Lego_Mindstorms_EV3) set (31313, 45544). So now I have to make up for it.

EV3-DC is low-level library to generate Direct Commands packet for EV3. Direct Commands is also fun to implement.

Written in Rust for practice and make something finally meaningful.

It can
 - Display Images
 - Control motors
 - Read values (ie. battery percentages, name)

Since it's low-level you can implement anything. It's like programming with C rather than assembly.

Github Repo: [EV3-DC](https://github.com/stamp-cmd/EV3-DC)