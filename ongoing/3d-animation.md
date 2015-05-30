######2015May20 20:00:01+0900

<https://www.youtube.com/watch?v=GOcLrLKDesw> : sketchup physics.. rendered by indigo. / "Sketchup, skindigo, sketchy physics and indigo."
<https://www.youtube.com/watch?v=AuoSYcoG_U8> : sketchup physics : "Sketchyphysics - How to make a car drive and steer in Google Sketchup"

renderers
<http://www.indigorenderer.com/indigo3> : indigo
<http://www.luxrender.net/en_GB/gallery> : luxrenderer (open source)
<http://www.luxrender.net/forum/gallery2.php?g2_itemId=3712&g2_page=3> : luxrenderer gallery

######2015May25 17:40:41+0900

Sketchup physics
<http://sketchucation.com/forums/viewtopic.php?f=61&t=58936>

Baking
<https://studiomugenjohncel.wordpress.com/2012/10/26/baked-textures-in-sketchup-i-swear-im-not-on-drugs-this-time/>

Understanding COLLADA
<http://www.wazim.com/Collada_Tutorial_1.htm>

COLLADA animation @ Blender
<http://wiki.blender.org/index.php/User:Phabtar/Full_COLLADA_Animation_Support_for_Blender>
<https://www.blender.org/manual/physics/force_fields.html> : Force field

Physics @ Blender
<http://wiki.blender.org/index.php/Doc:2.6/Tutorials/Physics/Rigid_Bodies>
<https://www.youtube.com/watch?v=9JYrPpRNAzc> : Bouncing Ball tutorial.

Learning Blender
<http://wiki.blender.org/index.php/Doc:2.4/Manual/Interface/Window_system>

**Blender Phyisics -> Baking to Keyframes @ Blender / Exporting as COLLADA**
<https://cgcookie.com/blender/2011/05/10/tip-recording-game-physics-to-keyframes/>

COLLADA internals
<https://collada.org/mediawiki/index.php/Using_accessors>
<https://collada.org/mediawiki/index.php/CgToGLSL_conditioner>

NOT using Blender Game engine to do physics in Blender, but using normal Blender Rendering engine. to do animation..
<http://blender.stackexchange.com/questions/5100/how-can-i-add-motion-to-an-object>
<http://blender.stackexchange.com/questions/7087/how-to-make-small-objects-fall-properly-with-rigid-body>
<http://www.blenderguru.com/tutorials/quick-tutorial-make-a-wrecking-ball-with-rigid-body-physics/>

-

첨엔.. 스케치업 플러그인 SketchupPhysics를 써서.. 애니메이션을 만들고 그걸 COLLADA로 export하려고 했는데..
스케치업에서 COLLADA animation 기능의 export를 support안하는 것 같아서..
Maya라던지 3D MAX라던지 하는 전문적으로 이런걸 위해서 나온 툴을 쓰면 된다고 해서..
분위기 보니까.. 게임 개발에 좀더 적극적으로 애니메이션 개발에 적극적으로 연결되어있는 툴을 써야 하는 것 같아서, 고른게.. 오픈소스 3D rendering 툴인 Blender.

먼저 bouncing ball 애니메이션을 블랜더로 구현하는 것 부터해서.. 이걸 keyframe 으로 뽑아내는 baking 하는 법을 연구하고.
성공적으로 튜토리얼을 찾아서. (위에 **굵은 글씨**로 된거..) 성공적으로 했는데.. 이게 세원씨 flash 에서 로드가 제대로 안되서..
왜안되는지 COLLADA animation형식에대해서 좀 알아보다가, 그냥 png하나하나 작업해서 vegas로 영상으로 뽑는 걸로 귀결되었다.
(이미지 손전등 / Image Lantern 프로젝트 관련해서 연구함.)

Indigo 라는 렌더링 엔진도 있었는데.. 스케치업으로 만든거에 렌더링 걸어주는 거.. 꽤 괜찮았고. 근데, 유료여서..
luxrenderer 라는 렌더링 엔진은 오픈소스였다. 겉보기엔 화려한거 없는데.. 역사가 꽤 있고.. 잘 만들어진듯했다.
Blender 배우는 것도.. 여러가지 단축키들을 사람들이 많이 쓰는데.. 어떤 키를 누르고 있는지 자동으로 표시해주는 튜토리얼이 있어서.. 이런식으로라면 보다 쉽게 배워갈 수 있겠다 싶어서.. Blender를 하는 것도 긍정적으로 생각하게 된다. (역시 **굵은 글씨** 튜토리얼에서..)

-

blender에서 지금 처럼 blender game 엔진을 써서 하는 방법은 정말 physics에 국한되기 때문에.. 물리적이지 않은 움직임이나 좀더 일반적인 애니메이션은 blender render 엔진(기본엔진)에서 하는 것도 많이 나와있는 방법이었다. 다시 이렇게 할 일이 있다면, 이쪽으로 해보는 것도 좋을 듯.
아, keyframe baking은 .. automatic recorder가 알아서 해주는 것이었다. 튜토리얼에 보면 나온다.

----

