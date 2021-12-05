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
					val: '',
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
				calMonthYear:'',
				calDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
				classShowCal:'',
				classLeftSwitch:'',
				classRightSwitch:'',
				data01:{
					monthYear:'September 2021',
					date:['','','',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,'']
				},
				data02:{
					monthYear:'January 2022',
					date:['','','','','','',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,'','','','','']
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
				}
				p.mask = 'openMask';
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
			this.calendarData.classShowCal = 'appear';
			this.calendarData.calMonthYear = this.calendarData.data01.monthYear;
			this.calendarData.classRightSwitch = 'open';
		},
		// 月曆：點擊後關閉日期選單
		hideCal(){
			this.calendarData.classShowCal = '';
		},
		// 月曆：月/年的表格切換按鈕
		RLSwitch(){
			if(this.calendarData.classRightSwitch == 'open'){
				this.calendarData.classLeftSwitch = 'open';
				this.calendarData.classRightSwitch = '';
				this.calendarData.calMonthYear  = this.calendarData.data02.monthYear;
			}else{
				this.calendarData.classLeftSwitch = '';
				this.calendarData.classRightSwitch = 'open';
				this.calendarData.calMonthYear  = this.calendarData.data01.monthYear;
			}
		},
		// 月曆：填入該週的日期，並決定是否可選(加上class)
		datesNum(w){
			if(this.calendarData.classRightSwitch == 'open'){
				let startIndex = (w-1)*7;
				let datesArray =  this.calendarData.data01.date.slice(startIndex,startIndex+7);
				let datesInfoArray = [];
				for(i=0;i<datesArray.length;i++){
					datesInfoArray.push({
						num:datesArray[i],
						class:''
					})
					if(i == 1 && datesArray[i] != ''){
						datesInfoArray[i].class = 'choose';
					}
				}
				return datesInfoArray;
			}else{
				let startIndex = (w-1)*7;
				let datesArray =  this.calendarData.data02.date.slice(startIndex,startIndex+7);
				let datesInfoArray = [];
				for(i=0;i<datesArray.length;i++){
					datesInfoArray.push({
						num:datesArray[i],
						class:''
					})
					if(i == 1 && datesArray[i] != ''){
						datesInfoArray[i].class = 'choose';
					}
				}
				return datesInfoArray;
			}
		},
		// 月曆：用來將選入的日期，填入開始配送週的欄位，並關閉月曆表格
		chooseDate(d){
			this.calendarData.classShowCal = '';

			if(this.calendarData.calMonthYear == this.calendarData.data01.monthYear){
				this.bouquetText.calendar.val = '2021/12/'+d;
			}else{
				this.bouquetText.calendar.val = '2021/1/'+d;
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
		// 月曆：計算當月週數，並轉為陣列傳回(例如：12月有5週，則回傳[1,2,3,4,5])，用來產生與週數相同的tr
		weeksArray(){
			if(this.calendarData.classRightSwitch == 'open'){
				weeksNum = this.calendarData.data01.date.length/7;
				let weeksArray = [];
				for(i=0;i<weeksNum;i++){
					weeksArray.splice(i,0,i+1);
				}
				return weeksArray;
			}else{
				weeksNum = this.calendarData.data02.date.length/7;
				let weeksArray = [];
				for(i=0;i<weeksNum;i++){
					weeksArray.splice(i,0,i+1);
				}
				return weeksArray;
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
