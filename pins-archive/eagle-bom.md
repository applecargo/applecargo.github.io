
######2014Nov09 18:05:33+0900

<http://www.nycresistor.com/2013/11/03/streamline-your-parts-ordering-process-through-eagle/>

bom을 처리하는데 있어서.. 사실은 많은 도움이 필요하다.
사실은 보드 설계 단계에서 부터, 회로도가 완성되면, bom을 체크하고, 원하는 부품이 구매가 가능한지 점검하고 확인하고,
구매 대상인 부품들의 footprint를 바탕으로 layout을 하는 게 이치에 맞는 순서일 수가 있다.
지금 까지는, 덮어놓고 보드부터 그리고, 부품구매는 따로 생각을 했었지만....

eagle에 내장된 bom.ulp를 이용해서는.. 조금 부족한 부분이 있다.
일의 단순반복성을 생각할때, 좀더 자동화될 필요가 있다고 보는데, (사람들이)
그래서 bom-ex라는 것도 나오고.. newark의 designlink라는 서비스도 나온다.

위 링크에서, bom-ex의 사용법과.. mac의 automator를 이용하는 방법까지 소개해준다.

-

bom-ex는 실제로 사용해보진 않았지만, (이번엔 그냥 designlink로 quick하게.. 견적을 뽑아보는 경우였기 때문에 안썼다. / designlink가 이런 용도로는 좋은 것 같다.) 좋아보이긴한다. 특히.. 다음의 상세한 소개를 보면..

<http://www.bot-thoughts.com/2012/03/eagle-managing-parts-with-bom-ex.html>

어떤 식인건지 이해는 할 수가 있다.. 단, 뭔가 지속적으로 사용하면서 나만의 bom 라이브러리가 형성이 되야만 빛을 발할 것이란걸 예상할수 있다.

[Bot Thoughts_ Eagle_ Managing parts with BOM-EX.pdf](../../../docs/pdfs/Bot Thoughts_ Eagle_ Managing parts with BOM-EX.pdf)

오픈소스 / 블로그의 특성상 이런 글은 없어질 수가 있으므로 백업해둔다...
이만큼 잘 설명해준 글이 없다.

-

python script의 예시이다. 자동으로 digikey의 부품을 가져오고.. 뭐.. 그런다고 한다..

<https://github.com/nycresistor/Grab-Bag/blob/master/Bom-ex/addDKPartToBom-ex.py>

BeautifulSoup / html5lib 등등의 라이브러리들을 사용하는데.. 이를 통해서, 웹페이지들을 긁어오는 scrap 기능을 자유자재로 사용할 수 있다고 하니, 흥미롭다. 매우.

<http://www.crummy.com/software/BeautifulSoup/>

-

여하튼, 어떤 방식이 되었든간에... bom-ex등으로 csv 파일로 주문리스트를 생성하고 나면 그걸 제출해야 하는데...
이부분은 해당 업체가 그런 주문서를 받아들여줘야 한다.

digikey 같은 경우를 예로 들어보면, 다음과 같은 식으로 csv파일으로 주문을 받아준다.

<http://www.digikey.com/classic/help.aspx?WT.mc_id=BOMhelp&id=BOMHelp&site=US>

-

그리고, 각자 사용하다보면.. 자기만의 라이브러리가 만들어지게 된다.

<https://code.google.com/p/bot-thoughts-eagle-library/>

뭔가 미심쩍긴하지만.. bob starr란 아저씨 (bom-ex 만든사람)이.. 일반적인..라이브러리  총정리판도 내놓았다.

<http://www.bobstarr.net/pages/downloads.html>

성실한데.. 미국식이다 지대로.. 뭔가 맘에 안드러.

여기가도 있다.. git repo.

<https://github.com/robertstarr>

-

여튼, 장기적으로.. 이걸 할 줄 알면 좋을 것 같아서.. 정리해둠.