# otherHeightList
유동적인 높이의 리스트 [2017]

높이가 다른 리스트를 정렬할 때 isotope.js 과 같은 플러그인을 사용할 수 있지만,  
단순히 유동적인 높이에 맞게 정렬되는 기능이 필요했기 때문에 직접 개발하게 되었습니다.  

# 사용 방법
jquery, TweenMax,  
common/js/list.js 를 import 합니다.

# 호출 코드
```
changeHeightList.init($(".img_list"), {
  "col":2
});
```
- col: 리스트 열의 수 

# 데모
https://smilejmj.github.io/otherHeightList/index.html
