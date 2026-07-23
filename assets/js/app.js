/* PCSAPO sales support app - dependency-free, GitHub Pages compatible. */
'use strict';

const TAX = 0.10;
const MAX_LOCAL_CASES = 10;
const STORAGE_KEY = 'pcsapo-sales-cases-v1';
const UI_KEY = 'pcsapo-sales-current-v1';
const PRICE_MASTER_KEY = 'pcsapo-sales-price-master-v2';
const LEGACY_PRICE_MASTER_KEY = 'pcsapo-sales-price-master-v1';
const PRICE_MASTER_MEDIA_MIGRATION_KEY = 'pcsapo-sales-price-master-media-v1';
const PRICE_MASTER_SCOPE_MIGRATION_KEY = 'pcsapo-sales-price-master-scope-v1';
const PRICE_MASTER_V35_MIGRATION_KEY = 'pcsapo-sales-price-master-v35';
const MODE_KEY = 'pcsapo-sales-mode-v1';
const ADMIN_PASSCODE_KEY = 'pcsapo-sales-admin-passcode-v1';
const ADMIN_SESSION_KEY = 'pcsapo-sales-admin-unlocked-v1';
const CONTENT_MASTER_KEY = 'pcsapo-sales-content-master-v1';
const CONTENT_KIND_LABELS = {
  commonDocument:'共通配布資料',
  caseDocument:'案件別資料',
  officialLink:'公式リンク'
};
const CONTENT_SERVICE_LABELS = {
  common:'共通',
  website:'ホームページ制作',
  square:'Square',
  funfo:'funfo',
  design:'制作・印刷物',
  other:'販促・その他',
  maintenance:'保守・定期点検'
};
const DEFAULT_CATALOG = [{name:'ホームページ制作',price:39800},{name:'Square導入構築',price:39800},{name:'Square構築（メニューなし）',price:15000},{name:'Square構築（メニューあり）',price:20000},{name:'funfo Free構築',price:58000},{name:'funfo Free構築（既存見積参考）',price:38000},{name:'funfo Lite以上',price:69800},{name:'商品追加登録（50点）',price:3000},{name:'ページ追加',price:10000},{name:'メニュー表制作',price:19800},{name:'名刺制作',price:9800},{name:'ロゴ制作',price:19800},{name:'お急ぎ対応プラン',price:20000},{name:'EC総合コンサルタント料',price:15000}];
const OPTION_CATALOG = [
  {group:'ホームページ制作',name:'ページ追加',price:10000,unit:'ページ'},{group:'ホームページ制作',name:'商品・メニュー追加（10品）',price:3000,unit:'セット'},{group:'ホームページ制作',name:'多言語対応',price:15000,unit:'式'},{group:'ホームページ制作',name:'Googleビジネス最適化',price:15000,unit:'式'},{group:'ホームページ制作',name:'Googleビジネス登録・メニュー設定',price:10000,unit:'式'},{group:'ホームページ制作',name:'SEO強化',price:19800,unit:'式'},{group:'ホームページ制作',name:'SEO対策（簡易）',price:5000,unit:'式'},{group:'ホームページ制作',name:'バナー制作',price:5000,unit:'枚'},{group:'ホームページ制作',name:'バナー制作（既存見積参考）',price:3000,unit:'点'},{group:'ホームページ制作',name:'ライティング',price:3000,unit:'式'},{group:'ホームページ制作',name:'お問い合わせフォーム作成',price:3000,unit:'項目'},{group:'ホームページ制作',name:'無料サーバー構築',price:20000,unit:'式'},{group:'ホームページ制作',name:'独自メール設定',price:8000,unit:'式'},{group:'ホームページ制作',name:'メール構築（1個）',price:5000,unit:'個'},{group:'ホームページ制作',name:'画像補正・切り抜き',description:'明るさ・色味・傾き・トリミング・背景切り抜き等の調整です。強いピンぼけ、極端に小さい画像、欠けた部分の完全な復元は対象外で、再撮影をお願いする場合があります。',price:500,unit:'点'},{group:'ホームページ制作',name:'ホームページマニュアル',price:4000,unit:'式'},
  {group:'Square導入構築',name:'商品追加登録（50点）',description:'基本50点を超える商品情報を、50点単位で追加登録します。画像編集は含みません。',price:3000,unit:'セット'},{group:'Square導入構築',name:'メニュー画像編集',description:'支給されたメニュー画像を登録用途に合わせて調整します。作業範囲により料金が変わります。',price:5000,unit:'式'},{group:'Square導入構築',name:'Square構築（メニューなし）',price:15000,unit:'式'},{group:'Square導入構築',name:'Square構築（メニューあり）',price:20000,unit:'式'},{group:'Square導入構築',name:'Squareターミナル設定・トレーニング',price:5000,unit:'式'},{group:'Square導入構築',name:'プリンター設定',price:8000,unit:'台'},{group:'Square導入構築',name:'キャッシュドロア設定',price:5000,unit:'台'},{group:'Square導入構築',name:'Squareターミナル専用ハブ',price:5990,unit:'台'},{group:'Square導入構築',name:'スタッフ権限設定',price:5000,unit:'式'},{group:'Square導入構築',name:'売上分析設定',price:8000,unit:'式'},{group:'Square導入構築',name:'オンラインテイクアウトページ',price:19800,unit:'式'},{group:'Square導入構築',name:'Square EC構築',price:39800,unit:'式'},{group:'Square導入構築',name:'Square・funfoスタッフマニュアル',price:5000,unit:'式'},{group:'Square導入構築',name:'Square・funfoスタッフマニュアル（簡易）',price:4000,unit:'式'},
  {group:'funfo構築',name:'商品追加登録（50点）',description:'基本50点を超える商品情報を、50点単位で追加登録します。画像編集は含みません。',price:3000,unit:'セット'},{group:'funfo構築',name:'メニュー画像編集',description:'支給されたメニュー画像を登録用途に合わせて調整します。作業範囲により料金が変わります。',price:5000,unit:'式'},{group:'funfo構築',name:'テーブル追加設定',price:500,unit:'卓'},{group:'funfo構築',name:'QRコード追加作成',price:1000,unit:'枚'},{group:'funfo構築',name:'funfo Free構築（既存見積参考）',price:38000,unit:'式'},{group:'funfo構築',name:'Lite移行設定',price:10000,unit:'式'},{group:'funfo構築',name:'キッチンプリンター設定',price:8000,unit:'台'},{group:'funfo構築',name:'レジ横プリンター設定',price:8000,unit:'台'},{group:'funfo構築',name:'スマホハンディ追加',price:5000,unit:'台'},{group:'funfo構築',name:'運用説明追加',price:5000,unit:'回'},
  {group:'共通支援',name:'補助金・支援制度情報のご案内',description:'国・都道府県・市区町村の公開情報と公式相談窓口を無料でご案内します。申請可否の判断、申請書類・事業計画書の作成、提出代行、採択保証は行いません。',price:0,unit:'回',priceDisplay:'fixed',quoteEnabled:false,url:'https://www.chusho.meti.go.jp/soudan/soudan_01.html'},
  {group:'制作物',name:'名刺制作',price:9800,unit:'式'},{group:'制作物',name:'名刺デザイン製作料',price:500,unit:'案'},{group:'制作物',name:'名刺印刷（100枚参考）',price:454,unit:'式'},{group:'制作物',name:'名刺印刷（200枚参考）',price:872,unit:'式'},{group:'制作物',name:'ショップカード制作',price:12000,unit:'式'},{group:'制作物',name:'メニュー表制作',price:19800,unit:'式'},{group:'制作物',name:'チラシ制作',price:19800,unit:'式'},{group:'制作物',name:'ポスター制作',price:15000,unit:'式'},{group:'制作物',name:'ロゴ制作',price:19800,unit:'式'},{group:'制作物',name:'新規ロゴデザイン（既存見積参考）',price:15000,unit:'個'},{group:'制作物',name:'オリジナルロゴ作成（簡易）',price:3000,unit:'点'},{group:'制作物',name:'画像・動画素材の整理',description:'USBやクラウド等で受領した素材を確認し、ファイル名・向き・使用箇所を整理します。素材数と状態を確認後に見積します。',price:0,unit:'式',priceDisplay:'estimate'},{group:'制作物',name:'簡易スマートフォン撮影',description:'PCSAPOがスマートフォンで店舗・商品を簡易撮影します。撮影点数、訪問時間、交通費を確認後に見積します。',price:0,unit:'回',priceDisplay:'estimate'},{group:'制作物',name:'外部カメラマン撮影手配',description:'専門撮影が必要な場合に外部カメラマンを手配します。撮影内容・時間・使用範囲により別途見積です。',price:0,unit:'式',priceDisplay:'estimate'},{group:'制作物',name:'動画制作',price:10000,unit:'式'},{group:'制作物',name:'印刷入稿サポート',price:5000,unit:'式'},{group:'制作物',name:'Canva編集用データ',price:5000,unit:'式'},{group:'制作物',name:'宅配料',price:500,unit:'式'},
  {group:'その他',name:'EC総合コンサルタント料',price:15000,unit:'式'},{group:'その他',name:'お急ぎ対応プラン',price:20000,unit:'式'},{group:'その他',name:'出張費（近隣）',price:3000,unit:'式'}
];
const PROMOTION_CATALOG = [
  {group:'販促実行支援',name:'設置候補施設リサーチ',description:'チラシ等の設置候補施設を調査します。',price:8000,unit:'10施設',priceDisplay:'from'},
  {group:'販促実行支援',name:'施設リスト作成',description:'所在地・連絡先・受付条件を一覧化します。',price:5000,unit:'10施設',priceDisplay:'from'},
  {group:'販促実行支援',name:'電話・メール設置確認',description:'設置可否を施設へ確認します。',price:2000,unit:'施設'},
  {group:'販促実行支援',name:'設置条件の確認支援',description:'施設との設置条件や必要な手続きを確認します。',price:3000,unit:'施設',priceDisplay:'from'},
  {group:'販促実行支援',name:'訪問・納品・設置',description:'承諾済み施設へ販促物を納品・設置します。',price:5000,unit:'訪問',priceDisplay:'from'},
  {group:'販促実行支援',name:'補充・回収',description:'設置済み販促物の補充または回収を行います。',price:3000,unit:'訪問',priceDisplay:'from'},
  {group:'販促実行支援',name:'実施報告書',description:'対応先と結果を簡易報告書にまとめます。',price:3000,unit:'回',priceDisplay:'from'},
  {group:'販促実行支援',name:'定期巡回',description:'合意した範囲を月次で巡回します。',price:15000,unit:'月',priceDisplay:'from'},
  {group:'販促実行支援',name:'個別作業',description:'調査・連絡・訪問等を時間単位で対応します。',price:3500,unit:'時間',priceDisplay:'from'}
];
const OFFICIAL_CATALOG = [
  {group:'ホームページ制作',name:'STUDIO.Design Free',description:'月額0円で公開できます。公開URLは「お客様指定名.studio.site」となり、独自ドメインではありません。',price:0,unit:'月',provider:'STUDIO.Design',url:'https://studio.design/ja/pricing',taxType:'official'},
  {group:'ホームページ制作',name:'STUDIO.Design Mini',description:'独自ドメイン接続に対応する有料プランです。年払い時の月額換算で、契約条件と最新価格は公式サイトで確認します。',price:590,unit:'月',provider:'STUDIO.Design',url:'https://studio.design/ja/pricing#personal',taxType:'official'},
  {group:'ホームページ制作',name:'STUDIO.Design Personal',description:'複数ページの運用に対応する有料プランです。年払い時の月額換算で、契約条件と最新価格は公式サイトで確認します。',price:1190,unit:'月',provider:'STUDIO.Design',url:'https://studio.design/ja/pricing#personal',taxType:'official'},
  {group:'Square導入構築',name:'Square POSレジ フリー',description:'Square公式の無料プラン。決済時には決済手数料が発生します。',price:0,unit:'月',provider:'Square',url:'https://squareup.com/jp/ja/point-of-sale/pricing',taxType:'official'},
  {group:'Square導入構築',name:'Square レストランPOSレジ プラス',description:'店舗ごとの月額プラン。最新条件はSquare公式で確認します。',price:13000,unit:'店舗/月',provider:'Square',url:'https://squareup.com/jp/ja/point-of-sale/restaurants/pricing',taxType:'official'},
  {group:'Square導入構築',name:'Square リーダー',description:'キャッシュレス決済用カードリーダー。',price:4980,unit:'台',provider:'Square',url:'https://squareup.com/jp/ja/point-of-sale/pricing',taxType:'official'},
  {group:'Square導入構築',name:'Square スタンド',description:'対応iPadと組み合わせるPOSレジ用スタンド。',price:29980,unit:'台',provider:'Square',url:'https://squareup.com/jp/ja/point-of-sale/pricing',taxType:'official'},
  {group:'Square導入構築',name:'Square ターミナル',description:'決済・レシート印刷に対応する一体型端末。',price:39980,unit:'台',provider:'Square',url:'https://squareup.com/jp/ja/hardware/terminal',taxType:'official'},
  {group:'Square導入構築',name:'Square ターミナル専用ハブ',description:'周辺機器接続用の専用ハブ。',price:5990,unit:'台',provider:'Square',url:'https://squareup.com/jp/ja/hardware/terminal',taxType:'official'},
  {group:'funfo構築',name:'funfo Free',description:'月額無料の基本プラン。利用条件と機能は公式サイトで確認します。',price:0,unit:'月',provider:'funfo',url:'https://www.funfo.jp/index.php/pricing/',taxType:'official'},
  {group:'funfo構築',name:'funfo Lite',description:'年払い時の月額換算。月払い等の条件は公式サイトで確認します。',price:4950,unit:'月',provider:'funfo',url:'https://www.funfo.jp/index.php/pricing/',taxType:'official'},
  {group:'funfo構築',name:'funfo Business',description:'年払い時の月額換算。',price:9900,unit:'月',provider:'funfo',url:'https://www.funfo.jp/index.php/pricing/',taxType:'official'},
  {group:'funfo構築',name:'funfo Business Plus',description:'年払い時の月額換算。',price:14850,unit:'月',provider:'funfo',url:'https://www.funfo.jp/index.php/pricing/',taxType:'official'},
  {group:'funfo構築',name:'funfo対応レシートプリンター MCP31LB',description:'参考機器価格。購入時に最新価格・在庫を確認します。',price:59000,unit:'台',provider:'funfo',url:'https://www.funfo.jp/index.php/pricing/',taxType:'official'},
  {group:'funfo構築',name:'funfo対応キッチンプリンター TRP80',description:'参考機器価格。購入時に最新価格・在庫を確認します。',price:52800,unit:'台',provider:'funfo',url:'https://www.funfo.jp/index.php/pricing/',taxType:'official'}
];
const MAINTENANCE_PLANS = {
  light:{label:'ライト',price:3980,tagline:'基本の安心運用',tasks:['LINE・メール・電話による操作相談','月1回のホームページ表示・リンク・フォーム確認','月1回・30分以内の軽微な更新','STUDIO.Design・Square・funfoの基本操作確認','障害発生時の一次切り分けと連絡先案内']},
  standard:{label:'スタンダード',price:6980,tagline:'更新と店舗運用を継続支援',tasks:['ライトプランの全作業','月2回の営業時間・価格・メニュー更新','3か月ごとのSquare・funfo・QR注文動作点検','3か月ごとの商品情報・税率・レシート設定確認','簡易バナー制作または画像差替え 月1点','半年ごとの導線・写真・Googleビジネス確認']},
  premium:{label:'プレミアム',price:12800,tagline:'集客・運用改善まで優先対応',tasks:['スタンダードプランの全作業','優先対応と月3回までの更新作業','毎月のGoogleビジネス・SEO・店舗導線点検','Square・funfo運用改善とスタッフ相談','月次の簡易運用レポート・改善提案','半年ごとの集客施策提案と年1回の全体診断','補助金・新機能・リニューアル情報の案内']}
};
const IMPLEMENTATION_ITEMS = ['掲載内容確認','写真・ロゴ受領','メニュー・価格受領','STUDIO.Designアカウント作成済み確認','STUDIO.Design編集者招待確認','スマホ表示確認','SEO基本設定','公開URL確認','Squareアカウント作成済み確認','事業者情報・本人確認の登録状況確認','入金口座登録済み確認','Squareスタッフ招待確認','端末初期設定','Wi-Fi接続','商品・カテゴリ登録','税率設定','レシート設定','テスト決済','funfoアカウント作成済み確認','funfo管理アカウント発行確認','店舗情報登録','テーブル番号設定','QRコード発行','Square連携','注文テスト','キッチン運用確認','スタッフ説明','納品時のPCSAPO権限確認','印刷サイズ確認','誤字脱字確認','PDF出力','納品'];
const REVIEW_ITEMS = [['review-visa','Visa/Mastercard/Amex確認'],['review-jcb','JCB等確認'],['review-qr','PayPay・QR決済確認'],['test-mobile','スマホ表示確認'],['test-order','QR注文テスト'],['test-payment','店頭決済テスト'],['test-receipt','レシート確認'],['test-training','お客様へ最終説明']];
const SERVICE_DEFS = {
  website:{label:'ホームページ制作',en:'Website',category:'ホームページ制作',accent:'orange',base:{name:'ホームページ制作',qty:1,price:39800,category:'ホームページ制作'},summary:'お客様ご自身のSTUDIO.Designアカウントで、公開方法、独自ドメイン、掲載内容、写真、SNS導線を確認します。',fields:[['studioAccountStatus','アカウント登録','select',['未登録','登録済み','登録方法を確認したい']],['studioInviteStatus','PCSAPOへの編集者招待','select',['未招待','招待済み','制作開始時に招待する']],['websiteType','制作区分','select',['新規制作','リニューアル','一部修正']],['studioPlan','STUDIO.Designプラン','select',['無料プラン（studio.site）','有料プラン・独自ドメイン検討','未定']],['websiteUrl','既存URL・希望URL'],['domainStatus','独自ドメイン','select',['不要','取得済み','取得希望','未定']],['assetSource','画像・動画素材の準備状況','select',['元データをUSBで提供できる','元データをクラウド共有できる','メール・LINE・SNS上の素材のみ','素材がないため撮影を希望','未定']],['pageCount','追加ページ数','number'],['websiteLanguages','追加言語'],['websiteNotes','ホームページ要望','textarea']],checks:['お客様アカウント作成済み','PCSAPO編集者招待済み','支払い・ドメインはお客様管理','掲載原稿受領','店舗写真受領','ロゴ受領','メニュー掲載内容確認','Google マップ導線確認','SNSリンク確認','スマホ表示確認','SEO基本設定','公開URL確認','お客様確認完了']},
  square:{label:'Square導入構築',en:'Square Setup',category:'Square導入構築',accent:'blue',base:{name:'Square導入構築',qty:1,price:39800,category:'Square導入構築'},summary:'事業主様が作成したSquareアカウントで、端末、決済審査、商品登録、周辺機器を確認します。',fields:[['squareInviteStatus','PCSAPOへのスタッフ招待','select',['未招待','招待済み','設定開始時に招待する']],['squareStatus','Square利用状況','select',['新規','利用中','未定']],['businessType','契約形態','select',['個人事業主','法人','未定']],['squareDevice','利用端末','select',['Square Terminal','Square Reader','Square Stand','未定']],['squareItemCount','登録メニュー数（基本50点）','number'],['squareTakeout','テイクアウトページ','select',['不要','希望する（オプション）','検討中']],['receiptPrinter','レシートプリンター','select',['不要','購入予定','設定希望','未定']],['cashDrawer','キャッシュドロア','select',['不要','あり','購入予定','未定']],['squareNotes','Square要望','textarea']],checks:['お客様アカウント作成済み','本人確認・事業者情報をお客様が登録','入金口座をお客様が登録','PCSAPOスタッフ招待済み','端末初期設定','Wi-Fi接続','商品・カテゴリ登録','税率設定','レシート設定','テスト決済','操作説明完了']},
  funfo:{label:'funfo構築',en:'funfo Setup',category:'funfo構築',accent:'orange',base:{name:'funfo Free構築',qty:1,price:58000,category:'funfo構築'},summary:'お客様ご自身のfunfoアカウントでFreeを基本に、QR注文とSquare店頭会計を組み合わせます。',fields:[['funfoAccountStatus','アカウント登録','select',['未登録','登録済み','登録方法を確認したい']],['funfoInviteStatus','PCSAPOへの管理権限付与','select',['未設定','設定済み','設定開始時に確認する']],['funfoPlan','funfoプラン','select',['Free（基本提案）','Lite以上','未定']],['tableCount','テーブル数','number'],['funfoMenuCount','登録メニュー数（基本50点）','number'],['ipadConnection','iPad連携','select',['必要','不要','未定']],['selfOrderBuild','セルフオーダー構築','select',['不要','希望する（オプション）','検討中']],['funfoPaymentMode','会計方法','select',['店頭でSquare・現金払い（基本提案）','お客様のスマホでオンライン決済（別途申請）','未定']],['qrOperation','QR注文運用','select',['セルフオーダーのみ','スタッフ注文あり','未定']],['kitchenPrint','厨房印刷','select',['不要','必要','後日検討']],['counterPrint','レジ横印刷','select',['不要','必要','後日検討']],['funfoNotes','funfo要望','textarea']],checks:['お客様アカウント作成済み','PCSAPO管理権限確認済み','契約・支払いはお客様管理','店舗情報登録','テーブル番号設定','メニュー登録','QRコード発行','Square連携','注文テスト','厨房・レジ印刷確認','スタッフ説明完了','運用開始確認']},
  design:{label:'印刷物・制作物',en:'Design Works',category:'制作物',accent:'blue',base:{name:'制作物',qty:1,price:0,category:'制作物'},summary:'種類・サイズ・ページ数・印刷数量で料金が変わるため、仕様を選んで個別に積算します。',fields:[['designItems','制作物の種類','select',['メニュー表','名刺','チラシ','ポスター','ロゴ','その他']],['printSize','サイズ・仕様'],['printSides','面数・ページ数'],['designQty','印刷数量'],['designDeadline','希望納期','date'],['designMaterialStatus','素材提供','select',['元データをUSBで提供できる','元データをクラウド共有できる','メール・LINE・SNS上の素材のみ','素材がないため撮影を希望','未定']],['designNotes','制作物要望','textarea']],checks:['掲載内容受領','写真・ロゴ受領','サイズ確認','初稿作成','誤字脱字確認','修正確認','印刷データ作成','納品形式確認','お客様確認完了']},
  other:{label:'販促営業代行・その他',en:'Promotion Support',category:'販促実行支援',accent:'green',base:{name:'販促実行支援',qty:1,price:0,category:'販促実行支援'},summary:'施設調査、設置確認、訪問・補充など、実施する作業だけを個別に積算します。',fields:[['otherTitle','販促対象・目的'],['otherScope','希望する地域・施設・作業範囲','textarea'],['otherBudget','想定予算','number'],['otherDeadline','希望日','date'],['otherNotes','その他メモ','textarea']],checks:['作業内容確認','設置許可条件確認','必要資料確認','見積条件確認','実施日確認','作業完了','報告完了','お客様確認完了']}
};
const SERVICE_BASE_SCOPES = {
  website:{title:'基本制作 39,800円〜（税別）',items:['ページ制作：メインページとお問い合わせフォームページの2ページを作成します','店舗情報の掲載：住所・営業時間・メニュー・Google マップ・SNSリンクを掲載します','画像掲載：ご提供いただいた画像数点を配置し、掲載位置に合わせて切り抜き・サイズ調整します','スマートフォン対応：スマートフォンで読みやすい表示へ調整します','公開設定：基本SEOを設定し、STUDIO.Designの公開URLで公開します'],optionNote:'追加ページ、画像補正、素材整理、撮影、独自ドメイン、有料プラン、多言語対応は基本料金に含まれません。',note:'掲載する文章・画像・店舗情報が揃った後に制作を開始します。'},
  square:{title:'基本導入 39,800円〜（税別）',items:['商品登録：メニュー50点までの商品名・カテゴリ・価格・税率を登録します','端末設定：Square端末を初期設定し、Wi-Fi・レシート・テスト決済を確認します','決済登録のご案内：お客様が公式画面で登録できるよう、申請手順と必要書類をご案内します','会計準備：レシートの基本表示を設定し、基本的な会計操作をご案内します','納品確認：利用可能になった決済方法と残っている審査を分けて確認します'],optionNote:'51点目以降の商品登録、商品画像の補正・切り抜き、テイクアウトページ、EC、プリンター等の追加設定は基本料金に含まれません。追加商品登録は50点ごとに3,000円〜です。',note:'審査結果・審査期間はSquareおよび各決済事業者が判断し、PCSAPOは承認を保証できません。'},
  funfo:{title:'基本構築 58,000円〜（税別）',items:['店舗・商品登録：店舗情報、カテゴリ、メニュー50点までを登録します','注文設定：テーブル情報とQRコードを設定し、お客様の注文画面を確認します','基本運用：まずはfunfo FreeのQR注文を活用し、会計は店頭で行う流れを整えます','Square連携：店頭のSquare対面決済と連携し、funfo側でも会計結果を確認できる状態をテストします','動作確認：注文から店頭会計までをテストし、基本操作をご案内します'],optionNote:'51点目以降の商品登録、画像の補正・切り抜き、funfo有料プラン、スマホオンライン決済の契約・設定、厨房・レジ印刷、ハンディ追加は基本料金に含まれません。追加メニュー登録は50点ごとに3,000円〜です。',note:'標準提案は「funfoでQR注文、Squareまたは現金で店頭会計」です。お客様自身のスマホ決済は、ご要望がある場合だけ別方式として検討します。'},
  design:{title:'仕様選択後に個別見積',items:['制作物：メニュー・名刺・チラシ等の種類と完成サイズを確認します','構成：片面・両面、ページ数、掲載する文章と画像を確認します','印刷：数量、用紙、加工、納品方法を確認します','素材：ロゴ・画像・原稿の有無とデータ品質を確認します','進行：校正回数、希望納期、納品データ形式を確認します'],optionNote:'画像補正、素材整理、撮影、文章作成、印刷代、送料は仕様に応じて別途見積します。',note:'仕様による差が大きいため、制作費と印刷・納品費を分けて提示します。'},
  other:{title:'作業範囲選択後に個別見積',items:['調査：チラシ等の設置候補施設を調査します','連絡：電話・メールで設置条件と受付状況を確認します','交渉：合意した範囲で施設との確認や申請を補助します','実施：承諾済み施設への訪問・納品・設置・補充・回収を行います','報告：対応先と結果を報告書にまとめます'],optionNote:'調査件数、連絡件数、訪問回数、交通費、駐車場、送料、印刷費は作業範囲に応じて積算します。',note:'設置承諾・来店・売上等の成果は保証しません。'}
};
const HEARING_OPTION_NAMES = {
  website:['ページ追加','商品・メニュー追加（10品）','多言語対応','Googleビジネス最適化','SEO強化','バナー制作','独自メール設定','画像補正・切り抜き','画像・動画素材の整理','簡易スマートフォン撮影','外部カメラマン撮影手配'],
  square:['商品追加登録（50点）','メニュー画像編集','オンラインテイクアウトページ','Square EC構築','プリンター設定','キャッシュドロア設定','スタッフ権限設定','Square・funfoスタッフマニュアル'],
  funfo:['商品追加登録（50点）','メニュー画像編集','テーブル追加設定','QRコード追加作成','funfo Free構築（既存見積参考）','Lite移行設定','キッチンプリンター設定','レジ横プリンター設定','スマホハンディ追加','運用説明追加'],
  common:['補助金・支援制度情報のご案内'],
  design:['名刺制作','ショップカード制作','メニュー表制作','チラシ制作','ポスター制作','ロゴ制作','画像補正・切り抜き','画像・動画素材の整理','簡易スマートフォン撮影','外部カメラマン撮影手配','動画制作','印刷入稿サポート','Canva編集用データ'],
  other:['設置候補施設リサーチ','施設リスト作成','電話・メール設置確認','設置条件の確認支援','訪問・納品・設置','補充・回収','実施報告書','定期巡回','個別作業']
};
const CUSTOMER_PREPARATION = {
  website:{title:'ホームページ制作',items:['店舗名・住所・電話・営業時間・定休日','掲載文章、メニュー、価格、SNS・地図のURL','ロゴと店舗・料理の元画像（できるだけ高解像度）','掲載する動画の元データ、用途、縦横、希望する長さ','既存サイトや独自ドメインがある場合は契約状況（ID・パスワードは共有しません）']},
  square:{title:'Square導入',items:['事業主様ご自身で作成するSquareアカウントと、公式画面へ提出する本人確認書類','お客様ご自身で公式画面へ登録する入金口座、店舗情報、必要に応じて店舗写真','メニュー名・価格・税率・カテゴリ・商品画像','Square端末、Wi-Fi環境、レシート・周辺機器の希望','利用したいカード、QRコード決済、電子マネー']},
  funfo:{title:'funfo構築',items:['お客様ご自身で作成するfunfoアカウント、店舗情報、メニュー名・価格・税率・カテゴリ','料理の元画像、テーブル数・名称、注文方法','対応iPad、安定したWi-Fi環境、必要なプリンター','基本はSquareまたは現金による店頭会計','スマホオンライン決済を希望する場合のみ、funfoから求められた審査書類と入金口座']},
  design:{title:'印刷物・制作物',items:['確定した文章、価格、連絡先、QRコードのリンク先','ロゴの元データと、印刷に使用する高解像度画像','サイズ、片面・両面、ページ数、印刷数量','希望納期、納品形式、参考にしたいデザイン']},
  other:{title:'販促実行支援',items:['目的、対象地域、想定するお客様、設置候補','配布物の内容・数量・希望期間・予算','施設へ伝える説明内容と、承認済みの販促物','訪問・連絡・設置・補充など依頼する作業範囲']}
};
const ACCOUNT_SETUP_GUIDES = {
  website:{
    service:'STUDIO.Design',
    title:'お客様のアカウントで制作を開始します',
    officialUrl:'https://app.studio.design/ja/signup',
    officialLabel:'アカウント登録を開く',
    qrImage:'assets/images/qr-studio-signup.png',
    checkedAt:'2026年7月23日',
    officialLinks:[
      ['アカウント登録','https://help.studio.design/ja/articles/6227154-studio%E3%81%AE%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E3%82%92%E6%96%B0%E8%A6%8F%E7%99%BB%E9%8C%B2%E3%81%99%E3%82%8B'],
      ['プランの選び方','https://help.studio.design/ja/articles/4066297-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%83%97%E3%83%A9%E3%83%B3%E3%81%AE%E9%81%B8%E6%96%B9'],
      ['編集者を招待','https://help.studio.design/ja/articles/2639135-%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AB%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E3%82%92%E6%8B%9B%E5%BE%85%E3%81%99%E3%82%8B']
    ],
    steps:[
      ['1','お客様が登録','お客様ご自身のメールアドレスでアカウントを作成します。'],
      ['2','プランを選択','無料または有料プランを決め、有料の場合はお客様がカード情報を登録します。'],
      ['3','PCSAPOを招待','プロジェクトへPCSAPOを「編集者」として招待します。'],
      ['4','制作・納品','制作と確認後、編集権限を継続するか削除するかを決めます。']
    ],
    checks:[['account-website-created','お客様名義でSTUDIO.Designアカウントを作成しました'],['account-website-plan','無料・有料プランと公開URLの違いを確認しました'],['account-website-payment','有料プラン・ドメインの支払いはお客様が管理します'],['account-website-invited','PCSAPOを編集者として招待しました']],
    note:'カード番号、ドメイン契約情報、アカウントのパスワードはPCSAPOへ送らないでください。支払い情報はお客様ご自身で公式画面へ入力します。'
  },
  square:{
    service:'Square',
    title:'事業主様が登録したアカウントで設定します',
    officialUrl:'https://squareup.com/signup/jp',
    officialLabel:'アカウント登録を開く',
    qrImage:'assets/images/qr-square-signup.png',
    checkedAt:'2026年7月23日',
    officialLinks:[
      ['アカウント設定ガイド','https://squareup.com/help/jp/ja/article/5123-square-get-started-guide'],
      ['申込審査FAQ','https://squareup.com/help/jp/ja/article/5682-account-on-boarding-assessment-faqs'],
      ['Squareヘルプセンター','https://squareup.com/help/jp/ja']
    ],
    steps:[
      ['1','事業主様が登録','事業主様が公式画面からアカウントを作成します。'],
      ['2','本人情報を登録','本人確認、事業情報、入金口座、決済申込みはお客様が入力します。'],
      ['3','PCSAPOを招待','必要な店舗だけを対象に、設定作業用のスタッフ権限を付与します。'],
      ['4','設定・納品','商品・端末等を設定し、納品後にスタッフ権限を無効化または見直します。']
    ],
    checks:[['account-square-created','事業主名義でSquareアカウントを作成しました'],['account-square-identity','本人確認・事業情報・入金口座をお客様が登録しました'],['account-square-review','決済申込みと審査状況をお客様が確認しています'],['account-square-invited','PCSAPOへ必要最小限のスタッフ権限を付与しました']],
    note:'Squareアカウントのパスワード、カード情報、本人確認書類、銀行口座情報はPCSAPOへ送らないでください。PCSAPOは招待された権限の範囲で設定します。'
  },
  funfo:{
    service:'funfo',
    title:'店舗所有のアカウントで構築します',
    officialUrl:'https://apps.apple.com/jp/app/funfo-pos%E3%83%AC%E3%82%B8/id1489954821',
    officialLabel:'funfoアプリを開く',
    qrImage:'assets/images/qr-funfo-app.png',
    checkedAt:'2026年7月23日',
    officialLinks:[
      ['funfoアプリ','https://apps.apple.com/jp/app/funfo-pos%E3%83%AC%E3%82%B8/id1489954821'],
      ['サポートセンター','https://www.funfo.jp/index.php/support/'],
      ['導入前の準備','https://www.funfo.jp/index.php/preparation/']
    ],
    steps:[
      ['1','お客様が登録','店舗で継続利用するメールアドレスでfunfoアカウントを作成します。'],
      ['2','契約内容を確認','Freeまたは有料プラン、オンライン決済の要否を確認します。'],
      ['3','管理権限を設定','利用できる場合はPCSAPO用の管理アカウントを発行します。'],
      ['4','構築・納品','メニュー・QR注文を設定し、納品後に権限を継続または解除します。']
    ],
    checks:[['account-funfo-created','お客様名義でfunfoアカウントを作成しました'],['account-funfo-plan','Free・有料プランと決済方法を確認しました'],['account-funfo-payment','有料契約・オンライン決済情報はお客様が登録します'],['account-funfo-invited','PCSAPO用の管理権限を設定しました']],
    note:'funfoのID・パスワードやカード情報をPCSAPOへ送らないでください。管理アカウントを発行できないプランでは、お客様立会いで必要な設定を行います。'
  }
};
const SERVICE_WORKFLOWS = {
  website:['お客様がSTUDIO.Designへ登録','公開方法・プランを確認','PCSAPOを編集者として招待','原稿・画像を受領して制作','確認・修正後に公開・引渡し'],
  square:['事業主様がSquareへ登録','本人確認・口座・決済を公式画面で登録','PCSAPOへスタッフ権限を付与','商品・端末・レシートを設定','審査状況・テスト決済を確認して引渡し'],
  funfo:['お客様がfunfoへ登録','Free・有料プランと会計方法を確認','管理権限または立会い方法を確認','店舗・商品・テーブル・QRを設定','注文・Square店頭会計をテストして引渡し'],
  design:['制作物・サイズ・数量を確認','文章・ロゴ・画像の元データを受領','仕様確定後に概算・正式見積を作成','初稿・校正・修正内容を確認','印刷用または編集用データを納品'],
  other:['目的・対象地域・作業範囲を確認','件数・訪問・実費条件を整理','仕様確定後に概算・正式見積を作成','承諾済み範囲で調査・連絡・訪問','実施結果を確認して報告・精算']
};
const SERVICE_ORDER = ['website','square','funfo','design','other'];
const CASE_TEMPLATES = [
  {id:'full',label:'一括導入パッケージ',en:'Full Package',desc:'ホームページ、Square、funfoをまとめて提案する標準案件です。',services:{website:true,square:true,funfo:true,design:false,other:false},quotes:[{name:'ホームページ制作',qty:1,price:39800,category:'ホームページ制作',source:'service',unit:'式'},{name:'Square導入構築',qty:1,price:39800,category:'Square導入構築',source:'service',unit:'式'},{name:'funfo Free構築',qty:1,price:58000,category:'funfo構築',source:'service',unit:'式'}]},
  {id:'website',label:'ホームページ制作のみ',en:'Website Only',desc:'STUDIO.Designホームページ制作を中心に、公開URL・独自ドメイン・SEO・掲載内容を整理します。',services:{website:true,square:false,funfo:false,design:false,other:false},quotes:[{name:'ホームページ制作',qty:1,price:39800,category:'ホームページ制作',source:'service',unit:'式'}]},
  {id:'square',label:'Square導入のみ',en:'Square Setup Only',desc:'Squareターミナル、商品登録、決済テスト、操作説明を管理します。',services:{website:false,square:true,funfo:false,design:false,other:false},quotes:[{name:'Square導入構築',qty:1,price:39800,category:'Square導入構築',source:'service',unit:'式'}]},
  {id:'funfoFree',label:'funfo Free導入',en:'funfo Free Setup',desc:'QRセルフオーダーを無料プランで開始し、必要に応じてLiteへ拡張します。',services:{website:false,square:false,funfo:true,design:false,other:false},quotes:[{name:'funfo Free構築',qty:1,price:58000,category:'funfo構築',source:'service',unit:'式'}]},
  {id:'design',label:'制作物のみ',en:'Design Works Only',desc:'メニュー表、名刺、チラシ、ロゴなど販促物だけを扱う案件です。',services:{website:false,square:false,funfo:false,design:true,other:false},quotes:[{name:'メニュー表制作',qty:1,price:19800,category:'制作物',source:'service',unit:'式'}]},
  {id:'support',label:'保守・定期点検のみ',en:'Maintenance Only',desc:'既存顧客向けに月額サポート、定期点検、更新代行を提案します。',services:{website:false,square:false,funfo:false,design:false,other:true},quotes:[],maintenanceDecision:'contract',plan:'standard',printMode:'maintenance'}
];
const menus = [
  ['OVERVIEW',[['dashboard','▦','ダッシュボード'],['templates','▧','案件テンプレート'],['home','⌂','店舗導入パッケージ'],['services','◎','サービス紹介']]],
  ['SERVICES',[['website','🌐','ホームページ'],['square','▣','Square'],['funfo','▤','funfo'],['pricing','¥','導入見積書'],['maintenanceQuote','¥','保守見積書'],['priceMaster','≡','料金マスター'],['options','＋','オプション'],['maintenance','♻','保守・定期点検'],['schedule','→','導入工程']]],
  ['DOCUMENTS',[['hearing','✎','ヒアリング'],['check','✓','導入チェック'],['contract','▧','契約'],['handover','⌁','引渡し'],['faq','?','FAQ'],['print','⎙','PDF・印刷']]]
  ,['MATERIALS',[['materials','▣','営業プレゼン資料']]]
];
const CUSTOMER_MENUS = [
  ['お客様メニュー',[['home','⌂','店舗導入パッケージ'],['position','i','私たちの役割'],['website','🌐','ホームページ制作'],['square','▣','Square導入'],['funfo','▤','funfo構築'],['designService','◇','制作・販促支援']]],
  ['導入案内',[['schedule','→','導入の流れ'],['hearing','✎','ヒアリング／概算見積'],['customerDocuments','⎙','確認資料・PDF'],['resources','▤','配布資料・公式リンク'],['customerProgress','✓','導入状況'],['manuals','▣','操作マニュアル'],['faq','?','よくある質問']]]
];
const ADMIN_MENUS = [
  ['管理',[['dashboard','▦','営業ダッシュボード'],['templates','▧','案件テンプレート'],['hearing','✎','ヒアリング'],['check','✓','導入チェック']]],
  ['見積・料金',[['pricing','¥','導入見積書'],['maintenanceQuote','¥','保守見積書'],['options','＋','オプション'],['priceMaster','≡','料金マスター'],['maintenance','♻','保守・定期点検']]],
  ['契約・納品',[['contract','▧','契約'],['handover','⌁','引渡し'],['print','⎙','PDF・印刷'],['contentMaster','▤','資料・公式リンク管理'],['materials','▣','営業資料']]],
  ['表示確認',[['customerView','⌂','お客様画面へ切替'],['faq','?','FAQ']]]
];

