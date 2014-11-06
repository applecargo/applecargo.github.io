
######2014Nov04 08:58:48+0900

2 hours.. to go.

---

잭이 달라는게..

CRDLT OVERVIEW..

---

CRDLT_Demo Models

* Copper Plate testings
  * get material for testing (check sources in GRA) (copper different thicknesses + coatings)
  * find metalworker / craftsman / jewellery maker
  * **Setup with Dooho how to test material**

* Wood Material testing
  * assemble wood for treatment test (dollar Range?) visit http://www.fijnhout.nl/, minervahavenweg 14. checking pricing beforehand
    * Grenen: 50 euros
    * Iepen: 75 euros
    * Kersen 130 euros
    * Walnut 120 euros (from boti)
    * xxx
    * xxx
  * assemble treatments for wood
    * oil 
    * oil + wax
    * lijnzaadolie
    * xxx check furniture boti / tieme / ron
  * Make sample board for comparison
  * comparison test :
    * density
    * wood structure
    * grain structure
    * cost

* Production of shell
  * CNC method: issues 
    * Rhino Model
    * Door Detail
    * Lid lock Detail
    * Weight of product
    * Interior shape for sound
  * Manual Method by Boti
    * Cost estimate
    * Door Detail
    * Lid Lock Detail
    * Weight of product
    * Time needed for production

* Electronics
  * Dooho’s improvements
    * **dooho send second prototype interior minus battery**
      * jack needs to put it together
    * **Schematics needed from Dooho for assembly (speak with Dooho about it)**
    * **Bill of materials needed (jack with dooho)**
    * Calibration mode test 
    * Battery issue with sensors
  * cost estimate on electronic part cost
  * time estimate on assembly

* Sound Scape
  * Salvador Breed Sounds: what else can he do? **gyroscope controlling pitch?**
    * call him to update...
  * New sounds from CD (license-free)
  * Make new track in house
  * Analysis on what is missing
  * Test sound play strateg

---

the messages... from jack..

---

Prototype-material research

---

This Will be document to discuss material research and findings. If we have a Comment or
addressing The issue please Mark who said what. For example : J: jack. D: Dennis. **DY: Dooho**

J: I would like to make. Plan of approach to how we are going to test The materials we propose. 
We need Dooho's input on how he would do it.

Boti: Calcluation for 3 prototypes: 3 days of work on ippen wood (material cost not included)

* €240x3= €720 ex btw. 871,20 inc. btw.
* if one of them is made out of walnut: Total cost would be €960 ex. 
* getting the wood, treating wood, glueing wood, cutting wood to size for cnc, then sanding and oiling after cnc.
* Wood cost: Ippen: €75, Cherry/kerst: €130.21 Pine/grenen: €50, ex btw

documentations of the prototype needed:
Oct 22 2014_J: Dooho: We need from you these things:

