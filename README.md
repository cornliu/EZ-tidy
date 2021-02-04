[109-1] Web Programming Final (Group 107) EZ Tidy Deployed link: Demo video link: 
Facebook連結：https://www.facebook.com/groups/NTURicWebProg/permalink/1316813461999904
Deployed link: https://ez-tidy.herokuapp.com/
demo影片：https://www.youtube.com/watch?v=T5at4es5wE8
服務內容： 提供小型團體簡單的物品管理系統，可以管控個人放置的物品，也可以管理團體的公物或公共設備並排序。根據登入者的權限不同，可以執行的操作也不同。 使用情境舉例：
1.系學會有博理B1的系K、系康、系學會及明達的MakerSpace等等空間需要管理，這時候就可以使用這個服務做管理，也節省各種表格的印製，借用情況、存放日期一目瞭然
2.社團的社辦空間常常混雜大量個人物品及社團公物，用這個系統可以清楚了解到哪些物品是誰的、是否放了很久等資訊 使用/操作方式： 到達網頁後，需要先進行登入。目前只提供一組管理者權限的帳號，帳密皆為Admin。如果輸入其他的帳號跟密碼，可以建立普通權限的帳戶。 我們了解到有時候會需要分較多層級(例如：台大>博理>B1>系學會)，所以可以在地點裡面新增其他地點或加入物品(為了介面美觀及使用直覺，不能同時有地點跟物品) 然後就可以新增物品了！Private指的是個人物品，不能出借只能移出；Common指的是公物，普通使用者只可以借用或歸還，Admin則可以新增、刪除
其他說明：沒有
使用與參考之框架/模組/原始碼：
前端：material-ui/ axios/ notistack/ react/ react-router-dom
後端：axios/ cors/ dotenv-defaults/ express/ mongoose/