const defaultData = () => ({
  id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), caseName:'新規導入案件', storeName:'', company:'', owner:'', contact:'', phone:'', email:'', address:'', hours:'', closed:'', notes:'', date:new Date().toISOString().slice(0,10), contractNo:createContractNo(), desiredDate:'', paymentMethod:'cash', workEmailPolicy:'existing', workEmail:'', printMode:'implementation', customerDocScope:'all', customerDocView:'package', includeStamp:false, maintenanceQuote:null, selectedServices:{website:true,square:true,funfo:false,design:false,other:false}, plan:'standard', contractDecision:'consider', maintenanceDecision:'none', subscription:false, subscriptionStart:'', subscriptionTerm:'12か月', subscriptionPrice:6980, subscriptionDetails:'月2回の更新、メニュー・価格変更、簡易バナー、Square/funfo相談', clientSignerName:'',producerSignerName:'',handoverSignerName:'',maintenanceClientSignerName:'',maintenanceProducerSignerName:'',checks:{}, quotes:[{name:'ホームページ制作',qty:1,price:39800,category:'ホームページ制作'},{name:'Square導入構築',qty:1,price:39800,category:'Square導入構築'}], signatures:{client:'',producer:'',handover:'',maintenanceClient:'',maintenanceProducer:''}, createdAt:new Date().toISOString(), updatedAt:new Date().toISOString()
});
let state = {page:'entry', mode:'entry', data:loadCurrent() || defaultData(), dirty:false};
normalizeData(state.data);
if(!state.data.printMode)state.data.printMode=state.data.quoteMode==='maintenance'?'maintenance':'implementation';
if(!state.data.maintenanceQuote){const old=(state.data.quotes||[]).find(q=>q.source==='maintenance');if(old){state.data.maintenanceQuote={...old};state.data.quotes=state.data.quotes.filter(q=>q.source!=='maintenance');if(!state.data.quotes.length)state.data.quotes=defaultData().quotes}}
state.data.quoteMode='implementation';

const $ = (s,root=document) => root.querySelector(s);
const $$ = (s,root=document) => [...root.querySelectorAll(s)];
const yen = n => new Intl.NumberFormat('ja-JP',{style:'currency',currency:'JPY',maximumFractionDigits:0}).format(Number(n)||0);
const esc = s => String(s ?? '').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const pageHead = (no,jp,en,desc) => `<header class="page-head"><div><span class="eyebrow">PCSAPO MAKISHI PLANNING</span><h1>${jp} <span class="muted">/ ${en}</span></h1><p>${desc}</p></div><span class="page-no">${no}</span></header>`;
const card = (title,body,accent='orange') => `<section class="card accent-${accent}"><h2>${title}</h2>${body}</section>`;
const input = (key,label,type='text',wide='') => {const numeric=type==='number',date=type==='date';return `<div class="field ${wide} ${date?'date-field':''}"><label for="f-${key}">${label}</label><div class="input-shell"><input id="f-${key}" type="${numeric?'text':type}" ${numeric?'inputmode="numeric" data-numeric':''} data-field="${key}" value="${esc(state.data[key]??'')}">${date?`<button type="button" class="calendar-button" data-date-picker="f-${key}" aria-label="カレンダーから選択">▣</button>`:''}</div></div>`};
const textArea = (key,label) => `<div class="field wide"><label for="f-${key}">${label}</label><textarea id="f-${key}" data-field="${key}">${esc(state.data[key])}</textarea></div>`;
const choice = (key,label) => `<label class="choice"><input type="checkbox" data-check="${esc(key)}" ${state.data.checks[key]?'checked':''}><span>${label}</span></label>`;
const choices = items => `<div class="check-grid">${items.map(([k,l])=>choice(k,l)).join('')}</div>`;

/*
 * 契約番号は「日付-時刻＋ミリ秒-ランダム8桁」で生成する。
 * 保存済み案件とも照合するため、同一端末内では重複させない。
 * 例: MK-20260711-191720123-A1B2C3D4
 * ※クラウド未接続の間は、別端末の番号との中央照合はできない。
 */
function createContractNo(){
  const d=new Date(),pad=n=>String(n).padStart(2,'0');
  const date=`${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`;
  const time=`${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}${String(d.getMilliseconds()).padStart(3,'0')}`;
  const existing=new Set(allCases().map(x=>x.contractNo).filter(Boolean));
  let no;
  do{
    const random=(crypto.randomUUID?.().replace(/-/g,'').slice(0,8)||`${Math.random().toString(16).slice(2)}00000000`.slice(0,8)).toUpperCase();
    no=`MK-${date}-${time}-${random}`;
  }while(existing.has(no));
  return no;
}
function loadCurrent(){try{return JSON.parse(localStorage.getItem(UI_KEY))}catch{return null}}
function allCases(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||[]}catch{return []}}
function normalizeDateValue(value=''){
  const text=String(value).trim();
  const japanese=text.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/);
  if(japanese)return `${japanese[1]}-${japanese[2].padStart(2,'0')}-${japanese[3].padStart(2,'0')}`;
  return /^\d{4}-\d{2}-\d{2}$/.test(text)?text:'';
}
function displayDate(value=''){
  const normalized=normalizeDateValue(value);
  if(!normalized)return String(value||'');
  const [year,month,day]=normalized.split('-').map(Number);
  return `${year}年${month}月${day}日`;
}
function normalizeContentItem(item={}){
  return {
    id:String(item.id||crypto.randomUUID?.()||`content-${Date.now()}-${Math.random().toString(16).slice(2)}`),
    kind:CONTENT_KIND_LABELS[item.kind]?item.kind:'commonDocument',
    service:CONTENT_SERVICE_LABELS[item.service]?item.service:'common',
    category:String(item.category||'共通案内').trim()||'共通案内',
    title:String(item.title||'名称未設定').trim()||'名称未設定',
    description:String(item.description||'').trim(),
    url:String(item.url||'').trim(),
    buttonLabel:String(item.buttonLabel||'開く').trim()||'開く',
    checkedAt:normalizeDateValue(item.checkedAt),
    qrImage:String(item.qrImage||'').trim(),
    caseId:String(item.caseId||''),
    primary:item.primary===true,
    customerVisible:item.customerVisible!==false,
    active:item.active!==false,
    archived:item.archived===true,
    sortOrder:Number.isFinite(Number(item.sortOrder))?Number(item.sortOrder):0,
    createdAt:String(item.createdAt||new Date().toISOString()),
    updatedAt:String(item.updatedAt||new Date().toISOString())
  };
}
function defaultContentMaster(){
  const items=[{
    id:'document-square-funfo-presentation',
    kind:'commonDocument',
    service:'common',
    category:'サービス説明資料',
    title:'Square・funfo 統合説明資料',
    description:'Square端末とfunfoセルフオーダーの概要をまとめたA4資料です。',
    url:'assets/docs/square-funfo-presentation.pdf',
    buttonLabel:'PDFを開く',
    customerVisible:true,
    active:true,
    archived:false,
    sortOrder:10
  }];
  Object.entries(ACCOUNT_SETUP_GUIDES).forEach(([service,guide],serviceIndex)=>{
    items.push({
      id:`official-${service}-primary`,
      kind:'officialLink',
      service,
      category:'アカウント登録',
      title:guide.officialLabel,
      description:`${guide.service}の公式登録ページです。`,
      url:guide.officialUrl,
      buttonLabel:guide.officialLabel,
      checkedAt:guide.checkedAt,
      qrImage:guide.qrImage,
      primary:true,
      customerVisible:true,
      active:true,
      archived:false,
      sortOrder:100+serviceIndex*20
    });
    guide.officialLinks.forEach(([title,url],linkIndex)=>items.push({
      id:`official-${service}-${linkIndex+1}`,
      kind:'officialLink',
      service,
      category:'公式ヘルプ',
      title,
      description:`${guide.service}公式サイトの案内です。`,
      url,
      buttonLabel:title,
      checkedAt:guide.checkedAt,
      primary:false,
      customerVisible:true,
      active:true,
      archived:false,
      sortOrder:101+serviceIndex*20+linkIndex
    }));
  });
  return items.map(normalizeContentItem);
}
function loadContentMaster(){
  try{
    const stored=JSON.parse(localStorage.getItem(CONTENT_MASTER_KEY));
    return Array.isArray(stored)?stored.map(normalizeContentItem):defaultContentMaster();
  }catch{
    return defaultContentMaster();
  }
}
function saveContentMaster(){
  contentMaster=contentMaster.map(normalizeContentItem);
  localStorage.setItem(CONTENT_MASTER_KEY,JSON.stringify(contentMaster));
}
function customerContent(kind,service=''){
  return contentMaster
    .filter(item=>item.kind===kind&&item.active&&!item.archived&&item.customerVisible&&(!service||item.service===service||item.service==='common'))
    .sort((a,b)=>a.sortOrder-b.sortOrder||a.title.localeCompare(b.title,'ja'));
}
function officialContent(service){
  return customerContent('officialLink',service).filter(item=>item.service===service);
}
function defaultPriceMaster(){
  const checkedAt=new Date().toISOString().slice(0,10);
  return [
    ...OPTION_CATALOG.filter(o=>o.name!=='Squareターミナル専用ハブ').map((o,i)=>({...o,id:`work-${i}`,type:'work',description:o.description||'',priceDisplay:o.priceDisplay||'from',taxType:'taxExclusive',provider:'PCSAPO マキシ企画',url:o.url||'',checkedAt:'',customerVisible:true,customerPriceVisible:true,quoteEnabled:o.quoteEnabled!==false,sortOrder:i,notes:'',active:true})),
    ...PROMOTION_CATALOG.map((o,i)=>({...o,id:`promotion-${i}`,type:'promotion',taxType:'taxExclusive',provider:'PCSAPO マキシ企画',url:'',checkedAt:'',customerVisible:true,customerPriceVisible:true,quoteEnabled:true,sortOrder:500+i,notes:'最低受注額10,000円。交通費・駐車場・送料・印刷費・施設利用料は別途。',active:true})),
    ...OFFICIAL_CATALOG.map((o,i)=>({...o,id:`official-${i}`,type:'official',priceDisplay:'reference',checkedAt,customerVisible:true,customerPriceVisible:true,quoteEnabled:false,sortOrder:1000+i,notes:'契約・支払いは各提供会社との直接契約です。最新条件は公式サイトで確認します。',active:true}))
  ].map(normalizeMasterItem);
}
function migrateMasterItem(item){
  if(item?.name==='補助金・支援制度情報のご案内')return {...item,description:'国・都道府県・市区町村の公開情報と公式相談窓口を無料でご案内します。申請可否の判断、申請書類・事業計画書の作成、提出代行、採択保証は行いません。',price:0,priceDisplay:'fixed',quoteEnabled:false,customerPriceVisible:true};
  if(item?.name==='設置交渉・申請補助')return {...item,name:'設置条件の確認支援',description:'施設との設置条件や必要な手続きを確認します。'};
  if(item?.name==='STUDIO Free')return {...item,name:'STUDIO.Design Free',provider:'STUDIO.Design',description:'月額0円で公開できます。公開URLは「お客様指定名.studio.site」となり、独自ドメインではありません。'};
  if(item?.name==='STUDIO Mini')return {...item,name:'STUDIO.Design Mini',provider:'STUDIO.Design',url:'https://studio.design/ja/pricing#personal',description:'独自ドメイン接続に対応する有料プランです。年払い時の月額換算で、契約条件と最新価格は公式サイトで確認します。'};
  if(item?.name==='STUDIO Personal')return {...item,name:'STUDIO.Design Personal',provider:'STUDIO.Design',url:'https://studio.design/ja/pricing#personal',description:'複数ページの運用に対応する有料プランです。年払い時の月額換算で、契約条件と最新価格は公式サイトで確認します。'};
  if(item?.group==='Square導入構築'&&['商品追加登録（10品）','商品追加登録（50品）'].includes(item.name))return {...item,name:'商品追加登録（50点）',price:3000,unit:'セット',description:'基本50点を超える商品情報を、50点単位で追加登録します。画像編集は含みません。'};
  if(item?.group==='funfo構築'&&['メニュー追加登録（10品）','メニュー追加登録（50品）'].includes(item.name))return {...item,name:'商品追加登録（50点）',price:3000,unit:'セット',description:'基本50点を超える商品情報を、50点単位で追加登録します。画像編集は含みません。'};
  if(item?.group==='Square導入構築'&&item.name==='メニュー画像登録')return {...item,name:'メニュー画像編集',description:item.description||'支給されたメニュー画像を登録用途に合わせて調整します。作業範囲により料金が変わります。'};
  if(item?.name!=='写真加工')return item;
  return {...item,name:'画像補正・切り抜き',unit:item.unit==='個'?'点':item.unit,description:item.description||'明るさ・色味・傾き・トリミング・背景切り抜き等の調整です。強いピンぼけ、極端に小さい画像、欠けた部分の完全な復元は対象外で、再撮影をお願いする場合があります。'};
}
function addMediaOptionsOnce(items){if(localStorage.getItem(PRICE_MASTER_MEDIA_MIGRATION_KEY))return items;const additions=defaultPriceMaster().filter(item=>['画像・動画素材の整理','簡易スマートフォン撮影','外部カメラマン撮影手配'].includes(item.name)&&!items.some(current=>current.name===item.name));localStorage.setItem(PRICE_MASTER_MEDIA_MIGRATION_KEY,'1');return [...items,...additions]}
function addScopeOptionsOnce(items){if(localStorage.getItem(PRICE_MASTER_SCOPE_MIGRATION_KEY))return items;const additions=defaultPriceMaster().filter(item=>item.name==='補助金・支援制度情報のご案内'&&!items.some(current=>current.name===item.name));localStorage.setItem(PRICE_MASTER_SCOPE_MIGRATION_KEY,'1');return [...items,...additions]}
function addV35OptionsOnce(items){if(localStorage.getItem(PRICE_MASTER_V35_MIGRATION_KEY))return items;const additions=defaultPriceMaster().filter(item=>item.group==='funfo構築'&&item.name==='メニュー画像編集'&&!items.some(current=>current.group===item.group&&current.name===item.name));localStorage.setItem(PRICE_MASTER_V35_MIGRATION_KEY,'1');return [...items,...additions]}
const DEPRECATED_DELEGATED_ITEMS = new Set(['ドメイン取得代行','ドメイン取得代行（既存見積参考）','Square事務手続き代行','Square手続き代行（2台）','funfo手続き代行']);
function finalizePriceMaster(items){
  const seen=new Set();
  return items.filter(item=>!DEPRECATED_DELEGATED_ITEMS.has(item?.name)).map(migrateMasterItem).map(normalizeMasterItem).map(item=>{
    if(!seen.has(item.id)){seen.add(item.id);return item}
    const id=crypto.randomUUID?.()||`pm-${Date.now()}-${Math.random()}`;
    seen.add(id);
    return {...item,id};
  });
}
function loadPriceMaster(){
  try{
    const current=JSON.parse(localStorage.getItem(PRICE_MASTER_KEY));
    if(Array.isArray(current)&&current.length)return finalizePriceMaster(addV35OptionsOnce(addScopeOptionsOnce(addMediaOptionsOnce(current))));
    const legacy=JSON.parse(localStorage.getItem(LEGACY_PRICE_MASTER_KEY));
    if(Array.isArray(legacy)&&legacy.length){
      const migrated=legacy.filter(item=>item.name!=='Squareターミナル専用ハブ').map(item=>({...item,type:'work'}));
      const extras=defaultPriceMaster().filter(item=>item.type!=='work');
      return finalizePriceMaster(addV35OptionsOnce(addScopeOptionsOnce(addMediaOptionsOnce([...migrated,...extras]))));
    }
    return finalizePriceMaster(defaultPriceMaster());
  }catch{return finalizePriceMaster(defaultPriceMaster())}
}
function normalizeMasterItem(item){return {id:String(item.id||crypto.randomUUID?.()||`pm-${Date.now()}-${Math.random()}`),type:['work','official','promotion'].includes(item.type)?item.type:'work',group:item.group||'その他',name:item.name||'',description:item.description||'',price:Math.max(0,Number(item.price)||0),unit:item.unit||'式',priceDisplay:item.priceDisplay||'from',taxType:item.taxType||'taxExclusive',provider:item.provider||'PCSAPO マキシ企画',url:item.url||'',checkedAt:item.checkedAt||'',customerVisible:item.customerVisible!==false,customerPriceVisible:item.customerPriceVisible!==false,quoteEnabled:item.quoteEnabled!==false,sortOrder:Number(item.sortOrder)||0,notes:item.notes||'',active:item.active!==false}}
let priceMaster = loadPriceMaster();
let priceMasterFilters = {query:'',group:'all',type:'all'};
let contentMaster = loadContentMaster();
let contentMasterFilters = {query:'',kind:'all',category:'all',showArchived:false};
function savePriceMaster(){priceMaster=finalizePriceMaster(priceMaster);localStorage.setItem(PRICE_MASTER_KEY,JSON.stringify(priceMaster))}
savePriceMaster();
saveContentMaster();
function optionCatalog(){return priceMaster.map(normalizeMasterItem).filter(o=>o.name.trim()&&o.active&&o.quoteEnabled&&o.type!=='official').sort((a,b)=>a.sortOrder-b.sortOrder)}
function visibleCatalog(group,type){return priceMaster.map(normalizeMasterItem).filter(o=>o.name.trim()&&o.active&&o.customerVisible&&(!group||o.group===group)&&(!type||o.type===type)).sort((a,b)=>a.sortOrder-b.sortOrder)}
function quoteCatalog(){
  const seen=new Set();
  return [...DEFAULT_CATALOG.map(o=>({...o,category:inferQuoteCategory(o.name)})),...optionCatalog().map(o=>({name:o.name,price:o.price,category:o.group,unit:o.unit}))].filter(item=>{
    const key=`${item.name}|${item.price}`;
    if(seen.has(key))return false;
    seen.add(key);
    return true;
  });
}
function normalizeData(data){
  data.includeStamp = data.includeStamp === true;
  data.customerDocScope ||= 'all';
  data.customerDocView ||= 'package';
  data.checks ||= {};
  if(data.workEmailPolicy==='google')data.workEmailPolicy='existing';
  data.selectedServices ||= {website:true,square:true,funfo:false,design:false,other:false};
  SERVICE_ORDER.forEach(id=>{if(typeof data.selectedServices[id] !== 'boolean')data.selectedServices[id]=false});
  data.quotes ||= [];
  if(!data.selectedServices.design)data.quotes=data.quotes.filter(q=>!(q.source==='hearingOption'&&q.name==='名刺制作'));
  data.quotes.forEach(q=>{
    if(q.masterId!==undefined&&q.masterId!==null&&q.masterId!=='')q.masterId=String(q.masterId);
    if(['商品追加登録（10品）','商品追加登録（50品）'].includes(q.name))q.name='商品追加登録（50点）';
    if(['メニュー追加登録（10品）','メニュー追加登録（50品）'].includes(q.name))q.name='商品追加登録（50点）';
    if(q.name==='メニュー画像登録')q.name='メニュー画像編集';
    if(q.name==='写真加工'){
      q.name='画像補正・切り抜き';
      q.unit=q.unit==='個'?'点':q.unit;
      q.description ||= '明るさ・色味・傾き・トリミング・背景切り抜き等の調整です。強いピンぼけ、極端に小さい画像、欠けた部分の完全な復元は対象外です。';
    }
    q.category ||= inferQuoteCategory(q.name,q.source,q.category);
    if(!q.source && SERVICE_ORDER.some(id=>SERVICE_DEFS[id].base.name===q.name))q.source='service';
  });
  if(!data.quotes.length){
    data.quotes = SERVICE_ORDER.filter(id=>data.selectedServices[id] && SERVICE_DEFS[id].base.price>0).map(id=>({...SERVICE_DEFS[id].base,source:'service',unit:'式'}));
  }
}
function inferQuoteCategory(name='',source='',category=''){
  if(category)return category;
  if(source==='maintenance')return '保守・定期点検';
  if(source==='option')return 'オプション';
  if(/ホームページ|STUDIO(?:\.Design)?|ページ|ドメイン|SEO/.test(name))return 'ホームページ制作';
  if(/Square|EC|決済|プリンター|キャッシュドロア/.test(name))return 'Square導入構築';
  if(/funfo|QR|テーブル|ハンディ|厨房/.test(name))return 'funfo構築';
  if(/名刺|メニュー|チラシ|ポスター|ロゴ|カード|Canva|印刷/.test(name))return '制作物';
  return 'その他';
}
function quoteCategories(){
  const base=['ホームページ制作','Square導入構築','funfo構築','制作物','オプション','保守・定期点検','その他'];
  const dynamic=[...optionCatalog().map(o=>o.group),...(state?.data?.quotes||[]).map(q=>q.category)].filter(Boolean);
  return [...new Set([...base,...dynamic])];
}
function commitCases(list){
  const ordered=[...list].sort((a,b)=>String(b.updatedAt||'').localeCompare(String(a.updatedAt||'')));
  if(ordered.length>MAX_LOCAL_CASES){exportBackup(ordered,true)}
  localStorage.setItem(STORAGE_KEY,JSON.stringify(ordered.slice(0,MAX_LOCAL_CASES)));
}
function toHalfWidth(value){return String(value??'').replace(/[０-９]/g,c=>String.fromCharCode(c.charCodeAt(0)-0xFEE0)).replace(/[，,\s￥円]/g,'').replace(/[^0-9.-]/g,'')}
function markDirty(){state.dirty=true;$('#saveState').textContent='未保存の変更';localStorage.setItem(UI_KEY,JSON.stringify(state.data))}
function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)}

