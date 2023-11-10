// gs_to_slack

function MainFunction() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // スプレッドシート
  const activeSheet = activeSpreadsheet.getActiveSheet(); // アクティブシート
  Logger.log(activeSpreadsheet.getUrl());
  if(activeSheet.getName() != "シート名"){ // シート名を指定
    return;
  }
  const activeCell = activeSheet.getActiveCell(); // アクティブセル
   if(activeCell.getColumn() == 17 && activeCell.getValues() != ""){ // 変更されたセル
      const newInputRow = activeCell.getRow();
      // セルのデータを取得
      const row1 = activeSheet.getRange(activeCell.getRow(), 1).getValues();
      const row2 = activeSheet.getRange(activeCell.getRow(), 2).getValues();
      const row3 = activeSheet.getRange(activeCell.getRow(), 3).getValues();
      const row4 = activeSheet.getRange(activeCell.getRow(), 4).getValues();
 
      const myRandomMap1 = new Map([['セルの名前', 'Slack ID']]);
      random1 = myRandomMap1.get(String(row1))

      const myRandomMap2 = new Map([['セルの名前', 'Slack ID']]);
      random2 = myRandomMap2.get(String(row2))


      attach_json = [
      		{
          "color" : "#0099A6",
          "type": "divider",
          "fields":[
              {
                  "title": "*Member*",
                  "value": `<@${random1}>`,
                  "short": "true"
              },
              {
                  "title": "*Manager*",
                  "value": `<@${random2}>`,
                  "short": "true"
              },
            ],

          "actions": [
              {
                  "type": "button",
                  "text": " Spreadsheet " ,
                  "url": "https://docs.google.com/spreadsheets/d/XXX" ,
                  "style": "primary",
              },
              {
                  "type": "button",
                  "text": "Opportunity",
                  "url": `${row3}` ,
                  "style": "danger",
              },

            ]
       }
      ]

      const slackText = `<@${random1}>`+" さんにより " + row4 +" が追加されました。"+ "\n"
                      + `<@${random2}>` + "お願いします" + "\n"
      sendSlack(slackText);
    }
}

function sendSlack(slackText){
  const webHookUrl = "Slack Webhook URL";
  const jsonData =
      {
       "channel": "#channel", // チャンネル名 
        'icon_url' : "ICON Image", // アイコン画像
        "text" : slackText, // テキスト
        "username" : "username", // ユーザ名
        "attachments" : attach_json,
      };
  payload = JSON.stringify(jsonData);
  options =
      {
        "method" : "post",
        "contentType" : "application/json",
        "payload" : payload,
      };

  UrlFetchApp.fetch(webHookUrl, options);
}
