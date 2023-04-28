(function($) {
  $(function($){
    
//userID == null일때 로그인팝업창 
$(function(){
  $('#go-group-1').on('click',function(){
    var login = confirm('로그인시 이용이 가능합니다. 로그인 페이지로 이동하시겠습니까?');
    if (login) {
      window.open("loginPopUp.jsp", "Login", "width=450, height=500, top=50%, left=50%") ;
    }
    else {
    }
    });
});
$(function(){
  $('#create-group').on('click',function(){
      window.open("groupPopup.jsp", "Login", "width=450, height=500, top=50%, left=50%") ;
    });
});
// $(function(){
//   $('#join-group-btn').on('click',function(){
//     var groupID = '<%= list.get(i).getGroupID() %>';
//     var groupAvailable = '<%= list.get(i).getGroupAvailable() %>';
//     if(groupAvailable == 1){
//       var joinGroup = confirm('가입 하시겠습니까?');
//       if (joinGroup) {
//         window.open("groupJoinPopUp.jsp?groupID=" + groupID , "Join", "width=450, height=450, top=50%, left=50%") ;
//       }
//       else {
//         location.href='history.back()';
//       }
//     }else{
//       alert("비활동 중인 그룹입니다.");
//     }
//   })
// });

//마우스 커서 이벤트 ------
let a = document.createElement('div');
let header = document.getElementById('header');
//모든 페이지에 <div class="cursor"> 삽입
a.setAttribute("class","cursor");
header.appendChild(a);

let mouseCursor = document.querySelector(".cursor");
//window 객체에 scroll & mouse 이벤트를 추가하고 cursor함수 실행되도록 함
window.addEventListener("scroll", cursor);
window.addEventListener("mousemove", cursor);
//커스텀 커서의 left값과 top값을 커서의 XY좌표값과 일치시킴
function cursor(e) {
mouseCursor.style.left = e.pageX + "px";
mouseCursor.style.top = e.pageY - scrollY + "px";
}
// ------------------------

// $(function loginPU(){
// 		var login = confirm('로그인시 이용이 가능합니다. 로그인 페이지로 이동하시겠습니까?');
// 		if (login) {
// 			window.open("login.jsp", "Login", "width=410, height=400, top=50%, left=50%") ;
//     }
// 		else {
// 			location.href='mainPage.jsp';
// 		}
// });

 
// $(function(){
//     $("#go-qna").on('click', function(){
//       var login = confirm('로그인시 이용이 가능합니다. 로그인 페이지로 이동하시겠습니까?');
//       if (login) {
//         window.open("login.jsp", "Login", "width=410, height=400, top=50%, left=50%") ;
//       }
//       else {
//         location.href='mainPage.jsp';
//       }
//     });
// });

  

//navbar togglebuttton 눌렀을 때 메뉴 펼치고 접기
const toggleBtn = document.querySelector('.navbar_toggleBtn');
const menu = document.querySelector('.navbar_menu');
const icons = document.querySelector('.navbar_login');

toggleBtn.addEventListener('click', () =>{
	menu.classList.toggle('active');
	icons.classList.toggle('active');

});


//스크롤 시 header color change
$(function(){
    // 스크롤 시 header fade-in
    $(document).on('scroll', function(){
        if($(window).scrollTop() > 200){
            $("#header").removeClass("de-active");
            $("#header").addClass("active");
        }else{
            $("#header").removeClass("active");
            $("#header").addClass("de-active");
        }
    })

});
/*
// 스크롤 움직일때 헤더 숨기기
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    lastScrollTop = st;
}

*/


//mainPage 슬라이드
var btn = document.querySelectorAll('.arrowBtn')
var slides = document.querySelectorAll('.slide').length - 1
var slot = 0

//왼쪽 버튼
btn[0].addEventListener('click', function(e){
  if(play) {
    clearInterval(play)
  }
  var e = document.querySelector('.showing')
  
  if(slot == 0) {
    slot = 3   
    document.querySelectorAll('.slide')[slides].classList.add('showing')
    e.classList.remove('showing')     
  } else {
    slot-- 
    e.previousElementSibling.classList.add('showing')
    e.classList.remove('showing')     
  }   
})

//오른쪽 버튼
btn[1].addEventListener('click', function(e){
  if(play) {
    clearInterval(play)
  }
  var e = document.querySelector('.showing')   
  
  if(slot == slides) {
    slot = 0
    document.querySelectorAll('.slide')[0].classList.add('showing')
    e.classList.remove('showing')      
  } else {
     slot++ 
    e.nextElementSibling.classList.add('showing')
    e.classList.remove('showing')  
  }  
})

//자동으로 슬라이드
function autoPlay() {
  e = document.querySelector('.showing')
  if(slot == slides) {
    slot = 0
    document.querySelectorAll('.slide')[0].classList.add('showing')
    e.classList.remove('showing')      
  } else {
    slot++ 
    e.nextElementSibling.classList.add('showing')
    e.classList.remove('showing')  
  }  
}
var play = setInterval(autoPlay, 5000)

// mainPage 오른쪽 스크롤버튼

//클릭 시 페이지 상단으로 이동
$(function(){
    $('.moveTop').on('click', function(){
      window.scrollTo({ top: 0, behavior: "smooth" });  
    });
});

//클릭 시 페이지 하단으로 이동
$(function(){
    $('.moveBottom').on('click', function(){
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
});

 
});
})(jQuery);