function buildNav(){
  const source=state.mode==='admin'?ADMIN_MENUS:CUSTOMER_MENUS;
  $('#mainNav').innerHTML=source.map(([group,items])=>`<div class="nav-group">${group}</div>${items.map(([id,icon,label])=>`<button class="nav-item ${state.page===id?'active':''}" data-page="${id}"><span class="nav-icon">${icon}</span>${label}</button>`).join('')}`).join('');
  $('.brand small').textContent=state.mode==='admin'?'管理者用 / ADMIN':'お客様向けご案内';
  $('#brandHome').setAttribute('aria-label',state.mode==='admin'?'管理者ダッシュボードへ戻る':'店舗導入パッケージへ戻る');
}

function setMode(mode,page){state.mode=mode;localStorage.setItem(MODE_KEY,mode);state.page=page||(mode==='admin'?'dashboard':'home');render();window.scrollTo({top:0});closeSidebar()}
function closeSidebar(){const sidebar=$('#sidebar'),backdrop=$('#sidebarBackdrop');sidebar.classList.remove('open');document.body.classList.remove('menu-open');backdrop.hidden=true;$('#menuButton').setAttribute('aria-expanded','false')}
function openSidebar(){const sidebar=$('#sidebar'),backdrop=$('#sidebarBackdrop');sidebar.classList.add('open');document.body.classList.add('menu-open');backdrop.hidden=false;$('#menuButton').setAttribute('aria-expanded','true')}
async function passcodeHash(value){const bytes=new TextEncoder().encode(value);const hash=await crypto.subtle.digest('SHA-256',bytes);return [...new Uint8Array(hash)].map(x=>x.toString(16).padStart(2,'0')).join('')}
function openAdminDialog(){const setup=!localStorage.getItem(ADMIN_PASSCODE_KEY);$('#adminDialogTitle').textContent=setup?'管理者パスコードを設定':'管理者用を開く';$('#adminDialogHelp').textContent=setup?'この端末で使用する4〜12文字の簡易パスコードを設定してください。':'この端末に設定した簡易パスコードを入力してください。';$('#adminPasscodeConfirmWrap').hidden=!setup;$('#adminPasscode').value='';$('#adminPasscodeConfirm').value='';$('#adminDialog').showModal();setTimeout(()=>$('#adminPasscode').focus(),50)}
async function unlockAdmin(){const value=$('#adminPasscode').value;if(value.length<4){toast('4文字以上のパスコードを入力してください');return}const stored=localStorage.getItem(ADMIN_PASSCODE_KEY),hash=await passcodeHash(value);if(!stored){if(value!==$('#adminPasscodeConfirm').value){toast('確認用パスコードが一致しません');return}localStorage.setItem(ADMIN_PASSCODE_KEY,hash)}else if(hash!==stored){toast('パスコードが違います');return}sessionStorage.setItem(ADMIN_SESSION_KEY,'1');$('#adminDialog').close();setMode('admin','dashboard')}

