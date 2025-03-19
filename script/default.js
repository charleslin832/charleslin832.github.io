﻿/* VM Set */
const app = Vue.createApp({
	setup() {
		const pageStore = usePageStore();
		pageStore.initData();
		return {};
	}
});
/* Store */
const usePageStore = Pinia.defineStore('pageStore', {
	state: () => {
		return {
			controlData: {
				linkType: 0, // 線上狀態, 0:全顯示, 1:已下架, 2: 線上, 3: on: 線上但未開放,
				orderTime: 1, // 1:最新優先, 2: 最舊
				pageType: 0, // 0:全顯示, 1: 靜態,2: 動態(靜態切版), 3: 動態+串接API, 4: 靜態+串接API(JSON), 5: 自製功能
				isPageCover: false, // 蓋台/轉蛋頁，true: 顯示, false: 不顯示
			},
			tableData: [],
			// tableData: [
			// 	['櫻桃小丸子-元氣版',
			// 		'序號兌換頁',
			// 		'https://tw-event.beanfun.com/cmcfl/Exchange/index.aspx?lan=zh',
			// 		'1',
			// 		'2023/4/26',
			// 		'2',
			// 		''],
			// 	['爆爆王',
			// 		'宇宙地圖官網蓋台',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/BNB/E20180906/index.html',
			// 		'2',
			// 		'2018/9/6',
			// 		'1',
			// 		''],
			// 	['曖昧瞬間',
			// 		'序號兌換頁',
			// 		'https://www.gungho-gamania.com/smphotography/Main',
			// 		'1',
			// 		'2021/6/30',
			// 		'2',
			// 		''],
			// 	['彈射世界', '遊戲冷知識大會考', '', '1', '2022/12/13', '3', ''],
			// 	['遊戲橘子',
			// 		'遊戲橘子官網-會員中心',
			// 		'https://tw.beanfun.com/game_zone/',
			// 		'2',
			// 		'2024/8/9',
			// 		'2',
			// 		''],
			// 	['遊戲橘子',
			// 		'遊戲橘子官網-線上購點',
			// 		'https://tw.beanfun.com/game_zone/',
			// 		'2',
			// 		'2024/8/9',
			// 		'2',
			// 		''],
			// 	['遊戲橘子',
			// 		'遊戲橘子官網-序號儲值入口統一',
			// 		'https://tw.beanfun.com/game_zone/',
			// 		'2',
			// 		'2024/8/9',
			// 		'2',
			// 		''],
			// 	['遊戲橘子',
			// 		'遊戲橘子官網-進階認證',
			// 		'https://tw.beanfun.com/GamaniaWeb/OTP/PhoneChangeCheck',
			// 		'2',
			// 		'2024/8/9',
			// 		'2',
			// 		''],
			// 	['遊戲橘子',
			// 		'維護頁公告',
			// 		'https://tw.hicdn.beanfun.com/beanfun/beanfun/maintenance/20240605/index.html',
			// 		'2',
			// 		'2024/6/5',
			// 		'1',
			// 		''],
			// 	['遊戲橘子',
			// 		'帳號停權查詢',
			// 		'https://tw.beanfun.com/GamaniaWeb/Account/LockQuery',
			// 		'2',
			// 		'2024/8/9',
			// 		'2',
			// 		''],
			// 	['beanfun遊戲',
			// 		'大樂透',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/beanfunEvent/E20190107_Lottery/index.html',
			// 		'1',
			// 		'2019/1/7',
			// 		'1',
			// 		''],
			// 	['罪惡童話',
			// 		'序號兌換頁',
			// 		'https://event.beanfun.com/Aurora/ItemToGame/index.aspx',
			// 		'1',
			// 		'2019/11/21',
			// 		'2',
			// 		''],
			// 	['新龍之谷',
			// 		'夏季轉盤(第一版)',
			// 		'https://tw-event.beanfun.com/DragonNest/Event/E20210817/Index.aspx',
			// 		'1',
			// 		'2021/8/17',
			// 		'3',
			// 		''],
			// 	['新龍之谷',
			// 		'春季通行證',
			// 		'https://tw-event.beanfun.com/DragonNest/Event/E20240423/Index.aspx',
			// 		'2',
			// 		'2024/04/23',
			// 		'3',
			// 		''],
			// 	['新龍之谷',
			// 		'7月師徒活動(第二版)',
			// 		'https://tw-event.beanfun.com/DragonNest/Mentorship2024/Index.aspx',
			// 		'2',
			// 		'2024/8/9',
			// 		'2',
			// 		''],
			// 	['新龍之谷',
			// 		'通行證',
			// 		'https://tw-event.beanfun.com/DragonNest/Event/E20220531/Index.aspx',
			// 		'1',
			// 		'2022/5/31',
			// 		'3',
			// 		''],
			// 	['新龍之谷',
			// 		'一月前導頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/DragonNest/E20220117/index.html',
			// 		'2',
			// 		'2022/1/17',
			// 		'1',
			// 		'1'],
			// 	['新龍之谷',
			// 		'十一月改版蓋台',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/DragonNest/E20221121/index.html',
			// 		'2',
			// 		'2022/11/21',
			// 		'1',
			// 		'1'],
			// 	['新龍之谷',
			// 		'十一月改版蓋台(2023)',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/DragonNest/E20231120/index.html',
			// 		'2',
			// 		'2023/11/20',
			// 		'1',
			// 		'1'],
			// 	['新龍之谷',
			// 		'十週年正式網頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/DragonNest/E20200720/index.html',
			// 		'2',
			// 		'2020/7/20',
			// 		'1',
			// 		''],
			// 	['新龍之谷',
			// 		'十週年事前預約',
			// 		'https://event.beanfun.com/DragonNest/Event/E20200616/Index.aspx',
			// 		'1',
			// 		'2020/6/16',
			// 		'3',
			// 		''],
			// 	['新龍之谷',
			// 		'夕光修練場挑戰活動網頁',
			// 		'https://tw-event.beanfun.com/DragonNest/Event/E20221129/index.aspx',
			// 		'1',
			// 		'2022/11/29',
			// 		'3',
			// 		''],
			// 	['新龍之谷',
			// 		'夕光修鍊場排名賽事(第一版)',
			// 		'https://dragonnest-event.beanfun.com/EveningLight/Index',
			// 		'2',
			// 		'2021/8/17',
			// 		'3',
			// 		''],
			// 	['新龍之谷',
			// 		'夕光修鍊場排行賽事(2023)(第三版)',
			// 		'https://dragonnest-event.beanfun.com/EveningLight/Index',
			// 		'2',
			// 		'2023/1/31',
			// 		'3',
			// 		''],
			// 	['新龍之谷',
			// 		'八月改版蓋台頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/DragonNest/E20210817/index.html',
			// 		'2',
			// 		'2021/8/17',
			// 		'1',
			// 		'1'],
			// 	['新龍之谷',
			// 		'五月改版蓋台',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/DragonNest/E20230523/index.html',
			// 		'2',
			// 		'2023/5/23',
			// 		'1',
			// 		'1'],
			// 	['新龍之谷',
			// 		'五月改版蓋台前導頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/DragonNest/E20210524/index.html',
			// 		'2',
			// 		'2021/5/24',
			// 		'1',
			// 		'1'],
			// 	['新龍之谷',
			// 		'新職業改版網頁',
			// 		'https://tw-event.beanfun.com/DragonNest/NewRoleRevision/Index.aspx',
			// 		'2',
			// 		'2021/12/28',
			// 		'3',
			// 		''],
			// 	['新瑪奇',
			// 		'14週年活動-城鎮大冒險',
			// 		'https://event.beanfun.com/mabinogi/E20190523/index.aspx',
			// 		'1',
			// 		'2019/5/23',
			// 		'3',
			// 		''],
			// 	['新瑪奇',
			// 		'18週年活動',
			// 		'https://tw-event.beanfun.com/mabinogi/event/e20230413/index.aspx',
			// 		'1',
			// 		'2023/4/13',
			// 		'3',
			// 		''],
			// 	['新瑪奇',
			// 		'G21預熱分享',
			// 		'https://event.beanfun.com/Mabinogi/E20180607/index.aspx',
			// 		'1',
			// 		'2018/6/7',
			// 		'2',
			// 		''],
			// 	['新瑪奇',
			// 		'G22事前登錄',
			// 		'https://event.beanfun.com/Mabinogi/E20181213/index.aspx',
			// 		'1',
			// 		'2018/12/13',
			// 		'3',
			// 		''],
			// 	['新瑪奇',
			// 		'NEXT_STEP_UP',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20230615/index.html',
			// 		'2',
			// 		'2023/6/15',
			// 		'1',
			// 		''],
			// 	['新瑪奇',
			// 		'Proceed改版網頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20231214_proceed/index.html',
			// 		'2',
			// 		'2023/12/14',
			// 		'1',
			// 		''],
			// 	['新瑪奇',
			// 		'PROCEED_STEP_UP網頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20240215L/index.html',
			// 		'2',
			// 		'2024/2/15',
			// 		'1',
			// 		''],
			// 	['新瑪奇',
			// 		'回憶錄等級挑戰賽',
			// 		'https://event.beanfun.com/Mabinogi/E20181227/index.aspx',
			// 		'1',
			// 		'2018/12/27',
			// 		'2',
			// 		''],
			// 	['新瑪奇',
			// 		'成長經驗改善NEXT第一波改版介紹頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20221208_next_1st/index.html',
			// 		'2',
			// 		'2022/12/8',
			// 		'1',
			// 		''],
			// 	['新瑪奇',
			// 		'命運之風預登活動網頁',
			// 		'https://mabinogi-event.beanfun.com/DestinyAppointment/Index',
			// 		'2',
			// 		'2024/6/27',
			// 		'3',
			// 		''],
			// 	['新瑪奇',
			// 		'泠夏freeseason',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20230713_freeseason/index.html',
			// 		'2',
			// 		'2023/7/13',
			// 		'1',
			// 		''],
			// 	['新瑪奇',
			// 		'長期簽到活動-伊魯夏出席簽到第三季',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20231005_sign/index.html',
			// 		'1',
			// 		'2023/10/05',
			// 		'1',
			// 		''],
			// 	['新瑪奇',
			// 		'星辰改版介紹頁1st',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20210617/index.html',
			// 		'2',
			// 		'2021/06/17',
			// 		'1',
			// 		''],
			// 	['新瑪奇',
			// 		'星辰改版介紹頁2nd',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20210617_2nd/index.html',
			// 		'2',
			// 		'2021/06/17',
			// 		'1',
			// 		''],
			// 	['新瑪奇',
			// 		'娜歐的禮物',
			// 		'https://mabinogi-event.beanfun.com/naogift/index',
			// 		'2',
			// 		'2019/8/15',
			// 		'2',
			// 		''],
			// 	['新瑪奇',
			// 		'浪漫島廣宣頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20230810_island/index.html',
			// 		'2',
			// 		'2023/8/10',
			// 		'1',
			// 		''],
			// 	['新瑪奇',
			// 		'喀輪巴斯第二波更新網頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20211209/index.html',
			// 		'2',
			// 		'2021/12/9',
			// 		'1',
			// 		''],
			// 	['新瑪奇',
			// 		'愛爾琳校慶-15週年活動',
			// 		'https://event.beanfun.com/mabinogi/E20200604/index.aspx',
			// 		'1',
			// 		'2020/6/4',
			// 		'3',
			// 		''],
			// 	['新瑪奇',
			// 		'農場改編活動',
			// 		'https://event.beanfun.com/mabinogi/E20180913/index.aspx',
			// 		'1',
			// 		'2018/9/13',
			// 		'3',
			// 		''],
			// 	['新瑪奇',
			// 		'農場物語-13週年活動',
			// 		'https://event.beanfun.com/mabinogi/E20180517/index.aspx',
			// 		'1',
			// 		'2018/5/17',
			// 		'2',
			// 		''],
			// 	['新瑪奇',
			// 		'精武轉蛋活動頁',
			// 		'https://event.beanfun.com/Mabinogi/E20191203/index.aspx',
			// 		'1',
			// 		'2019/12/12',
			// 		'3',
			// 		''],
			// 	['新瑪奇',
			// 		'寵物當家1ST改版網頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20200716/index.html',
			// 		'2',
			// 		'2020/7/16',
			// 		'1',
			// 		''],
			// 	['新瑪奇',
			// 		'寵物當家活動網頁',
			// 		'https://event.beanfun.com/Mabinogi/E20200716/index.aspx',
			// 		'1',
			// 		'2020/7/16',
			// 		'2',
			// 		''],
			// 	['新瑪奇',
			// 		'轉蛋頁-東方寶石盒',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20181004Easternbox/index.html',
			// 		'2',
			// 		'2018/10/4',
			// 		'1',
			// 		'1'],
			// 	['新瑪奇',
			// 		'轉蛋頁-大自然精靈飛行娃娃轉蛋',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20180705Naturebox/index.html',
			// 		'2',
			// 		'2018/7/5',
			// 		'1',
			// 		'1'],
			// 	['新瑪奇',
			// 		'轉蛋頁-大富翁轉蛋',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20181129Richmanbox/index.html',
			// 		'2',
			// 		'2018/11/29',
			// 		'1',
			// 		'1'],
			// 	['新瑪奇',
			// 		'轉蛋頁-深淵龍轉蛋箱子',
			// 		'http://tw.patch.beanfun.com/pubad/Mabinogi/20180426dragonbox/index.html',
			// 		'1',
			// 		'2018/4/26',
			// 		'1',
			// 		'1'],
			// 	['新瑪奇',
			// 		'轉蛋頁-月之妖精箱子',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20190509Fairybox/index.html',
			// 		'2',
			// 		'2019/5/9',
			// 		'1',
			// 		'1'],
			// 	['新瑪奇',
			// 		'轉蛋頁-月光影子轉蛋',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20181115Shadowbox/index.html',
			// 		'2',
			// 		'2018/11/15',
			// 		'1',
			// 		'1'],
			// 	['新瑪奇',
			// 		'轉蛋頁-仙界幻想箱子',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20190530Celestialbox/index.html',
			// 		'2',
			// 		'2019/5/30',
			// 		'1',
			// 		'1'],
			// 	['新瑪奇',
			// 		'轉蛋頁-冬季皇家轉蛋',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20190307RussiaBox/index.html',
			// 		'2',
			// 		'2019/3/7',
			// 		'1',
			// 		'1'],
			// 	['新瑪奇',
			// 		'轉蛋頁-神偷怪盜轉蛋',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20190822Thiefbox/index.html',
			// 		'2',
			// 		'2019/8/22',
			// 		'1',
			// 		'1'],
			// 	['新瑪奇',
			// 		'轉蛋頁-寵愛箱子轉蛋',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20190808Dollbox/index.html',
			// 		'2',
			// 		'2019/8/8',
			// 		'1',
			// 		'1'],
			// 	['新瑪奇',
			// 		'轉蛋頁-恆星轉蛋',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Mabi/E20190328StarBox/index.html',
			// 		'2',
			// 		'2019/3/28',
			// 		'1',
			// 		'1'],
			// 	['新瑪奇',
			// 		'轉蛋頁-春天櫻花箱子',
			// 		'http://tw.patch.beanfun.com/pubad/Mabinogi/20180412sakurabox/index.html',
			// 		'1',
			// 		'2018/4/12',
			// 		'1',
			// 		'1'],
			// 	['新楓之谷',
			// 		'楓樹計劃',
			// 		'https://maplestory-event.beanfun.com/mapleseed/index',
			// 		'3',
			// 		'2025/2/14',
			// 		'3',
			// 		''],
			// 	['新楓之谷',
			// 		'2025寒假改版宣傳網頁-預登',
			// 		'https://maplestory-event.beanfun.com/Event/E20241218/Index',
			// 		'2',
			// 		'2024/12/18',
			// 		'3',
			// 		''],
			// 	['新楓之谷',
			// 		'2025寒假改版宣傳網頁-改版一',
			// 		'https://maplestory-event.beanfun.com/Event/E20241218/Index',
			// 		'2',
			// 		'2025/1/8',
			// 		'3',
			// 		''],
			// 	['新楓之谷',
			// 		'13週年',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/MapleStory/E20180815/index.html',
			// 		'2',
			// 		'2018/8/15',
			// 		'1',
			// 		''],
			// 	['新楓之谷',
			// 		'2023星夜馬戲團活動介紹網頁',
			// 		'https://tw-event.beanfun.com/MapleStory/Event/E20231101/index.aspx',
			// 		'1',
			// 		'2023/11/1',
			// 		'3',
			// 		''],
			// 	['新楓之谷',
			// 		'ARK-全新職業亞克',
			// 		'https://tw.event.beanfun.com/MapleStory/E20180704/index.aspx',
			// 		'1',
			// 		'2018/07/04',
			// 		'3',
			// 		''],
			// 	['新楓之谷',
			// 		'LINEFRIEND合作網頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/MapleStory/E20190327/index.html',
			// 		'2',
			// 		'2019/3/27',
			// 		'1',
			// 		''],
			// 	['新楓之谷',
			// 		'V211復古世界',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/MapleStory/E20181010/index.html',
			// 		'2',
			// 		'2018/10/10',
			// 		'1',
			// 		''],
			// 	['新楓之谷', 'V211復古世界-活動頁', '', '1', '2018/10/24', '', ''],
			// 	['新楓之谷',
			// 		'母親節登入送',
			// 		'https://event.beanfun.com/MapleStory/E20200506/index.aspx',
			// 		'1',
			// 		'2020/5/6',
			// 		'2',
			// 		''],
			// 	['新楓之谷',
			// 		'BTS合作網頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/MapleStory/maplestoryxbts/index.html',
			// 		'2',
			// 		'2022/12/5',
			// 		'1',
			// 		''],
			// 	['新楓之谷',
			// 		'回饋季',
			// 		'http://tw.patch.beanfun.com/pubad/Maplestory/MS20180501_update/index.html',
			// 		'1',
			// 		'2018/5/1',
			// 		'1',
			// 		''],
			// 	['新楓之谷', '庫洛魔法使bf蓋台', '', '1', '2018/9/5', '1', '1'],
			// 	['新楓之谷',
			// 		'庫洛魔法使活動網頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/MapleStory/E20180905/index.html',
			// 		'1',
			// 		'2018/9/5',
			// 		'1',
			// 		''],
			// 	['新楓之谷',
			// 		'海外改版-MONAD',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/MapleStory/E20180801/index.html',
			// 		'2',
			// 		'2018/8/1',
			// 		'1',
			// 		''],
			// 	['新楓之谷', '商城banner(launcher)', '-', '1', '2019/10/18', '2', ''],
			// 	['新楓之谷',
			// 		'異業合作',
			// 		'https://event.beanfun.com/maplestory/E20181203/Index.aspx',
			// 		'1',
			// 		'2018/12/3',
			// 		'3',
			// 		''],
			// 	['新楓之谷',
			// 		'寒假改版網頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/MapleStory/E20210113/index.html',
			// 		'2',
			// 		'2010/1/13',
			// 		'1',
			// 		''],
			// 	['新楓之谷', '楓之賞', '', '1', '2019/6/5', '2', ''],
			// 	['新楓之谷', '戰鬥吧回歸', '', '1', '2018/3/28', '2', ''],
			// 	['新楓之谷',
			// 		'燃燒活動',
			// 		'http://tw.patch.beanfun.com/pubad/Maplestory/MS20180523_update/index.html',
			// 		'1',
			// 		'2018/5/23',
			// 		'1',
			// 		''],
			// 	['跑跑卡丁車',
			// 		'1vs1決鬥模式',
			// 		'https://event.beanfun.com/kartRider/E20180427/',
			// 		'1',
			// 		'2018/4/27',
			// 		'2',
			// 		''],
			// 	['跑跑卡丁車', 'X世代官網蓋台', '', '1', '2018/7/27', '1', '1'],
			// 	['跑跑卡丁車',
			// 		'世界爭霸賽web',
			// 		'https://event.beanfun.com/KartRider/E20190730_1/index.aspx',
			// 		'1',
			// 		'2019/7/31',
			// 		'2',
			// 		''],
			// 	['跑跑卡丁車',
			// 		'尖峰X龍賓果',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/KR/E20200110/index.html',
			// 		'1',
			// 		'2020/1/10',
			// 		'1',
			// 		''],
			// 	['跑跑卡丁車',
			// 		'金手指爭霸賽',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/KR/E20201204WEB/index.html',
			// 		'1',
			// 		'2020/12/4',
			// 		'4',
			// 		''],
			// 	['跑跑卡丁車',
			// 		'俱樂部靜態頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/KR/E20190412/index.html',
			// 		'1',
			// 		'2019/4/12',
			// 		'1',
			// 		''],
			// 	['跑跑卡丁車',
			// 		'神域事前登入',
			// 		'https://event.beanfun.com/kartrider/E20190111/index.aspx',
			// 		'1',
			// 		'2019/1/11',
			// 		'2',
			// 		''],
			// 	['跑跑卡丁車',
			// 		'尋找深海之城的遺跡',
			// 		'https://event.beanfun.com/kartrider/E20200410/index.aspx',
			// 		'1',
			// 		'2020/4/10',
			// 		'3',
			// 		''],
			// 	['跑跑卡丁車',
			// 		'暑假翻牌活動',
			// 		'https://event.beanfun.com/kartrider/E20200807/index.aspx',
			// 		'1',
			// 		'2020/8/7',
			// 		'2',
			// 		''],
			// 	['跑跑卡丁車',
			// 		'跑跑城市盃Web+H5',
			// 		'https://event.beanfun.com/KartRider/2021CityCup/index.aspx',
			// 		'1',
			// 		'2021/5/13',
			// 		'2',
			// 		''],
			// 	['跑跑卡丁車',
			// 		'新主題改版預約Web+H5',
			// 		'https://tw-event.beanfun.com/KartRider/Event/E20210715/index.aspx',
			// 		'1',
			// 		'2021/7/15',
			// 		'2',
			// 		''],
			// 	['絕對武力', '我有龍炮找女友H5', '', '1', '2022/8/17', '2', ''],
			// 	['發射吧少女',
			// 		'官網-角色介紹頁',
			// 		'https://www.gungho-gamania.com/mahouotome/index.aspx',
			// 		'1',
			// 		'2018/4/13',
			// 		'1',
			// 		''],
			// 	['發射吧少女',
			// 		'事前登錄',
			// 		'https://tw.event.gungho-gamania.com/mahouotome/E20180329_1/index.aspx',
			// 		'1',
			// 		'2018/3/29',
			// 		'1',
			// 		''],
			// 	['艾爾之光',
			// 		'新角事前登錄',
			// 		'https://event.beanfun.com/elsword/event/E20181227/index.aspx',
			// 		'1',
			// 		'2018/12/27',
			// 		'1',
			// 		''],
			// 	['全產品',
			// 		'IE遮蔽',
			// 		'https://tw.hicdn.beanfun.com/beanfun/GamaWWW/allProducts/script/IE/blockIE8.js',
			// 		'2',
			// 		'2018/4/16',
			// 		'5',
			// 		''],
			// 	['全產品',
			// 		'裝置旋轉偵測',
			// 		'https://frontend.beanfun.com/plugins/oriCheck/oriCheck.js',
			// 		'2',
			// 		'2024/1/12',
			// 		'5',
			// 		''],
			// 	['全產品', 'bfQRcode登入活動企劃', '', '1', '2019/4/1', '2', ''],
			// 	['全產品',
			// 		'beanfun的app祝福',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/beanfunEvent/E20190124/index.html',
			// 		'2',
			// 		'2019/1/24',
			// 		'1',
			// 		''],
			// 	['全產品', '端遊導bf', '', '1', '2019/7/15', '1', ''],
			// 	['全產品',
			// 		'維修中',
			// 		'https://tw.hicdn.beanfun.com/beanfun/GamaWWW/beanfunEvent/maintain/index.html',
			// 		'2',
			// 		'2018/4/16',
			// 		'1',
			// 		''],
			// 	['召喚圖板',
			// 		'六月行銷活動-PRODUCE SUMMONS BOARD',
			// 		'https://event.gungho-gamania.com/SB/E20200703/index.aspx',
			// 		'1',
			// 		'2020/7/3',
			// 		'3',
			// 		''],
			// 	['月光雕刻師',
			// 		'CBT-菁英測試',
			// 		'https://tw-event.beanfun.com/Moonlight/Event/E20200917_CBT/index.html',
			// 		'1',
			// 		'2020/9/17',
			// 		'1',
			// 		''],
			// 	['月光雕刻師',
			// 		'事前預約',
			// 		'https://tw-event.beanfun.com/Moonlight/Event/E20200917_1/Index.aspx?sec=1',
			// 		'1',
			// 		'2020/9/17',
			// 		'2',
			// 		''],
			// 	['月光雕刻師',
			// 		'雙平台預約',
			// 		'https://tw-event.beanfun.com/Moonlight/Event/E20200917_1/Index.aspx?sec=2',
			// 		'1',
			// 		'2020/9/17',
			// 		'2',
			// 		''],
			// 	['月光雕刻師',
			// 		'預先創角',
			// 		'https://tw-event.beanfun.com/Moonlight/Event/E20200917_2/Index.aspx',
			// 		'1',
			// 		'2020/9/17',
			// 		'2',
			// 		''],
			// 	['月光雕刻師',
			// 		'官網',
			// 		'https://moonlight.beanfun.com/Main',
			// 		'1',
			// 		'2020/10/22',
			// 		'2',
			// 		''],
			// 	['月光雕刻師',
			// 		'形象官網',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/Moonlight/main/index.html',
			// 		'1',
			// 		'2020/8/20',
			// 		'1',
			// 		''],
			// 	['天堂M', 'Loading(ingame)', '', '2', '2018/12/12', '1', ''],
			// 	['天堂M',
			// 		'一周年回饋',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/LineageM/E20181212/index.html',
			// 		'2',
			// 		'2018/12/12',
			// 		'1',
			// 		''],
			// 	['天堂M',
			// 		'九月活動網站',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/LineageM/E20190827/index.html',
			// 		'2',
			// 		'2019/8/27',
			// 		'1',
			// 		''],
			// 	['天堂M',
			// 		'六周年活動',
			// 		'https://tw-event.beanfun.com/lineageM/Event/E20231213/index.aspx',
			// 		'1',
			// 		'2023/12/13',
			// 		'3',
			// 		''],
			// 	['天堂M',
			// 		'神槍手',
			// 		'https://tw.hicdn.beanfun.com/beanfun/GamaWWW/LineageM/Event/E20181024/index.html',
			// 		'2',
			// 		'2018/10/24',
			// 		'1',
			// 		''],
			// 	['天堂M',
			// 		'陣營戰',
			// 		'https://tw-event.beanfun.com/LineageM/Event/E20221019/Index.aspx',
			// 		'1',
			// 		'2022/10/19',
			// 		'3',
			// 		''],
			// 	['天堂M',
			// 		'高等妖精的逆襲-預先登入',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/LineageM/E20200415/',
			// 		'2',
			// 		'2020/4/15',
			// 		'1',
			// 		''],
			// 	['天堂M',
			// 		'鬼月的開端-鬼怪狩獵祭',
			// 		'https://tw-event.beanfun.com/LineageM/E20200819/Login.aspx',
			// 		'1',
			// 		'2020/8/19',
			// 		'2',
			// 		''],
			// 	['天堂M',
			// 		'渾沌活動',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/LineageM/Chaos/index.html',
			// 		'2',
			// 		'2018/8/29',
			// 		'1',
			// 		''],
			// 	['天堂M',
			// 		'黑妖衝裝',
			// 		'https://event.beanfun.com/LineageM/dark_E20180613/intro.html',
			// 		'1',
			// 		'2018/6/13',
			// 		'3',
			// 		''],
			// 	['天堂M',
			// 		'暗黑法師官網蓋台',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/LineageM/E20210421/index.html',
			// 		'2',
			// 		'2021/4/21',
			// 		'1',
			// 		''],
			// 	['天堂M',
			// 		'騎士道介紹頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/LineageM/E20210203/index.html',
			// 		'2',
			// 		'2021/2/3',
			// 		'1',
			// 		''],
			// 	['天堂月免',
			// 		'月服-EP改版-支配者之塔',
			// 		'https://tw.beanfun.com/lineage/events/181004_M/index.html',
			// 		'2',
			// 		'2018/10/4',
			// 		'1',
			// 		''],
			// 	['天堂月免',
			// 		'免服-EP改版-支配者之塔',
			// 		'https://tw.beanfun.com/lineage/events/181004_F/index.html',
			// 		'2',
			// 		'2018/10/4',
			// 		'1',
			// 		''],
			// 	['天堂月免',
			// 		'天R事前登錄H5',
			// 		'https://event.beanfun.com/Lineage/E20200805/Index.aspx',
			// 		'1',
			// 		'2020/8/5',
			// 		'2',
			// 		''],
			// 	['天堂月免',
			// 		'Remastered遊戲下載頁',
			// 		'https://tw-event.beanfun.com/lineage/Download/Index.aspx',
			// 		'2',
			// 		'2020/8/17',
			// 		'1',
			// 		''],
			// 	['天堂月免',
			// 		'自由轉職活動',
			// 		'https://event.beanfun.com/Lineage/E20200826_1/index.html',
			// 		'1',
			// 		'2020/8/26',
			// 		'2',
			// 		''],
			// 	['天堂月免',
			// 		'直播物資領取',
			// 		'https://event.beanfun.com/lineage/E20200826_2/Index.aspx',
			// 		'1',
			// 		'2020/8/26',
			// 		'2',
			// 		''],
			// 	['天堂月免',
			// 		'創作者勢力邀請碼',
			// 		'https://event.beanfun.com/Lineage/E20210519/Index.aspx',
			// 		'1',
			// 		'2021/5/19',
			// 		'2',
			// 		''],
			// 	['天堂月免',
			// 		'儲值消費雙回饋',
			// 		'https://event.beanfun.com/Lineage/E20200819_1/index.aspx',
			// 		'1',
			// 		'2020/8/19',
			// 		'2',
			// 		''],
			// 	['天堂國際服',
			// 		'Remastered',
			// 		'https://tw.beanfun.com/lineagenew/events/2019remastered/index.html',
			// 		'1',
			// 		'2019/3/4',
			// 		'1',
			// 		''],
			// 	['天堂國際服',
			// 		'Remastered事前登錄',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/lineagenew/E20190304/index.html',
			// 		'1',
			// 		'2019/3/11',
			// 		'1',
			// 		''],
			// 	['天堂國際服',
			// 		'人人有碼通通有獎',
			// 		'https://event.beanfun.com/lineageNew/E20190807/Index.aspx',
			// 		'1',
			// 		'2019/8/7',
			// 		'2',
			// 		''],
			// 	['天堂國際服',
			// 		'月免服回饋活動',
			// 		'https://event.beanfun.com/LineageNew/E20190502/Index.aspx',
			// 		'1',
			// 		'2019/5/2',
			// 		'2',
			// 		''],
			// 	['天堂國際服',
			// 		'合服介紹頁',
			// 		'https://tw.hicdn.beanfun.com/beanfun/promo/LineageNew/E20210209/index.html',
			// 		'2',
			// 		'2021/2/9',
			// 		'1',
			// 		''],
			// 	['天堂國際服',
			// 		'成就系統',
			// 		'https://event.beanfun.com/lineageNew/E20200409/index.aspx',
			// 		'1',
			// 		'2020/4/8',
			// 		'2',
			// 		''],
			// 	['天堂國際服',
			// 		'開局活動_召回英雄獎勵',
			// 		'https://event.beanfun.com/Lineagenew/E20210318/Index.aspx',
			// 		'1',
			// 		'2021/3/18',
			// 		'2',
			// 		''],
			// 	['天堂國際服', '傳說血盟', '', '1', '2020/12/10', '2', ''],
			// 	['天堂國際服',
			// 		'經驗合併轉黃金槍騎',
			// 		'https://event.beanfun.com/Lineagenew/E20201210_1/index.html',
			// 		'1',
			// 		'2020/12/10',
			// 		'2',
			// 		''],
			// 	['天堂國際服',
			// 		'聖戰士事前預約',
			// 		'https://tw-event.beanfun.com/LineageNew/Event/E20240201_Reserve/index.ASPX',
			// 		'2',
			// 		'2024/2/1',
			// 		'1',
			// 		''],
			// 	['天堂國際服',
			// 		'競拍活動',
			// 		'https://event.beanfun.com/LineageNew/E20210331/Index.aspx',
			// 		'1',
			// 		'2021/4/8',
			// 		'2',
			// 		''],
			// 	['遊戲橘子',
			// 		'2021週年慶',
			// 		'https://tw-event.beanfun.com/BeanFunEvent/Event/E2021Anniversary/Index.aspx',
			// 		'1',
			// 		'2021/11/11',
			// 		'3',
			// 		''],
			// 	['遊戲橘子',
			// 		'2020週年慶',
			// 		'https://event.beanfun.com/BeanFunEvent/E2020Anniversary/index.aspx',
			// 		'1',
			// 		'2021/11/11',
			// 		'3',
			// 		''],
			// 	['遊戲橘子',
			// 		'2018週年慶',
			// 		'https://event.beanfun.com/beanFunEvent/E2018Anniversary/index.aspx',
			// 		'1',
			// 		'2018/11/11',
			// 		'3',
			// 		''],
			// 	['遊戲橘子', '2019TGS', '', '1', '2019/1/25', '2', ''],
			// 	['永恆冒險',
			// 		'官網',
			// 		'https://grandchaseclassic.beanfun.com/Main',
			// 		'2',
			// 		'2024/10/9',
			// 		'3',
			// 		''],
			// 	['波拉西亞',
			// 		'波戰富翁',
			// 		'https://warsofprasia-event.beanfun.com/Event/E20240723/Index',
			// 		'1',
			// 		'2024/7/23',
			// 		'3',
			// 		''],
			// 	['波拉西亞',
			// 		'守護者結伴計畫',
			// 		'https://warsofprasia-event.beanfun.com/event/E20241031/index',
			// 		'1',
			// 		'2024/10/31',
			// 		'3',
			// 		''],
			// ]
		}
	},
	getters: {},
	actions: {
		initData(payload){
			// let url = "https://script.google.com/macros/s/AKfycbzF9hL1SfzpeA8RiiKe9gr2yTtkISsiTyvyF2UgAl_-HKKnPs6ncwBPf5BRn_iGCanKBw/exec";
			// let data = {
			// 	startRow: 2,
			// 	startColumn: 1,
			// 	id: "1NUkbREpnVzU3EZHXcrA-QPqU9WjF76FsU-IVFiNStbY",
			// 	name: "table-0"
			// }.toString();
			// axios.post(url, data)
			// 	.then((res) => {
			// 		console.log("res:", res);
			// 	})
			// 	.catch((error) => {
			// 		console.log("error:", error);
			// 	});
			let url = "./script/data.json";
			axios.get(url)
				.then((res) => {
					console.log(res);
					console.log(res.data);
					this.tableData = res.data.dataList;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		changeControlData(payload){
			this.controlData.linkType = Number(payload.linkType);
			this.controlData.orderTime = Number(payload.orderTime);
			this.controlData.pageType = Number(payload.pageType);
			this.controlData.isPageCover = payload.isPageCover;
		}
	},
});
/* Components */
app.component('control-area', {
	template: `
		<div class="control-area">
				<div class="input-row">
					<span>線上狀態：</span>
					<div class="select-outer">
						<select v-model="controlFormData.linkType" @change="changeForm">
							<option value="0">全顯示</option>
							<option value="1">已下架</option>
							<option value="2">線上</option>
						</select>
					</div>
				</div>
				<div class="input-row">
					<span>顯示順序：</span>
					<div class="select-outer">
						<select v-model="controlFormData.orderTime" @change="changeForm">
							<option value="1">最新優先</option>
							<option value="2">最舊優先</option>
						</select>
					</div>
				</div>
				<div class="input-row">
					<span>頁面類型：</span>
					<div class="select-outer">
						<select v-model="controlFormData.pageType" @change="changeForm">
							<option value="0">全顯示</option>
							<option value="1">1: 靜態</option>
							<option value="2">2: 動態(靜態切版)</option>
							<option value="3">3: 動態+串接API</option>
							<option value="4">4: 靜態+串接API(JSON)</option>
							<option value="5">5: 自製功能</option>
						</select>
					</div>
				</div>
				<div class="input-row">
					<span>是否顯示蓋台頁/轉蛋頁：</span>
					<label class="input-checkbox-outer">
						<input type="checkbox" v-model="controlFormData.isPageCover" @change="changeForm">
						<span></span>
					</label>，
					顯示狀態：{{(controlFormData.isPageCover)?'顯示':'不顯示'}}
				</div>
		</div>
	`,
	setup(props) {
		// usePageStore
		const pageStore = usePageStore();
		const { controlData } = Pinia.storeToRefs(pageStore);
		const controlFormData = Vue.ref({
			linkType: Number(controlData.value.linkType),
			orderTime: Number(controlData.value.orderTime),
			pageType: Number(controlData.value.pageType),
			isPageCover: controlData.value.isPageCover,
		});
		function changeForm(){
			pageStore.changeControlData({
				linkType: Number(controlFormData.value.linkType),
				orderTime: Number(controlFormData.value.orderTime),
				pageType: Number(controlFormData.value.pageType),
				isPageCover: controlFormData.value.isPageCover,
			});
		};
		return {
			controlFormData,
			changeForm,
		};
	},
});

app.component('table-area', {
	template: `
			<div class="table-area">
				<table class="table">
					<thead>
						<tr>
							<th>案件名稱</th>
							<th>線上狀態</th>
							<th>上線日期</th>
							<th>頁面類型</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in tableDataFilter" :class="{'disabled': item[3] == 1}">
							<td>
								<span v-if="item[3] == 1">{{item[0]}}-{{item[1]}}</span>
								<a v-else :href="(item[2])?item[2]:'javascript:;'" target="_blank" rel="noreferrer noopener">{{item[0]}}-{{item[1]}}</a>
							</td>
							<td>{{linkTypeText(item[3])}}</td>
							<td>{{item[4]}}</td>
							<td>{{item[5]}}:{{pageTypeText(item[5])}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		`,
	setup(props) {
		// usePageStore
		const pageStore = usePageStore();
		const { controlData, tableData } = Pinia.storeToRefs(pageStore);
		const tableDataFilter = Vue.computed(() => {
			let tableDataFilterArray = [];
			let arrayData = tableData.value;
			// 處理蓋台/轉蛋頁
			if (!controlData.value.isPageCover) {
				tableDataFilterArray = arrayData.filter(function (item){
					return item[6] !== 1;
				});
			}else{
				tableDataFilterArray = arrayData;
			}
			// 頁面類型
			if (Number(controlData.value.pageType) !== 0){
				tableDataFilterArray = arrayData.filter(function (item) {
					return item[5] == Number(controlData.value.pageType);
				});
			}
			// 線上狀態
			if (Number(controlData.value.linkType == 1)) {
				tableDataFilterArray = arrayData.filter(function (item) {
					return item[3] == 1;
				});
			} else if (Number(controlData.value.linkType == 2)) {
				tableDataFilterArray = arrayData.filter(function (item) {
					return item[3] == 2 || item[3] == 3;
				});
			}

			// 時間排序
			if (Number(controlData.value.orderTime) == 1) {
				tableDataFilterArray.sort((a, b) => new Date(b[4]) - new Date(a[4]));
			}else{
				tableDataFilterArray.sort((a, b) => new Date(a[4]) - new Date(b[4]));
			}

			return tableDataFilterArray;
		});
		// 線上狀態
		function linkTypeText(type){
			let text = '';
			switch (Number(type)) {
				case 1:
					text = '已下架';
					break;
				case 2:
					text = '線上';
					break;
				case 3:
					text = '線上，未開放';
					break;
				default:
					text = '';
					break;
			}
			return text;
		};
		// 頁面分類
		function pageTypeText(type){
			let text = '';
			switch (Number(type)) {
				case 1:
					text = '靜態';
					break;
				case 2:
					text = '動態(靜態切版)';
					break;
				case 3:
					text = '動態+串接API';
					break;
				case 4:
					text = '靜態+串接API(JSON)';
					break;
				case 5:
					text = '自製功能';
					break;
				default:
					text = '';
					break;
			}
			return text;
		};
		return {
			linkTypeText,
			pageTypeText,
			tableDataFilter
		};
	},
});
/* VM Mount */
// 執行VM

function afterInit() {
	const pinia = Pinia.createPinia();
	app.use(pinia);
	app.mount('#app');
};
afterInit();