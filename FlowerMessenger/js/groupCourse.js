let headerNav = document.querySelector('.header_nav');
let contentGroupCourse = document.querySelector('.content_groupCourse');

//用來定特效出現的高度參考點
let header = document.querySelector('.header');
let content = document.querySelector('.content');

document.addEventListener('scroll', () => {
    let scrollTop = document.documentElement.scrollTop;

    if (scrollTop > header.offsetTop) {
        // 『主要內容區-課程須知』的內容漸入
        contentGroupCourse.classList.add('locate');
    }

    if (scrollTop > content.offsetTop) {
        // 『頂部內容區-導覽列』的新增BackToTop
        headerNav.classList.add('navPlusTop');
    } else {
        // 『頂部內容區-導覽列』的移除BackToTop
        headerNav.classList.remove('navPlusTop');
    }
})