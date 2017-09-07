var restify = require('restify');
var builder = require('botbuilder');

//botのセットアップ

//Restify serverをセットアップする

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s (%s)', server.name, server.url);
});

//chatbotをつくる

var connector = new builder.ChatConnector({
    appId:'9943a79f-ed1e-42be-9b29-b5c2f9a1bc45',
    appPassword:'PRkiEpRg3QSNtQjAtU5CKL7'
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


//intentDialogオブジェクトの用意

//認識に指定するLUIS APIのURLを指定
var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/8e45f004-4bb3-452e-8d7b-e4b94b96860b?subscription-key=3886a2b125aa41389b70411a4933755d&timezoneOffset=0&verbose=true&q=');

//intentDialogオブジェクトを作成
var intents = new builder.IntentDialog({
    recognizers: [recognizer]
});

//会話の処理

bot.dialog('/', intents);

intents
  .matches('挨拶したい', function (session, args){
      console.log(args);
      var morning = builder.EntityRecognizer.findEntity(args.entities, '朝');
      var evening = builder.EntityRecognizer.findEntity(args.entities, '昼');
      var night = builder.EntityRecognizer.findEntity(args.entities, '夜');
      var yoro = builder.EntityRecognizer.findEntity(args.entities, 'よろしく');
      var hamu = builder.EntityRecognizer.findEntity(args.entities, 'はむ語');

      if (morning) {
          resultText = "おはようございます。よく眠れましたか？"
      };

      if (evening) {
          resultText = "こんにちは、お昼ご飯は食べましたか？"
      };

      if (night) {
          resultText = "こんばんは、夜更かしはほどほどに！"
      };

      if (yoro) {
          resultText = "こちらこそ、よろしくお願いします"
      };

      if (hamu) {
          resultText = "はむはー！"
      };
   })

  .onDefault(function(){
      session.endDialog("ごめんなさい、意図が理解できませんでした＿(　_´ω`)_ﾍﾟｼｮ")
  });

