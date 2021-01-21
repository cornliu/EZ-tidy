[109-1] Web Programming Final (Group 107) EZ Tidy Deployed link: Demo video link: 
Facebook連結：https://www.facebook.com/groups/NTURicWebProg/permalink/1316813461999904
Deployed link: 略
Github link : 略
demo影片：https://www.youtube.com/watch?v=T5at4es5wE8
服務內容： 提供小型團體簡單的物品管理系統，可以管控個人放置的物品，也可以管理團體的公物或公共設備並排序。根據登入者的權限不同，可以執行的操作也不同。 使用情境舉例：
1.系學會有博理B1的系K、系康、系學會及明達的MakerSpace等等空間需要管理，這時候就可以使用這個服務做管理，也節省各種表格的印製，借用情況、存放日期一目瞭然
2.社團的社辦空間常常混雜大量個人物品及社團公物，用這個系統可以清楚了解到哪些物品是誰的、是否放了很久等資訊 使用/操作方式： 到達網頁後，需要先進行登入。目前只提供一組管理者權限的帳號，帳密皆為Admin。如果輸入其他的帳號跟密碼，可以建立普通權限的帳戶。 我們了解到有時候會需要分較多層級(例如：台大>博理>B1>系學會)，所以可以在地點裡面新增其他地點或加入物品(為了介面美觀及使用直覺，不能同時有地點跟物品) 然後就可以新增物品了！Private指的是個人物品，不能出借只能移出；Common指的是公物，普通使用者只可以借用或歸還，Admin則可以新增、刪除
其他說明：沒有
使用與參考之框架/模組/原始碼：
前端：material-ui/ axios/ notistack/ react/ react-router-dom
後端：axios/ cors/ dotenv-defaults/ express/ mongoose/
專題製作心得：
劉聿珉：這是我第一次自己著手架網站，過程中遇到了許多奇奇怪怪的問題，跟其他考試不同，遇到的這些問題通常都是課本上沒有的解答，需要自己著手上網查，在這樣不斷嘗試以急錯誤之中發現自己真的進步非常多，我這次是負責後端以及mongodb的部分，雖然在這個final project中我練習到的前端技巧有限，但是做完之後還是可以明顯感覺到自己對資料庫的理解加深了許多。
吳沛林：在這個project中我負責前段跟是用者的互動，其實一開始我對HTML的架構幾乎一無所知，透過不斷的摸索以及error才將前端的功能實現出來，雖然寫這個作業寫到最後真的崩潰，但是寫完的當下真的非常有成就感，感謝老師將我們引進網路世界的大門，經過這次的實作真的覺得寫網頁是一件非常有趣的事情，之後如果有機會還想要繼續深造這方面的知識。
羅才淵：我覺得這次最難的部分在於從零開始全部都要自己來寫，不像是作業或者黑客松那樣基本上只要填空，有些原本看似不難的東西竟也讓我摸索了許久。突然覺得工程師很偉大，有一些我原本看起來普普通通的東西，其實背後是相當的複雜。 另外這次抱了其他二位的大腿，在此致上12萬分的敬意。
貢獻度：
劉聿珉(50%)：負責後端以及database的相關工作
吳沛林(50%)：網頁介面以及跟使用者的互動
羅才淵(0%)