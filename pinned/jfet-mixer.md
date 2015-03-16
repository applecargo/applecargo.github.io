
######2015Mar17 01:14:33+0900

jfet mixer를 따라 만들어봤는데, 결과가 상당히 좋다.

저항치도 제대로 쓰지 못했는데..

<http://www.electroschematics.com/tag/audio-mixer-circuits/> : 여기서 여러가지 찾을 수 있는데.
<http://www.electroschematics.com/97/simple-mixer-circuit-schematic-common-base/> : 이런거나..
<http://www.electroschematics.com/393/fet-audio-mixer/> : 이런거나 (이걸 만듬..)
<http://www.electroschematics.com/2917/audio-mixer-with-one-transistor/> : 이런 것도 흥미로운데..

위에 fet audio mixer 란거를 따라서 만들었고..

<https://www.fairchildsemi.com/datasheets/MP/MPF102.pdf> : 이게 jfet인데..
<http://www.electronics-tutorials.ws/transistor/tran_5.html> : jfet이란 이런 놈이고.. 예전에 배운거 같긴함.. 지금 보니 참 이상적인 놈이다..

실제로 제작된 현재의 결과는.. 실제 회로도와 조금 다르게..

![](http://www.electroschematics.com/wp-content/uploads/2009/10/fet-mixer-circuit-diagram.gif)

이게 실제 회로도라면,

여기에 trimpot 100k 랑 470 저항은 맞게 넣었고.. (470은 1프로)

4.7k 없어서.. 3.3k 가 들어갔고.
3채널로 제작했으니까.. 22k/3 = 7.3k 인데.. 없어서.. 3.3k * 2 = 6.6k 로 넣었는데..

머 별일 없이 잘되고, 잡음도 한개도 없고 나이쓰다..
아, 전원은 엘레파츠의 부스터를 써서.. 5볼트 폰 충전용 아답타에서 19.5v 로 승압해서 들어갔다. (샤오미 배터리로도 구동이 잘 되는데, 문제는 이게 자꾸 꺼지는 바람에.. 저절로 셧다운이 자꾸 작동..)

여튼, 만들려고 오래 전부터 생각했던 걸 만들어보고, 결과도 좋아서 좋긴한데...
밴드 연습은 물건너갔나.. 원정이는 자뿌렀네.
