let headerNav = document.querySelector('.header_nav');
let contentPrivacyPolicy = document.querySelector('.content_privacyPolicy');

//用來定特效出現的高度參考點
let content = document.querySelector('.content');

document.addEventListener('DOMContentLoaded', () => {
	let scrollTop = document.documentElement.scrollTop;

	// 『主要內容區-隱私政策』的內容漸入
	contentPrivacyPolicy.classList.add('locate');
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
