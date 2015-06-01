
######2015May31 14:12:37+0900

첨엔.. 윈도우/맥 듀얼부트를 하는 나로서.. 양쪽에서 다 mdwiki를 구동하고 있는 상황에서..
한가지 주제에 대해서, (읽기 쓰기가 서로다른 운영체제 사이에서 잘 안되니깐..) 여러군데서 다르게 써버리면..
일단은 뭐 괜찮은데..
나중에 렌더링할때, md 파일 2개를 하나에 embed 해서.. 보여줄수는 없을까 생각하게 됐고.

-

<https://www.google.co.kr/search?q=embedding+markdown> : 검색 1
<https://www.google.co.kr/search?q=inline+markdown> : 검색 2

그래서 이런 글을 만남. : <http://wolfslittlestore.be/2013/10/rendering-markdown-in-jekyll/>
내용은 좋은데.. 답글에 보니, 또 누군가는 의문을 제기하는 것이.. 'kramdown 이란 플랫폼을 너가 쓰고 있는데, 굳이 이렇게 해야 하냐? 그럴필요가 없다!' 하는 소리가 있었고..

<http://kramdown.gettalong.org/documentation.html> : kramdown

여튼.. 둘다 jekyll에서 지원이 되고.. jekyll은 github pages에서 지원이 된다.

음 여기까지 보고 생각해보니.. jekyll에서는 mdwiki와 달리 여러가지 확장버젼의 markdown을 활용할 수 있는데.. 한번 넘어가봐야 하나? 하는 생각이 들기에 이르렀다.

게다가 github가.. jekyll을 지원한다고 하는데.. 컴파일과정까지 다 지원을 한다는 것인지.. 어떻게 지원한다는 것인지 의문스럽기도 하고..

<http://jekyllrb.com/docs/usage/>

일단 jekyll은 서버를 돌려야 되는 구조고.. 컴파일을 해서. serve를 하는데..
아마, 내용이랑 컨피그를 짜서 올려주면, jekyll @ github 가 컴파일 & 컨피그 적용해서.. serve를 해주는 건가보지.
만약 그렇다고 하면 내가 jekyll을 깔 필요가 없고 나는 그냥 jekyll page 파일이랑 설정/레이아웃 (아직 뭔지는 잘모르지만) 등등을 이용해서 짠 페이지 내용만 가지고 있으면서.. git push만 하면.. 나머지 일은 github에서 알아서해준다는 소리.
편리하다! 생각하게 되었는데..

-

이렇게 하게 되면 문제랄까.. 아쉬운 점이.. 로컬웹이 없다는 점이다.
내가 로컬웹을 보려면... jekyll을 내꺼에도 깔아서 돌리면 되는데... 뭐 그것도 나쁘지 않으려나? ㅇㅇ
하긴.. 그렇게 생각하면.. github에서 jekyll을 서브 해준다는 말은... 무슨 의미가 있는 건지.. 아리송..
왜냐면 어차피 내가 로컬웹을 생성을 하면.. 그걸 푸쉬해서 결과물만 올리면 되지.. 뭐하러 그쪽에 있는 jekyll을 써야 하나 하는 문제가 생김.

머.. 내가 로컬웹을 안쓸 생각이라면 얘기가 다르겠지만... 이 컴파일 과정 & 서브 과정에 대한 명확한 이해가 없으니.. github 에서 지원하는 jekyll의 의미도 아리송하다.

<https://help.github.com/articles/using-jekyll-with-pages/> : 이걸 더 읽어봐야 한다.

---

######2015May31 14:25:21+0900

여튼 그래서. 이야기를 계속하자면..

로컬웹 jekyll 서버에 대해서 생각하다가... 뭔가.. jekyll 컴파일 & 서브를 해주는 기능이 rpi 같은거에 들어와 주면 어떨까.. 하는 생각도 했다.. 음.. 그냥 한번 생각해봤다..

그랬더니.. 이런게 이미 있었다.

<http://darryldias.me/blog/jekyll-on-raspberry-pi> : jekyll-on-rpi.

누군가가 해본 기록인데... 아마 rpi를 데탑으로 쓰는 사람의 경우에.. 고려하는 방법이 아닐까. 싶기도 하고 여튼..

