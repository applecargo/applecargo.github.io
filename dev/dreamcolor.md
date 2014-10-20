
일단 호주일이구요. 기간은 11월23일까지 약 한달~~~~

내용은 크리스마스 이벤트용 인터렉티브 LED 만들기

[](https://www.youtube.com/watch?v=pOUCvNfAt5k)

렌더링 처럼 사람들이 발판 밟으면 LED 라이트를 반짝~반짝~~

엘이디가 한개씩 조절이 되네요

아마 아두이노랑 뭐 콘트롤 쉴드랑 등등 쓰지 않았을가 싶은데

뭐 여튼 호주에서 이거 해달라고 하는데 제가 시간이 없음~ ㅠㅠ

그러게영. 스트립에 어떻게 잘 넣었네여..

프로토콜이 뭘까..

음.. 길이가 꽤 되겠네여.

원형으로 이거 다 박으려면..

그러게요~

뭐 하드웨어 비용이야 실비니까 우리가 신경쓸필요는 없어요~

스트립도 제작을 해야 되는 건가요?

이건 살 수 있는 건가?

컨트롤 방법이랑 딱 나오면

프로그래밍은 할 수 있겠는데여.

일단 이쪽에서 콜을 해야 호주에서 일을 받을 수 있어서요~~ 오늘중으로는 여부를 알려줘야 함~~ ㅎㅎ

호주에 호스트 회사는 어딘가요?

발주처요??? 아님 에이젼시?

에이젼시는 전에 제가 있던데

http://www.thecreativeshop.com.au/

음.. http://www.amazon.com/XKTTSUEERCRR-Dream-Waterproof-Change-Remote/dp/B008L9YXJG

```
This dream color led light has 133 different changing patterns and changing speeds, great to use in home, garden office and shops decoration etc.
Also can be flashing, fading and chasing, Red, Blue, Green auto change. You can use it to perform a dream colors lighting effects.

Specification for LED Strip:
Strip Voltage: DC 12V
Light Color: RGB Multicolor
133 different changing patterns and changing speeds
Number Of LEDs: 150PCS
Standard Packing: 5m/Reel
Strip Backing: White
Waterproof Rating: IP67

Specification for Controller:
Working temperature: -20- 60 Degree C
Supply voltage: DC12V
Consume power:2W
Output: Tow group SPI signal
Length setup function
A lot of programs to chose
Memory function
With digital tube, left two reveal the mode, right two reveal the speed

Function of remote panels:
ON/OFF: ON/OFF button, it can open or close led anytime.
MODE: Play/pause button, pressing this button to pause, you can see the static affection of led.
S+: Speed quick button, the least number is 1
S-: Speed slow button, there are 100 step in all, the most number is 100
B+: Program choosing button, up direction there are 94 programs in all.
B-: Program choosing button, down direction.
M-: Reducing button,to reduce the IC NUMBER,the least number is 3.

Package included:
1 x 5 Meter Dream Color Waterproof LED Strip
1 x 133 changing types controller
1 x Remote
```

```
You have to buy a separate microcontroller to create your own sequences. You can get a sufficient arduino for under $20, and find free, pre-written code with step-by-step instructions online. And then you have an arduino, and can experiment with controlling all kinds of lights and pumps and motors and whatever else runs on low-voltage DC.
```

spi 통신으로 제어들어가는데.. 주어진 리모콘으로 94 프로그램이 되어있는데..

따로 프로그램할려면. 아두이노써서 해보라고 하네여.

개당 5미터인데..

그림에서 보면 5-6개는 써야 할 것 같은데.

전체를 한번에 콘트롤 할 수 있을지가 관건이겠네요

spi 어드레스 그룹이 따로 관리가 되어있으면.. 가능할 수도 있고.

spi를 깊이 써본적이 없어서.. 가능한건지..

spi는 어드레스가 하드웨어로 찍혀있는 걸로 알고 있는데..

센서 같은거 써보면...

보통 몇개까지 묶어서 사용가능한지.. 대략 나오는데..

제가 쬐금은 서포터 할 수 있음~~ㅎㅎㅎ

여튼 같이 작업 한번 하면 재미있을거 같은디~~

요건 그렇게 많이 어려울거 같지도 않고~

오 같이 하는거면 좋져. ㅋㅋ

세원씨랑 같이하면 재밌으니깐. ㅋㅋ

아 spi는 어드레스가 없네여.

<http://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus>

보니까.. 어드레스는 i2c에 있는 거고.

i2c가 어드레싱을 하는 거고. spi는 없어여.

```
Slaves use the master's clock, and do not need precision oscillators
Slaves do not need a unique address — unlike I²C or GPIB or SCSI
```

두가지 구성방법이 나오는데

![](http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/SPI_three_slaves.svg/350px-SPI_three_slaves.svg.png)

![](http://upload.wikimedia.org/wikipedia/commons/thumb/9/97/SPI_three_slaves_daisy_chained.svg/350px-SPI_three_slaves_daisy_chained.svg.png)

그냥 클럭으로 쿨럭(?) 잡아서.

기기가 daisy-chain을 지원하면

줄줄이 비엔나로 이을 수도 있다는데.

<http://en.wikipedia.org/wiki/Daisy_chain_(electrical_engineering)>

아마 지금 경우는 데이지체인으로 된것 같아여.

각각의 엘이디가.

그리고 2개의 그룹으로 되어있다고 하고여.. 여튼..

```
Specification for Controller:
...
Output: Tow group SPI signal
```

몇개든지 이어붙이는 건 가능할 것 같네여.

아두이노가 좀 빨라야 할 것 같은데.. 문제되면 제가 조낸 빠른게 하나 있으니까..아두이노 due.

어케 되지 않을까 싶네여.

음. 그리고.. 전체적으로 신호가 전파되는 속도는 쉬프트레지스터의 클럭속도를 조절해서..

하는 것 같네여.

![](http://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/SPI_8-bit_circular_transfer.svg/400px-SPI_8-bit_circular_transfer.svg.png)

![](http://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/SPI_timing_diagram2.svg/400px-SPI_timing_diagram2.svg.png)

ㅇㅇ 대략은 감잡았는데...

예산와 보수는 어느정도인가여?

5미터짜라 40달러?

<http://guide.alibaba.com/sport/shop/xkttsueercrr-5m-5050-rgb-dream-color-6803-ic-led-strip-light-waterproof-amp-133-change-rf-remote_575438.html>

10개 산다 치고. 400 달러에.. 기타 보드랑 등등 400달러면 충분하겠죠?

일단 하드웨어비용은 생각하지 않으셔도 되요~

그건 그쪽에서 알아서 할거임~

작업일수는.. 7일. 로 하죠.

넘 오래 붙잡고 있음 지겨울거 같고여..

어떨까요?

우리는 단순 개발비만 산정하면 되요~~

ㅎㅎ ㅇㅋㄷㅋ

재료만 다 모이고 요이땅하면

7일정도에 치킨 먹고. 해결되지 않을지..

이거 하게 되면 spi는 지대로 알게 되겠네여 ㅡㅡ;;

- - - -

이거 정리하면서 생각해보니..

회사측에서 spi 스펙을 공개하지 않았을 가능성이있네여.

제조사측에서..

그럼 어케 되는 거지..

저 LED를 콘트롤 하려면 SPI 를 사용 할 수 있어야 되는 거잖아요?

네

같이 판매되는 컨트롤러를.. 써서 하는건데..

컨트롤러의 제어신호가 어케 나가는지를 알수 있는지..

즉, 아두이노로 별도 제어기를 만드는 걸 .. 제조사 측에서 오픈하고 있는지.. 의문.

정확한건 시제품 받아봐야 알겠는데여 .. 결국..

일단 공식적인 제조사인..

XKTTSUEERCRR 에서는.

해당 제품이 올라와있지도 않음.

-_-;;;

일단.. 다들.

<http://www.amazon.com/Magic-Dream-Effects-Remote-Controller/dp/B008YRZWXQ>

6803 ic를 사용한다고 하는데.

찾아보면..

<http://www.adafruit.com/datasheets/LPD6803.pdf>

아다푸르트에서 데이타시트 올라온게 있는데.. 엘이디 컨트롤러인 것 같네여.

이런게 엘이디 한개 마다 다 달려있다는 것 같기도 한데...

이런 정보가 있으면 어렵지 않게 가능할 수도.

6803 칩을 spi로 어떻게 컨트롤해야 하는지 나와있네여 데타시트에.

<http://www.adafruit.com/blog/2010/12/15/tutorial-rgb-led-digital-pixels-tutorial-lpd6803/>

튜토리얼..

감사합니다 누나..

<https://learn.adafruit.com/digital-led-strip>

스트립 테어다운.

이거면 대략 될 것 같네여. ㅠㅠ 레이디아다 만세.

아다푸트르에서 유사제품하나 사서 연습한번해보는 것도 좋을수 있겠네여..

"They have a chip for each LED"

맞네여. 칩한개씩..