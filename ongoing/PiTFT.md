
######2015Jan07 00:33:36+0900

PiTFT를 사서, 조립/설치/테스트 했다.

<https://learn.adafruit.com/adafruit-2-8-pitft-capacitive-touch/easy-install>

easy install 진행 결과, 화면 표시는 잘 되는데, startx 시, 안되는 문제.. 그리고 설치 도중 뭔가 에러가 하나 있었는데..
startx가 안되는 바람에 touch 가 되는지도 검증을 못했으니.. 확인 필요하다.

기타 링크 일람

<https://learn.adafruit.com/adafruit-2-8-pitft-capacitive-touch/backlight-control>

<https://learn.adafruit.com/adafruit-pitft-28-inch-resistive-touchscreen-display-raspberry-pi/downloads>

<https://github.com/adafruit/adafruit-rpi-fbtft/>

<https://learn.adafruit.com/system/assets/assets/000/013/040/large1024/raspberry_pi_pitftschem.png?1387563188>

그리고, 근본적으로 업데이트 과정을 보니.. 커널을 다 새로 써버리던데.... 이렇게 되면, satellite CCRMA의 low-latency 커널을 잃게 되는데... 이부분을 꼭 이렇게 해야 하는 건지... 필요할 때만, 모듈로 접속하거나 기존의 커널을 유지하거나.

그럴 수 없다면, satelliteCCRMA 패치와 PiTFT 패치를 커스텀으로 통합 적용해서 내가 kernel compile을 수행하는 과정까지 나아가야 할 필요도 있다는 것이다.