function entryPage(){return `<section class="entry-screen"><div class="entry-stage"><button class="entry-brand-line" id="entryBrandHome" type="button" aria-label="入口へ戻る"><span class="entry-logo-frame"><img src="assets/images/pcsapo-logo.png" alt=""></span><span><b>PCSAPO</b><small>MAKISHI PLANNING</small></span></button><div class="entry-copy"><span class="entry-kicker">RESTAURANT DIGITAL SUPPORT</span><h1>店舗に必要な仕組みを、<br>分かりやすく整えます。</h1><p>ホームページ、決済、セルフオーダー、制作物、導入後のサポートから、店舗環境に合うものだけをご提案します。</p><div class="entry-service-strip"><span>WEB SITE</span><span>PAYMENT</span><span>SELF ORDER</span><span>DESIGN</span><span>SUPPORT</span></div></div></div><div class="entry-choices"><button class="entry-choice customer" id="enterCustomer"><span>FOR CUSTOMER</span><b>お客様向けサービスを見る</b><small>内容・費用・導入の流れ・FAQ・マニュアル</small></button><button class="entry-choice admin" id="enterAdmin"><span>PCSAPO ADMIN</span><b>管理者用を開く</b><small>案件・見積・契約・料金マスター・PDF</small></button></div><section class="independence-note"><b>独立した導入支援事業者です</b><p>PCSAPO マキシ企画は、STUDIO.Design・Square・funfo各社の代理店や営業担当者ではありません。お客様の予算と店舗運用を確認し、複数サービスから適した組み合わせをご提案します。</p></section></section>`}
function customerHomePage(){const items=[['website','ホームページ制作','STUDIO.Designを使った店舗サイト制作、公開、更新方法まで支援します。'],['square','Square導入','店頭決済、レストランメニュー登録、テイクアウト・ECの初期構築を支援します。'],['funfo','funfo構築','QRセルフオーダーをFreeから試し、支払い方法や店舗運用に合わせて拡張します。'],['designService','制作・販促支援','メニュー、名刺、チラシの制作から、合意した範囲の設置支援まで対応します。']];const flow=[['サービス確認','必要なサービスと費用の考え方を確認'],['ヒアリング・概算','希望条件とオプションを入力'],['正式見積','PCSAPOが仕様を確認して書面を作成'],['契約','作業範囲・金額・納期を双方で確認'],['制作・設定','素材受領後に制作と設定を開始'],['確認・引渡し','テスト、操作説明、納品書類を確認'],['保守・更新','必要に応じて点検・更新を継続']];return `${pageHead('01','店舗導入パッケージ','Restaurant Implementation Package','必要なサービスを選び、詳しい内容と費用をご確認いただけます。')}<section class="customer-lead"><div><span>PCSAPO マキシ企画</span><h2>店舗に合うサービスを、一緒に選びます。</h2><p>特定メーカーの商品を販売する立場ではなく、費用・機能・現場運用を比較してご提案します。</p></div><button class="button ghost" data-go="position">私たちの役割を確認</button></section><div class="grid two service-link-grid">${items.map(([id,title,desc],i)=>`<button class="card service-link accent-${i%2?'blue':'orange'}" data-go="${id}"><span class="service-number">0${i+1}</span><h2>${title}</h2><p>${desc}</p><b>詳しく見る →</b></button>`).join('')}</div><section class="card customer-flow"><div class="customer-flow-head"><span class="eyebrow">PROJECT FLOW</span><h2>サービス確認から導入後の支援まで</h2><p>お客様の確認事項と、PCSAPOが作成する書類・作業を順番に分けています。</p></div><div class="project-flow">${flow.map((x,i)=>`<article><b>${String(i+1).padStart(2,'0')}</b><div><h3>${x[0]}</h3><p>${x[1]}</p></div></article>`).join('')}</div></section>`}
function positionPage(){return `${pageHead('INFO','私たちの役割','Our Role','サービス提供会社との違いと、対応範囲を明確にご案内します。')}<section class="relationship-diagram"><div><b>PCSAPO マキシ企画</b><span>環境確認・比較・提案・制作・初期設定・運用支援</span></div><strong>＋</strong><div><b>各サービス提供会社・メーカー</b><span>サービス提供・契約・請求・機器保証</span></div><strong>＝</strong><div class="result"><b>店舗に合う導入方法</b><span>予算と実際のオペレーションを優先</span></div></section><div class="grid two">${card('PCSAPOが対応すること','<ul><li>店舗環境とご要望のヒアリング</li><li>複数サービスの比較と組み合わせ提案</li><li>ホームページ・メニュー・設定作業</li><li>初期操作説明と保守・点検</li></ul>','green')}${card('提供会社へ確認すること','<ul><li>各サービスの契約・請求・審査</li><li>サービス障害やアカウント固有の問題</li><li>機器故障・交換・メーカー保証</li><li>公式プランの最終的な利用条件</li></ul>','blue')}</div><section class="card notice"><b>重要：</b>PCSAPO マキシ企画はSTUDIO.Design・Square・funfo各社の代理店、販売店、営業担当者ではありません。公式料金は参考情報として分けて表示し、契約時に各社の公式情報をご確認いただきます。</section>`}
function priceText(item,customerView=true){if(item.name==='補助金・支援制度情報のご案内')return '無料案内';if(customerView&&item.customerPriceVisible===false)return '金額は個別にご案内';if(item.priceDisplay==='estimate')return '別途見積';return `${yen(item.price)}${item.priceDisplay==='from'?'〜':''} / ${esc(item.unit)}`}
function catalogSection(group,type,title){const items=visibleCatalog(group,type);if(!items.length)return '';return `<section class="catalog-section"><div class="catalog-section-head"><h2>${title}</h2><span>${type==='official'?'提供会社との直接契約':'PCSAPO作業料金'}</span></div><div class="public-price-list">${items.map(item=>`<article><div><b>${esc(item.name)}</b><p>${esc(item.description||item.notes)}</p>${item.provider?`<small>${esc(item.provider)}</small>`:''}</div><strong>${priceText(item)}</strong>${item.url?`<a href="${esc(item.url)}" target="_blank" rel="noopener">公式情報</a>`:''}</article>`).join('')}</div></section>`}
function serviceDetailPage(group,title,en,lead,features,extra=''){const scopeId={'ホームページ制作':'website','Square導入構築':'square','funfo構築':'funfo'}[group];return `${pageHead('SERVICE',title,en,lead)}${scopeId?`<section class="service-base-scope">${serviceBaseScopeHtml(scopeId)}</section>${accountSetupGuideHtml(scopeId)}`:''}<section class="feature-band">${features.map(([name,desc])=>`<div><b>${name}</b><span>${desc}</span></div>`).join('')}</section>${extra}${catalogSection(group,'work','制作・導入支援オプション')}${subsidyGuidanceHtml()}${catalogSection(group,'official','公式プラン・機器の参考費用')}<section class="card notice"><b>料金の分け方：</b>PCSAPOの制作・設定料金と、各提供会社へ支払うプラン・機器料金は別です。公式料金は改定される場合があるため、契約前に最新情報を確認します。</section>`}
function funfoReviewGuideHtml(){return `<div class="funfo-review-guide"><div class="review-guide-head"><div><span>FUNFO OFFICIAL REVIEW GUIDE</span><h3>funfoオンライン決済の申込み・審査</h3></div><small>確認日：2026年7月23日</small></div><p class="pcsapo-review-estimate"><b>PCSAPOのご案内目安：</b>必要書類の準備案内、申請手順の確認、追加確認への対応を含め、利用開始まで1〜2か月程度の余裕を見てご案内します。審査状況により前後し、PCSAPOが承認日や審査結果を保証するものではありません。</p><div class="review-guide-grid funfo-review-grid"><article><span>審査が必要になる場合</span><h4>お客様がスマートフォンで注文時に支払う運用</h4><strong>オンライン決済のみ</strong><p>QRコードで注文し、Squareまたは現金で店頭会計する基本運用では、funfoオンライン決済の申請は不要です。</p></article><article><span>funfo公式の期間目安</span><h4>注文時決済（オンライン決済）</h4><strong>1〜2か月程度</strong><p>クレジットカード会社の審査状況による公式案内です。書類不備や追加確認がある場合は、さらに日数を要することがあります。</p></article><article><span>申込みから利用開始まで</span><h4>funfoアプリから申請・必要書類を提出</h4><strong>審査通過後に有効化</strong><p>審査状況は決済ブランド画面で確認し、結果は登録メールでも案内されます。利用可能になった決済方法を確認して運用を開始します。</p></article><article><span>Square店頭会計との違い</span><h4>契約・手数料・入金・売上管理が別</h4><strong>混在させずに選択</strong><p>Squareの対面決済審査とは別の手続きです。店舗の会計管理を確認し、必要な場合だけfunfoオンライン決済をご提案します。</p></article></div><p class="review-guide-note">申請条件、必要書類、対応決済、手数料、入金条件は変更される場合があります。申込み前にfunfo公式画面で最新条件を確認します。</p></div>`}
function funfoPaymentGuideHtml(context='service'){return `<section class="funfo-payment-guide ${context==='schedule'?'schedule-version':''}"><div class="funfo-payment-head"><div><span>RECOMMENDED OPERATION</span><h2>基本はfunfo FreeのQR注文＋Square店頭会計</h2></div><small>公式情報確認：2026年7月23日</small></div><div class="funfo-payment-grid"><article><span>基本提案</span><h3>QRで注文し、会計はレジで行う</h3><strong>まずは無料プランを活用</strong><p>funfoで注文を受け、会計はSquareの対面決済または現金で行います。funfoとSquareを連携すると支払いデータが共有され、注文から店頭会計までを管理しやすくなります。Squareで利用する決済ブランドの申込み・審査は別途必要です。</p></article><article><span>ご希望時のみ</span><h3>お客様のスマートフォンで支払う</h3><strong>funfoのオンライン決済を別途申請</strong><p>テーブルで注文から支払いまで完了させたい場合に選びます。Square店頭会計とは異なる運用になるため、手数料・入金・売上管理への反映方法を確認してからご提案します。申込みと審査が必要です。</p></article></div>${funfoReviewGuideHtml()}<p class="funfo-payment-note"><b>ご案内：</b>QRセルフオーダーだけでfunfoのオンライン決済申請が必須になるわけではありません。PCSAPOでは、会計情報を分散させにくい店頭会計を基本とし、スマホ決済は店舗からご要望がある場合に個別提案します。</p><div class="schedule-source-links"><a href="https://www.funfo.jp/index.php/tablecode/" target="_blank" rel="noopener">funfo テーブルコード</a><a href="https://www.funfo.jp/index.php/qa/" target="_blank" rel="noopener">審査期間の公式説明</a><a href="https://www.funfo.jp/index.php/86/" target="_blank" rel="noopener">オンライン決済の申込方法</a><a href="https://www.funfo.jp/index.php/square/" target="_blank" rel="noopener">Square連携</a></div></section>`}
function designServicePage(){return `${pageHead('SERVICE','制作・販促実行支援','Design & Promotion Support','制作物と、施設への設置に関する実作業を分けてご提案します。')}<section class="service-base-scope service-base-pair"><div><span class="eyebrow">DESIGN WORKS</span><h2>印刷物・制作物の基本作業</h2>${serviceBaseScopeHtml('design')}</div><div><span class="eyebrow">PROMOTION SUPPORT</span><h2>販促実行支援の基本作業</h2>${serviceBaseScopeHtml('other')}</div></section><div class="grid two">${catalogSection('制作物','work','メニュー・名刺・チラシ制作オプション')}${catalogSection('販促実行支援','promotion','販促実行支援オプション')}</div><section class="card notice"><h2>販促実行支援の条件</h2><p>最低受注額は10,000円です。交通費、駐車場、送料、印刷費、施設利用料は別途です。施設の許可なく設置は行いません。また、設置承諾、来店数、売上等の成果を保証するものではありません。広告枠販売や広告代理店業務は個別契約とします。</p></section>`}
function customerProgressPage(){const selected=SERVICE_ORDER.filter(id=>state.data.selectedServices[id]);return `${pageHead('STATUS','導入状況','Implementation Status','担当者と一緒に、対象サービスと現在の確認状況をご覧いただけます。')}<section class="card"><h2>対象サービス</h2><div class="status-service-list">${selected.length?selected.map(id=>`<span>${esc(SERVICE_DEFS[id].label)}</span>`).join(''):'<p class="muted">対象サービスはまだ設定されていません。</p>'}</div></section><section class="card"><h2>全体の進行</h2><div class="flow-inline">${['ヒアリング','正式見積','契約','制作・設定','テスト','引渡し','保守・更新'].map((x,i)=>`<span><b>${i+1}</b>${x}</span>`).join('')}</div><p class="muted">正式な見積書・契約書・引渡し書類はPCSAPOが作成し、印刷またはPDFでお渡しします。</p></section>`}
function manualsPage(){return `${pageHead('GUIDE','操作マニュアル','Operation Manuals','引渡し後に必要な基本操作と資料をご確認いただけます。')}<div class="grid three manual-grid">${card('STUDIO.Design 更新','<ol><li>STUDIO.Designへログイン</li><li>対象プロジェクトを開く</li><li>営業時間・文章・画像を変更</li><li>プレビュー後に公開</li></ol>','orange')}${card('Square 基本操作','<ol><li>POSレジへログイン</li><li>商品を選択して会計</li><li>支払方法を選択</li><li>レシートと売上を確認</li></ol>','blue')}${card('funfo 基本操作','<ol><li>店舗と営業状態を確認</li><li>メニューの表示・在庫を確認</li><li>注文状況を確認</li><li>営業終了後に集計を確認</li></ol>','green')}</div><section class="card material-card"><div class="material-head"><div><h2>Square・funfo 統合説明資料</h2><p class="muted">既存のPDF資料を閲覧・保存できます。</p></div><div class="section-actions"><a class="button primary" href="assets/docs/square-funfo-presentation.pdf" target="_blank" rel="noopener">開く</a><a class="button ghost" href="assets/docs/square-funfo-presentation.pdf" download>保存</a></div></div></section>`}
function resourceCard(item){
  const service=CONTENT_SERVICE_LABELS[item.service]||item.service;
  return `<article class="resource-card"><div><span>${esc(service)} / ${esc(item.category)}</span><h3>${esc(item.title)}</h3><p>${esc(item.description||'内容はリンク先でご確認ください。')}</p>${item.checkedAt?`<small>情報確認日：${esc(displayDate(item.checkedAt))}</small>`:''}</div>${item.url?`<a class="button ${item.kind==='officialLink'?'ghost':'primary'}" href="${esc(item.url)}" target="_blank" rel="noopener">${esc(item.buttonLabel)} ↗</a>`:'<span class="resource-unavailable">準備中</span>'}</article>`;
}
function customerResourcesPage(){
  const selected=new Set(SERVICE_ORDER.filter(id=>state.data.selectedServices[id]));
  const documents=contentMaster.filter(item=>item.active&&!item.archived&&item.customerVisible&&['commonDocument','caseDocument'].includes(item.kind)&&(item.kind!=='caseDocument'||item.caseId===state.data.id)&&(item.service==='common'||selected.has(item.service))).sort((a,b)=>a.sortOrder-b.sortOrder);
  const links=contentMaster.filter(item=>item.kind==='officialLink'&&item.active&&!item.archived&&item.customerVisible&&(item.service==='common'||selected.has(item.service))).sort((a,b)=>a.sortOrder-b.sortOrder);
  const groupedLinks=[...new Set(links.map(item=>item.service))];
  return `${pageHead('LIB','配布資料・公式リンク','Resources & Official Links','選択したサービスに関係する資料と、各社の最新公式ページをご案内します。')}
    <section class="resource-intro"><div><span>FOR CUSTOMER</span><h2>必要な資料だけをご確認いただけます</h2><p>PCSAPO作成資料は内容理解のための補助資料です。料金・登録条件・利用規約は、各社公式ページの最新情報を優先してください。</p></div><button class="button ghost" data-go="hearing">ヒアリングへ戻る</button></section>
    <section class="resource-section"><div class="resource-section-head"><div><span>DISTRIBUTION DOCUMENTS</span><h2>配布資料</h2></div><b>${documents.length}件</b></div><div class="resource-grid">${documents.length?documents.map(resourceCard).join(''):'<p class="resource-empty">現在公開中の資料はありません。</p>'}</div></section>
    <section class="resource-section"><div class="resource-section-head"><div><span>OFFICIAL INFORMATION</span><h2>各社公式リンク</h2></div><b>${links.length}件</b></div>${groupedLinks.length?groupedLinks.map(service=>`<div class="official-resource-group"><h3>${esc(CONTENT_SERVICE_LABELS[service]||service)}</h3><div class="resource-grid">${links.filter(item=>item.service===service).map(resourceCard).join('')}</div></div>`).join(''):'<p class="resource-empty">現在公開中の公式リンクはありません。</p>'}</section>
    <section class="card notice"><b>安全のため：</b>アカウントのパスワード、カード番号、本人確認書類、銀行口座情報はPCSAPOへ送信しないでください。お客様ご自身で各社公式画面へ入力してください。</section>`;
}
function contentMasterPage(){
  const categories=[...new Set(contentMaster.map(item=>item.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'ja'));
  const cases=allCases();
  const counts=Object.keys(CONTENT_KIND_LABELS).map(kind=>[CONTENT_KIND_LABELS[kind],contentMaster.filter(item=>item.kind===kind&&!item.archived).length]);
  const items=contentMaster.map((item,index)=>({item,index})).sort((a,b)=>a.item.archived-b.item.archived||a.item.sortOrder-b.item.sortOrder);
  return `${pageHead('CMS','資料・公式リンク管理','Content Library','共通資料、案件別資料、公式リンクを一つの管理画面で編集します。')}
    <section class="card content-master-intro"><div><span class="eyebrow">CONTENT MASTER</span><h2>お客様へ見せる情報を一元管理</h2><p>現在はこの端末のブラウザ内に保存されます。公開中のURLやアプリ内PDFパスを登録すると、同じ端末のお客様画面へ反映されます。</p></div><div class="section-actions"><button class="button ghost" id="exportContentMaster">設定を書き出す</button><label class="button ghost file-button">設定を読み込む<input id="importContentMaster" type="file" accept="application/json,.json" hidden></label><button class="button danger" id="resetContentMaster">初期状態へ戻す</button></div></section>
    <div class="master-summary">${counts.map(([label,count])=>`<div><span>${esc(label)}</span><b>${count}件</b></div>`).join('')}</div>
    <section class="card content-add-card"><h2>新しい資料・リンクを追加</h2><div class="content-add-grid">
      <div class="field"><label>種類</label><select id="contentKind">${Object.entries(CONTENT_KIND_LABELS).map(([value,label])=>`<option value="${value}">${label}</option>`).join('')}</select></div>
      <div class="field"><label>対象サービス</label><select id="contentService">${Object.entries(CONTENT_SERVICE_LABELS).map(([value,label])=>`<option value="${value}">${label}</option>`).join('')}</select></div>
      <div class="field"><label>カテゴリー</label><input id="contentCategory" list="contentCategoryList" value="共通案内"><datalist id="contentCategoryList">${categories.map(category=>`<option value="${esc(category)}">`).join('')}</datalist></div>
      <div class="field"><label>表示名</label><input id="contentTitle" placeholder="例：Square初期設定ガイド"></div>
      <div class="field wide"><label>PDF・公式ページURL</label><input id="contentUrl" placeholder="https://... または assets/docs/ファイル名.pdf"></div>
      <button class="button primary" id="addContentItem">追加</button>
    </div></section>
    <section class="card content-filter-card"><div class="content-filter-grid"><div class="field"><label>検索</label><input id="contentSearch" type="search" value="${esc(contentMasterFilters.query)}" placeholder="名称・カテゴリー・説明・URL"></div><div class="field"><label>種類</label><select id="contentKindFilter"><option value="all">すべて</option>${Object.entries(CONTENT_KIND_LABELS).map(([value,label])=>`<option value="${value}" ${contentMasterFilters.kind===value?'selected':''}>${label}</option>`).join('')}</select></div><div class="field"><label>カテゴリー</label><select id="contentCategoryFilter"><option value="all">すべて</option>${categories.map(category=>`<option value="${esc(category)}" ${contentMasterFilters.category===category?'selected':''}>${esc(category)}</option>`).join('')}</select></div><label class="choice compact-choice"><input id="showArchivedContent" type="checkbox" ${contentMasterFilters.showArchived?'checked':''}><span>アーカイブも表示</span></label></div><p id="contentFilterCount" class="muted"></p></section>
    <section class="content-master-list">${items.map(({item,index})=>`<article class="content-master-item ${item.archived?'archived':''}" data-content-item="${index}">
      <div class="content-item-head"><span class="content-kind">${esc(CONTENT_KIND_LABELS[item.kind])}</span><strong>${esc(item.title)}</strong><span>${item.archived?'アーカイブ':'使用中'}</span></div>
      <div class="content-item-grid">
        <div class="field"><label>種類</label><select data-content-field="kind" data-content-index="${index}">${Object.entries(CONTENT_KIND_LABELS).map(([value,label])=>`<option value="${value}" ${item.kind===value?'selected':''}>${label}</option>`).join('')}</select></div>
        <div class="field"><label>対象サービス</label><select data-content-field="service" data-content-index="${index}">${Object.entries(CONTENT_SERVICE_LABELS).map(([value,label])=>`<option value="${value}" ${item.service===value?'selected':''}>${label}</option>`).join('')}</select></div>
        <div class="field"><label>カテゴリー</label><input data-content-field="category" data-content-index="${index}" value="${esc(item.category)}" list="contentCategoryList"></div>
        <div class="field"><label>表示順</label><input data-content-field="sortOrder" data-content-index="${index}" inputmode="numeric" value="${item.sortOrder}"></div>
        <div class="field wide"><label>表示名</label><input data-content-field="title" data-content-index="${index}" value="${esc(item.title)}"></div>
        <div class="field wide"><label>説明</label><textarea data-content-field="description" data-content-index="${index}">${esc(item.description)}</textarea></div>
        <div class="field wide"><label>PDF・公式ページURL</label><input data-content-field="url" data-content-index="${index}" value="${esc(item.url)}"></div>
        <div class="field"><label>ボタン名</label><input data-content-field="buttonLabel" data-content-index="${index}" value="${esc(item.buttonLabel)}"></div>
        <div class="field"><label>情報確認日</label><input type="date" data-content-field="checkedAt" data-content-index="${index}" value="${esc(item.checkedAt)}"></div>
        <div class="field wide"><label>QR画像URL・アプリ内パス</label><input data-content-field="qrImage" data-content-index="${index}" value="${esc(item.qrImage)}" placeholder="assets/images/qr-xxx.png"></div>
        <div class="field"><label>案件</label><select data-content-field="caseId" data-content-index="${index}"><option value="">指定なし</option>${cases.map(caseItem=>`<option value="${esc(caseItem.id)}" ${item.caseId===caseItem.id?'selected':''}>${esc(caseItem.caseName)}</option>`).join('')}</select></div>
      </div>
      <div class="content-item-flags"><label><input type="checkbox" data-content-field="customerVisible" data-content-index="${index}" ${item.customerVisible?'checked':''}>お客様に表示</label><label><input type="checkbox" data-content-field="active" data-content-index="${index}" ${item.active?'checked':''}>有効</label><label><input type="checkbox" data-content-field="primary" data-content-index="${index}" ${item.primary?'checked':''}>主要リンク・QR</label></div>
      <div class="section-actions">${item.url?`<a class="button ghost" href="${esc(item.url)}" target="_blank" rel="noopener">表示確認</a>`:''}<button class="button ghost" data-toggle-content-archive="${index}">${item.archived?'復元':'アーカイブ'}</button><button class="button danger" data-delete-content="${index}">完全削除</button></div>
    </article>`).join('')}<p id="contentFilterEmpty" class="resource-empty" hidden>条件に一致する項目はありません。</p></section>
    <section class="card notice"><b>現在の制限：</b>この画面でPC内のPDFファイル自体を公開サーバーへアップロードすることはできません。GitHubへ追加済みのPDFパス、または公開済みURLを登録してください。クラウド受付導入後に、PDFアップロード機能へ切り替えられるデータ構造です。</section>`;
}

function studioPlanGuideHtml(){return `<section class="studio-plan-guide"><div class="studio-plan-head"><div><span>PUBLIC URL & CUSTOM DOMAIN</span><h2>STUDIO.Design 無料プランと有料プランの違い</h2></div><a href="https://studio.design/ja/pricing#personal" target="_blank" rel="noopener">公式料金を確認</a></div><p class="studio-plan-intro">PCSAPOでは、初期費用と月額費用を抑えたい場合に無料プランをご案内しています。独自ドメインが必要な場合は、ドメインを別途取得し、対応する有料プランへ接続します。</p><div class="studio-plan-grid"><article class="studio-free"><span>低コストで開始</span><h3>無料プラン</h3><strong>月額0円</strong><p>STUDIO.Designが提供する共通ドメインで公開します。</p><code>https://お客様指定名.studio.site/</code><small>「お客様指定名」は候補をお客様に決めていただきます。利用状況によって希望文字列を使えない場合があります。</small></article><article class="studio-paid"><span>独自URLで運用</span><h3>有料プラン</h3><strong>プラン料金＋ドメイン費用</strong><p>お客様が取得した独自ドメインを、対応する有料プランへ接続して公開します。</p><code>https://www.店舗名.com/</code><small>ドメイン取得・更新費とSTUDIO.Design利用料は、ホームページ制作費とは別に発生します。</small></article></div><div class="studio-domain-note"><b>重要：無料プランのURLは独自ドメインではありません。</b><p><code>studio.site</code>が付くURLはSTUDIO.Designの共通ドメインです。店舗専用の独自ドメインをご希望の場合は、有料プランとドメイン取得が必要です。</p></div></section>`}

const pages = {
entry(){return entryPage()},
dashboard(){const list=allCases(), contracts=list.filter(x=>x.contractDecision==='yes').length, support=list.filter(x=>x.subscription).length, quotes=list.filter(x=>x.quotes?.length).length;return `${pageHead('00','営業ダッシュボード','Sales Dashboard','案件・見積・契約・保守の状況を、ひと目で確認できます。')}<div class="grid four stats">${[['案件数',list.length,'orange'],['見積件数',quotes,'blue'],['契約件数',contracts,'orange'],['保守契約',support,'blue']].map(x=>`<div class="card"><span class="muted">${x[0]}</span><div class="metric ${x[2]}">${x[1]}<small> 件</small></div></div>`).join('')}</div><div class="grid two" style="margin-top:18px"><section class="card"><h2>案件サマリー / Summary</h2><div class="bar-chart">${[['案件',list.length,''],['見積',quotes,'blue'],['契約',contracts,''],['保守',support,'blue']].map(([l,v,c])=>`<div class="bar ${c}" style="--h:${Math.max(8,Math.min(100,v*15))}%"><b>${v}</b><span>${l}</span></div>`).join('')}</div></section>${card('クイックスタート / Quick Start','<p>案件テンプレートから始めると、対象サービス・ヒアリング・見積が最初から仕分けされた状態で作成できます。</p><div class="section-actions"><button class="button primary" data-go="templates">テンプレートから作成</button><button class="button ghost" data-go="pricing">見積を作成</button><button class="button ghost" data-go="priceMaster">料金を編集</button></div>','green')}</div>`},
templates(){return templatesPage()},
home(){return customerHomePage()},
position(){return positionPage()},
services(){return `${pageHead('02','サービス全体像','Service Overview','集客・注文・決済・販促・導入後の保守まで一括サポートします。')}<div class="grid two">${card('🌐 ホームページ制作 / Website','<p>STUDIO.Designの無料公開URLと、有料プランによる独自ドメイン公開を分けてご案内します。</p>')}${card('💳 Square決済 / Payment','<p>端末設定・商品登録・税率・レシート・決済テスト・操作説明まで実施します。</p>','blue')}${card('📱 funfoテーブル注文 / Mobile Order','<p>QR注文・メニュー登録・Square連携。Freeから運用を試し、必要時に拡張します。</p>')}${card('▤ メニュー・名刺 / Design Works','<p>印刷・QR誘導に使えるメニュー、名刺、販促物を制作します。</p>','blue')}${card('♻ 保守・定期点検 / Maintenance','<p>公開後の表示確認、情報更新、Square・funfo・QR動作点検、運用相談をプラン別に継続支援します。</p><div class="mini-plan-line"><span>ライト</span><span>スタンダード</span><span>プレミアム</span></div>','green')}</div>${card('提案の目的 / Proposal Goal','<ol><li>初期費用を抑えながら早く公開・運用開始</li><li>Squareで店頭決済を整理</li><li>funfoでQR注文から厨房・会計までつなげる</li><li>名刺・メニュー表まで店舗導線を統一</li><li>保守・定期点検で導入後の安心運用を支える</li></ol>','green')}`},
website(){return serviceDetailPage('ホームページ制作','STUDIO.Design ホームページ制作','Website Production','無料公開URLと独自ドメインの違いを確認し、店舗に必要な公開方法を選びます。',[['店舗サイト制作','スマートフォン対応の店舗案内を制作'],['メニュー・アクセス','商品、価格、営業時間、Google マップ導線'],['公開・更新支援','STUDIO.Design公開と引渡し後の更新方法']],studioPlanGuideHtml())},
square(){return serviceDetailPage('Square導入構築','Square 導入・EC構築','Square Setup & Online Store','店頭決済、商品登録、テイクアウト・オンライン販売を店舗運用に合わせて整えます。',[['店頭決済','端末設定、税率、レシート、テスト決済'],['レストランメニュー','カテゴリ・商品・画像・価格を登録'],['テイクアウト・EC','オンライン注文ページの初期構築']])},
funfo(){return serviceDetailPage('funfo構築','funfo セルフオーダー構築','funfo Mobile Order','Freeを最大限活用し、QR注文後はSquareまたは現金で店頭会計する運用を基本にご提案します。',[['QRセルフオーダー','お客様のスマートフォンから注文'],['基本は店頭会計','Square連携または現金で会計'],['必要な場合だけ拡張','スマホ決済、有料プラン、厨房印刷等を追加']],funfoPaymentGuideHtml())},
designService(){return designServicePage()},
customerProgress(){return customerProgressPage()},
manuals(){return manualsPage()},
resources(){return customerResourcesPage()},
pricing(){return quotePage()},
maintenanceQuote(){return maintenanceQuotePage()},
priceMaster(){return priceMasterPageV35()},
contentMaster(){return contentMasterPage()},
options(){return optionsPage()},
maintenance(){return maintenancePage()},
schedule(){const phases=[['お問い合わせ','ご相談内容、店舗の現状、希望する導入時期を確認します。','ご相談受付'],['ヒアリング','必要なサービス、店舗運用、機器、予算、希望内容を整理します。','要件の整理'],['見積・提案','基本作業、追加オプション、各社へ支払う料金を分けて提示します。','内容・費用の確認'],['契約','作業範囲、料金、支払条件、注意事項を双方で確認します。','ご契約・着手確認'],['資料受領','原稿、写真、メニュー、店舗情報、申請書類などを受領します。','必要資料の確認完了'],['制作・設定','確定した内容に基づき、制作、登録、機器・サービス設定を進めます。','制作物・設定の初稿'],['確認・テスト','表示、注文、決済、印刷など対象機能を確認し、必要な修正を行います。','お客様の最終確認'],['納品・運用開始','データ、URL、QRコード、操作案内等を引き渡し、利用を開始します。','引渡し・操作説明']];return `${pageHead('11・17','導入工程表','Implementation Schedule','記載期間は一般的な進行例です。納期や各社の審査完了日を保証するものではありません。')}<section class="schedule-caution"><div><span>IMPORTANT</span><b>すべての期間は目安です</b></div><p>必要資料が揃い、内容確認・修正・各社審査が滞りなく進んだ場合を想定しています。実際の開始日、日数の数え方、納品予定日は、案件ごとの見積書と工程確認時にご案内します。</p></section><div class="timeline schedule-overview">${phases.map((phase,i)=>`<div class="step"><b>${i+1}</b>${esc(phase[0])}</div>`).join('')}</div><section class="schedule-phase-section"><div class="schedule-section-head"><span>COMMON PROCESS</span><h2>共通の進行内容</h2><p>各段階で何を行い、何を確認したら次へ進むのかを示しています。</p></div><div class="schedule-phase-grid">${phases.map((phase,i)=>`<article><b>${String(i+1).padStart(2,'0')}</b><div><h3>${esc(phase[0])}</h3><p>${esc(phase[1])}</p><small>次へ進む目安：${esc(phase[2])}</small></div></article>`).join('')}</div></section><div class="schedule-service-list"><section class="schedule-service schedule-website"><div class="schedule-service-title"><div><span>WEBSITE</span><h2>ホームページ制作</h2></div><strong>制作目安：約2週間</strong></div><div class="schedule-detail-grid"><div><h3>開始の基準</h3><p>掲載原稿、店舗情報、写真、ロゴ、メニューなど、制作に必要な素材と掲載内容が確認できた後に開始します。</p></div><div><h3>主な作業</h3><p>基本2ページの構成、デザイン、スマートフォン表示、Google マップ、基本SEO、フォーム、公開設定を進めます。</p></div><div><h3>確認の流れ</h3><p>初稿をご確認いただき、合意した修正を反映します。お客様の確認・素材追加の待ち時間は制作目安に含まれない場合があります。</p></div><div><h3>期間が変わる例</h3><p>ページ追加、多言語、撮影、文章作成、独自ドメイン、有料プラン契約、大幅な再構成がある場合は別途日程を調整します。</p></div></div></section><section class="schedule-service schedule-square"><div class="schedule-service-title"><div><span>SQUARE</span><h2>Square導入・設定</h2></div><strong>設定作業目安：約10日</strong></div><div class="schedule-detail-grid"><div><h3>開始の基準</h3><p>事業者情報、本人確認書類、入金口座、メニュー、価格、税率、端末・ネットワーク環境が確認できた後に進めます。</p></div><div><h3>主な作業</h3><p>申請手続き補助、商品・カテゴリ登録、端末・レシート設定、テスト決済、基本操作のご案内を行います。</p></div><div><h3>PCSAPOの作業と審査は別です</h3><p>約10日は制作・登録・設定作業の目安です。決済サービスの審査は各提供会社が行い、PCSAPOが承認日や審査結果を確約するものではありません。</p></div><div><h3>機器・追加構築</h3><p>端末や周辺機器の納期、テイクアウトページ、EC、登録商品数の追加がある場合は、別途期間が必要です。</p></div></div><div class="review-estimates"><h3>決済審査期間の参考目安</h3><div><span><b>クレジットカード</b><strong>約1週間</strong></span><span><b>PayPay</b><strong>約2週間</strong></span><span><b>その他の決済</b><strong>約3〜4週間</strong></span></div><p>必要書類が揃い、申請内容に不備がない場合の参考です。決済方法、事業内容、追加確認、混雑状況等により前後します。</p></div></section><section class="schedule-service schedule-funfo"><div class="schedule-service-title"><div><span>FUNFO</span><h2>funfo導入・設定</h2></div><strong>構築目安：約10日</strong></div><div class="schedule-detail-grid"><div><h3>開始の基準</h3><p>店舗情報、メニュー、価格、カテゴリ、テーブル数、注文方法、iPad・Wi-Fi環境が確認できた後に開始します。</p></div><div><h3>主な作業</h3><p>店舗・メニュー登録、テーブル・QR設定、Square・iPad連携確認、注文テスト、基本操作のご案内を行います。</p></div><div><h3>運用内容の確認</h3><p>セルフオーダーのみ、スタッフのハンディ利用、厨房・レジ横印刷など、選択する運用により設定項目が変わります。</p></div><div><h3>期間が変わる例</h3><p>商品数の追加、写真・説明文の未確定、有料プラン契約、プリンター購入・接続、運用変更がある場合は別途日程を調整します。</p></div></div></section></div><section class="card schedule-final-note"><h2>全体期間について</h2><p>複数サービスは一部を並行して進められる場合がありますが、単純に各目安日数を足した期間になるとは限りません。反対に、資料待ち、内容変更、機器納期、各社審査、追加確認によって全体期間が延びる場合があります。正式な予定は、対象サービスと必要資料を確認した後に個別工程表で提示します。</p></section>`},
hearing(){return hearingPage()},
customerDocuments(){return customerDocumentPage()},
check(){return checklistPage()},
contract(){return contractPage()},
handover(){return handoverPage()},
faq(){const qs=[['無料プランで大丈夫ですか？','小規模店舗の初期公開には有効です。独自ドメインや高度な機能が必要な場合は有料プランを検討します。'],['Squareはすぐ使えますか？','一部カードは最短当日〜1-3営業日ですが、決済手段により審査期間が異なります。'],['funfoは無料で使えますか？','FreeでQR注文とカウンター会計を試せます。ハンディ注文や印刷が必要になった段階で拡張します。'],['更新は自分でできますか？','営業時間・価格・写真・お知らせ等は更新可能です。大幅なレイアウト変更は制作対応を推奨します。']];return `${pageHead('20','FAQ・サポート','FAQ & Support','商談時によくある質問を先回りして説明します。')}<div class="faq">${qs.map(([q,a])=>`<details><summary>Q. ${q}</summary><p>${a}</p></details>`).join('')}</div>${card('お問い合わせ / Contact','<p>LINE・メール・電話で受付。案件ごとに資料・写真・メニュー情報をまとめて管理します。</p>','green')}`},
print(){return printPage()},
materials(){return materialsPage()}
};

function materialsPage(){return `${pageHead('LIB','営業プレゼン資料','Presentation Library','Square・funfoの説明資料を、外出先からもすぐ閲覧できます。')}<section class="card material-card"><div class="material-head"><div><span class="eyebrow">SQUARE / FUNFO</span><h2>Square・funfo 統合プレゼン資料</h2><p class="muted">A4・2ページ / 営業説明用</p></div><div class="section-actions"><a class="button primary" href="assets/docs/square-funfo-presentation.pdf" target="_blank" rel="noopener">全画面で開く</a><a class="button ghost" href="assets/docs/square-funfo-presentation.pdf" download>PDFを保存</a></div></div><div class="pdf-frame-wrap"><object data="assets/docs/square-funfo-presentation.pdf#view=FitH" type="application/pdf" class="pdf-frame"><p>PDFをこの画面に表示できません。<a href="assets/docs/square-funfo-presentation.pdf" target="_blank" rel="noopener">こちらから開いてください。</a></p></object></div><p class="material-help">iPhone・iPadで埋め込み表示が小さい場合は「全画面で開く」をお使いください。</p></section>`}

function templatesPage(){return `${pageHead('TMP','案件テンプレート','Case Templates','案件の種類を先に選び、ヒアリング・チェック・見積を混在させずに開始します。')}<section class="card template-intro"><span class="eyebrow">RECOMMENDED START</span><h2>案件種別から新規作成</h2><p class="muted">選択したテンプレートに応じて、対象サービスと初期見積明細を自動設定します。現在の入力中案件は上書きされるため、必要に応じて先に保存してください。</p></section><div class="template-grid">${CASE_TEMPLATES.map(t=>{const total=t.quotes.reduce((sum,q)=>sum+q.qty*q.price,0);return `<article class="card template-card"><span class="service-chip">${esc(t.en)}</span><h2>${esc(t.label)}</h2><p>${esc(t.desc)}</p><div class="template-services">${SERVICE_ORDER.filter(id=>t.services[id]).map(id=>`<span>${esc(SERVICE_DEFS[id].label)}</span>`).join('')||'<span>保守・個別対応</span>'}</div><div class="template-price"><small>初期見積（税別）</small><b>${total?yen(total):'個別設定'}</b></div><button class="button primary" data-template="${esc(t.id)}">このテンプレートで開始</button></article>`}).join('')}</div><section class="card notice"><b>運用方法：</b>テンプレート作成後も、ヒアリング画面で対象サービスを追加・削除できます。料金は見積画面または料金マスターで調整してください。</section>`}

function applyCaseTemplate(id){
  const template=CASE_TEMPLATES.find(t=>t.id===id);
  if(!template)return;
  const next=defaultData();
  next.caseName=`${template.label} 案件`;
  next.selectedServices={...next.selectedServices,...template.services};
  next.quotes=template.quotes.map(q=>({...q}));
  next.maintenanceDecision=template.maintenanceDecision||next.maintenanceDecision;
  next.plan=template.plan||next.plan;
  next.subscription=next.maintenanceDecision==='contract';
  next.printMode=template.printMode||next.printMode;
  if(next.subscription){
    next.subscriptionPrice=MAINTENANCE_PLANS[next.plan]?.price||next.subscriptionPrice;
    setTimeout(()=>setMaintenanceQuote(true),0);
  }
  state.data=next;
  normalizeData(state.data);
  markDirty();
  toast(`${template.label}を作成しました`);
  navigate(next.subscription?'maintenance':'hearing');
}

function priceMasterPage(){const groups=[...new Set([...quoteCategories(),'販促実行支援'])],typeLabels={work:'PCSAPO作業料金',official:'公式料金・機器',promotion:'販促実行支援'};return `${pageHead('MST','料金マスター編集','Price Master','作業料金、公式料金、販促支援を分けて管理します。')}<section class="card master-toolbar"><div><span class="eyebrow">MASTER DATA</span><h2>3種類の料金を一元管理</h2><p class="muted">「お客様に表示」と「お客様に金額表示」は別々に切り替えられます。金額を隠しても管理者の見積単価は保持されます。</p></div><button class="button danger" id="resetPriceMaster">初期料金へ戻す</button></section><div class="master-summary">${Object.entries(typeLabels).map(([type,label])=>`<div><span>${label}</span><b>${priceMaster.filter(x=>x.type===type&&x.active).length}件</b></div>`).join('')}</div><section class="card master-add-card"><h2>新しい料金項目を追加</h2><div class="master-add-row extended"><div class="field"><label>種類</label><select id="masterType">${Object.entries(typeLabels).map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select></div><div class="field"><label>カテゴリ</label><select id="masterGroup">${groups.map(g=>`<option value="${esc(g)}">${esc(g)}</option>`).join('')}</select></div><div class="field"><label>項目名</label><input id="masterName" placeholder="例：メニュー翻訳追加"></div><div class="field"><label>単位</label><input id="masterUnit" value="式"></div><div class="field"><label>金額</label><input id="masterPrice" inputmode="numeric" data-numeric placeholder="0"></div><button class="button primary" id="addMasterItem">追加</button></div></section><section class="master-list">${Object.entries(typeLabels).map(([type,label])=>`<div class="master-type-section"><div class="master-type-head"><h2>${label}</h2><span>${type==='official'?'見積対象外・提供会社へ直接支払い':'見積へ追加可能'}</span></div>${priceMaster.map((item,i)=>({item,i})).filter(x=>x.item.type===type).map(({item,i})=>`<article class="master-item ${item.active?'':'inactive'}"><div class="master-item-main"><select data-master-field="group" data-master-index="${i}">${groups.map(g=>`<option value="${esc(g)}" ${item.group===g?'selected':''}>${esc(g)}</option>`).join('')}</select><input data-master-field="name" data-master-index="${i}" value="${esc(item.name)}" aria-label="項目名"><input inputmode="numeric" data-numeric data-master-field="price" data-master-index="${i}" value="${item.price}" aria-label="金額"><input data-master-field="unit" data-master-index="${i}" value="${esc(item.unit)}" aria-label="単位"><button class="icon-button" data-remove-master="${i}" aria-label="削除">×</button></div><div class="master-item-detail"><textarea data-master-field="description" data-master-index="${i}" aria-label="内容説明" placeholder="お客様向けの内容説明">${esc(item.description)}</textarea><input data-master-field="provider" data-master-index="${i}" value="${esc(item.provider)}" aria-label="契約先・支払先" placeholder="契約先・支払先"><input data-master-field="url" data-master-index="${i}" value="${esc(item.url)}" aria-label="公式URL" placeholder="公式URL"><input type="date" data-master-field="checkedAt" data-master-index="${i}" value="${esc(item.checkedAt)}" aria-label="料金確認日"></div><div class="master-flags"><label><input type="checkbox" data-master-field="customerVisible" data-master-index="${i}" ${item.customerVisible?'checked':''}>お客様に項目を表示</label><label><input type="checkbox" data-master-field="customerPriceVisible" data-master-index="${i}" ${item.customerPriceVisible?'checked':''}>お客様に金額表示</label><label><input type="checkbox" data-master-field="quoteEnabled" data-master-index="${i}" ${item.quoteEnabled?'checked':''} ${type==='official'?'disabled':''}>見積へ追加</label><label><input type="checkbox" data-master-field="active" data-master-index="${i}" ${item.active?'checked':''}>有効</label><select data-master-field="priceDisplay" data-master-index="${i}"><option value="from" ${item.priceDisplay==='from'?'selected':''}>〜表示</option><option value="fixed" ${item.priceDisplay==='fixed'?'selected':''}>固定表示</option><option value="reference" ${item.priceDisplay==='reference'?'selected':''}>参考価格</option><option value="estimate" ${item.priceDisplay==='estimate'?'selected':''}>別途見積</option></select></div></article>`).join('')}</div>`).join('')}</section><section class="card notice"><b>保存先：</b>料金マスターはこの端末のブラウザ内に保存されます。公式料金は料金確認日と公式URLを更新し、契約前に提供会社の最新情報を確認してください。</section>`}

function optionsPage(){const catalog=optionCatalog(),groups=[...new Set(catalog.map(x=>x.group))],added=state.data.quotes.map((q,i)=>({q,i})).filter(x=>x.q.source==='option');return `${pageHead('07-08','オプションサービス','Optional Services','必要な項目を選択すると、そのまま見積明細へ追加できます。')}<div class="option-toolbar"><div><b>オプションを選択</b><span>複数選択・数量変更ができます</span></div><div class="section-actions"><button class="button ghost" data-go="priceMaster">料金マスター編集</button><button class="button primary" id="addSelectedOptions">選択項目を見積に追加</button></div></div>${added.length?`<section class="card option-preview"><div class="option-preview-head"><div><span class="eyebrow">QUOTATION PREVIEW</span><h2>見積反映済みオプション</h2></div><b>${yen(added.reduce((sum,x)=>sum+x.q.qty*x.q.price,0))} <small>税別</small></b></div><div class="option-preview-list">${added.map(({q,i})=>`<div><span><b>${esc(q.name)}</b><small>${esc(q.category||'その他')} / ${q.qty}${esc(q.unit||'式')} × ${yen(q.price)}</small></span><strong>${yen(q.qty*q.price)}</strong><button class="icon-button" data-remove-option="${i}" aria-label="削除">×</button></div>`).join('')}</div><button class="button ghost" data-go="pricing">見積書を確認</button></section>`:''}<div class="grid two option-groups">${groups.map((group,g)=>card(`${group} / Options`,`<div class="option-list">${catalog.map((o,i)=>({o,i})).filter(x=>x.o.group===group).map(({o,i})=>`<label class="option-row"><input type="checkbox" data-option-check="${i}"><span class="option-main"><b>${esc(o.name)}</b><small>${yen(o.price)}〜 / ${esc(o.unit)}</small></span><span class="option-qty"><input aria-label="${esc(o.name)}の数量" inputmode="numeric" data-numeric data-option-qty="${i}" value="1"><small>${esc(o.unit)}</small></span></label>`).join('')}</div>`,g%2?'blue':'orange')).join('')}</div><section class="card custom-option-card"><div><span class="eyebrow">CUSTOM OPTION</span><h2>その他のオプションを追加</h2><p class="muted">一覧にない作業を自由に見積へ追加できます。</p></div><div class="custom-option-form"><div class="field"><label>項目名</label><input id="customOptionName" placeholder="例：現地スタッフ研修"></div><div class="field"><label>数量</label><input id="customOptionQty" inputmode="numeric" data-numeric value="1"></div><div class="field"><label>単価（税別）</label><input id="customOptionPrice" inputmode="numeric" data-numeric placeholder="0"></div><button class="button primary" id="addCustomOption">見積に追加</button></div></section><section class="card notice"><b>価格は税別の目安です。</b> 見積書へ追加後、数量・単価・項目名を調整できます。</section>`}

function addQuoteItem(name,qty,price,meta={}){const cleanName=String(name||'').trim(),amount=Math.max(1,Number(qty)||1),unitPrice=Math.max(0,Number(price)||0);if(!cleanName)return false;const category=meta.category||inferQuoteCategory(cleanName,meta.source);const existing=state.data.quotes.find(q=>meta.masterId?q.masterId===meta.masterId&&q.source===meta.source:q.name===cleanName&&Number(q.price)===unitPrice&&q.source===meta.source&&q.category===category);if(existing)existing.qty=Number(existing.qty)+amount;else state.data.quotes.push({name:cleanName,qty:amount,price:unitPrice,source:meta.source||'manual',category,unit:meta.unit||'式',description:meta.description||'',masterId:meta.masterId||''});markDirty();return true}
function masterItemByName(name,group=''){return optionCatalog().find(item=>item.name===name&&(!group||item.group===group))}
function hearingOptionLabel(item){return item.name==='funfo Free構築（既存見積参考）'?'セルフオーダー詳細構築':item.name}
function hearingQuote(item){return state.data.quotes.find(q=>q.source==='hearingOption'&&String(q.masterId)===String(item.id))}
function syncHearingOption(item,enabled,qty=1){
  if(!item)return;
  const index=state.data.quotes.findIndex(q=>q.source==='hearingOption'&&q.masterId===item.id);
  if(!enabled){if(index>=0)state.data.quotes.splice(index,1);markDirty();return}
  const row={name:hearingOptionLabel(item),qty:Math.max(1,Number(qty)||1),price:Number(item.price)||0,source:'hearingOption',category:item.group,unit:item.unit||'式',description:item.description||'',masterId:item.id};
  if(index>=0)state.data.quotes[index]={...state.data.quotes[index],...row};else state.data.quotes.push(row);
  markDirty();
}
function syncServiceBase(serviceId,enabled){
  const base=SERVICE_DEFS[serviceId]?.base;if(!base)return;
  const index=state.data.quotes.findIndex(q=>q.source==='service'&&q.name===base.name);
  if(enabled&&base.price>0&&index<0)state.data.quotes.push({...base,source:'service',unit:'式'});
  if(!enabled&&index>=0)state.data.quotes.splice(index,1);
  markDirty();
}
function applySelectedServicesToQuote(){SERVICE_ORDER.forEach(id=>{if(!state.data.selectedServices[id])return;const base=SERVICE_DEFS[id].base;if(!base)return;const exists=state.data.quotes.some(q=>q.category===base.category&&q.name===base.name);if(!exists)addQuoteItem(base.name,base.qty,base.price,{source:'service',category:base.category,unit:'式'})});state.data.updatedAt=new Date().toISOString();localStorage.setItem(UI_KEY,JSON.stringify(state.data));toast('選択サービスを見積へ反映しました');render()}
function setMaintenanceQuote(only=false){const p=MAINTENANCE_PLANS[state.data.plan]||MAINTENANCE_PLANS.standard,months=maintenanceMonths();state.data.maintenanceQuote={name:`保守・定期点検契約（${p.label}）`,qty:months,price:Number(state.data.subscriptionPrice)||p.price,source:'maintenance',category:'保守・定期点検',unit:'か月',description:p.tasks.join('、')};state.data.printMode=only?'maintenance':'combined';state.data.maintenanceDecision='contract';state.data.subscription=true;markDirty();localStorage.setItem(UI_KEY,JSON.stringify(state.data));navigate('maintenanceQuote')}

function serviceSelectorHtml(){return `<section class="card service-selector"><span class="eyebrow">SERVICE SCOPE</span><h2>今回の対象サービスを選択</h2><p class="muted">選択したサービスだけ、下のヒアリング・チェック・見積に表示されます。</p><div class="service-grid">${SERVICE_ORDER.map(id=>{const s=SERVICE_DEFS[id];return `<label class="service-tile accent-${s.accent}"><input type="checkbox" data-service="${id}" ${state.data.selectedServices[id]?'checked':''}><span><b>${esc(s.label)}</b><small>${esc(s.en)}</small><em>${esc(s.summary)}</em></span></label>`}).join('')}</div><div class="section-actions"><button class="button ghost" id="applyServiceQuotes">選択サービスを見積へ反映</button><button class="button primary" data-go="pricing">カテゴリ別見積を確認</button></div></section>`}
function serviceField(def,field){
  const [key,label,type='text',options=[]]=field;
  if(type==='textarea')return textArea(key,`${label} / ${def.en}`);
  if(type==='select'){const linked={squareTakeout:'オンラインテイクアウトページ',selfOrderBuild:'funfo Free構築（既存見積参考）'}[key];return `<div class="field"><label for="f-${key}">${label}</label><select id="f-${key}" data-field="${key}" ${linked?`data-linked-option="${esc(linked)}"`:''}>${options.map(o=>`<option value="${esc(o)}" ${state.data[key]===o?'selected':''}>${esc(o)}</option>`).join('')}</select></div>`}
  return input(key,label,type);
}
function scopeItemHtml(item){const parts=String(item).split('：');if(parts.length<2)return `<li><span>${esc(item)}</span></li>`;return `<li><b>${esc(parts.shift())}</b><span>${esc(parts.join('：'))}</span></li>`}
function serviceBaseScopeHtml(id){const scope=SERVICE_BASE_SCOPES[id];return `<div class="base-scope"><div class="base-scope-head"><span>基本作業 / INCLUDED</span><b>${esc(scope.title)}</b></div><h3>基本料金に含まれる作業</h3><ul>${scope.items.map(scopeItemHtml).join('')}</ul>${scope.optionNote?`<div class="scope-option-boundary"><b>基本料金に含まれない作業</b><p>${esc(scope.optionNote)}</p></div>`:''}<p class="scope-caution">${esc(scope.note)}</p></div>`}
function preparationGuideHtml(){return `<section class="preparation-guide"><div class="preparation-guide-head"><div><span>BEFORE WE START</span><h2>制作・申請を円滑に進めるため、事前にご用意ください</h2></div><p>画像・動画・原稿が揃い、使用できる品質であることを確認してから制作を開始します。</p></div><div class="data-delivery-priority"><div><span>推奨 1</span><b>USBメモリで元データをお預かり</b></div><div><span>推奨 2</span><b>Google Drive等で元データを共有</b></div><p>メールには添付容量の上限があり、LINE・SNSは送信方法によって画像や動画が圧縮されることがあります。メール・LINEを使う場合は、元の画質が保たれているか確認します。</p></div><div class="preparation-grid"><article><b>画像データ</b><p>スマートフォンやカメラで撮影した元画像をご用意ください。SNS・Webサイトから保存した画像、スクリーンショット、小さく圧縮された画像は、ホームページの大きな表示や印刷物に使えない場合があります。</p></article><article><b>動画データ</b><p>撮影時の元動画と、使用目的、縦・横、希望する長さをご用意ください。大容量データはUSBまたはクラウド共有を推奨します。編集・変換が必要な場合は別途見積します。</p></article><article><b>本人確認・申請書類</b><p>各サービスから指定された、有効期限内の書類をご用意ください。四隅が入り、文字が読め、反射・影・ピンぼけがない状態で提出します。必要な書類は契約形態や審査内容により異なります。</p></article><article><b>原稿・メニュー情報</b><p>店舗名、住所、営業時間、商品名、価格、税率、説明文など、公開してよい確定情報をご用意ください。未確定箇所がある場合は、その項目を明記してください。</p></article></div><div class="image-quality-guide"><div><span>元データを提供できる</span><b>基本制作内で配置・切り抜き・サイズを調整</b></div><div><span>補正すれば使用できる</span><b>画像補正・切り抜きオプションを選択</b></div><div><span>使用できる素材がない</span><b>簡易スマートフォン撮影または外部撮影を選択</b></div><div class="warning"><span>補正では直せない例</span><b>強いピンぼけ、極端な低解像度、欠けた部分</b><small>画質が不足する場合は、画像の差し替えまたは再撮影をお願いします。</small></div></div><p class="document-security-note">本人確認書類・口座情報・カード情報は、お客様ご自身で各社の公式画面へ入力します。PCSAPOは画像やログインパスワードをこのアプリへ保存しません。</p></section>`}
function servicePreparationHtml(id){const guide=CUSTOMER_PREPARATION[id];if(!guide)return '';return `<section class="service-preparation"><div><span>PLEASE PREPARE</span><h3>${esc(guide.title)}でご用意いただくもの</h3></div><ul>${guide.items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul></section>`}
function accountSetupGuideHtml(id,compact=false,interactive=false){
  const guide=ACCOUNT_SETUP_GUIDES[id];
  if(!guide)return '';
  const managedLinks=officialContent(id);
  const primary=managedLinks.find(item=>item.primary)||managedLinks[0];
  const officialLinks=managedLinks.map(item=>`<a href="${esc(item.url)}" target="_blank" rel="noopener">${esc(item.title)}</a>`).join('');
  const confirmation=interactive?`<fieldset class="account-confirmations"><legend>お客様確認チェック</legend>${guide.checks.map(([key,label])=>choice(key,label)).join('')}</fieldset>`:'<div class="account-confirmation-location"><b>確認チェックはヒアリング画面で行います</b><span>このページは登録手順のご案内です。実際の登録状況は「ヒアリング／概算見積」で確認します。</span></div>';
  return `<section class="account-setup-guide ${compact?'compact':''}"><div class="account-guide-status"><span>PCSAPO補助案内</span><small>公式情報確認日：${esc(displayDate(primary?.checkedAt||guide.checkedAt))}</small></div><div class="account-setup-head"><div><span>ACCOUNT & PRIVACY</span><h2>${esc(guide.title)}</h2><p>${esc(guide.service)}の契約者・支払者はお客様です。PCSAPOは共有されたパスワードではなく、招待された作業権限で設定します。</p></div>${primary?.url?`<a href="${esc(primary.url)}" target="_blank" rel="noopener">${esc(primary.buttonLabel||primary.title)}</a>`:''}</div><div class="account-setup-steps">${guide.steps.map(([no,title,desc])=>`<article><b>${esc(no)}</b><div><h3>${esc(title)}</h3><p>${esc(desc)}</p></div></article>`).join('')}</div>${officialLinks?`<div class="official-guide-links"><div><b>最新の公式手順</b><span>登録画面や料金・条件は変更される場合があります。</span></div><nav aria-label="${esc(guide.service)}公式手順">${officialLinks}</nav></div>`:''}<div class="privacy-protection-note"><b>プライバシー保護のため</b><p>${esc(guide.note)}</p></div>${confirmation}</section>`;
}
function subsidyGuidanceHtml(){return `<section class="subsidy-guidance"><div><span>PUBLIC INFORMATION</span><h2>補助金・支援制度の情報案内</h2><p>国・自治体の公開情報と公式相談窓口を無料でご案内します。申請可否の判断、申請書・事業計画書の作成、提出代行、採択保証は行いません。</p></div><label class="choice"><input type="checkbox" data-check="subsidy-guidance-requested" ${state.data.checks['subsidy-guidance-requested']?'checked':''}><span><b>案内を希望する</b><small>希望確認のみです。概算見積には加算されません。</small></span></label></section>`}
function hearingOptionsHtml(id){const names=HEARING_OPTION_NAMES[id]||[],group=SERVICE_DEFS[id]?.category||'',items=names.map(name=>masterItemByName(name,group)).filter(item=>item&&item.customerVisible);if(!items.length)return '';return `<div class="hearing-options"><div class="hearing-options-head"><div><span>追加オプション / OPTIONS</span><b>基本作業に含まれない追加対応です</b></div><small>選択内容を概算へ反映</small></div><div class="hearing-option-list">${items.map(item=>{const q=hearingQuote(item),checked=Boolean(q);return `<label class="hearing-option-row ${checked?'selected':''}"><input type="checkbox" data-hearing-option="${esc(item.id)}" ${checked?'checked':''}><span><b>${esc(hearingOptionLabel(item))}</b><small>${esc(item.description||'必要に応じて追加する作業です。')}</small></span><strong>${priceText(item,true)}</strong><input type="number" min="1" inputmode="numeric" aria-label="${esc(hearingOptionLabel(item))}の数量" data-hearing-qty="${esc(item.id)}" value="${q?.qty||1}"></label>`}).join('')}</div></div>`}
function commonHearingOptionsHtml(){return subsidyGuidanceHtml()}
function serviceHearingCards(){const selected=SERVICE_ORDER.filter(id=>state.data.selectedServices[id]);if(!selected.length)return card('サービス別ヒアリング / Service Sheets','<p>対象サービスを選択すると、サービス別のヒアリングシートが表示されます。</p>','green');return `<div class="service-section-grid hearing-service-grid">${selected.map(id=>{const s=SERVICE_DEFS[id];return `<section class="card service-sheet hearing-service-sheet accent-${s.accent}"><span class="service-chip">${esc(s.en)}</span><h2>${esc(s.label)}ヒアリング</h2><p class="muted">${esc(s.summary)}</p>${serviceBaseScopeHtml(id)}${accountSetupGuideHtml(id,true,true)}${servicePreparationHtml(id)}<div class="hearing-service-body"><div class="hearing-input-panel"><div class="panel-label"><span>YOUR INPUT</span><b>お客様入力欄</b><small>分かる範囲でご入力ください</small></div><div class="form-grid">${s.fields.map(field=>serviceField(s,field)).join('')}</div></div>${hearingOptionsHtml(id)}</div></section>`}).join('')}</div>`}
function quoteMasterItem(q){return q.masterId?priceMaster.find(item=>String(item.id)===String(q.masterId)):priceMaster.find(item=>item.name===q.name)}
function customerQuotePrice(q){const item=quoteMasterItem(q);if(item?.customerPriceVisible===false)return {visible:false,label:'金額は個別にご案内'};if(item?.priceDisplay==='estimate'||Number(q.price)===0)return {visible:false,label:'別途見積'};return {visible:true,label:yen((Number(q.qty)||0)*(Number(q.price)||0))}}
function customerEstimateSummaryHtml(){const rows=state.data.quotes.filter(q=>q.name&&(Number(q.price)>0||q.source==='hearingOption')),priced=rows.filter(q=>customerQuotePrice(q).visible),sub=priced.reduce((sum,q)=>sum+(Number(q.qty)||0)*(Number(q.price)||0),0),tax=Math.floor(sub*TAX),hasIndividual=rows.some(q=>!customerQuotePrice(q).visible);return `<section class="card hearing-estimate"><div class="hearing-estimate-head"><div><span class="eyebrow">ESTIMATE PREVIEW</span><h2>現在の概算見積</h2><p>基本サービスと、金額を表示しているオプションを自動集計しています。</p></div><b>${yen(sub+tax)}<small> 税込</small></b></div><div class="hearing-estimate-rows">${rows.length?rows.map(q=>{const shown=customerQuotePrice(q);return `<div><span><b>${esc(q.name)}</b><small>${esc(q.category||'その他')} / ${q.qty}${esc(q.unit||'式')}</small></span><strong class="${shown.visible?'':'individual-price'}">${shown.label}</strong></div>`}).join(''):'<p class="muted">サービスまたはオプションを選択してください。</p>'}</div><div class="hearing-estimate-total"><span>表示価格の税別合計 ${yen(sub)} ＋ 消費税 ${yen(tax)}</span><button class="button ghost" data-go="pricing">見積書で確認</button></div>${hasIndividual?'<p class="individual-estimate-note">「別途見積」「個別にご案内」の項目は、上記合計に含まれていません。</p>':''}<p class="estimate-caution">この金額はヒアリング時点の概算です。仕様・素材・機器・訪問範囲を確認後、正式な見積書を発行します。</p></section>`}
function selectedCustomerDocumentServices(){const selected=SERVICE_ORDER.filter(id=>state.data.selectedServices[id]);return state.data.customerDocScope!=='all'&&selected.includes(state.data.customerDocScope)?[state.data.customerDocScope]:selected}
function serviceHearingSummary(id){return SERVICE_DEFS[id].fields.map(([key,label,type='text',options=[]])=>{const stored=state.data[key],value=stored!==undefined&&stored!==''?stored:type==='select'?options[0]:'';return value?{label,value}:null}).filter(Boolean).slice(0,6)}
function serviceDocumentQuotes(id){const category=SERVICE_DEFS[id].category;return state.data.quotes.filter(q=>q.name&&(q.category||inferQuoteCategory(q.name,q.source))===category)}
function customerDocumentLauncherHtml(){const selected=SERVICE_ORDER.filter(id=>state.data.selectedServices[id]);return `<section class="card customer-document-launcher"><div><span class="eyebrow">PREVIEW & PDF</span><h2>選択内容の確認資料・概算見積</h2><p>サービス別の資料と概算見積、選択したサービス全体の合計見積を確認できます。</p></div><div class="customer-document-service-actions">${selected.map(id=>`<div><b>${esc(SERVICE_DEFS[id].label)}</b><span><button class="button ghost" data-customer-doc-scope="${id}" data-customer-doc-view="package">資料一式</button><button class="button ghost" data-customer-doc-scope="${id}" data-customer-doc-view="estimate">概算見積</button></span></div>`).join('')||'<p class="muted">対象サービスを選択してください。</p>'}</div><div class="section-actions"><button class="button primary" data-customer-doc-scope="all" data-customer-doc-view="package" ${selected.length?'':'disabled'}>選択項目をまとめて確認</button><button class="button ghost" data-customer-doc-scope="all" data-customer-doc-view="estimate" ${selected.length?'':'disabled'}>合計概算見積を確認</button><button class="button ghost" id="customerDraftSave">入力・見積内容を端末保存</button></div><small>概算見積は選択内容を自動集計します。正式見積書は仕様確認後にPCSAPOが発行します。</small></section>`}
function accountPrintSummary(id){const guide=ACCOUNT_SETUP_GUIDES[id];if(!guide)return `<section class="customer-print-account no-account"><div><span>ACCOUNT</span><h3>外部サービスのアカウント登録はありません</h3></div><p>仕様・素材・作業範囲を確認後、PCSAPOが制作または実施します。</p></section>`;const managedLinks=officialContent(id),primary=managedLinks.find(item=>item.primary)||managedLinks[0];return `<section class="customer-print-account"><div class="customer-print-section-head"><div><span>PCSAPO ACCOUNT GUIDE</span><h3>事前アカウント登録</h3><small>公式情報確認日：${esc(displayDate(primary?.checkedAt||guide.checkedAt))}</small></div>${primary?.url?`<div class="customer-print-official">${primary.qrImage?`<img src="${esc(primary.qrImage)}" alt="${esc(guide.service)}公式登録ページのQRコード">`:''}<span><a href="${esc(primary.url)}" target="_blank" rel="noopener">${esc(primary.buttonLabel||primary.title)}</a><small>${esc(primary.url)}</small></span></div>`:''}</div><div class="customer-print-account-steps">${guide.steps.map(([no,title,desc])=>`<div><b>${esc(no)}</b><span><strong>${esc(title)}</strong><small>${esc(desc)}</small></span></div>`).join('')}</div><p class="customer-print-privacy">${esc(guide.note)}</p><div class="customer-print-checks">${guide.checks.map(([key,label])=>`<span class="${state.data.checks[key]?'done':''}">${state.data.checks[key]?'✓':'□'} ${esc(label)}</span>`).join('')}</div><p class="customer-print-source-note">本資料はPCSAPOが登録前の確認事項をまとめた補助資料です。最新の登録手順・料金・利用条件は各社公式ページをご確認ください。</p></section>`}
function customerPreparationPrintSheet(id,index,total){const service=SERVICE_DEFS[id],prepare=CUSTOMER_PREPARATION[id],answers=serviceHearingSummary(id),flow=SERVICE_WORKFLOWS[id]||[];return `<section class="card print-sheet customer-preparation-print"><div class="print-doc-head"><span>${String(index).padStart(2,'0')}</span><div><small>CUSTOMER PREPARATION GUIDE ${index}/${total}</small><h2>${esc(service.label)} 事前確認資料</h2></div></div><div class="customer-print-meta"><span><b>店舗名</b>${esc(state.data.storeName||'未入力')}</span><span><b>作成日</b>${esc(state.data.date||'')}</span></div><section class="customer-print-preparation"><div class="customer-print-section-head"><div><span>PLEASE PREPARE</span><h3>事前にご用意いただくもの</h3></div><small>詳細説明はWeb画面で確認できます</small></div><ul>${prepare.items.slice(0,5).map(item=>`<li>${esc(item)}</li>`).join('')}</ul></section>${accountPrintSummary(id)}<section class="customer-print-flow"><div class="customer-print-section-head"><div><span>WORKFLOW</span><h3>制作・導入の流れ</h3></div></div><div>${flow.map((item,i)=>`<span><b>${i+1}</b>${esc(item)}</span>`).join('')}</div></section><section class="customer-print-hearing"><h3>ヒアリング内容の要約</h3><div>${answers.length?answers.map(item=>`<span><b>${esc(item.label)}</b>${esc(item.value)}</span>`).join(''):'<p>詳細条件は未入力です。</p>'}</div></section><p class="customer-print-note">本人確認・口座・カード情報は、お客様ご自身で各社公式画面へ入力します。ID・パスワードはPCSAPOへ共有しません。</p></section>`}
function customerEstimatePrintSheet(id,index,total){const service=SERVICE_DEFS[id],rows=serviceDocumentQuotes(id),priced=rows.filter(q=>customerQuotePrice(q).visible),sub=priced.reduce((sum,q)=>sum+(Number(q.qty)||0)*(Number(q.price)||0),0),tax=Math.floor(sub*TAX),hasIndividual=rows.some(q=>!customerQuotePrice(q).visible);return `<section class="card print-sheet customer-estimate-print"><div class="print-doc-head"><span>${String(index).padStart(2,'0')}</span><div><small>PRELIMINARY ESTIMATE ${index}/${total}</small><h2>${esc(service.label)} 概算見積書</h2></div></div>${quoteIssuer(state.data)}<div class="customer-estimate-scope"><b>対象サービス</b><span>${esc(service.label)}</span></div><div class="table-wrap"><table class="data-table"><thead><tr><th>項目</th><th>数量</th><th>単価</th><th>小計</th></tr></thead><tbody>${rows.length?rows.map(q=>{const shown=customerQuotePrice(q);return `<tr><td>${esc(q.name)}</td><td>${q.qty} ${esc(q.unit||'式')}</td><td>${shown.visible?yen(q.price):shown.label}</td><td>${shown.label}</td></tr>`}).join(''):'<tr><td colspan="4">選択された見積項目はありません。</td></tr>'}</tbody></table></div><div class="quote-totals"><div class="total-line"><span>表示価格の税別合計</span><b>${yen(sub)}</b></div><div class="total-line"><span>消費税（10%）</span><b>${yen(tax)}</b></div><div class="total-line grand"><span>概算合計</span><b>${yen(sub+tax)}</b></div></div>${hasIndividual?'<p class="individual-estimate-note">「別途見積」「個別にご案内」の項目は概算合計に含まれていません。</p>':''}<section class="card notice"><b>重要：</b>この資料はヒアリング時点の概算です。仕様、素材、機器、各社利用料、訪問範囲を確認後、PCSAPOが正式見積書を発行します。</section></section>`}
function combinedDocumentQuotes(targets){const categories=new Set(targets.map(id=>SERVICE_DEFS[id].category));return state.data.quotes.filter(q=>q.name&&categories.has(q.category||inferQuoteCategory(q.name,q.source)))}
function customerCombinedEstimatePrintSheet(targets,index,total){const rows=combinedDocumentQuotes(targets),priced=rows.filter(q=>customerQuotePrice(q).visible),sub=priced.reduce((sum,q)=>sum+(Number(q.qty)||0)*(Number(q.price)||0),0),tax=Math.floor(sub*TAX),hasIndividual=rows.some(q=>!customerQuotePrice(q).visible),labels=targets.map(id=>SERVICE_DEFS[id].label);return `<section class="card print-sheet customer-estimate-print customer-combined-estimate"><div class="print-doc-head"><span>${String(index).padStart(2,'0')}</span><div><small>COMBINED PRELIMINARY ESTIMATE ${index}/${total}</small><h2>選択サービス 合計概算見積書</h2></div></div>${quoteIssuer(state.data)}<div class="customer-estimate-scope"><b>対象サービス</b><span>${esc(labels.join('・'))}</span></div><div class="table-wrap"><table class="data-table"><thead><tr><th>区分</th><th>項目</th><th>数量</th><th>小計</th></tr></thead><tbody>${rows.length?rows.map(q=>{const shown=customerQuotePrice(q);return `<tr><td>${esc(q.category||'その他')}</td><td>${esc(q.name)}</td><td>${q.qty} ${esc(q.unit||'式')}</td><td>${shown.label}</td></tr>`}).join(''):'<tr><td colspan="4">選択された見積項目はありません。</td></tr>'}</tbody></table></div><div class="quote-totals"><div class="total-line"><span>表示価格の税別合計</span><b>${yen(sub)}</b></div><div class="total-line"><span>消費税（10%）</span><b>${yen(tax)}</b></div><div class="total-line grand"><span>合計概算</span><b>${yen(sub+tax)}</b></div></div>${hasIndividual?'<p class="individual-estimate-note">「別途見積」「個別にご案内」の項目は合計概算に含まれていません。</p>':''}<section class="card notice"><b>重要：</b>これは選択したサービスをまとめた概算です。各社の利用料・機器代などPCSAPO以外への支払いは、明細に記載がない限り含まれません。内容確認後に正式見積書を発行します。</section></section>`}
function customerDocumentSheets(targets){const docs=[];if(state.data.customerDocView==='estimate'){if(state.data.customerDocScope==='all')docs.push({type:'combined'});else docs.push({type:'estimate',id:targets[0]})}else{targets.forEach(id=>{docs.push({type:'preparation',id},{type:'estimate',id})});if(state.data.customerDocScope==='all'&&targets.length>1)docs.push({type:'combined'})}const total=docs.length;return docs.map((doc,i)=>doc.type==='preparation'?customerPreparationPrintSheet(doc.id,i+1,total):doc.type==='estimate'?customerEstimatePrintSheet(doc.id,i+1,total):customerCombinedEstimatePrintSheet(targets,i+1,total)).join('')}
function customerDocumentPage(){const selected=SERVICE_ORDER.filter(id=>state.data.selectedServices[id]),targets=selectedCustomerDocumentServices();if(!selected.length)return `${pageHead('PDF','確認資料・PDF','Customer Documents','ヒアリングで選択したサービスの確認資料を作成します。')}<section class="card empty-maintenance-quote"><h2>対象サービスが選択されていません</h2><p>ヒアリング画面で必要なサービスを選択してください。</p><button class="button primary" data-go="hearing">ヒアリングへ戻る</button></section>`;return `${pageHead('PDF','確認資料・概算PDF','Customer Documents','サービス別資料と、選択したサービスの合計概算を確認できます。')}<section class="card customer-document-controls no-print"><div><span class="eyebrow">DOCUMENT SCOPE</span><h2>プレビューする項目</h2><p>サービスと出力内容を選び、個別資料または合計概算を表示します。</p></div><div class="customer-document-tabs"><button class="button ${state.data.customerDocScope==='all'?'primary':'ghost'}" data-customer-doc-scope="all">選択項目すべて</button>${selected.map(id=>`<button class="button ${state.data.customerDocScope===id?'primary':'ghost'}" data-customer-doc-scope="${id}">${esc(SERVICE_DEFS[id].label)}</button>`).join('')}</div><div class="customer-document-view-tabs"><span>出力内容</span><button class="button ${state.data.customerDocView==='package'?'primary':'ghost'}" data-customer-doc-view="package">資料一式</button><button class="button ${state.data.customerDocView==='estimate'?'primary':'ghost'}" data-customer-doc-view="estimate">概算見積のみ</button></div><div class="section-actions"><button class="button primary" id="customerPrintButton">印刷プレビュー・PDF保存</button><button class="button ghost" id="customerDraftSave">入力・見積内容を端末保存</button><button class="button ghost" data-go="hearing">ヒアリングへ戻る</button></div><p class="storage-note">「印刷プレビュー・PDF保存」を押し、紙に印刷する場合はプリンターを、PDFの場合は保存先で「PDFとして保存」を選択してください。入力データは別端末へ自動同期されません。</p></section><div class="customer-document-preview">${customerDocumentSheets(targets)}</div>`}
function hearingPage(){const docs=[['doc-store','店舗名・住所・電話'],['doc-hours','営業時間・定休日'],['doc-photo','元サイズの店舗・商品画像'],['doc-video','掲載する動画の元データ'],['doc-logo','ロゴ・SNSリンク'],['doc-menu','確定したメニュー・価格・税率'],['doc-id','各社から指定された本人確認・事業者書類'],['doc-bank','決済サービスの入金口座'],['doc-ipad','iPad利用可否'],['doc-wifi','Wi-Fi環境']];return `${pageHead('12-14','ヒアリング／概算見積','Interview & Estimate','お客様ご自身で希望内容を入力し、追加オプションを含む概算をご確認いただく画面です。')}<section class="customer-input-guide"><div><span>FOR CUSTOMER</span><b>お客様入力用フォーム</b></div><p>分かる範囲で入力・選択してください。未定の項目は空欄のままで構いません。選択内容に応じて概算金額が自動更新されます。</p></section>${preparationGuideHtml()}<div class="grid two">${card('案件基本情報 / Case Information',`<div class="form-grid">${input('storeName','店舗名 / Store Name')}${input('company','運営会社 / Company')}${input('owner','代表者 / Owner')}${input('contact','担当者 / Contact')}${input('phone','電話 / Phone','tel')}${input('email','メール / Email','email')}${input('address','住所 / Address','text','wide')}${input('hours','営業時間 / Hours')}${input('closed','定休日 / Closed')}${textArea('notes','全体メモ / General Notes')}</div>`)}${card('入力の流れ / Workflow','<ol><li>対象サービスを選択</li><li>左側の希望条件を入力</li><li>右側の追加オプションを選択</li><li>自動計算された概算を確認</li></ol>','blue')}</div>${serviceSelectorHtml()}${serviceHearingCards()}${commonHearingOptionsHtml()}${customerEstimateSummaryHtml()}${customerDocumentLauncherHtml()}${maintenanceHearingHtml()}${card('事前準備チェック / Preparation Checklist',choices(docs),'green')}`}
function maintenanceHearingHtml(){const p=MAINTENANCE_PLANS[state.data.plan]||MAINTENANCE_PLANS.standard;return `<section class="card hearing-maintenance"><span class="eyebrow">AFTER SUPPORT</span><h2>保守・定期点検のご希望</h2><div class="grid two maintenance-hearing-choice"><label class="choice"><input type="radio" name="hearingMaintenance" data-field="maintenanceDecision" value="contract" ${state.data.maintenanceDecision==='contract'?'checked':''}><span><b>希望する</b><small>導入後の更新・点検・運用支援を契約する</small></span></label><label class="choice"><input type="radio" name="hearingMaintenance" data-field="maintenanceDecision" value="none" ${state.data.maintenanceDecision!=='contract'?'checked':''}><span><b>希望しない・後日検討</b><small>現時点では保守契約を申し込まない</small></span></label></div><div class="hearing-plan-select"><span>希望プラン</span>${Object.entries(MAINTENANCE_PLANS).map(([key,plan])=>`<label class="choice"><input type="radio" name="hearingPlan" data-field="plan" value="${key}" ${state.data.plan===key?'checked':''}><span><b>${esc(plan.label)}</b><small>${yen(plan.price)} / 月</small></span></label>`).join('')}</div><p class="selected-maintenance-note">現在の希望：<b>${state.data.maintenanceDecision==='contract'?`${esc(p.label)}プラン（${yen(p.price)}/月）`:'保守契約なし・後日検討'}</b></p></section>`}

function serviceChecklistCards(){const selected=SERVICE_ORDER.filter(id=>state.data.selectedServices[id]);if(!selected.length)return card('サービス別チェック / Service Checklist','<p>対象サービスを選択すると、作業チェックと記入欄が表示されます。</p>','green');return `<div class="service-section-grid">${selected.map(id=>{const s=SERVICE_DEFS[id];return `<section class="card service-sheet accent-${s.accent}"><span class="service-chip">${esc(s.en)}</span><h2>${esc(s.label)}チェックシート</h2><div class="check-grid">${s.checks.map((label,i)=>choice(`${id}-check-${i}`,label)).join('')}</div><div class="form-grid checklist-notes">${textArea(`${id}CheckNote`,`${s.label} 作業メモ / Work Notes`)}</div></section>`}).join('')}</div>`}
function checklistPage(){return `${pageHead('15-16','導入チェックシート','Implementation Checklist','共通確認とサービス別作業を分けて、進捗とメモを入力できます。')}<section class="card information-consent"><span class="eyebrow">BEFORE START</span><h2>お客様所有アカウント・個人情報の取扱い確認</h2><div class="account-owner-policy"><b>アカウントと契約はお客様が管理します</b><p>各サービスの登録、利用規約への同意、本人確認、銀行口座・カード情報の入力はお客様ご自身で行います。PCSAPOは、お客様から招待された編集者・スタッフ・管理アカウントの権限で作業します。</p></div><div class="form-grid" style="margin-top:14px">${input('workEmail','各サービスの登録に使用したお客様のメールアドレス / Account Email','email','wide')}</div><div class="privacy-statement"><h3>ID・パスワードを共有しない運用</h3><p>パスワード、カード番号、本人確認書類、銀行口座情報は、メール・LINE・SMS・このアプリへ入力または添付しないでください。招待機能が利用できない場合は、お客様立会いで必要な設定を行います。納品時にはPCSAPOの権限を削除または保守契約に必要な範囲へ変更します。</p></div>${choices([['consent-attachments','本人確認・口座・支払い情報は、お客様ご自身で各社の公式画面へ入力します'],['consent-account','PCSAPOへID・パスワードを渡さず、招待権限で作業することを確認しました'],['consent-privacy','納品時にPCSAPOの権限を削除または必要最小限へ変更することを確認しました']])}</section>${serviceSelectorHtml()}${serviceChecklistCards()}${card('審査・納品前テスト / Review & Handover',choices(REVIEW_ITEMS),'green')}`}

function maintenancePage(){const selected=MAINTENANCE_PLANS[state.data.plan]||MAINTENANCE_PLANS.standard,months=maintenanceMonths();return `${pageHead('09-10','保守・定期点検契約','Maintenance Agreement','プランごとの対応範囲を明確にし、開始時期と契約内容を管理します。')}<section class="card maintenance-decision"><h2>保守・定期点検契約の有無</h2><div class="grid two"><label class="choice"><input type="radio" name="maintenanceDecision" data-field="maintenanceDecision" value="contract" ${state.data.maintenanceDecision==='contract'?'checked':''}>保守・定期点検を契約する</label><label class="choice"><input type="radio" name="maintenanceDecision" data-field="maintenanceDecision" value="none" ${state.data.maintenanceDecision!=='contract'?'checked':''}>点検・保守契約無し</label></div></section><div class="grid three plan-comparison" style="margin-top:18px">${Object.entries(MAINTENANCE_PLANS).map(([key,p])=>`<label class="card plan-card"><input type="radio" name="plan" data-field="plan" value="${key}" ${state.data.plan===key?'checked':''}><span class="plan-tag">${esc(p.tagline)}</span><h2>${esc(p.label)}</h2><div class="plan-price">${yen(p.price)} / 月</div><ul>${p.tasks.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></label>`).join('')}</div><section class="card selected-plan-detail"><span class="eyebrow">SELECTED PLAN</span><h2>${esc(selected.label)}プランの作業項目</h2><div class="plan-task-grid">${selected.tasks.map((task,i)=>`<div><span>${String(i+1).padStart(2,'0')}</span><b>${esc(task)}</b></div>`).join('')}</div></section><section class="card" style="margin-top:18px"><h2>契約条件 / Agreement Terms</h2><div class="form-grid">${input('subscriptionStart','開始日','date')}${input('subscriptionTerm','契約期間')}${input('subscriptionPrice','月額料金','number')}${textArea('subscriptionDetails','個別の契約・点検内容')}</div></section><section class="card maintenance-quote-builder"><div><span class="eyebrow">MAINTENANCE QUOTATION</span><h2>保守・定期点検の見積を作成</h2><p>${esc(selected.label)}プラン・${months}か月　${yen(state.data.subscriptionPrice)} × ${months} = <b>${yen(state.data.subscriptionPrice*months)}</b>（税別）</p></div><div class="maintenance-quote-actions"><button class="button ghost" id="appendMaintenanceQuote">現在の見積へ追加</button><button class="button primary" id="createMaintenanceOnlyQuote">保守契約のみの見積を作成</button></div></section><div class="grid two" style="margin-top:18px">${signatureBlock('maintenanceClient','保守契約 お客様署名')}${signatureBlock('maintenanceProducer','保守契約 制作担当署名')}</div>`}
function maintenanceMonths(){const match=String(state.data.subscriptionTerm||'').match(/\d+/);return Math.max(1,Number(match?.[0])||12)}
function maintenanceQuotePage(){const q=state.data.maintenanceQuote,p=MAINTENANCE_PLANS[state.data.plan]||MAINTENANCE_PLANS.standard;if(!q)return `${pageHead('M-Q','保守・定期点検 見積書','Maintenance Quotation','通常の導入見積とは別に保守見積を保持します。')}<section class="card empty-maintenance-quote"><h2>保守見積はまだ作成されていません</h2><p>「保守・定期点検」画面でプラン・契約期間を選び、見積を作成してください。</p><button class="button primary" data-go="maintenance">保守プランを選択</button></section>`;const sub=q.qty*q.price,tax=Math.floor(sub*TAX);return `${pageHead('M-Q','保守・定期点検 見積書','Maintenance Quotation','導入見積とは独立して保存・印刷できます。')}<section class="card maintenance-quote-page"><div class="maintenance-only-banner">MAINTENANCE QUOTATION · 独立した保守見積</div><div class="maintenance-quote-title"><div><small>選択プラン</small><h2>${esc(p.label)}プラン</h2><p>${esc(p.tagline)}</p></div><div><small>契約期間合計（税別）</small><b>${yen(sub)}</b></div></div><div class="table-wrap"><table class="data-table"><thead><tr><th>項目</th><th>期間</th><th>月額</th><th>小計</th></tr></thead><tbody><tr><td>${esc(q.name)}</td><td>${q.qty}${esc(q.unit)}</td><td>${yen(q.price)}</td><td>${yen(sub)}</td></tr></tbody></table></div><div class="quote-totals"><div class="total-line"><span>小計</span><b>${yen(sub)}</b></div><div class="total-line"><span>消費税（10%）</span><b>${yen(tax)}</b></div><div class="total-line grand"><span>合計</span><b>${yen(sub+tax)}</b></div></div><div class="section-actions"><button class="button ghost" data-go="maintenance">条件を変更</button><button class="button primary" data-set-print-mode="combined">導入＋保守で印刷</button><button class="button ghost" data-set-print-mode="maintenance">保守のみ印刷</button></div></section>`}

function quoteCategorySummary(){const sums={};state.data.quotes.forEach(q=>{const cat=q.category||inferQuoteCategory(q.name,q.source);sums[cat]=(sums[cat]||0)+(Number(q.qty)||0)*(Number(q.price)||0)});return `<section class="category-summary">${quoteCategories().filter(cat=>sums[cat]).map(cat=>`<div><span>${esc(cat)}</span><b>${yen(sums[cat])}</b></div>`).join('') || '<p class="muted">見積明細を追加するとカテゴリ別小計が表示されます。</p>'}</section>`}
function quotePage(){const catalog=quoteCatalog(),optionCount=state.data.quotes.filter(q=>q.source==='option'||q.source==='hearingOption').length,maintenanceOnly=state.data.quoteMode==='maintenance';return `${pageHead('06',maintenanceOnly?'保守・定期点検 見積書':'カテゴリ別 見積書','Pricing & Quotation',maintenanceOnly?'既存のお客様向けの保守契約単独見積です。':'サービスごとに金額を仕分けし、混在しない見積を作成します。')}${serviceSelectorHtml()}${quoteCategorySummary()}<section class="card quote-card">${maintenanceOnly?'<div class="maintenance-only-banner">MAINTENANCE ONLY · 保守・定期点検契約のみ</div>':optionCount?`<div class="quote-summary-chip">オプション ${optionCount}項目を反映済み</div>`:''}<div class="quote-labels quote-labels-categorized"><span>項目</span><span>区分</span><span>数量</span><span>単価</span><span>小計</span></div><div id="quoteRows">${state.data.quotes.map((q,i)=>{q.category ||= inferQuoteCategory(q.name,q.source);const known=catalog.some(x=>x.name===q.name),special=q.source==='option'||q.source==='hearingOption'||q.source==='maintenance';return `<div class="quote-row quote-row-categorized ${q.source==='option'||q.source==='hearingOption'?'is-option':q.source==='maintenance'?'is-maintenance':''}"><div>${special?`<span class="quote-source">${q.source==='maintenance'?'MAINTENANCE':'OPTION'}</span><input class="custom-option" aria-label="見積項目名" data-custom-quote="${i}" value="${esc(q.name)}">`:`<select data-quote-select="${i}">${catalog.map(o=>`<option value="${esc(o.name)}" ${q.name===o.name?'selected':''}>${esc(o.name)}</option>`).join('')}<option value="__other" ${!known?'selected':''}>その他（自由入力）</option></select>${!known?`<input class="custom-option" aria-label="その他の項目名" data-custom-quote="${i}" value="${esc(q.name==='その他'?'':q.name)}" placeholder="項目名を入力">`:''}`}</div><select aria-label="見積区分" data-quote-category="${i}">${quoteCategories().map(cat=>`<option value="${esc(cat)}" ${q.category===cat?'selected':''}>${esc(cat)}</option>`).join('')}</select><input aria-label="数量" inputmode="numeric" data-numeric data-quote="qty" data-index="${i}" value="${q.qty}"><input aria-label="単価" inputmode="numeric" data-numeric data-quote="price" data-index="${i}" value="${q.price}"><b class="quote-subtotal">${yen(q.qty*q.price)}</b><button class="icon-button" data-remove-quote="${i}" aria-label="削除">×</button></div>`}).join('')}</div><button class="button ghost no-print" id="addQuote">＋ 明細を追加</button><div class="quote-totals">${totalsHtml()}</div></section><section class="card notice"><b>金額について：</b> 「〜」の料金は最低価格です。案件内容・商品数・機器構成・追加作業により調整できます。</section>`}
function totalsHtml(){const sub=state.data.quotes.reduce((a,q)=>a+(Number(q.qty)||0)*(Number(q.price)||0),0),tax=Math.floor(sub*TAX);return `<div class="total-line"><span>小計</span><b>${yen(sub)}</b></div><div class="total-line"><span>消費税（10%）</span><b>${yen(tax)}</b></div><div class="total-line grand"><span>合計</span><b>${yen(sub+tax)}</b></div>`}

function signatureBlock(key,title){const nameKey=`${key}SignerName`;return `<section class="card signature-card"><h2>${title}</h2>${input(nameKey,'記名 / Printed Name')}<p class="signature-hint">下の枠内に、指・Apple Pencil・マウスで署名してください。</p><canvas class="signature" data-signature="${key}" aria-label="${title}署名欄"></canvas><div class="signature-actions no-print"><button class="button ghost" data-clear-signature="${key}">クリア</button><button class="button primary" data-save-signature="${key}">署名を確定</button></div></section>`}
function contractedServices(d){return d.quotes.filter(q=>q.source!=='option')}
function contractedServicesHtml(d){const services=contractedServices(d),maintenance=d.maintenanceDecision==='contract',p=MAINTENANCE_PLANS[d.plan]||MAINTENANCE_PLANS.standard,items=services.map(q=>`<div><span class="service-check">✓</span><span><b>${esc(q.name)}</b><small>${q.qty} × ${yen(q.price)} / ${yen(q.qty*q.price)}</small></span></div>`);if(maintenance)items.push(`<div class="maintenance-contract-item"><span class="service-check">✓</span><span><b>保守・定期点検契約（${esc(p.label)}）</b><small>${yen(d.subscriptionPrice||p.price)} / 月 · ${esc(d.subscriptionTerm||'期間未定')}</small></span></div>`);return items.length?`<div class="service-contract-grid">${items.join('')}</div>`:'<p class="muted">契約対象サービスが未選択です。料金・見積書から追加してください。</p>'}
function maintenanceHandoverHtml(d){if(d.maintenanceDecision!=='contract')return '';return `<section class="card maintenance-handover active"><span class="eyebrow">AFTER SUPPORT</span><h2>保守・定期点検 / Maintenance</h2><div class="grid two"><p><b>契約プラン：</b>${esc(planLabel(d.plan))}<br><b>開始日：</b>${esc(d.subscriptionStart||'未定')}<br><b>契約期間：</b>${esc(d.subscriptionTerm||'未定')}</p><p><b>月額：</b>${yen(d.subscriptionPrice)}<br><b>実施内容：</b>${esc(d.subscriptionDetails||'契約内容に準ずる')}</p></div></section>`}
function planLabel(plan){return ({light:'ライト',standard:'スタンダード',premium:'プレミアム'})[plan]||plan||'未選択'}
function privacySummaryHtml(d){const c=d.checks||{};return `<section class="privacy-summary"><h3>お客様所有アカウント・個人情報の確認</h3><p class="payment-summary"><b>支払方法：</b>${paymentMethodLabel(d.paymentMethod)}</p><p><b>登録メール：</b>${esc(d.workEmail||'未入力')}</p><div class="consent-status"><span class="${c['consent-attachments']?'ok':''}">${c['consent-attachments']?'✓':'未確認'} 本人確認・支払情報はお客様が入力</span><span class="${c['consent-account']?'ok':''}">${c['consent-account']?'✓':'未確認'} ID・パスワードは共有しない</span><span class="${c['consent-privacy']?'ok':''}">${c['consent-privacy']?'✓':'未確認'} 納品時に権限を見直す</span></div><p class="privacy-note">PCSAPOは、お客様から招待された必要最小限の権限で作業します。パスワード、カード番号、本人確認書類、銀行口座情報はこのアプリへ保存しません。</p></section>`}
function paymentMethodLabel(value){return value==='credit'?'クレジットカード':'現金'}
function paymentChoicesHtml(){return `<div class="field payment-method-field"><span>支払方法 / Payment Method</span><div class="check-grid"><label class="choice"><input type="radio" name="paymentMethod" data-field="paymentMethod" value="cash" ${state.data.paymentMethod!=='credit'?'checked':''}><span><b>現金</b><small>Cash</small></span></label><label class="choice"><input type="radio" name="paymentMethod" data-field="paymentMethod" value="credit" ${state.data.paymentMethod==='credit'?'checked':''}><span><b>クレジットカード</b><small>Credit Card</small></span></label></div></div>`}
function contractPage(){return `${pageHead('22','ご契約書','Service Agreement','契約対象サービス、金額、支払方法、納期を明確に確認します。')}<section class="card contract-services"><h2>ご契約サービス / Contracted Services</h2>${contractedServicesHtml(state.data)}</section><div class="grid two" style="margin-top:18px">${card('契約基本情報 / Contract Information',`<div class="form-grid">${input('date','契約日','date')}${input('contractNo','契約番号')}${input('storeName','店舗名')}${input('contact','代表者・担当者')}${input('company','運営会社')}${input('email','メール','email')}${input('phone','電話','tel')}${input('address','住所','text','wide')}</div>`)}${card('契約・支払い / Agreement & Payment',`<div class="field"><span>契約意思</span><div class="check-grid">${[['yes','契約する'],['no','契約しない'],['consider','後日検討']].map(([v,l])=>`<label class="choice"><input type="radio" name="decision" data-field="contractDecision" value="${v}" ${state.data.contractDecision===v?'checked':''}>${l}</label>`).join('')}</div></div>${paymentChoicesHtml()}<p>契約金額（税込）</p><div class="metric orange">${yen(quoteGrandTotal())}</div>${input('desiredDate','納期予定','date')}`,'blue')}</div>${card('ご確認事項 / Notes','<p>制作内容は見積書・提案書に基づきます。ドメイン・サーバー・端末代・印刷代は別途となる場合があります。制作開始後の大幅な仕様変更は追加見積となる場合があります。外部サービスの仕様・審査期間は各提供会社の条件に準じます。</p>','green')}<section class="card">${privacySummaryHtml(state.data)}</section><div class="grid two">${signatureBlock('client','お客様署名 / Client Signature')}${signatureBlock('producer','制作担当署名 / Producer Signature')}</div>`}
function quoteGrandTotal(){const sub=state.data.quotes.reduce((a,q)=>a+q.qty*q.price,0);return sub+Math.floor(sub*TAX)}
function handoverPage(){return `${pageHead('19','引渡し確認書','Delivery Confirmation','納品内容と、引渡し後の保守開始内容を確認します。')}<div class="grid two">${card('納品内容 / Deliverables',choices([['hand-web','ホームページ公開'],['hand-square','Square設定完了'],['hand-funfo','funfo設定完了'],['hand-design','メニュー・名刺データ納品'],['hand-training','操作説明完了'],['hand-support','サポート開始']]))}${card('引渡し情報 / Handover Details',`<div class="form-grid">${input('handoverDate','引渡日','date')}${input('contact','店舗担当者')}${input('producer','制作担当者')}${textArea('handoverNotes','備考')}</div>`,'blue')}</div>${maintenanceHandoverHtml(state.data)}${signatureBlock('handover','引渡し署名 / Handover Signature')}`}
function printPage(){const d=state.data,mode=d.printMode||'implementation',hasMaintenance=d.maintenanceDecision==='contract',hasMaintenanceQuote=!!d.maintenanceQuote,controls=printModeControls(d);if(mode==='maintenance'&&hasMaintenanceQuote)return `${pageHead('PDF','PDF・印刷','A4 Document Output','保守・定期点検だけを依頼するお客様向けです。')}${controls}<div class="grid two no-print">${card('出力内容 / Output','<p>既存店・途中加入のお客様向けの全3ページです。</p><button class="button primary" id="printButton">PDF保存・印刷</button>')}${card('ページ構成 / Pages','<ol><li>保守サービス表紙</li><li>保守・定期点検 御見積書</li><li>保守・定期点検契約書</li></ol>','blue')}</div>${coverPrintSheet(d,true)}${maintenanceQuotePrintSheet(d,'02')}${maintenancePrintSheet(d,'03')}`;if(mode==='combined'&&hasMaintenanceQuote){const count=hasMaintenance?7:6;return `${pageHead('PDF','PDF・印刷','A4 Document Output','導入見積と保守見積の両方を出力します。')}${controls}<div class="grid two no-print">${card('出力内容 / Output',`<p>導入見積と保守見積を別ページで出力する全${count}ページです。</p><button class="button primary" id="printButton">PDF保存・印刷</button>`)}${card('ページ構成 / Pages',`<ol><li>導入パッケージ表紙</li><li>導入 御見積書</li><li>保守・定期点検 御見積書</li><li>ご契約書</li><li>導入チェックシート</li>${hasMaintenance?'<li>保守・定期点検契約書</li>':''}<li>引渡し確認書</li></ol>`,'blue')}</div>${coverPrintSheet(d,false)}${quotePrintSheet(d)}${maintenanceQuotePrintSheet(d,'03')}${contractPrintSheet(d,'04')}${checklistPrintSheet(d,'05')}${hasMaintenance?maintenancePrintSheet(d,'06'):''}${handoverPrintSheet(d,hasMaintenance?'07':'06')}`};const count=hasMaintenance?6:5;return `${pageHead('PDF','PDF・印刷','A4 Document Output','通常の導入見積・契約・チェック・引渡しを出力します。')}${controls}<div class="grid two no-print">${card('出力内容 / Output',`<p>通常導入用の全${count}ページです。</p><button class="button primary" id="printButton">PDF保存・印刷</button>`)}${card('ページ構成 / Pages',`<ol><li>導入パッケージ表紙</li><li>御見積書</li><li>ご契約書</li><li>導入チェックシート</li>${hasMaintenance?'<li>保守・定期点検契約書</li>':''}<li>引渡し確認書</li></ol>`,'blue')}</div>${coverPrintSheet(d,false)}${quotePrintSheet(d)}${contractPrintSheet(d,'03')}${checklistPrintSheet(d,'04')}${hasMaintenance?maintenancePrintSheet(d,'05'):''}${handoverPrintSheet(d,hasMaintenance?'06':'05')}`}
function printModeControls(d){return `<section class="card print-mode-controls no-print"><div class="print-mode-heading"><span class="eyebrow">PRINT SET</span><h2>印刷する帳票を選択</h2></div><div class="print-mode-buttons"><button class="button ${d.printMode==='implementation'?'primary':'ghost'}" data-set-print-mode="implementation">導入のみ</button><button class="button ${d.printMode==='combined'?'primary':'ghost'}" data-set-print-mode="combined" ${d.maintenanceQuote?'':'disabled'}>導入＋保守</button><button class="button ${d.printMode==='maintenance'?'primary':'ghost'}" data-set-print-mode="maintenance" ${d.maintenanceQuote?'':'disabled'}>保守のみ</button></div><fieldset class="stamp-choice"><legend>見積書の印鑑</legend><label><input type="radio" name="stampChoice" value="none" data-stamp-choice ${d.includeStamp?'':'checked'}><span>印鑑なし</span></label><label><input type="radio" name="stampChoice" value="stamp" data-stamp-choice ${d.includeStamp?'checked':''}><span>印鑑あり</span></label><small>「印鑑あり」を選ぶと、導入・保守の見積書にPCSAPO印を表示します。</small></fieldset></section>`}
function printSignature(d,key,label){const name=d[`${key}SignerName`]||'';return `<div class="print-signature"><b>${label}</b>${d.signatures[key]?`<img src="${d.signatures[key]}" alt="保存済み署名">`:'<div></div>'}<small>記名：${esc(name)}　日付：${esc(d.date||'')}</small></div>`}
function coverPrintSheet(d,maintenanceOnly=false){return `<section class="print-sheet cover-sheet clean-cover"><div class="cover-top"><span>PCSAPO マキシ企画</span><small>${maintenanceOnly?'MAINTENANCE SERVICE':'IMPLEMENTATION PACKAGE'} 2026</small></div><div class="cover-copy"><span class="cover-kicker">飲食店向け店舗DX</span><h2>${maintenanceOnly?'保守・定期点検<br>サービス':'店舗導入<br>パッケージ'}</h2><p>${maintenanceOnly?'Maintenance / Regular Check / Support':'Website / Square Payment / funfo Mobile Order'}</p></div><div class="cover-services">${maintenanceOnly?'<div><b>CHECK</b><span>定期的な表示・設定確認</span></div><div><b>UPDATE</b><span>店舗情報とメニューの更新</span></div><div><b>SUPPORT</b><span>運用相談と改善提案</span></div>':'<div><b>WEB</b><span>店舗情報をわかりやすく発信</span></div><div><b>PAYMENT</b><span>Squareで決済をシンプルに</span></div><div><b>ORDER</b><span>funfoで注文導線を効率化</span></div>'}</div><p class="cover-message">${maintenanceOnly?'導入後の安心運用と継続的な改善を、<br>店舗に合わせてサポート。':'集客・注文・決済・運用支援を、<br>店舗に合わせてひとつの流れに。'}</p><div class="cover-client"><small>PROPOSAL FOR</small><b>${esc(d.company||d.storeName||d.contact||'依頼者名未入力')} 御中</b><span>${esc(d.date||'')}</span></div></section>`}
function quoteIssuer(d){return `<div class="quote-party-row"><div><b>${esc(d.storeName||'　　　　　　　　　')} 御中</b><span>案件名：${esc(d.caseName)}</span></div><div class="quote-issuer ${d.includeStamp?'has-stamp':''}"><span>発行者</span><b>PCSAPO マキシ企画</b><small>発行日：${esc(d.date)}<br>契約番号：${esc(d.contractNo)}</small>${d.includeStamp?'<img class="quote-stamp" src="assets/images/pcsapo-stamp.png" alt="PCSAPO マキシ企画 印">':''}</div></div>`}
function quotePrintSheet(d){const maintenanceOnly=d.quoteMode==='maintenance';return `<section class="card print-sheet"><div class="print-doc-head"><span>02</span><div><small>${maintenanceOnly?'MAINTENANCE QUOTATION':'QUOTATION'}</small><h2>${maintenanceOnly?'保守・定期点検 御見積書':'御見積書'}</h2></div></div>${quoteIssuer(d)}<div class="table-wrap"><table class="data-table"><thead><tr><th>区分</th><th>項目</th><th>数量</th><th>単価</th><th>小計</th></tr></thead><tbody>${d.quotes.map(q=>`<tr class="${q.source==='option'?'print-option-row':q.source==='maintenance'?'print-maintenance-row':''}"><td>${esc(q.category||inferQuoteCategory(q.name,q.source))}</td><td>${q.source==='option'?'<small>OPTION</small> ':q.source==='maintenance'?'<small>MAINTENANCE</small> ':''}${esc(q.name)}</td><td>${q.qty}${q.unit?` ${esc(q.unit)}`:''}</td><td>${yen(q.price)}</td><td>${yen(q.qty*q.price)}</td></tr>`).join('')}</tbody></table></div><div class="quote-totals">${totalsHtml()}</div><section class="card notice"><b>備考：</b>${maintenanceOnly?'保守料金は月額×契約月数で算出しています。契約開始日・期間・作業範囲は保守契約書に基づきます。':'外部サービス利用料、機器代、印刷代等は別途となる場合があります。'}</section></section>`}
function maintenanceQuotePrintSheet(d,num='03'){const q=d.maintenanceQuote,p=MAINTENANCE_PLANS[d.plan]||MAINTENANCE_PLANS.standard;if(!q)return '';const sub=q.qty*q.price,tax=Math.floor(sub*TAX);return `<section class="card print-sheet"><div class="print-doc-head"><span>${num}</span><div><small>MAINTENANCE QUOTATION</small><h2>保守・定期点検 御見積書</h2></div></div>${quoteIssuer(d)}<div class="maintenance-status yes">${esc(p.label)}プラン · ${esc(p.tagline)}</div><div class="table-wrap"><table class="data-table"><thead><tr><th>項目</th><th>契約期間</th><th>月額</th><th>小計</th></tr></thead><tbody><tr class="print-maintenance-row"><td><small>MAINTENANCE</small> ${esc(q.name)}</td><td>${q.qty}${esc(q.unit)}</td><td>${yen(q.price)}</td><td>${yen(sub)}</td></tr></tbody></table></div><div class="quote-totals"><div class="total-line"><span>小計</span><b>${yen(sub)}</b></div><div class="total-line"><span>消費税（10%）</span><b>${yen(tax)}</b></div><div class="total-line grand"><span>合計</span><b>${yen(sub+tax)}</b></div></div><section class="card notice"><b>備考：</b>契約開始日・期間・点検内容は保守・定期点検契約書に基づきます。</section></section>`}
function contractPrintSheet(d,num='03'){return `<section class="card print-sheet contract-print-sheet"><div class="print-doc-head"><span>${num}</span><div><small>SERVICE AGREEMENT</small><h2>ご契約書</h2></div></div><section class="contract-print-services"><h3>ご契約サービス</h3>${contractedServicesHtml(d)}</section><div class="print-info-grid"><p><b>店舗名</b>${esc(d.storeName)}</p><p><b>契約日</b>${esc(d.date)}</p><p><b>運営会社</b>${esc(d.company)}</p><p><b>契約番号</b>${esc(d.contractNo)}</p><p><b>担当者</b>${esc(d.contact)}</p><p><b>納期予定</b>${esc(d.desiredDate)}</p></div><div class="contract-total"><span>ご契約金額（税込）</span><b>${yen(quoteGrandTotal())}</b></div>${privacySummaryHtml(d)}<section class="contract-notes"><h3>ご確認事項</h3><p>制作内容は本見積書および提案書に基づきます。ドメイン・サーバー・端末・印刷等は別途となる場合があります。大幅な仕様変更は追加見積となる場合があります。</p></section><div class="grid two contract-signatures">${printSignature(d,'client','お客様署名')}${printSignature(d,'producer','制作担当署名')}</div></section>`}
function checklistPrintSheet(d,num='04'){const c=d.checks||{},status=(key,label)=>`<div class="print-check ${c[key]?'done':''}"><span>${c[key]?'✓':'□'}</span><b>${esc(label)}</b></div>`;return `<section class="card print-sheet checklist-print-sheet"><div class="print-doc-head"><span>${num}</span><div><small>IMPLEMENTATION CHECKLIST</small><h2>導入チェックシート</h2></div></div><div class="checklist-meta"><span><b>店舗名</b>${esc(d.storeName||'')}</span><span><b>契約番号</b>${esc(d.contractNo||'')}</span><span><b>更新日</b>${esc((d.updatedAt||'').slice(0,10))}</span></div><section class="print-consent-block"><h3>作業開始前の確認</h3><p><b>お客様の登録メール：</b>${esc(d.workEmail||'')}</p><div>${status('consent-attachments','本人確認・口座・支払い情報はお客様が公式画面へ入力')}${status('consent-account','ID・パスワードを共有せず招待権限で作業')}${status('consent-privacy','納品時にPCSAPOの権限を見直す')}</div></section><section class="print-check-section"><h3>導入作業進捗</h3><div class="print-check-grid">${IMPLEMENTATION_ITEMS.map((label,i)=>status(`impl-${i}`,label)).join('')}</div></section><section class="print-check-section"><h3>審査・納品前テスト</h3><div class="print-check-grid review">${REVIEW_ITEMS.map(([key,label])=>status(key,label)).join('')}</div></section><div class="checklist-report"><span>お客様確認日：　　　　年　　月　　日</span><span>確認者署名：</span></div></section>`}
function maintenancePrintSheet(d,num='05'){const p=MAINTENANCE_PLANS[d.plan]||MAINTENANCE_PLANS.standard;return `<section class="card print-sheet maintenance-print-sheet"><div class="print-doc-head"><span>${num}</span><div><small>MAINTENANCE AGREEMENT</small><h2>保守・定期点検契約書</h2></div></div><div class="maintenance-status yes">保守・定期点検を契約する</div><div class="maintenance-plan-print"><div><small>PLAN</small><b>${esc(p.label)}</b></div><div><small>MONTHLY FEE</small><b>${yen(d.subscriptionPrice)}</b></div><div><small>START DATE</small><b>${esc(d.subscriptionStart||'未定')}</b></div><div><small>TERM</small><b>${esc(d.subscriptionTerm||'未定')}</b></div></div><section class="maintenance-task-print"><h3>${esc(p.label)}プラン 作業項目</h3>${p.tasks.map((task,i)=>`<div><span>${String(i+1).padStart(2,'0')}</span><b>${esc(task)}</b></div>`).join('')}</section>${d.subscriptionDetails?`<section class="card individual-terms"><h3>個別契約内容</h3><p>${esc(d.subscriptionDetails)}</p></section>`:''}<div class="grid two maintenance-signatures">${printSignature(d,'maintenanceClient','お客様署名')}${printSignature(d,'maintenanceProducer','制作担当署名')}</div></section>`}
function handoverPrintSheet(d,num='05'){return `<section class="card print-sheet"><div class="print-doc-head"><span>${num}</span><div><small>DELIVERY CONFIRMATION</small><h2>引渡し確認書</h2></div></div><p>引渡日：${esc(d.handoverDate||'')}　店舗担当者：${esc(d.contact)}　制作担当者：${esc(d.producer||'')}</p>${choices([['hand-web','ホームページ公開'],['hand-square','Square設定完了'],['hand-funfo','funfo設定完了'],['hand-design','制作データ納品'],['hand-training','操作説明完了'],['hand-support','サポート開始']])}${maintenanceHandoverHtml(d)}${printSignature(d,'handover','引渡し署名')}<p><b>備考：</b>${esc(d.handoverNotes||'')}</p></section>`}

function squareReviewGuideHtml(){return `<div class="square-review-guide"><div class="review-guide-head"><div><span>OFFICIAL REVIEW GUIDE</span><h3>Square公式情報に基づく審査の目安</h3></div><small>確認日：2026年7月23日</small></div><p class="pcsapo-review-estimate"><b>PCSAPOのご案内目安：</b>必要書類の確認案内、申請手順の確認、追加対応を含め、初期カードブランドが利用可能になるまで1週間〜10日程度の余裕を見てご案内します。これはSquare公式の審査日数ではありません。</p><div class="review-guide-grid"><article><span>初期カードブランド</span><h4>Visa・Mastercard・American Express・UnionPay（銀聯）</h4><strong>通常1〜3営業日</strong><p>必要情報を提出した後の公式目安です。最短当日の場合もありますが、追加確認等で延びることがあります。</p></article><article><span>別途カードブランド審査</span><h4>JCB・Diners Club・Discover</h4><strong>通常5〜15日</strong><p>株式会社ジェーシービーによる別の審査です。結果によっては利用できない場合があります。</p></article><article><span>QRコード決済</span><h4>PayPay・d払い・楽天ペイ・au PAY・メルペイ等</h4><strong>通常30日以内</strong><p>各QRコード決済事業者が審査します。事業者や追加情報の有無により処理時間が異なります。</p></article><article><span>電子マネー</span><h4>QUICPay・iD・交通系IC</h4><strong>ブランドごとに順次有効化</strong><p>別途申込みが必要です。完了日数はブランドごとに異なり、QUICPayはJCBの手続き完了後に審査されます。</p></article></div><div class="activation-flow"><span><b>1</b>初期カード審査</span><i>→</i><span><b>2</b>JCB系の別審査</span><i>→</i><span><b>3</b>電子マネーを順次有効化</span><em>QRコード決済は別途、各事業者が審査</em></div><p class="review-guide-note">必要書類がすべて揃い、申請内容に不備がない場合の参考です。審査中・要対応・審査遅延・非承認となる場合があり、すべてのブランドの利用開始日が同じになるとは限りません。</p><div class="schedule-source-links"><a href="https://squareup.com/jp/ja/payments/card-payments" target="_blank" rel="noopener">カード審査の公式説明</a><a href="https://squareup.com/help/jp/ja/article/6040-jp-only-jcb-limited-availability-irf-application" target="_blank" rel="noopener">JCB等の公式説明</a><a href="https://squareup.com/help/jp/ja/article/8370-apply-for-qr-code-payments" target="_blank" rel="noopener">QRコード決済の公式説明</a><a href="https://squareup.com/help/jp/ja/article/6711-apply-for-e-money" target="_blank" rel="noopener">電子マネーの公式説明</a></div></div>`}

function priceMasterItemHtml(item,index,groups){
  return `<article class="master-item ${item.active?'':'inactive'}" data-master-item="${index}">
    <div class="master-item-main">
      <select data-master-field="group" data-master-index="${index}">${groups.map(group=>`<option value="${esc(group)}" ${item.group===group?'selected':''}>${esc(group)}</option>`).join('')}</select>
      <input data-master-field="name" data-master-index="${index}" value="${esc(item.name)}" aria-label="項目名">
      <input inputmode="numeric" data-numeric data-master-field="price" data-master-index="${index}" value="${item.price}" aria-label="金額">
      <input data-master-field="unit" data-master-index="${index}" value="${esc(item.unit)}" aria-label="単位">
      <button class="icon-button" data-remove-master="${index}" aria-label="削除">×</button>
    </div>
    <div class="master-item-detail">
      <textarea data-master-field="description" data-master-index="${index}" aria-label="内容説明" placeholder="お客様向けの内容説明">${esc(item.description)}</textarea>
      <input data-master-field="provider" data-master-index="${index}" value="${esc(item.provider)}" aria-label="契約先・支払先" placeholder="契約先・支払先">
      <input data-master-field="url" data-master-index="${index}" value="${esc(item.url)}" aria-label="公式URL" placeholder="公式URL">
      <input type="date" data-master-field="checkedAt" data-master-index="${index}" value="${esc(item.checkedAt)}" aria-label="料金確認日">
    </div>
    <div class="master-flags">
      <label><input type="checkbox" data-master-field="customerVisible" data-master-index="${index}" ${item.customerVisible?'checked':''}>お客様に項目を表示</label>
      <label><input type="checkbox" data-master-field="customerPriceVisible" data-master-index="${index}" ${item.customerPriceVisible?'checked':''}>お客様に金額表示</label>
      <label><input type="checkbox" data-master-field="quoteEnabled" data-master-index="${index}" ${item.quoteEnabled?'checked':''} ${item.type==='official'?'disabled':''}>見積へ追加</label>
      <label><input type="checkbox" data-master-field="active" data-master-index="${index}" ${item.active?'checked':''}>有効</label>
      <select data-master-field="priceDisplay" data-master-index="${index}"><option value="from" ${item.priceDisplay==='from'?'selected':''}>〜表示</option><option value="fixed" ${item.priceDisplay==='fixed'?'selected':''}>固定表示</option><option value="reference" ${item.priceDisplay==='reference'?'selected':''}>参考価格</option><option value="estimate" ${item.priceDisplay==='estimate'?'selected':''}>別途見積</option></select>
    </div>
  </article>`;
}

function priceMasterPageV35(){
  const groups=[...new Set([...quoteCategories(),'販促実行支援'])];
  const typeLabels={work:'PCSAPO作業料金',official:'公式料金・機器',promotion:'販促実行支援'};
  return `${pageHead('MST','料金マスター編集','Price Master','検索とカテゴリー絞り込みを使って、必要な料金項目だけを編集できます。')}
    <section class="card master-toolbar"><div><span class="eyebrow">MASTER DATA</span><h2>3種類の料金を一元管理</h2><p class="muted">「お客様に表示」と「お客様に金額表示」は別々に切り替えられます。金額を隠しても管理者の見積単価は保持されます。</p></div><button class="button danger" id="resetPriceMaster">初期料金へ戻す</button></section>
    <div class="master-summary">${Object.entries(typeLabels).map(([type,label])=>`<div><span>${label}</span><b>${priceMaster.filter(item=>item.type===type&&item.active).length}件</b></div>`).join('')}</div>
    <section class="card master-filter-card" aria-label="料金マスターの絞り込み">
      <div class="master-filter-head"><div><span class="eyebrow">SEARCH & FILTER</span><h2>料金項目を絞り込む</h2></div><strong id="masterFilterCount">${priceMaster.length} / ${priceMaster.length}件表示</strong></div>
      <div class="master-filter-grid">
        <div class="field master-search-field"><label for="masterSearch">キーワード検索</label><input id="masterSearch" type="search" value="${esc(priceMasterFilters.query)}" placeholder="例：Square、画像、プリンター"></div>
        <div class="field"><label for="masterGroupFilter">カテゴリー</label><select id="masterGroupFilter"><option value="all">すべてのカテゴリー</option>${groups.map(group=>`<option value="${esc(group)}" ${priceMasterFilters.group===group?'selected':''}>${esc(group)}</option>`).join('')}</select></div>
        <div class="field"><label for="masterTypeFilter">料金種別</label><select id="masterTypeFilter"><option value="all">すべての料金種別</option>${Object.entries(typeLabels).map(([type,label])=>`<option value="${type}" ${priceMasterFilters.type===type?'selected':''}>${label}</option>`).join('')}</select></div>
        <button class="button ghost" id="clearMasterFilters" type="button">絞り込み解除</button>
      </div>
      <div class="master-filter-shortcuts"><span>すぐに表示：</span>${['ホームページ制作','Square導入構築','funfo構築','制作物'].map(group=>`<button type="button" data-master-quick-filter="${esc(group)}">${esc(group.replace('導入構築','').replace('構築',''))}</button>`).join('')}</div>
    </section>
    <section class="card master-add-card"><h2>新しい料金項目を追加</h2><div class="master-add-row extended"><div class="field"><label>種類</label><select id="masterType">${Object.entries(typeLabels).map(([value,label])=>`<option value="${value}">${label}</option>`).join('')}</select></div><div class="field"><label>カテゴリ</label><select id="masterGroup">${groups.map(group=>`<option value="${esc(group)}">${esc(group)}</option>`).join('')}</select></div><div class="field"><label>項目名</label><input id="masterName" placeholder="例：メニュー翻訳追加"></div><div class="field"><label>単位</label><input id="masterUnit" value="式"></div><div class="field"><label>金額</label><input id="masterPrice" inputmode="numeric" data-numeric placeholder="0"></div><button class="button primary" id="addMasterItem">追加</button></div></section>
    <section class="master-list">${Object.entries(typeLabels).map(([type,label])=>`<div class="master-type-section" data-master-type-section="${type}"><div class="master-type-head"><h2>${label}</h2><span>${type==='official'?'見積対象外・提供会社へ直接支払い':'見積へ追加可能'}</span></div>${priceMaster.map((item,index)=>({item,index})).filter(({item})=>item.type===type).map(({item,index})=>priceMasterItemHtml(item,index,groups)).join('')}</div>`).join('')}<div class="master-empty" id="masterFilterEmpty" hidden><b>該当する料金項目がありません</b><span>検索語または絞り込み条件を変更してください。</span></div></section>
    <section class="card notice"><b>保存先：</b>料金マスターはこの端末のブラウザ内に保存されます。公式料金は料金確認日と公式URLを更新し、契約前に提供会社の最新情報を確認してください。</section>`;
}

function applyPriceMasterFilters(){
  const query=priceMasterFilters.query.trim().toLocaleLowerCase('ja');
  let visibleCount=0;
  $$('[data-master-item]').forEach(element=>{
    const item=priceMaster[Number(element.dataset.masterItem)];
    if(!item)return;
    const haystack=[item.group,item.name,item.description,item.provider,item.unit].join(' ').toLocaleLowerCase('ja');
    const visible=(priceMasterFilters.group==='all'||item.group===priceMasterFilters.group)&&(priceMasterFilters.type==='all'||item.type===priceMasterFilters.type)&&(!query||haystack.includes(query));
    element.hidden=!visible;
    if(visible)visibleCount+=1;
  });
  $$('[data-master-type-section]').forEach(section=>{section.hidden=!section.querySelector('[data-master-item]:not([hidden])')});
  const count=$('#masterFilterCount');if(count)count.textContent=`${visibleCount} / ${priceMaster.length}件表示`;
  const empty=$('#masterFilterEmpty');if(empty)empty.hidden=visibleCount!==0;
}
function applyContentMasterFilters(){
  const query=contentMasterFilters.query.trim().toLocaleLowerCase('ja');
  let visibleCount=0;
  $$('[data-content-item]').forEach(element=>{
    const item=contentMaster[Number(element.dataset.contentItem)];
    if(!item)return;
    const haystack=[CONTENT_KIND_LABELS[item.kind],CONTENT_SERVICE_LABELS[item.service],item.category,item.title,item.description,item.url].join(' ').toLocaleLowerCase('ja');
    const visible=(contentMasterFilters.kind==='all'||item.kind===contentMasterFilters.kind)&&(contentMasterFilters.category==='all'||item.category===contentMasterFilters.category)&&(contentMasterFilters.showArchived||!item.archived)&&(!query||haystack.includes(query));
    element.hidden=!visible;
    if(visible)visibleCount+=1;
  });
  const count=$('#contentFilterCount');if(count)count.textContent=`${visibleCount} / ${contentMaster.length}件表示`;
  const empty=$('#contentFilterEmpty');if(empty)empty.hidden=visibleCount!==0;
}
function exportContentMaster(){
  const payload={app:'PCSAPO Sales App',type:'content-master',version:1,exportedAt:new Date().toISOString(),items:contentMaster};
  download(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),`pcsapo-資料リンク設定-${new Date().toISOString().slice(0,10)}.json`);
}
function importContentMasterFile(file){
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const payload=JSON.parse(reader.result),items=Array.isArray(payload)?payload:payload.items;
      if(!Array.isArray(items))throw new Error('invalid');
      contentMaster=items.map(normalizeContentItem);
      saveContentMaster();
      render();
      toast(`${contentMaster.length}件の資料・リンク設定を読み込みました`);
    }catch{
      alert('PCSAPOの資料・リンク設定JSONを選択してください。');
    }
  };
  reader.readAsText(file);
}

