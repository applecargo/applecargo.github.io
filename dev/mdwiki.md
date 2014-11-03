---

######2014Nov03 02:17:33+0900

아. 힘들었다.

mdwiki로 다른 mdwiki를 링크하는 걸 구현하는 중에..
remark.wiki를 docs로 넣어서 localhost에서 볼 수 있게 하려고 했는데..

chrome 브라우저가 hang하는 bug에 막혔다.

처음엔 브라우저 문제인줄 알고 다른 것들을 시도했으나, 그런건 아니었다. 이것은 버그..ㅌ,ㅌ

<https://github.com/Dynalon/mdwiki/issues/39>

```
I can reproduce this (the tab crashes/becomes unresponsive), but is not easy to fix. The Problem is, that the highlight.js engine we use for syntax highlighting goes into infinite loop if it has html tags in it. The author suggests escaping the < and > characters to &lt; and &gt; - but those will render as the escaped version in a <pre><code> environment - so won't look at all as you expected.
```

그리고, 패치가 나와있었다. 마스터에 들어있단다..

```
The whole 0.6.x branch is stable, and that means there will be no exchange of the syntax highlighting engine. 0.6.x will thus stick with highlight.js and - sadly - with this bug. The fix with prism.js is only included in master and will go into the next stable 0.8.x release, which has no ETA yet.
```

그래서 마스터를 받았다..

마스터에는 이상한 것들이 많이 들어있었다.. ㅡㅡ

