######2015May20 20:11:50+0900

3차년도 준비.

차선변경과제 HVI Embedded화하기.

---

######2015May26 01:27:49+0900

odroid

확장보드 (SPI)
<http://www.hardkernel.com/main/products/prdt_info.php?g_code=G138232136481>
<http://www.hardkernel.com/main/products/prdt_info.php?g_code=G141351880955> : odroid xu3 lite
<http://www.samsung.com/global/business/semiconductor/minisite/Exynos/w/solution.html#?v=octa_5422> : processor exynos 5422
<https://www.raspberrypi.org/forums/viewtopic.php?t=24660> : csi-2 / mipi / lvds
<http://com.odroid.com/sigong/nf_file_board/nfile_board.php> : odroid downloads
<http://forum.odroid.com/viewtopic.php?f=63&t=4760> : "Is the "ODROID USB-CAM 720P" Hardkernel sold camera compatible with other than Android? Linux. Mac, Windows?"
<http://com.odroid.com/sigong/blog/blog_list.php?bid=&tag=ODROID-X&page=3&page=4> : odroid xu3 는 odroid xu 계열인가? -> 프로세서가 바뀌면서 넘버링이 함께 바뀌는 것 같다. / xu는 5420 / xu2는 5421 / xu3 는 5422 .. 즉, xu용 이미지는 xu3에서 작동 안할 가능성이 있음.
<http://en.wikipedia.org/wiki/Exynos> : 여기 뒤에 나오는 표 참고.
<http://www.samsung.com/global/business/semiconductor/minisite/Exynos/w/solution.html#?v=octa_5422>
<http://www.samsung.com/global/business/semiconductor/product/application/detail?productId=7978&iaId=2341>
<http://archlinuxarm.org/packages> : odroid에서 돌아가는 archlinux도 있다.

exynos octa 에서 csi-2를 지원하는가? => 칩 자체는 지원한다. xu3는 지원한다는 말이 없다. 일부러 안열어준건가? 의심되는 부분.
<http://electronicdesign.com/communications/understanding-mipi-alliance-interface-specifications>

odroid 이미지/소스들이 있는 곳. (including debian)
<https://github.com/tobiasjakobi/linux-odroid>
<http://odroid.us/odroid/odroidxu/debian/>
<http://odroid.us/mediawiki/index.php?title=Debian_Wheezy_Instructions>
<http://odroid.us/mediawiki/index.php?title=HardwareAndDrivers>
<http://odroid.us/mediawiki/index.php?title=ODROID_Devices> : 5422은 아직 등록이 안되어있다.

odroid & xenomai
<https://www.google.co.kr/search?q=odroid%20xenomai&es_th=1&rct=j>

linux kernel source
<http://www.tldp.org/LDP/tlk/sources/sources.html> : 커널 소스 보는 법.. / arch에서 odroid-xu3를 찾을수가 없었다. 버젼 몇 부터 이게 지원이되는 건지 알수가 없다.
<https://code.google.com/p/odroid-wheezy-retro/downloads/list> : debian wheezy / 분명히 되는 이미지들은 돌아다니는데.. 내가 만일 컴파일을 하고 싶으면 어떤 소스를 가져다가 해야 하는 걸까?
<https://code.google.com/p/odroid-wheezy-retro/wiki/Index> : odroid-wheezy-retro는 프로젝트도 있는데.. 뭐 직접관련은 없지만..
<http://com.odroid.com/sigong/nf_file_board/nfile_board_view.php?keyword=&tag=&bid=235> : 공식적으로는 우분투를 지원한다. / lubuntu도 자동으로 지원이 되고.. ubuntu는 debian의 동생 뻘되는데.. 둘은 커널을 공유할 수는 없다.. 왜 그런지? 여러가지 이야기가 있음. --> <http://ubuntuforums.org/showthread.php?t=1752741> : 이런 질문..
<http://dn.odroid.com/5422/ODROID-XU3/Ubuntu/> : lubuntu image for xu3
<http://com.odroid.com/sigong/nf_file_board/nfile_board_view.php?keyword&tag&bid=241> : 14.04 lts (long time support version)
<http://www.cnx-software.com/2014/12/14/odroid-xu3-lite-board-ubuntu-review-setup-usability-and-performance/> : tutorial for xu3 "Setting Up Ubuntu on ODROID-XU3 Lite" + alpha.
<http://odroid.in/ubuntu_14.04lts/> : xu3 lubuntu 14.04 lts
lubuntu의 정체는? -> ubuntu의 최소 설치 버젼이랑 같다고 보면 되나? 아마도.. 하지만 증거는 못찾았다.
<https://help.ubuntu.com/community/Installation/MinimalCD>
<http://lubuntu.net/>
kernel compiling linux
<http://odroid.us/mediawiki/index.php?title=Step-by-step_Native_Compiling_a_Kernel> : a tut
ubuntu에서 말하는 debian... <https://wiki.ubuntu.com/Debian>
lubuntu는 lxde를 사용한다. <http://askubuntu.com/questions/384546/lubuntu-13-10-minimal-install-shows-no-desktop>
<https://help.ubuntu.com/community/Lubuntu> : ubuntu에서 말하는 lubuntu
<http://ubuntuforums.org/showthread.php?t=1929708> : ubuntu와 debian.. 다른 이야기.
<http://www.researchgate.net/post/What_are_the_major_disadvantages_of_using_Lubuntu_1404_instead_of_Ubuntu_1404_if_any2> : lubuntu와 그냥 ubuntu의 차이점...

일단, 나름의 결론은 lubuntu를 써서.. 하는게 debian으로 하는 것보다 좋은 점은 때때로, debian에서 지원하지 않는 드라이버가 ubuntu에 지원이 되는 경우가 있다는 것인데.. 이 경우 debian에서 ubuntu 드라이버의 바이너리*말고* 소스를 가져다가 컴파일을 시도하는 것도 방법중 하나. 이런게 성공/실패 가능성이 있는데.. lubuntu에서하면 그럴 문제가 없다. 그냥 된다.
그러나 사람에 따라서는 나도 공감하고.. ubuntu보다 debian이 시스템이 훨씬 잘 organize되어있고, 안정적인 느낌이 있다는 것.
그래서 자꾸 debian 노래를 부르게 됨.

일단 보드 받으면, lubuntu로 진행하고 안되면 공식 ubuntu로, 되면 debian으로 진행을 노려본다. 셋중에서 되는 방향으로 가야 할 것임. 어차피.

---

######2015May31 23:19:31+0900

위의 내용은 bitbucket 내용을 일부이다.

여러가지 이야기가 있지만.. 일단 지금 해봐야 하는 일은 이 보드가 해당목적으로 사용가능 할 것인지를 확인하는 것. feasibility.
즉, USB 4 ch. 을 받아서, 합성후 영상으로 뿌리는 과정의 딜레이를 보는 것이고. 이를 최적화 해보는 것이다.

-

일단은 그걸 해보는 것이 먼저란 말이지.

레퍼런스는.. 여기..
<https://www.youtube.com/watch?v=H2DRkLFsqQ4> : WEBCAM 4ch. example.

-

머.. 일단. 예제 같은거 찾지 말고.. 잘 찾아질지도 의문이고 해서..
걍 USB 캠 연결해서 영상보는 거 부터 시작해보자.? 찾아볼까? (맹 그래봤자. 안드로이드 예제일거라...) 아니, 그냥 바로해보자.

-