근데..

여기서. 또 새로운 주제가 나오는데..

중간에 PiBang Linux 이미지를 썼다는 얘기가 나온다.

<http://n0where.net/raspberry-pi-linux-distribution-pibang-linux/>

```
Raspbian uses LXDE. PiBang uses the lighterweight Openbox Window Manager in conjunction with Tint2 as a panel and Nitrogen as a wallpaper handler. PiBang Utilizes this lighter weight desktop in hopes to be able to run more resource intensive programs like Abiword, Geany, and Gnumeric at the users discretion. Openbox has been overlooked in the Raspbian project probably because it is a little more difficult to change menu items. PiBang has installed most programs you will need by default and already has them in the menu. This is one reason why the image is larger than Raspbian. The PiBang team has worked very hard to migrate many menu tweaks originally authored by Phillip Newborough of the Crunchbang Project to the Raspberry Pi which makes editing the menu much easier.

The second major difference is choice of init system. Raspbian ships with the Debian default SysV init. Pibang has decided to switch toSystemD. Since most major Linux distributions have switched, and it appears future versions of Debian will also be running SystemD we have decided to go ahead and switch. What does this mean for you? Faster boots and easier init scripts!

The third major difference is the software repositories. Raspbian has built a comprehensive and impressive software repository, with tons of software. In fact it is so impressive that Pibang use the Raspbian repositories as our base. The difference is that Pibang have its own repositories as well to augment the wonderful Raspbian repos. Pibang repositories offer software that is newer, not offered, too custom, or too expiriemental to be offered by the Raspbian Repos. As such Pibang is able to give users a cutting edge advantage while still being built on a solid dependable foundation.

The fourth big change is the file manager. LXDE by default uses the pcmanfm file manager while PiBang uses Thunar SpaceFM. They are both really similar, but we feel SpaceFM while slightly more resource intensive offers enough improved functionality to be worth it.

The fifth big change is the default $SHELL. Bash has been the default for most Lnux distributions for a long time. We have decided to be trend-setters. All editions of PiBang ship with ZSH as the default shell. All system scripts still use /bin/sh which is still a simlink to Dash.Bash is still installed for those that want it as it is part of the default Debian/Raspbian base. If you want to know more about ZSH here is a cool slideshow someone made about ZSH.

Finally, PiBang has forked the Raspi-Config program. Initially this was to add missing features. Many of those features have been accepted upstream, and we are further pushing the the program to increase security.
```

흥미로운 녀석이다.. 뭔가 좋은 걸 발견한 기분이다.
앞으로 커널 컴파일하면서 rpi를 쓰게 되면.. 그리고, 리눅스 시스템에 대해서 좀더 편안하게 느끼게 되면.. 그 과정에는 반드시 이런 윈도우 매니져가 좀더 투명하고 명확해 져야 하는 부분이 있는데.. OpenBox 라는 게 LDXE 같은거랑 차원이 달라, 많은 리눅스 유져들이 좋게 생각하고 있는 것 같다..

pibang의 전신이라는 crunchbang은 rpi에 특화된게 아니고.. 일반적인 것인것 같다.

<http://crunchbang.org/>

여튼 이것들.. 좀 보기에 좋아서 맘에 든다. 깔끔함. 좋다 좋아. 나중에 꼭 써보고 싶다고 생각함.

---

* 그래서 jekyll을 일단 공부해서 기본 마크다운의 여러가지 아쉬운점을 해결하고.. zine 같이 레이아웃이 들어가는 걸 짜볼 수도 있고... 새로운 웹저작의 가능성을 열어봐야할 시점이 된거 같다는 얘기 하나랑...

* 웹서버를 돌리는 초소형 플랫폼. WIFI ESP8266 칩이라던가.. 등등.. 에서 서버를 돌린다고 할때.. jekyll등으로 돌리면 더 좋지 않을까 하는 부분.

* 그리고 rpi나 SBC에서 작업하거나.. 리눅스에서 작업할때.. 커널 컴파일하고 커스텀 윈도우 매니져를 쓰는 것에 대한 로망 등등.. 이 3중 믹스 되서 들어오니까.. 이렇게 정리해 놓지 않을 수가 없었다.

에휴.. 겨우 정리 끝.