function render(){
  document.body.dataset.mode=state.mode;
  const entry=state.mode==='entry';
  $('#sidebar').hidden=entry;
  $('.topbar').hidden=entry;
  $('.case-title').hidden=state.mode!=='admin';
  $('#caseListButton').hidden=state.mode!=='admin';
  $('#shareButton').hidden=state.mode!=='admin';
  $('#saveButton').hidden=state.mode!=='admin';
  $('#newCase').hidden=state.mode!=='admin';
  $('#modeButton').textContent=state.mode==='admin'?'お客様画面':'HOME';
  if(!entry)buildNav();
  $('#caseName').value=state.data.caseName;
  $('#content').innerHTML=(pages[state.page]||pages.entry)();
  if(state.page==='schedule'){
    const oldGuide=$('.review-estimates'),holder=document.createElement('div');holder.innerHTML=squareReviewGuideHtml();
    const guide=holder.firstElementChild,flow=guide?.querySelector('.activation-flow');
    if(flow)flow.innerHTML='<span><b>A</b>初期カード審査</span><span><b>B</b>JCB系は別審査</span><span><b>C</b>QRは各事業者が別審査</span><em>電子マネー：iD・交通系ICは個別に有効化／QUICPayはJCB手続き完了後</em>';
    oldGuide?.replaceWith(guide);
    $('.schedule-funfo')?.insertAdjacentHTML('beforeend',funfoPaymentGuideHtml('schedule'));
  }
  bindPage();restoreSignatures();$('#content').focus({preventScroll:true})
}
function bindPage(){
  $$('[data-field]').forEach(el=>{const update=()=>{const k=el.dataset.field;state.data[k]=el.type==='checkbox'?el.checked:el.value;if(k==='caseName')$('#caseName').value=el.value;if(k==='maintenanceDecision'){state.data.subscription=el.value==='contract';markDirty();render();return}if(k==='plan'){state.data.subscriptionPrice=MAINTENANCE_PLANS[el.value]?.price||state.data.subscriptionPrice;markDirty();render();return}markDirty()};el.addEventListener('input',update);el.addEventListener('change',update)});
  $$('[data-service]').forEach(el=>el.addEventListener('change',()=>{state.data.selectedServices[el.dataset.service]=el.checked;syncServiceBase(el.dataset.service,el.checked);render()}));
  $$('[data-hearing-option]').forEach(el=>el.addEventListener('change',()=>{const item=priceMaster.find(x=>String(x.id)===el.dataset.hearingOption),qty=$(`[data-hearing-qty="${el.dataset.hearingOption}"]`)?.value||1;syncHearingOption(item,el.checked,qty);render()}));
  $$('[data-hearing-qty]').forEach(el=>el.addEventListener('change',()=>{const item=priceMaster.find(x=>String(x.id)===el.dataset.hearingQty),checked=$(`[data-hearing-option="${el.dataset.hearingQty}"]`)?.checked;if(checked){syncHearingOption(item,true,el.value);render()}}));
  $$('[data-linked-option]').forEach(el=>el.addEventListener('change',()=>{const item=masterItemByName(el.dataset.linkedOption);syncHearingOption(item,el.value.includes('希望する'),1);render()}));
  $$('[data-numeric]').forEach(el=>{el.addEventListener('input',()=>{const value=toHalfWidth(el.value);if(el.value!==value)el.value=value;if(el.dataset.field){state.data[el.dataset.field]=value;markDirty()}});el.addEventListener('blur',()=>{el.value=toHalfWidth(el.value)})});
  $$('[data-date-picker]').forEach(button=>button.onclick=()=>{const field=$(`#${button.dataset.datePicker}`);if(field.showPicker)field.showPicker();else field.focus()});
  $$('[data-check]').forEach(el=>el.addEventListener('change',()=>{state.data.checks[el.dataset.check]=el.checked;markDirty()}));
  $$('[data-go]').forEach(el=>el.onclick=()=>navigate(el.dataset.go));
  $$('[data-quote]').forEach(el=>el.addEventListener('change',()=>{const q=state.data.quotes[el.dataset.index];q[el.dataset.quote]=Number(toHalfWidth(el.value));markDirty();render()}));
  $$('[data-quote-select]').forEach(el=>el.addEventListener('change',()=>{const i=Number(el.dataset.quoteSelect),item=quoteCatalog().find(x=>x.name===el.value),q=state.data.quotes[i];q.name=el.value==='__other'?'その他':el.value;if(item){q.price=item.price;q.unit=item.unit||q.unit||'式';q.category=item.category||inferQuoteCategory(q.name,q.source)}else q.category=inferQuoteCategory(q.name,q.source);markDirty();render()}));
  $$('[data-quote-category]').forEach(el=>el.addEventListener('change',()=>{state.data.quotes[Number(el.dataset.quoteCategory)].category=el.value;markDirty();render()}));
  $$('[data-custom-quote]').forEach(el=>el.addEventListener('input',()=>{state.data.quotes[Number(el.dataset.customQuote)].name=el.value||'その他';markDirty()}));
  $$('[data-remove-quote]').forEach(el=>el.onclick=()=>{state.data.quotes.splice(Number(el.dataset.removeQuote),1);markDirty();render()});
  $('#addQuote')?.addEventListener('click',()=>{state.data.quotes.push({name:'その他',qty:1,price:0});markDirty();render()});
  $('#applyServiceQuotes')?.addEventListener('click',applySelectedServicesToQuote);
  $$('[data-option-qty]').forEach(el=>el.addEventListener('click',e=>e.stopPropagation()));
  $('#addSelectedOptions')?.addEventListener('click',()=>{const selected=$$('[data-option-check]:checked'),catalog=optionCatalog();if(!selected.length){toast('追加するオプションを選択してください');return}selected.forEach(box=>{const i=Number(box.dataset.optionCheck),item=catalog[i],qty=toHalfWidth($(`[data-option-qty="${i}"]`).value);addQuoteItem(item.name,qty,item.price,{source:'option',category:item.group,unit:item.unit})});state.data.updatedAt=new Date().toISOString();localStorage.setItem(UI_KEY,JSON.stringify(state.data));toast(`${selected.length}件を見積に反映しました`);render()});
  $('#addCustomOption')?.addEventListener('click',()=>{const name=$('#customOptionName').value,qty=toHalfWidth($('#customOptionQty').value),price=toHalfWidth($('#customOptionPrice').value);if(!name.trim()){toast('オプション名を入力してください');$('#customOptionName').focus();return}if(!price){toast('単価を入力してください');$('#customOptionPrice').focus();return}addQuoteItem(name,qty,price,{source:'option',category:'その他',unit:'式'});state.data.updatedAt=new Date().toISOString();localStorage.setItem(UI_KEY,JSON.stringify(state.data));toast('その他オプションを見積に反映しました');render()});
  $$('[data-remove-option]').forEach(el=>el.onclick=()=>{state.data.quotes.splice(Number(el.dataset.removeOption),1);markDirty();render()});
  $('#appendMaintenanceQuote')?.addEventListener('click',()=>{setMaintenanceQuote(false);toast('導入見積を残したまま保守見積を作成しました')});
  $('#createMaintenanceOnlyQuote')?.addEventListener('click',()=>{setMaintenanceQuote(true);toast('保守のみを印刷対象に設定しました')});
  $$('[data-set-print-mode]').forEach(el=>el.onclick=()=>{state.data.printMode=el.dataset.setPrintMode;markDirty();navigate('print')});
  $$('[data-stamp-choice]').forEach(el=>el.addEventListener('change',()=>{state.data.includeStamp=el.value==='stamp';markDirty();render()}));
  $$('[data-template]').forEach(el=>el.onclick=()=>{if(!state.dirty||confirm('現在の入力内容を新しいテンプレート案件に切り替えますか？未保存の場合は先に保存してください。'))applyCaseTemplate(el.dataset.template)});
  $$('[data-master-field]').forEach(el=>el.addEventListener('change',()=>{const item=priceMaster[Number(el.dataset.masterIndex)];if(!item)return;const field=el.dataset.masterField;item[field]=el.type==='checkbox'?el.checked:field==='price'?Math.max(0,Number(toHalfWidth(el.value))||0):el.value;if(item.type==='official')item.quoteEnabled=false;savePriceMaster();toast('料金マスターを保存しました')}));
  $$('[data-remove-master]').forEach(el=>el.onclick=()=>{const i=Number(el.dataset.removeMaster);if(confirm('この料金項目を削除しますか？')){priceMaster.splice(i,1);savePriceMaster();render();toast('料金項目を削除しました')}});
  $('#addMasterItem')?.addEventListener('click',()=>{const name=$('#masterName').value.trim(),price=Number(toHalfWidth($('#masterPrice').value))||0,unit=$('#masterUnit').value.trim()||'式',group=$('#masterGroup').value||'その他',type=$('#masterType').value||'work';if(!name){toast('項目名を入力してください');$('#masterName').focus();return}priceMaster.push(normalizeMasterItem({id:crypto.randomUUID?.()||`pm-${Date.now()}`,type,group,name,price,unit,provider:type==='official'?'':'PCSAPO マキシ企画',quoteEnabled:type!=='official'}));savePriceMaster();render();toast('料金項目を追加しました')});
  $('#resetPriceMaster')?.addEventListener('click',()=>{if(confirm('料金マスターを初期状態へ戻しますか？編集内容は元に戻せません。')){priceMaster=defaultPriceMaster();savePriceMaster();render();toast('料金マスターを初期状態へ戻しました')}});
  $('#masterSearch')?.addEventListener('input',event=>{priceMasterFilters.query=event.target.value;applyPriceMasterFilters()});
  $('#masterGroupFilter')?.addEventListener('change',event=>{priceMasterFilters.group=event.target.value;applyPriceMasterFilters()});
  $('#masterTypeFilter')?.addEventListener('change',event=>{priceMasterFilters.type=event.target.value;applyPriceMasterFilters()});
  $$('[data-master-quick-filter]').forEach(button=>button.addEventListener('click',()=>{priceMasterFilters.group=button.dataset.masterQuickFilter;priceMasterFilters.query='';const search=$('#masterSearch'),group=$('#masterGroupFilter');if(search)search.value='';if(group)group.value=priceMasterFilters.group;applyPriceMasterFilters()}));
  $('#clearMasterFilters')?.addEventListener('click',()=>{priceMasterFilters={query:'',group:'all',type:'all'};const search=$('#masterSearch'),group=$('#masterGroupFilter'),type=$('#masterTypeFilter');if(search)search.value='';if(group)group.value='all';if(type)type.value='all';applyPriceMasterFilters()});
  if(state.page==='priceMaster')applyPriceMasterFilters();
  $$('[data-content-field]').forEach(element=>element.addEventListener('change',()=>{
    const item=contentMaster[Number(element.dataset.contentIndex)];
    if(!item)return;
    const field=element.dataset.contentField;
    item[field]=element.type==='checkbox'?element.checked:field==='sortOrder'?Number(toHalfWidth(element.value))||0:element.value;
    item.updatedAt=new Date().toISOString();
    if(field==='primary'&&item.primary){
      contentMaster.forEach(other=>{if(other.id!==item.id&&other.kind==='officialLink'&&other.service===item.service)other.primary=false});
    }
    saveContentMaster();
    if(['kind','service','category','primary'].includes(field)){
      render();
      toast('資料・リンク設定を保存しました');
      return;
    }
    toast('資料・リンク設定を保存しました');
  }));
  $('#addContentItem')?.addEventListener('click',()=>{
    const title=$('#contentTitle').value.trim(),url=$('#contentUrl').value.trim();
    if(!title){toast('表示名を入力してください');$('#contentTitle').focus();return}
    const kind=$('#contentKind').value;
    contentMaster.push(normalizeContentItem({
      kind,
      service:$('#contentService').value,
      category:$('#contentCategory').value,
      title,
      url,
      buttonLabel:kind==='officialLink'?'公式ページを開く':'資料を開く',
      sortOrder:contentMaster.length?Math.max(...contentMaster.map(item=>item.sortOrder))+10:10
    }));
    saveContentMaster();
    render();
    toast('資料・リンクを追加しました');
  });
  $$('[data-toggle-content-archive]').forEach(button=>button.addEventListener('click',()=>{
    const item=contentMaster[Number(button.dataset.toggleContentArchive)];
    if(!item)return;
    item.archived=!item.archived;
    item.updatedAt=new Date().toISOString();
    saveContentMaster();
    render();
    toast(item.archived?'アーカイブしました':'復元しました');
  }));
  $$('[data-delete-content]').forEach(button=>button.addEventListener('click',()=>{
    const index=Number(button.dataset.deleteContent),item=contentMaster[index];
    if(item&&confirm(`「${item.title}」を完全に削除しますか？この操作は元に戻せません。`)){
      contentMaster.splice(index,1);
      saveContentMaster();
      render();
      toast('完全に削除しました');
    }
  }));
  $('#resetContentMaster')?.addEventListener('click',()=>{if(confirm('資料・公式リンク管理を初期状態へ戻しますか？編集内容は元に戻せません。')){contentMaster=defaultContentMaster();saveContentMaster();render();toast('初期状態へ戻しました')}});
  $('#exportContentMaster')?.addEventListener('click',exportContentMaster);
  $('#importContentMaster')?.addEventListener('change',event=>event.target.files[0]&&importContentMasterFile(event.target.files[0]));
  $('#contentSearch')?.addEventListener('input',event=>{contentMasterFilters.query=event.target.value;applyContentMasterFilters()});
  $('#contentKindFilter')?.addEventListener('change',event=>{contentMasterFilters.kind=event.target.value;applyContentMasterFilters()});
  $('#contentCategoryFilter')?.addEventListener('change',event=>{contentMasterFilters.category=event.target.value;applyContentMasterFilters()});
  $('#showArchivedContent')?.addEventListener('change',event=>{contentMasterFilters.showArchived=event.target.checked;applyContentMasterFilters()});
  if(state.page==='contentMaster')applyContentMasterFilters();
  $$('[data-customer-doc-scope],[data-customer-doc-view]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.customerDocScope)state.data.customerDocScope=button.dataset.customerDocScope;if(button.dataset.customerDocView)state.data.customerDocView=button.dataset.customerDocView;markDirty();navigate('customerDocuments')}));
  $('#customerDraftSave')?.addEventListener('click',saveCustomerDraft);
  $('#customerPrintButton')?.addEventListener('click',()=>window.print());
  $('#printButton')?.addEventListener('click',()=>window.print());
  $('#enterCustomer')?.addEventListener('click',()=>setMode('customer','home'));
  $('#enterAdmin')?.addEventListener('click',()=>sessionStorage.getItem(ADMIN_SESSION_KEY)==='1'?setMode('admin','dashboard'):openAdminDialog());
  $('#entryBrandHome')?.addEventListener('click',()=>setMode('entry','entry'));
  initCanvases();
}
function navigate(page){if(page==='customerView'){setMode('customer','home');return}state.page=page;render();window.scrollTo({top:0,behavior:'smooth'});closeSidebar()}

function initCanvases(){
  $$('canvas[data-signature]').forEach(canvas=>{const ctx=canvas.getContext('2d');let drawing=false;
    const size=()=>{const saved=state.data.signatures[canvas.dataset.signature];canvas.width=canvas.clientWidth*devicePixelRatio;canvas.height=canvas.clientHeight*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio);ctx.lineWidth=2.2;ctx.lineCap='round';ctx.strokeStyle='#0d3152';if(saved){const img=new Image();img.onload=()=>ctx.drawImage(img,0,0,canvas.clientWidth,canvas.clientHeight);img.src=saved}};size();
    const point=e=>{const r=canvas.getBoundingClientRect(),p=e.touches?.[0]||e;return [p.clientX-r.left,p.clientY-r.top]};
    const start=e=>{e.preventDefault();drawing=true;canvas.setPointerCapture?.(e.pointerId);ctx.beginPath();ctx.moveTo(...point(e));ctx.lineTo(point(e)[0]+.1,point(e)[1]+.1);ctx.stroke()};const move=e=>{if(!drawing)return;e.preventDefault();ctx.lineTo(...point(e));ctx.stroke()};const end=e=>{if(!drawing)return;drawing=false;canvas.releasePointerCapture?.(e.pointerId)};
    canvas.addEventListener('pointerdown',start);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);
  });
  $$('[data-clear-signature]').forEach(b=>b.onclick=()=>{const c=$(`[data-signature="${b.dataset.clearSignature}"]`),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);state.data.signatures[b.dataset.clearSignature]='';markDirty()});
  $$('[data-save-signature]').forEach(b=>b.onclick=()=>{const c=$(`[data-signature="${b.dataset.saveSignature}"]`);state.data.signatures[b.dataset.saveSignature]=c.toDataURL('image/png');markDirty();toast('署名を案件に保存しました')});
}
function restoreSignatures(){}

