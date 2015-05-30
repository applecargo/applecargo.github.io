
######2014Nov15 15:27:58+0900

정전식 터치를 하는 보드.

1) ototo - open source 할 꺼라는데.. 하긴 뭘.. 감감무소식.
2) bare conductive's touch board. - passive open source.. (킥스타터 버젼만 공유.. 쩝..)
3) makey makey - open source. 이런게 역시 오픈소스.. 미국얘들이 좋긴한거 같아...

1) 은 정보가 없지만, 2)를 참고해볼때.. 그리고 분위기상 이 덴타쿠 아자씨 (유리 스즈끼) 뭐 특별한걸 했을 거 같진 않다. 걍 mpr121을 쓴다고 볼 수가 있다.. 그럼 지금 내가 쓰는 거랑 동일하다.. 즉, 문제는 그대로 일 것임.. 뭔가가 잘된다면, 그건 bare conductive의 잉크가 좋기 때문이지... 회로로 뭘 할 수 있는 건 아닐 것이다.

3) 은 저항을 쓴다고 한다. 의외로! - 22Mohm 풀업을 약하게 걸어놓고.. 쓴다고 한다.. keyboard / mouse로 한 것도 좋고.. 코드도 주석 많고.. 잘 만든거 같다..

4) wiretouch도 따로 리서치 했었는데.. 좀 버겁다.. 여튼, 웨이브를 하나 쏘고. 캡의 크기를 재는 식이란 건 알겠는데.. 여러가지.. 테크닉이 들어있다.. 공부가 마니 필요한듯 하다.. --> [wiretouch](wiretouch.md)

-

여튼, 이상을 종합할때..

기존의 스위치식.. (종이 피아노 방식)

정전식 1층 - mpr121을 이용하는..식..이나..555타이머를 써서.. wiretouch 스타일로.. 캡을 측정하는 방식..  (아마 아두이노는 필요하지 싶다.. adc 때문에..)

정전식 2층은 포기.. 넘 복잡하다. -> 나중에 하던지..

-

여튼,.. 그렇다..

관련 링크들을 정리한다.

<http://www.adafruit.com/blog/2013/10/28/dentaku-ototo/>
<http://jinbuhmkim.tumblr.com/post/77461370373/ototo-make-music-from-anything>
<http://opensource.about.com/od/project-ideas/fl/Fun-DIY-Musical-Instruments.htm> - mutable instrument도 언급되네... 이들은 어떻게 하나??
<http://www.ototo.fm/ototo>
<http://www.ototo.fm/news/>
<https://www.kickstarter.com/projects/905018498/ototo-make-music-from-anything/posts/742046> - 오픈소스하겠다고 하고 있다... 쳇.. 유리스즈끼 원래 별로 안좋아했는데 역시 쪼다네..
<http://nearnow.org.uk/news/invention-studio-dentaku-launch-ototo-electronics-kit-with-near-now/>
<http://nearnow.org.uk/projects/ototo>

![](http://nearnow.org.uk/uploads/files/A.jpg)

유리스즈끼의 ototo 1st proto 라는데 여기 사진에 보면 쓰이고 있는. class d amp라는게.. 흥미롭다.. 15와트 급이라는데.. 흠... 쌔다..
칩이름은.. 이미지에 잘봐봐!!

<http://www.ti.com/product/tpa3122d2>
요거네..

![](http://flavorwire.files.wordpress.com/2014/09/electric-paint-21.jpg?w=1000&h=747)
요건.. 터치보드.. bare conductive..

<http://www.bareconductive.com/shop/touch-board/>
<file:///Users/doohoyi/Downloads/touch-board-kickstarter-edition-schematic.pdf> : 다운 받을수있단 얘기네... 
<https://www.sparkfun.com/products/9695> : mpr121을 쓴다.. 이들이...
<http://www.vlsi.fi/en/products/vs1053.html> : 이 칩도 들어있더라.. ogg vorbis decoder??

-

<https://github.com/sparkfun/makeymakey> 마키마키..
<https://www.sparkfun.com/products/11511>
<https://learn.sparkfun.com/tutorials/makey-makey-quickstart-guide> : 그라운드 선이 필요하다! 즉, 2손으로 작동시키는 것임!
<http://www.electronickitsbychaneyelectronics.com/images/C7280B.jpg> : 22메가옴은 띄 색이 이렇다..

깃허브에 있는 코드를 잘 보면.. keyboard / mouse 란 오브젝트가 있는데
<http://arduino.cc/en/Reference/MouseKeyboard>

레오나르도 / 듀. 를 위한 라이브러리라고 되어있다. 마키마키에서는 이걸 어떻게 어떻게 해서 집어넣은 것이다.. 참고.

