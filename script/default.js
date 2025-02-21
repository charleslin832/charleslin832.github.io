/* VM Set */
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
			tableData: []
		}
	},
	getters: {},
	actions: {
		initData(payload){
			console.log('init');
			let url = "https://script.google.com/macros/s/AKfycbyyc4-AdcUevALIf5q3R_UgKfYYge4yGZ8Ll0gUvRtV4zvkqYwfIg25CQJ0EnmT6s7L-g/exec";
			let data = {
				startRow: 2,
				startColumn: 1,
				id: "1NUkbREpnVzU3EZHXcrA-QPqU9WjF76FsU-IVFiNStbY",
				name: "table-0"
			}.toString();
			axios.post(url, data)
				.then((res) => {
					console.log("res:", res);
				})
				.catch((error) => {
					console.log("error:", error);
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
			linkType: controlData.value.linkType,
			orderTime: controlData.value.orderTime,
			pageType: controlData.value.pageType,
			isPageCover: controlData.value.isPageCover,
		});
		function changeForm(){
			pageStore.changeControlData({
				linkType: controlFormData.value.linkType,
				orderTime: controlFormData.value.orderTime,
				pageType: controlFormData.value.pageType,
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
			if (controlData.value.pageType !== 0){
				tableDataFilterArray = arrayData.filter(function (item) {
					return item[5] == controlData.value.pageType;
				});
			}
			// 線上狀態
			if (controlData.value.linkType == 1){
				tableDataFilterArray = arrayData.filter(function (item) {
					return item[3] == 1;
				});
			} else if (controlData.value.linkType == 2) {
				tableDataFilterArray = arrayData.filter(function (item) {
					return item[3] == 2 || item[3] == 3;
				});
			}

			// 時間排序
			if (controlData.value.orderTime == 1) {
				tableDataFilterArray.sort((a, b) => new Date(b[4]) - new Date(a[4]));
			}else{
				tableDataFilterArray.sort((a, b) => new Date(a[4]) - new Date(b[4]));
			}

			return tableDataFilterArray;
		});
		// 線上狀態
		function linkTypeText(type){
			let text = '';
			switch (type) {
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
			switch (type) {
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