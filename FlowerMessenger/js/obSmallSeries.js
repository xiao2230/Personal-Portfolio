let headerNav = document.querySelector('.header_nav');
let contentOrderArea = document.querySelector('.content_oBArea');

//用來定特效出現的高度參考點
let content = document.querySelector('.content');

document.addEventListener('DOMContentLoaded', () => {
    // 『主要內容區-訂購區』的內容漸入
    contentOrderArea.classList.add('appear');
});

document.addEventListener('scroll', () => {
	let scrollTop = document.documentElement.scrollTop;

	if (scrollTop > content.offsetTop) {
		// 『頂部內容區-導覽列』的新增BackToTop
		headerNav.classList.add('navPlusTop');
	} else {
		// 『頂部內容區-導覽列』的移除BackToTop
		headerNav.classList.remove('navPlusTop');
	}
});

// 『主要內容區-訂購區』使用Vue框架來實現關注點分離

Vue.createApp({
	data() {
		return {
			// 展示圖：資料
			bouquetPic: [
				{
					id: 'small01',
					name: '小花系列01',
					image: 'images/oBSmallSeries/small01.jpg',
					mask: 'noMask'
				},
				{
					id: 'small02',
					name: '小花系列01',
					image: 'images/oBSmallSeries/small01.jpg',
					mask: 'openMask'
				},
				{
					id: 'small03',
					name: '小花系列02',
					image: 'images/oBSmallSeries/small02.jpg',
					mask: 'noMask'
				},
				{
					id: 'small04',
					name: '小花系列03',
					image: 'images/oBSmallSeries/small03.jpg',
					mask: 'noMask'
				}
			],
			// 花束訂購：資料
			bouquetText: {
				chName: '小花系列',
				enName: 'Small Series',
				basicPrice: 300,
				tip: '提示：此價格已包含運費，自取另享物流費用折抵。每週鮮花因集體購買，恕不能指定花材，花藝師會依據當季的花材做搭配。',
				feature: '單至多種鮮花，隨機搭配花材， 每週一、二（不指定時間）配送至指定地點。 適合工作桌與小空間的一隅。',
				weeks: [
					{
						val: 1,
						id: 'oBWeek01',
						name: 'oBWeek',
						checked: true
					},
					{
						val: 4,
						id: 'oBWeek04',
						name: 'oBWeek',
						checked: false
					},
					{
						val: 8,
						id: 'oBWeek08',
						name: 'oBWeek',
						checked: false
					},
					{
						val: '長期方案',
						id: 'oBWeekstanding',
						name: 'oBWeek',
						checked: false
					}
				],
				num: {
					val: '1',
					id: 'oBNum',
					name: 'oBNum'
				},
				calendar: {
					id: 'oBCal',
					name: 'oBCal'
				},
				frequency: [
					{
						val: '每週配送',
						id: 'oBFrequency01',
						name: 'oBFrequency',
						checked: true
					},
					{
						val: '隔週配送',
						id: 'oBFrequency02',
						name: 'oBFrequency',
						checked: false
					}
				],
				submitBtn: {
					id: 'oBBtnSend',
					name: 'oBBtnSend',
					val: '加入購物車'
				}
			},
			// 月曆：資料
			calendarData:{
				calMY:'',
				showCalBtn:'',
				calMYLeftSwitch:'',
				calMYRightSwitch:'',
				days:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
				data01:{
					mY:'September 2021',
					d:['','','',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,'']
				},
				data02:{
					mY:'January 2022',
					d:['','','','','','',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,'','','','','']
				}
			}
		};
	},
	methods: {
		// 展示圖：點小圖，更換大圖；被選中小圖，增加灰色遮罩；其他小圖，移除灰色遮罩。
		changePic(p) {
			if (p.id != this.bouquetPic[0].id) {
				this.bouquetPic[0].name = p.name;
				this.bouquetPic[0].image = p.image;

				for (i = 0; i < this.bouquetPic.length; i++) {
					this.bouquetPic[i].mask = 'noMask';
					if (p.name == this.bouquetPic[i].name) {
						p.mask = 'openMask';
					}
				}
			}
		},
		// 花束訂購(選擇週數、配送頻率)：被選中者，checked資料改為true，其餘皆為false
		choosePlan(w) {
			if (w.name == this.bouquetText.weeks[0].name) {
				for (i = 0; i < this.bouquetText.weeks.length; i++) {
					this.bouquetText.weeks[i].checked = false;
				}
			} else {
				for (i = 0; i < this.bouquetText.frequency.length; i++) {
					this.bouquetText.frequency[i].checked = false;
				}
			}
			w.checked = true;
		},
		// 花束訂購(數量設定)：keyup事件，鍵盤輸入數字，增加max/min限制。
		keyRestrict() {
			this.bouquetText.num.val = this.bouquetText.num.val > 100 ? 100 : this.bouquetText.num.val <= 0 ? '' : this.bouquetText.num.val;
		},
		// 花束訂購(數量設定)：blur事件，讓數量空值，強制變成1。
		keyNullValue(){
			this.bouquetText.num.val = this.bouquetText.num.val == '' ? 1 : this.bouquetText.num.val;
		},
		// 花束訂購(數量設定)：額外添增的減少數量按鈕，並設定無法低於1的限制。
		minus() {
			this.bouquetText.num.val--;
			this.bouquetText.num.val = this.bouquetText.num.val < 1 ? 1 : this.bouquetText.num.val;
		},
		// 花束訂購(數量設定)：額外添增的增加數量按鈕，並設定無法高於100的限制。
		plus() {
			this.bouquetText.num.val++;
			this.bouquetText.num.val = this.bouquetText.num.val > 100 ? 100 : this.bouquetText.num.val;
		},
		// 月曆：點擊後打開日期選單
		showCal(){
			this.calendarData.showCalBtn = 'appear';
			this.calendarData.calMY = this.calendarData.data01.mY;
			this.calendarData.calMYRightSwitch = 'open'
		},
		// 月曆：點擊後關閉日期選單
		hideCal(){
			this.calendarData.showCalBtn = '';
		},
		// 月曆：月/年的表格切換按鈕
		CalChangeMY(){
			if(this.calendarData.calMYRightSwitch == 'open'){
				this.calendarData.calMYLeftSwitch = 'open';
				this.calendarData.calMYRightSwitch = '';
				this.calendarData.calMY = this.calendarData.data02.mY;
			}else{
				this.calendarData.calMYLeftSwitch = '';
				this.calendarData.calMYRightSwitch = 'open';
				this.calendarData.calMY = this.calendarData.data01.mY;
			}
		},
		// 月曆：填入該週的日期
		decideDatesNum(w){
			if(this.calendarData.calMYRightSwitch == 'open'){
				let startIndex = (w-1)*7;
				return this.calendarData.data01.d.slice(startIndex,startIndex+7);
			}else{
				let startIndex = (w-1)*7;
				return this.calendarData.data02.d.slice(startIndex,startIndex+7);
			}
		}
	},
	computed: {
		// 花束訂購(選擇週數)：用於辨別此時被選定的週數(checked=true)為何，對應到的數字是什麼。
		chooseweek() {
			for (i = 0; i < this.bouquetText.weeks.length; i++) {
				if (this.bouquetText.weeks[i].checked == true) {
					return this.bouquetText.weeks[i].val == '長期方案' ? 1 : this.bouquetText.weeks[i].val;
				}
			}
		},
		// 花束訂購(總金額)：總金額 = 被選定週數 X 花束基本價格 X 數量設定，並加上千分位自動添加。
		totalPrice() {
			let t = this.chooseweek * this.bouquetText.basicPrice * this.bouquetText.num.val;
			let tString = t.toString();
			return tString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		// 月曆：計算週數，並轉為陣列傳回
		data01WeeksArray(){
			data01Weeks = this.calendarData.data01.d.length/7;
			let data01WeeksArray = [];
			for(i=0;i<data01Weeks;i++){
				data01WeeksArray.splice(i,0,i+1);
			}
			return data01WeeksArray;
		},
		// 月曆：計算週數，並轉為陣列傳回
		data02WeeksArray(){
			data02Weeks = this.calendarData.data02.d.length/7;
			let data02WeeksArray = [];
			for(i=0;i<data02Weeks;i++){
				data02WeeksArray.splice(i,0,i+1);
			}
			return data02WeeksArray;
		},
		// 月曆：用來對應月份的週數
		decideWeeksNum(){
			if(this.calendarData.calMYRightSwitch == 'open'){
				return this.data01WeeksArray;
			}else{
				return this.data02WeeksArray;
			}
		}
	}
}).mount('.content_oBArea');

// 花束訂購(數量設定)：使負數、小數點無法鍵盤輸入。
document.getElementById('oBNum').addEventListener('keypress', function(event) {
	if (event.keyCode == 45 || event.keyCode == 46 || event.keyCode == 13) {
		event.preventDefault();
	}
});