덕분에, node.js, npm, grunt 등등을 알게 되고, 해보게 되고..
<http://gruntjs.com/api/grunt>
<http://gruntjs.com/configuring-tasks>
<http://gruntjs.com/sample-gruntfile>
javascript와 친해지는 시간을 가지게 되었으나..
한번에 너무 알아야 하는게 많다보니.. (적어도, js는 잘알아야 이걸 하지 싶다.)
계속 문제 해결은 안되고 있었다.
chrome 창에서 js를 떠듬떠듬 검증하다보니,
마스터에 들어있는.. new MdWiki.Core.Module()이란 코드에서 말하는 Module 이란게 사실상 없다는 걸 알게되었다..
<https://github.com/Dynalon/mdwiki/search?utf8=%E2%9C%93&q=MDwiki.Core.Module>
이런 젠장.. dev는 이걸 가지고 어떻게 테스트를 한걸까. (된다는 사람들은 또 뭘까.)
Gruntfile.js 파일 셋팅도 무한히 막막한 와중이었다.
(특히, <%= %> 로 되어있는 부분이 종종 나오는데, 오리무중이었고.. 이건 검색도 안되서 힘들게 stackoverflow에서 찾은게 있다.
<http://stackoverflow.com/questions/957284/whats-the-deal>)

뭐 대략 일종의 make 시스템인것 같은데.. 알겠고..
첫번째로 해야 할 일은, 임시적으로라도 되게 만드는 것이다.
prismjs가 왜 안되는 건지...
일단 그게 뭔지?
<http://prismjs.com/download.html>
<http://prismjs.com/examples.html#http>
뭔가 bootstrap느낌이다.. 여기서 언어를 몇가지 더 욕심내서 체크한 후에 css/js를 다운 받을 수 있었다.
그렇게 하고나서.. 마스터에 extlib에 들어있는 prism.js/css를 그냥 그대로도 해보고.. 내가 만든걸로 업데이트해서도 해봤는데..
컴파일은 잘 돌아가는데.. 안되는건 그대로다.

'그렇다면, dev가 테스트한 바로 그 코드를 가져오자. 지금의 마스터는 또 dev가 많이 주물르고 있는 것이라서.. 그 때의 그것이 아닐 것이고 개발중인 거니까. 안될수가 있지.'

```
Commit 8e7813b replaces highlight.js with prism.js and should fix this.
```

다행히 commit 번호가 포스팅이 되어있었다.
8e7813b를 누르니, 해당 코밋의 코드가 나왔다.
<https://github.com/Dynalon/mdwiki/tree/8e7813b0ad6e19d30b3dd1d73dbe5fd1e870fe1b>
그대로 받아서, 컴파일을 했는데.. 쩝. 안되긴 마찬가지다..
여러모로 unstable 한 것 같은 기분도 들었다. 찜찜--

-

임시적으로 되게 만들어야 한다고 했다. chrome 창과 마스터 코드에서 뒤져본다.. 다들 jquery기반인데.. 모르는 건 아니니까.
보니까.. class에 language-\*을 줘서 js가 grab해서 highlight 먹이는 걸로 되어있다. (doc에서는..)
근데 코드에서 보니.. language-\* 이 아니라. lang-\*형태로 되어있다.. 이상하다.
이걸 강제로 language-\*로 바꿔본다. 안된다.. 내가 하고 있는 것은 html 이었는데..
lang-html을 language-html로 바꿔도 안된다. 알고보니. html이란 건 없고. 통칭 markup이라고 불리는 거였다.
language-markup이라고 써봤다... 그래도 안된다.

이상하네.. 그래서 코드에 있는 함수가 있는지 체크.
코드에는 prism_highlight()라는 함수가 있다.

```javascript
(function($) {

    var prismGimmick = {
        name: 'prism',
        load: function() {
            $.md.stage('gimmick').subscribe(function(done) {
                prism_highlight();
                done();
            });
        }
    };
    $.md.registerGimmick(prismGimmick);

    var supportedLangs = [
        'bash',
        'c',
        'coffeescript',
        'cpp',
        'csharp',
        'css',
        'go',
        'html',
        'javascript',
        'java',
        'php',
        'python',
        'ruby',
        'sass',
        'sql',
        'xml'
    ];

    function prism_highlight () {
        // marked adds lang-ruby, lang-csharp etc to the <code> block like in GFM
        var $codeblocks = $('pre code[class^=lang-]');
        $codeblocks.each(function() {
            var $this = $(this);
            var classes = $this.attr('class');
            var lang = classes.substring(5);
            if (supportedLangs.indexOf(lang) < 0) {
                return;
            }
            if (lang === 'html' || lang === 'xml') {
                lang = 'markup';
            }
            $this.removeClass(classes);
            $this.addClass('language-' + lang);
        });
        Prism.highlightAll();
    }

}(jQuery));
```

크롬창에서 확인.. 이게 생성된 게.. 없다..
그리고, 에러메시지들.. 'Uncaught TypeError: undefined is not a function'이게 자꾸 뜬다..
이건 알고보니, 아까 그 Module이 없는데 자꾸 new를 하니까 에러가 난것이었다.
크롬창에서 보니.. 수많은 gimmick들이 죄다 등록이 안되고 있었다.
Module이란건 없다. 그럼 원래는 뭘로 했던 걸까?
다시 코드를 보니, Gimmick이란 게 있었다.
혹시나, 실행 중간에 에러때문에 멈추는 건 아닐까 싶어서 (아마js는 그러진 않는 것 같긴하지만..)
모든 gimmick들의 new MdWiki.Core.Module()를 new MdWiki.Gimmick.Gimmick('prism') 형태로 바꿔보았다.

에러는 없어졌다.
$.md.wiki.gimmicks라고 치면. 등록된 gimmick이 나오는데.. 다들 등록이 되어있다. 이제는 되는 걸까?
그러나, 안된다.

젠장, 코드가 있는데 실행이 안되는 건지, 코드가 틀려서 안되는 건지 모르겠다.
코드가 어렵지도 않고.. 이건 일종의 중재자 코드인데.. lang-html이라고 쓰면, language-markup이라고 바꿔쳐주는 것일 뿐이다.
이런 간단한 일이 안되서 prismjs를 못쓴다고하니 열뻗친다.

코드를 따로 돌려보자 생각했다.

그래서 chrome 개발 창에다가.. 함수를 만들어줘본다.

```javascript
    var supportedLangs = [
        'bash',
        'c',
        'coffeescript',
        'cpp',
        'csharp',
        'css',
        'go',
        'html',
        'javascript',
        'java',
        'php',
        'python',
        'ruby',
        'sass',
        'sql',
        'xml'
    ];

    function prism_highlight () {
        // marked adds lang-ruby, lang-csharp etc to the <code> block like in GFM
        var $codeblocks = $('pre code[class^=lang-]');
        $codeblocks.each(function() {
            var $this = $(this);
            var classes = $this.attr('class');
            var lang = classes.substring(5);
            if (supportedLangs.indexOf(lang) < 0) {
                return;
            }
            if (lang === 'html' || lang === 'xml') {
                lang = 'markup';
            }
            $this.removeClass(classes);
            $this.addClass('language-' + lang);
        });
        Prism.highlightAll();
    }
```
얼씨구.. 만들어진다.. 에러 안나네..
prism_highlight() 라고 치니까. 빙고. 된다.

그래그래.. 되긴되는 구나.. ㅜㅜ

하다보니까 또 알게 된것이..
stage란 게 있고, 페이지 로드에 싱크로 맞춰서 단계적으로 작업을 진행하게 되어있었다.

```
running stage init (index):1101
running stage load (index):1101
running stage transform (index):1101
running stage post_transform (index):1101
running stage ready (index):1101
running stage skel_ready (index):1101
running stage bootstrap (index):1101
running stage pregimmick (index):1101
running stage gimmick (index):1101
running stage postgimmick (index):1101
running stage all_ready (index):1101
running stage final_tests (index):1101
```
예를들어, 지금 chrome창에 개발툴을 띄워보면 위와 같은 메세지가 뜨는데.. (0.6.2버젼엔선 안나오더라.. 왜 안나올까.. 내가 컴파일한 거에선 나옴.)

결국,
```
            $.md.stage('gimmick').subscribe(function(done) {
                prism_highlight();
                done();
```

이 코드에서 나오는 $.md.stage('gimmick').subscribe(function(done) 이란 코드가 내 함수를 등록하는 것이었다.

아 정말 그만하고 싶었지만, 수동으로 작동시키면 되는 걸 보고나니까 시간낭비인줄 알면서도 포기할 수가 없다.. 이렇게 간단한 일도 못하면 정말.... 열뻗친다.

세원씨랑 잠깐 얘기를 했고, 세원씨 사이트를 보니 highlight가 되어있더라.. (<http://itpointlab.github.io/pages/#!projects/controller.md>)셈난다. 세원씌는 잘된다고 하는데, 아마도 highlight.js를 쓰는 0.6.2 stable 버젼을 쓰면서, html을 highlight 안하기 때문에 괜찮은 것 같다.
'그렇다면, 0.6.2 stable을 가져다가 그대로 놓고, highlight만 바꾸면 되지 않을까.' 생각했다.

즉, latest-stable + dev가 commit한 브랜치에서 필요한 부분을 최소한으로 적용. 하는 방향이다.
코드도 다 이해가 되어있고.. 문제는 grunt를 잘 만질수 있을까 하는 부분인데..
일단 뭐.. 이렇게 해보기로 한다..

-

결국 latest-stable에서 0.6.2 에서 dev가 highlight.js를 등록하는데 사용한 방법은 다른 방법이었다.. ㅡㅡ..

마스터에선. 이렇게 하고 있다..

```javascript
    var prismGimmick = new MDwiki.Core.Module();
    prismGimmick.init = function() {
        $.md.stage('gimmick').subscribe(function(done) {
            prism_highlight();
            done();
        });
    };
    $.md.wiki.gimmicks.registerModule(prismGimmick);
```

0.6.2에선 이렇게 했었다.

```javascript
    var highlightGimmick = {
        name: 'highlight',
        load: function() {
            $.md.stage('gimmick').subscribe(function(done) {
                highlight();
                done();
            });
        }
    };
    $.md.registerGimmick(highlightGimmick);
```

나는 기본적으로 마스터 방법을 따라서 하고 있었는데.. MDwiki.Core.Module(); 는 MDwiki.Gimmick.Gimmick('prism');으로 바꾸긴했지만.. $.md.wiki.gimmicks.registerModule를 사용해서 등록을 하고 있었다.. 이 함수를 열어서 확인해보니.. 뭔가 다른 얘기다 싶었다..
아니나 다를까, 원래 0.6.2에서는.. 이 함수를 쓰는게 아니라.. 그냥 간단하게.. $.md.registerGimmick을 쓰고 있다..
dev가 뭔가 스트럭쳐를 크게 바꾸는 중인 것이다.

뭐 여튼, 따라서 해본 결과가.. 

```javascript
    var prismGimmick = {
        name: 'prism',
        load: function() {
            $.md.stage('gimmick').subscribe(function(done) {
                prism_highlight();
                done();
            });
        }
    };
    $.md.registerGimmick(prismGimmick);
```
이거다...
그리고, grunt를 셋업한다.
extlib 폴더에 highlight.js/css 를 빼고.. prism.js/css를 넣는다.
마찬가지로 Gruntfile.js를 가서.. ownJsFiles에.. 'js/gimmicks/highlight.js' -> 'js/gimmicks/prism.js'
파일 열어서, 이름변경/내용변경 highlight.js -> prism.js
다시 Gruntfile.js의.. externalJsFiles / externalCssFiles 에서.. highlight 빼고.. prism 으로 변경.. externalJsRefs / externalCssRefs 는 prism이 아직 cdn 같은게 마땅한게 없어서.. highlight를 지우기만 했다.
```
--- /Users/doohoyi/Sites/tools/mdwiki-0.6.x-origin/Gruntfile.js 
+++ /Users/doohoyi/Sites/tools/mdwiki-0.6.x/Gruntfile.js 
@@ -44,7 +44,7 @@
             //'js/gimmicks/github_gist.js',
             'js/gimmicks/gist.js',
             'js/gimmicks/googlemaps.js',
-            'js/gimmicks/highlight.js',
+            'js/gimmicks/prism.js',
             'js/gimmicks/iframe.js',
             'js/gimmicks/math.js',
             // 'js/gimmicks/leaflet.js',
@@ -68,10 +68,10 @@
         externalJsFiles: [
             'extlib/js/jquery-1.8.3.min.js',
             'extlib/js/bootstrap-3.0.0.min.js',
-            'extlib/js/highlight-7.3.pack.min.js'
+            'extlib/js/prism.js'
         ],
         externalCssFiles: [
-            'extlib/css/highlight.github.css',
+            'extlib/css/prism.css',
             'extlib/css/bootstrap-3.0.0.min.css',
         ],
```

그러고 컴파일을 하니까 jshint에서 에러가 나서 안되더라..
```
Running "jshint:js" (jshint) task
Linting js/gimmicks/prism.js ...ERROR
[L49:C9] W117: 'Prism' is not defined.
        Prism.highlightAll();

Warning: Task "jshint:js" failed. Used --force, continuing.
```

그래서 force를 해버렸더니.. 되긴되더라..

jshint가 뭔지도 몰랐다.. 이건 알고보니.. 뭐.. 문법체크.. 빠진거 없는지 체크해주는 건데.. 이걸 한번 돌리고 나머지 구조를 돌려도 된다는 걸 판단하는 건데... 뭔가.. 뭔소린지는 알것 같은데.. Prism 객체는.. 글로벌인데 .. 이걸 따로 적어주는게 있더라..

```
        /* make it use .jshintrc */
        jshint: {
            options: {
                curly: false,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: false,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    marked: true,
                    google: true,
                    Prism: true,
                    /* leaflet.js*/
                    L: true,
                    console: true
                }
            },
```

그래서 Prism: true 라고 적었다. (원래 이자리엔.. hljs: true가 적혀있었지...)

```
@@ -140,7 +140,7 @@
                     jQuery: true,
                     marked: true,
                     google: true,
-                    hljs: true,
+                    Prism: true,
                     /* leaflet.js*/
                     L: true,
                     console: true
```

그리고 force빼고 정상 컴파일 했고..
mdwiki-slim은 ref안적었기때문에 안될꺼고 (적어도 prismjs는 안되겠지.)
mdwiki.html / mdwiki-debug.html 로 차례대로 해보니까.. 겨우겨우.. 이젠 된다.

-

그러다가 뭔가 예외에 또 맞닥드렸는데..

github의 wiki는.. # 헤더 태그에 링크를 넣기도 하나본데.. 이게 들어가면 또 무한루프에 빠지더라.. 이게 원래 0.6.2 stable에서도 그러는 건지 모르겠지만. (안그러지 않았던가?) 이게 prism 때문일수도 있나? 찜찜--..

여튼, 그런 이유로.. 헤더 태그에.. &lt;a /&gt;를 넣으면 죽는다. -> 안넣으면 괜찮다.

-

여튼, 그래서.. 완성된게...

[../../../tools/mdwiki-0.6.x](../../../tools/mdwiki-0.6.x)

요거다..

-

에혀.. 정말 정리하기 힘들었지만..

이런 모험을 정리해 놔야 담에.. 고생을 덜하지 싶어서.. 지겹지만 정리해봤다. 말이.. 앞뒤 안맞을 수도 있으니 대충넘어갈것.

######2014Nov03 03:23:28+0900

-

아 또, 중간에 코드 보다가 이런 팁도 알게 됐다. 그냥.. 어따 쓸지는, 모르겠지만, 재밌는(?) 것 같아서 적어둔다.

<http://www.i3lance.co.uk/2012/09/how-to-check-if-a-url-contains-a-given-string-using-jquery/>

내 현재 url을 얻고..

```javascript
$(document).ready(function () {
    if(window.location.href.indexOf("registered") > -1) {
       alert("Congratulations you are now a member!");
    }
});
```

<http://forums.asp.net/t/1695133.aspx?Use+jquery+to+find+if+the+requested+uri+contain+a+particular+string>

거기에 어떤 문자열이 포함되어있는지 본다.

```javascript
You can use the indexOf method.

i.e if(url.indexOf('default') > 0)

    {

        //Logic here.

    }
```

이걸 알면 dev의 다음 코드를 이해할 수 있다.

```javascript
(function($) {
    'use strict';


    if (window.location.href.indexOf('SpecRunner') >= 0)
        $.initMDwiki(undefined, false);
    else
        $.initMDwiki(undefined, true);


}(jQuery));
```

MDWiki 구조를 다 세운 다음에, 초기화를 콜하는데 SpecRunner라는 텍스트가 주소줄에 있는지 보고, gimmick을 넣기도 하고 안넣기도 한다.
내 gimmick이 실행이 되고 있는지 아닌지 확실히 하기 위해서 뭔지 이해할 필요가 있었다.
SpecRunner란 건 뭔데???

<https://www.npmjs.org/package/grunt-jasmine-html-spec-runner>

grunt의 플러그인중에 하나인것 같은데.. 성능 프로파일을 돌려보는 테스트 툴인 것 같다.
즉, 이 툴을 통해서 mdwiki를 시험하고 있는 경우엔, gimmicks를 로드 하지 않고 순수 mdwiki만 돌아가게 하겠다는 것이다.
뭐, 뭔얘긴진 알겠다만.. 참.. 이런걸 그냥 막 쏟아내면.. 따라가기가 쉽진 않지...

<font size=0.5em>2014Nov03 03:31:45+0900</font>

-

젠장.. 또한번 한시간동안 고생했다. 지금 쓴 이글이 포스팅이 안되서 말이다...
위에 쓴거 중에 다음 문장이 있는데..

```
여튼, 그런 이유로.. 헤더 태그에.. &lt;a /&gt;를 넣으면 죽는다. -> 안넣으면 괜찮다.
```

여기 &lt; 랑 &gt; 를..
각각 &lt ; &gt ; 라고 적어줘야 한다..

아까 remark.wiki의 configuration.md 파일에서도 그렇고... (헤더에 링크가 들어있어서 그랬다고 생각했는데.. 헤더고 뭐고.. a링크가 있으면 안되는 것 같다) mdwiki에선 a 링크를 썼다하면 죽는 것 같다..
요기에서..

```javascript

        $.md.stage('transform').subscribe(function(done) {
            var uglyHtml = transformMarkdown(md);
            $('#md-content').html(uglyHtml);
            md = '';
            var dfd = $.Deferred();
            loadExternalIncludes(dfd);
            dfd.always(function () {
                done();
            });
        });
    }

    // load [include](/foo/bar.md) external links
    function loadExternalIncludes(parent_dfd) {

        function findExternalIncludes () {
            return $('a').filter (function () {
                var href = $(this).attr('href');
                var text = $(this).toptext();
                var isMarkdown = $.md.util.hasMarkdownFileExtension(href);
                var isInclude = text === 'include';
                var isPreview = text.startsWith('preview:');
                return (isInclude || isPreview) && isMarkdown;
            });
        }

```

다음과 같이, 말하면서 죽는데... 무한루프에 빠지는 것 같다..

```
Uncaught TypeError: Cannot read property 'toLowerCase' of undefined (index):2180
[FATAL] Timeout reached for done callback in stage: transform. Did you forget a done() call in a .subscribe() ? (index):1529
[FATAL] stage transform failed running subscribed function: function (done) {
            var uglyHtml = transformMarkdown(md);
            $('#md-content').html(uglyHtml);
            md = '';
            var dfd = $.Deferred();
            loadExternalIncludes(dfd);
            dfd.always(function () {
                done();
            });
        } 
```

이상 끝. 이제 좀 자자...

<font size=0.5em>2014Nov03 04:29:20+0900</font>

-

아침에 일어나서.. 어제 쓴걸 읽고 검토하던중.. 다음 현상 목격..
아래 같은 부분이있었는데.. 날짜를 찍는데 들어있는 font 태그가.. 말썽인것 같다...
이게 들어간 이후에는 ```가 파싱조차 안된다.. 젝일...

```
이런 모험을 정리해 놔야 담에.. 고생을 덜하지 싶어서.. 지겹지만 정리해봤다. 말이.. 앞뒤 안맞을 수도 있으니 대충넘어갈것.

<font size=0.5em>2014Nov03 03:23:28+0900</font>

-

아 또, 중간에 코드 보다가 이런 팁도 알게 됐다. 그냥.. 어따 쓸지는, 모르겠지만, 재밌는(?) 것 같아서 적어둔다.

<http://www.i3lance.co.uk/2012/09/how-to-check-if-a-url-contains-a-given-string-using-jquery/>

내 현재 url을 얻고..

\`\`\`javascript
$(document).ready(function () {
    if(window.location.href.indexOf("registered") > -1) {
       alert("Congratulations you are now a member!");
    }
});
\`\`\`
```

그래서 다음같이 변경을 해야 했다.

```
이런 모험을 정리해 놔야 담에.. 고생을 덜하지 싶어서.. 지겹지만 정리해봤다. 말이.. 앞뒤 안맞을 수도 있으니 대충넘어갈것.

######2014Nov03 03:23:28+0900

-

아 또, 중간에 코드 보다가 이런 팁도 알게 됐다. 그냥.. 어따 쓸지는, 모르겠지만, 재밌는(?) 것 같아서 적어둔다.

<http://www.i3lance.co.uk/2012/09/how-to-check-if-a-url-contains-a-given-string-using-jquery/>

내 현재 url을 얻고..

\`\`\`javascript
$(document).ready(function () {
    if(window.location.href.indexOf("registered") > -1) {
       alert("Congratulations you are now a member!");
    }
});
\`\`\`
```

이렇게 하니, 되긴되는데... 원래 코드 중간중간에 날짜를 박을수 있게 할려고 &lt;font /&gt; 를 썼던건데.. ######으로 하면..
중간에 못쓰게 되서 좀 맘에 안들긴한데.. 다른 방법으로 해야할지.. 여튼, 문제가 생기니까 이 방법을 쓰지 않도록 해야 할지.. 생각해봐야한다.

######2014Nov03 12:25:15+0900

-

<http://daringfireball.net/projects/markdown/syntax#header>

헤더를 쓰는 법은 위 링크에 있는데.. setext와 atx 방법이있다. 지금 ###### 이렇게 쓰는건.. atx방법이고.. setext 방법은 밑줄 긋는 법인데.. 2단계 밖에 제공은 안하는 거였다.

<http://johnmacfarlane.net/pandoc/demo/example19/Setext_002dstyle-headers.html>

```
5.3.1 Setext-style headers

A setext-style header is a line of text "underlined" with a row of = signs (for a level one header) or - signs (for a level two header):

A level-one header
==================

A level-two header
------------------
The header text can contain inline formatting, such as emphasis (see Inline formatting, below).
```

고로.. 현재로서는 #6개를 맨처음에 쓰는게 좀더 안전한 방법인것 같다... 나중에 좀.. 더 괜찮은 법을 찾을 수 있었으면 좋겠다... ㅡㅡ

######2014Nov03 12:33:09+0900

바뀐 insertDate 셋팅으로. 한번 시간 찍어줌..

안녕~~~

-

앗!!!.. 다시 보니 이거.. 문서 젤 처음에도.. &lt;font /&gt;가 있었는데! 총 2번 정도가 이미 위에 있었는데.. 어케 된거지..
그냥 버그인것 같은데?? 쩝..

계속 찜찜-- 하구먼.. &lt;font /&gt; 문제가 아닐 것 같기도 하다!! ㅡㅡ;;

