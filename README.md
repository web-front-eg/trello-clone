# Trello Clone
트렐로 layout & style
카드 쓰기
드래그 드롭

UI 구조: MVC
네트워크 연동: RestFul Polling -> 이후: websocket / event source 추가 구현 예정

---

# 시연 링크

https://youtu.be/8pEBvR-6KiI

---

> ListsView
> -> AddListView -> AddingListView -> AddedListView
> -> AddCardView -> AddingCardView -> AddedCardView
> 순으로 리스트 / 카드가 쌓여나감.

> TemplateHelper 에서 template 을 가져와서 element attach.

---

> Controller 에서 각 View 별 interaction 을 처리.
> ViewCache 에서 View 를(들을) 가지고 있음.
> Model 에서 web server 와 통신.
> Service 에서 REST API Method 사용.

[add-list]: ./img/desc/add-list.jpg "add list alt"