function saveCase(){state.data.caseName=$('#caseName').value.trim()||'名称未設定';state.data.updatedAt=new Date().toISOString();const list=allCases(),i=list.findIndex(x=>x.id===state.data.id);if(i>=0)list[i]=structuredClone(state.data);else list.unshift(structuredClone(state.data));commitCases(list);localStorage.setItem(UI_KEY,JSON.stringify(state.data));state.dirty=false;$('#saveState').textContent='保存済み';toast('案件を保存しました');if(state.page==='dashboard')render()}
function saveCustomerDraft(){state.data.caseName=String(state.data.caseName||'').trim()||(state.data.storeName?`${state.data.storeName} 導入相談`:'お客様入力');state.data.updatedAt=new Date().toISOString();const list=allCases(),index=list.findIndex(item=>item.id===state.data.id);if(index>=0)list[index]=structuredClone(state.data);else list.unshift(structuredClone(state.data));commitCases(list);localStorage.setItem(UI_KEY,JSON.stringify(state.data));state.dirty=false;$('#saveState').textContent='保存済み';toast('入力内容をこの端末に保存しました')}
function showCases(){const list=allCases();$('#caseCount').textContent=`端末内 ${list.length} / ${MAX_LOCAL_CASES}件`;$('#caseList').innerHTML=list.length?list.map(x=>`<article class="case-item"><div><h3>${esc(x.caseName)}</h3><p>${esc(x.storeName||'店舗名未入力')} ・ ${new Date(x.updatedAt).toLocaleString('ja-JP')}</p></div><div class="case-actions"><button class="button primary" data-load="${x.id}">編集</button><button class="button ghost" data-copy="${x.id}">複製</button><button class="button danger" data-delete="${x.id}">削除</button></div></article>`).join(''):'<p class="muted">保存された案件はありません。</p>';$('#caseDialog').showModal();$$('[data-load]').forEach(b=>b.onclick=()=>{state.data=structuredClone(list.find(x=>x.id===b.dataset.load));normalizeData(state.data);$('#caseDialog').close();render()});$$('[data-copy]').forEach(b=>b.onclick=()=>{const x=structuredClone(list.find(x=>x.id===b.dataset.copy));normalizeData(x);x.id=crypto.randomUUID();x.caseName+= '（複製）';x.contractNo=createContractNo();x.createdAt=x.updatedAt=new Date().toISOString();list.unshift(x);commitCases(list);showCases()});$$('[data-delete]').forEach(b=>b.onclick=()=>{if(confirm('この案件を削除しますか？')){commitCases(list.filter(x=>x.id!==b.dataset.delete));showCases()}})}