* **Final schematics of the electronics design (you did sketch before, but not sure if it was updated to the new situations)**
* **Final material list of all components: basically a bill of materials down to push buttons controls.**
* **A full working set (electonics) (this is with all the issues we needed to tackle. Such as power, sensor, etc..**
* **Also a filtered selection from 3M products that you think might work.  I know these are tapes and you suggested tapes, so lets have a look at it. If you have any clever ideas on how to apply the tapes so that it works and also aesthetically pleasing, please share.**

Oct 22 2014_J: **What is the info/ parameter needed to give to a jeweler to have them make alloys for us.  For instance, how much Ohms per cm squared. Dennis would like to know how to ask someone to make alloys and how to test it to meet our requirements.**

---

Patent descriptions

This will be a document to start making preparations for patent application.

patent stuff.
I don't see any special technology here.. (high-tech stuff).
So the point is actually how we apply this simple tech to get what we've get.
The device is just measuring a serialized resistance of 2 person, which is actually a combined resistance varying according to the touch gesture between those 2 person. or even more than 2 person.. only if they are all making touches one another.
I will run through the technological stuff after their touch action.. first of all, we measure the resistance.
How we measure the resistance is really low-tech. we just measure with 1 resistance serialized. How we detect such and such gestures. This might be recognized somewhat high-tech. Because there is a know-how on doing this. but **it is now easy to say that this one has the singularity.** because this **pattern recognition** is really developed to fit the demand of designers (yes, you guys, jack & dennis). **not a generally approvable 'new' tech but a specific solution.**
To be honest, i feel that there's no clear entry point to build up a patent from the project as technology side. I need some inspiration on this. From which perspective, we start?
IMO, The most interesting and exciting part of this project, I believe, is how the interactive sound feedback can stimulate and intervene the relationship of people..

---

그래서.

첫째로 할 게..

* **Final schematics of the electronics design (you did sketch before, but not sure if it was updated to the new situations)**
* **Final material list of all components: basically a bill of materials down to push buttons controls.**
* **A full working set (electonics) (this is with all the issues we needed to tackle. Such as power, sensor, etc..**
* **Also a filtered selection from 3M products that you think might work.  I know these are tapes and you suggested tapes, so lets have a look at it. If you have any clever ideas on how to apply the tapes so that it works and also aesthetically pleasing, please share.**

Oct 22 2014_J: **What is the info/ parameter needed to give to a jeweler to have them make alloys for us.  For instance, how much Ohms per cm squared. Dennis would like to know how to ask someone to make alloys and how to test it to meet our requirements.**

요고..

---

Final schematics of the electronics design

---

* ~~optocoupler board for power switching.. from rpi to sensor brd.~~

* ~~sch. for sensor brd.~~

* find mechanical switching plug-in for automatic small battery charge up.
  * or... solve the issue on power charging for that sensor booard!

* ~~replacement for rpi. --> check out.. what is available. for multiple sound modes.. capable.~~

* explanation on the pattern recognition @ pd patch.. for patent guy... and ourselves..

---

explanation on the pattern recognition @ pd patch.. for patent guy... and ourselves..

---

Data logger의 Camera Calibration 방법

1. 발명의 목적
Data logger에서는 센서의 측정치와 실제 물체의 위치를 비교 검증하기 위해 카메라를 도입하고, 센서의 측정위치를 카메라 영상좌표계로 변환하는 기술을 필요로 한다. 이를 위한 기존의 기술은 정확한 보정을 위해 영상 좌표계와 실좌표계 사이에 최소 8개의 높은 정확도의 위치데이터 쌍이 필요하다. 하지만, Data logger의 경우, 비교 검증 용도로 높은 정확도가 필요하지 않다. 따라서 이를 보다 빠르고 간편하게 수행하는 방법을 고안하였다.

2. 발명의 범위
카메라와 센서의 피사체가 2차원 평면으로 근사화 가능한 경우를 대상으로 한다. 즉, 차량에서의 경우와 같이 카메라와 센서의 설치 높이가 감지 거리에 비해 상대적으로 작아 무시할 수 있는 정도인 경우를 말한다(그림 1 참조). 또한 카메라와 센서의 x-y좌표상 거리는 0이라고 가정한다. 그러면 센서의 감지 정보는 x-y좌표계로 주어지고, 카메라의 영상 좌표계는 ix-iy 좌표계로 주어진다고 할 때, 본 발명은 x-y 좌표의 근사적인 ix-iy를 찾는 Camera Calibration 파라미터를 간단히 찾아내는 방법에 대한다.

그림 1 발명의 범위 및 전제 조건

3. 기존 기술
기존의 Camera Calibration 파라미터 계산은 이론적으로 8개의 데이터 쌍이 필요하다. 
아래는 3차원의 일반적인 경우의 파라미터 P와 P를 통해 x-y-z의 실좌표계의 데이터를 ix-iy의 이미지 좌표계로 변환하는 관계식이다.

이때 z=0이라고 발명의 범위에서 말한 것과 같이 가정하고 모든 원소를 m_34로 나누면, 다음과 같이 간략화할 수 있다. 

따라서 데이터 쌍이 8개만 있으면 위의 관계에서 연립 방정식 8개를 얻어서 P를 얻을 수 있다. 이 8쌍 (3차원의 경우라면, 11쌍)의 데이터를 자동적으로 구하기 위해 격자무늬 판을 활용하는 등, 다양한 방법이 제안되었으나, 모두 영상처리 시스템을 위한 정확한 mapping을 위한 방법이므로 알고리즘이 매우 복잡하여 손쉽게 사용할 수 있어야 하는 Data logger에는 적용이 어렵다.

4. 발명의 내용
본 발명은 8개의 데이터 쌍 대신 한 개의 데이터 쌍과 기준 직사각형을 도입한다(그림2). 변환의 특성상 그림 2에서와 같이 사각형 영역은 영상 좌표계에서는 사다리꼴이 되게 되어 있다. 따라서 카메라의 방향과 센서의 방향이 틀어진 각도를 보정하기 위해 한 쌍의 데이터를 측정치로부터 구한 뒤, 기준 직사각형이 영상좌표계에 사다리꼴로 표시되었을 때, 각 윗변, 아랫변, 높이 이상 사다리꼴의 세가지 파라미터를 직관적으로 조절하여 관심영역의 Camera Calibration을 간략히 수행할 수 있다.

그림 2 발명의 내용

5. 기대 효과
본 발명은 8개의 데이터 쌍 대신 한 개의 데이터 쌍과 기준 직사각형을 도입한다(그림2). 변환의 특성상 그림 2에서와 같이 사각형 영역은 영상 좌표계에서는 사다리꼴이 되게 되어 있다. 따라서 카메라의 방향과 센서의 방향이 틀어진 각도를 보정하기 위해 한 쌍의 데이터를 측정치로부터 구한 뒤, 기준 직사각형이 영상좌표계에 사다리꼴로 표시되었을 때, 각 윗변, 아랫변, 높이 이상 사다리꼴의 세가지 파라미터를 직관적으로 조절하여 관심영역의 Camera Calibration을 간략히 수행할 수 있다.

6. 청구범위
한 쌍의 점과 사각형을 이용하여 카메라 보정을 수행하는 방법

---

mTTL 특허.

Data logger의 Camera Calibration 방법

1. 발명의 목적
...why needed? this invention..

2. 발명의 범위
...coverage... or.. abstract.. summary of the content of invention.

3. 기존 기술
existing tech,

4. 발명의 내용
content.

5. 기대 효과
expected effect of this invention

6. 청구범위
claims.

---

my document for the patent made out of following structure.

0. title

1. purpose of the invention.

2. coverage (of the invention)

3. existing technic

4. content of the invention

5. expected effect of this invention

6. claims

---

purpose & coverage & existing technics.. could diverse as tactics.

i will write sth. about 4. content.

5 will be sth. straight forward along 1 to 4.

6 should be carefully written thus this part really set up effective part with the law

---

the system could go bigger and bigger but i just feel that this pattern recognition part could have advantage as a potential patent..

so will talk about pattern recognition. but if you guys want to broaden the subject, that's fine, too.

---

first of all, what we do here is recognizing some specific patterns in a single input signal of a system. These patterns in the signal actually correspond to specific acts that is being generated while the users of the system interact or touch each other including the system.

anyway, whatever situation. we...

---

######2014Nov05 11:19:48+0900

특허는 abstraction이다.

abstraction layer를 하나 찾아내야 한다. 하나 이상? ..

evernote를 참고해서.. abstraction layer를 찾아내라.

---

######2014Nov05 16:19:28+0900

absraction layer는.. 6가지.. 터칭이 되야 할 것 같다.

그걸 기준으로 생각해서..

노이즈 제거 후.. 반복되는지 보고 반복 그룹과 안반복 그룹을 나누고.

그 안에서 높은 반응 그룹과 낮은 반응 그룹을 나눈다.

그렇게 4가지가 나온상태에서..

... 암튼.. 패치의 내용을 그대로 말로 서술하면 될 것 같다..

전체적인 특허 구조를 예전껄 가져다가 채우는 것은 못할 것 같다.

왜? 걍.. 넘 하기 싫다고나 할까..

그 구조 얘기는 없었던 일로 하고.

알고리즘 설명을 잘 적어서 주고 끝내버리자.

---

지난 번에 영상을 참고하도록 하고.. evernote에 있는 "pd patch calibration points summary" 글이랑.. 캘리브레이션 설명하는 영상을 참고하면.. 감은 잡을 수가 있더라..

그렇게 해서 뒷부분에 생략한 부분까지 적어서 설명하고 끝내도록.

---

######2014Nov06 10:28:26+0900

* interpersonal touch gesture detection algorithm

  * system construction

    * the system measures one combined resistance of anything and anybody that participates in the circuitry.
    * if there is interpersonal touch gesture changes between somebody who is building up the circuitry, the measured combined resistance changes.
    * the system have several methods invented to recognize which kind of gesture has been performed in the circuitry.
    * we will cover how this touch gesture pattern recognition designed.

  * categories of touch gesture patterns to be recognized

    * no touches
    * repeatitive touches / non-repeatitive touches
    * intense touches / mild touches
    * entry / exit of gesture
    * absoluted differentiation method for detecting repeatitiveness without a fixed threshold

  * no touches

    * first of all, even though there is no connection at all between these measuring electrodes, the measured value is not always equals to zero due to system noise.
    * so small portion of the dynamic range should be regarded as a meaningless range and rejected away.
    * after removing system noise, we want to classify if those touches are repetitive or non-repetitive.

  * repeatitiveness

    * the system has an internal counter to measure a time interval.
    * at start, the signal is expected to be lower than noise threshold and this clears counter.
    * if the signal goes higher than the noise threshold, the counter starts to count up for predefined counts.
    * while the counter is counting but not reaching the predefined maximum value, the gesture is considered as a repeatitive one.
    * if the signal does not go below the noise threshold for predefined counts, the count will reach the maximum. and from that moment the gesture is considered as a non-repeatitive one.
    * if the signal goes below the noise threshold and does not increase again, the gesture is considered as no touches again and the counter will be cleared and stop.
    * if the signal goes below the noise threshold and then becomes higher then the noise threshold again, the counter will restart counting and again. while it is counting and not reaching the maximum, the gesture will be considered as a repeatitive one.
    * in this manner, if the signal keep repeatitively goes below noise level and goes over noise level in the predefined time interval, the gesture recognition will stay to be repeatitive.
    * after recognizing repeatitiveness, we want to classify further if those touches are intense or mild.

  * intensity

    * intensity just directly comes out of the decision if the signal is over certain threshold or not.
    * if it is higher than the threshold, then it will be considered as a intense one. otherwise, it will be considered as a mild one.
    * putting this intensity decision and repeatitiveness decision together, the system can derive 4 different cases : mild repeatitive gesture (or tapping), intense repeatitive gesture (or padding), mild non-repeatitive gesture (or stroking) and intense non-repeatitve gesture (or holding).

  * entering and finishing of gesture

    * the system also detects entry and exit of gesture using another counter.
    * when the classification for current gesture updates to something else, use of edge detection algorithm will classify the entry and exit event of such gesture.
    * a rising edge detection - 'was 0, now 1' - of the gesture classification will detect entry. (for example, grabbing)
    * a falling edge detection - 'was 1, now 1' - of the gesture classification will detect exit.

  * the sense of repeatitiveness depends on the sense of the threshold

    * even though the system made once decision that the gesture is non-repeating, this only means that the signal is repeatedly crossing noise threshold.
    * of course, one can define other threshold to get another sense of repeatitiveness decision.

  * absoluted differentiation method for detecting repeatitiveness without a threshold

    * the system also differentiate the signal to detect repeatitiveness not against fixed threshold but as a general matter.
    * the system counts collected counts of instant increase of absoluted differentiated signal that exceeds a certain threshold for certain time interval. this collected counts of viable instant increases do summarize the tendency of waving in the signal. so, applying a threshold to this collected counts timely, the system can recognize intensity waving aspect of the gesture. (for example, kneading)

---

