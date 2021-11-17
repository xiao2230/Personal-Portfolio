let headerNav = document.querySelector('.header_nav');
let contentPreface = document.querySelectorAll('.content_preface p');
let contentPrefaceBg = document.querySelector('.content_preface .prefaceBg');

//用來定特效出現的高度參考點
let header = document.querySelector('.header');
let content = document.querySelector('.content');

document.addEventListener('scroll', () => {
    let scrollTop = document.documentElement.scrollTop;

    if (scrollTop > header.offsetTop) {
		// 『主要內容區-前言』的內文漸入，背景漸入
		for (i = 0, t = 0; i < contentPreface.length; i++, t += 400) {
			setTimeout(`contentPreface[${i}].classList.add('locate')`, t);
		}
		contentPrefaceBg.classList.add('appear');
	}

    if (scrollTop > content.offsetTop) {
        // 『頂部內容區-導覽列』的新增BackToTop
        headerNav.classList.add('navPlusTop');
    } else {
        // 『頂部內容區-導覽列』的移除BackToTop
        headerNav.classList.remove('navPlusTop');
    }
})