function exportBackup(list=allCases(),automatic=false){const payload={app:'PCSAPO Sales App',version:1,exportedAt:new Date().toISOString(),cases:list};download(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),`pcsapo-案件バックアップ-${new Date().toISOString().slice(0,10)}.json`);if(automatic)toast('10件を超えたため、全案件をバックアップしました')}
function importBackup(file){const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(reader.result),cases=Array.isArray(data)?data:data.cases;if(!Array.isArray(cases))throw new Error();const current=allCases(),merged=new Map([...cases,...current].map(x=>[x.id,x]));commitCases([...merged.values()]);showCases();toast('バックアップを復元しました')}catch{alert('PCSAPOのJSONバックアップを選択してください。')}};reader.readAsText(file)}

function exportCsv(){const rows=[['id','案件名','店舗名','保存日時','契約','保守','合計'],...allCases().map(x=>[x.id,x.caseName,x.storeName,x.updatedAt,x.contractDecision,x.subscription?'あり':'なし',quoteTotalFor(x)])];const csv='\uFEFF'+rows.map(r=>r.map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(',')).join('\r\n');download(new Blob([csv],{type:'text/csv;charset=utf-8'}),'pcsapo案件一覧.csv')}
function quoteTotalFor(x){const sub=(x.quotes||[]).reduce((a,q)=>a+(q.qty*q.price),0);return sub+Math.floor(sub*TAX)}
function importCsv(file){const reader=new FileReader();reader.onload=()=>{const lines=String(reader.result).replace(/^\uFEFF/,'').split(/\r?\n/).slice(1).filter(Boolean),list=allCases();for(const line of lines){const c=parseCsvLine(line);if(c.length<4)continue;const x=defaultData();x.id=c[0]||x.id;x.caseName=c[1]||'CSV取込案件';x.storeName=c[2]||'';x.updatedAt=c[3]||x.updatedAt;x.contractDecision=c[4]||'consider';x.subscription=c[5]==='あり';list.unshift(x)}commitCases(list);showCases();toast(`${lines.length}件を取り込みました`)};reader.readAsText(file)}
function parseCsvLine(s){const out=[];let cur='',quote=false;for(let i=0;i<s.length;i++){if(s[i]==='"'&&s[i+1]==='"'){cur+='"';i++}else if(s[i]==='"')quote=!quote;else if(s[i]===','&&!quote){out.push(cur);cur=''}else cur+=s[i]}out.push(cur);return out}
function download(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
async function shareNative(){const info={title:state.data.caseName,text:`${state.data.storeName||'店舗'} 導入案件 / 見積合計 ${yen(quoteGrandTotal())}`,url:location.href};if(navigator.share)await navigator.share(info);else{await navigator.clipboard.writeText(`${info.text}\n${info.url}`);toast('共有内容をコピーしました')}}

document.addEventListener('click',e=>{const p=e.target.closest('[data-page]');if(p)navigate(p.dataset.page);if(e.target.matches('[data-close]'))e.target.closest('dialog').close()});
$('#caseName').addEventListener('input',e=>{state.data.caseName=e.target.value;markDirty()});
$('#saveButton').onclick=saveCase;$('#caseListButton').onclick=showCases;$('#newCase').onclick=()=>{if(!state.dirty||confirm('未保存の変更を破棄して新規案件を作成しますか？')){state.data=defaultData();navigate('hearing')}};$('#menuButton').onclick=()=>$('#sidebar').classList.contains('open')?closeSidebar():openSidebar();
$('#sidebarBackdrop').onclick=closeSidebar;
$('#modeButton').onclick=()=>state.mode==='admin'?setMode('customer','home'):setMode('entry','entry');
$('#brandHome').onclick=()=>state.mode==='admin'?setMode('admin','dashboard'):state.mode==='customer'?setMode('customer','home'):setMode('entry','entry');
$('#adminLoginButton').onclick=unlockAdmin;
$('#resetAdminPasscode').onclick=()=>{if(confirm('この端末に保存された簡易パスコードだけをリセットしますか？案件・料金マスターは削除されません。')){localStorage.removeItem(ADMIN_PASSCODE_KEY);sessionStorage.removeItem(ADMIN_SESSION_KEY);$('#adminDialog').close();toast('簡易パスコードをリセットしました。次回、管理者用を開く際に新しく設定できます。')}};
$('#adminPasscode').addEventListener('keydown',e=>{if(e.key==='Enter')unlockAdmin()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSidebar()});
window.addEventListener('resize',()=>{if(innerWidth>980)closeSidebar()});
$('#shareButton').onclick=()=>$('#shareDialog').showModal();$('#nativeShare').onclick=shareNative;$('#lineShare').onclick=()=>open(`https://line.me/R/msg/text/?${encodeURIComponent(`${state.data.caseName}\n${location.href}`)}`,'_blank');$('#mailShare').onclick=()=>location.href=`mailto:?subject=${encodeURIComponent(state.data.caseName)}&body=${encodeURIComponent(`${state.data.storeName} 導入案件\n${location.href}`)}`;
$('#exportCsv').onclick=exportCsv;$('#importCsv').onchange=e=>e.target.files[0]&&importCsv(e.target.files[0]);
$('#exportBackup').onclick=()=>exportBackup();$('#importBackup').onchange=e=>e.target.files[0]&&importBackup(e.target.files[0]);
window.addEventListener('beforeunload',e=>{if(state.dirty){e.preventDefault();e.returnValue=''}});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();
