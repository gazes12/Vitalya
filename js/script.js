$(document).ready(function(){function t(){$(window).width()>768?$(".owl-carousel").trigger("destroy.owl.carousel"):$(".owl-carousel").owlCarousel({items:1})}let e;function s(t,[s,a],n){if(null!=e&&clearInterval(e),i.removeClass("visible"),i.children().each(function(){$(this).removeClass("visible")}),setTimeout(()=>{i.addClass("visible"),t.addClass("visible")},500),arguments[1].length>0&&(t.removeClass("info__result--error info__result--succ"),t.html(arguments[1][0]),t.addClass(`info__result--${arguments[1][1]}`)),"yes"==n){let s=[];s.push(i.attr("class")),t.children().each(function(){s.push($(this).attr("class"))}),e=setTimeout(()=>{i.removeClass("visible"),t.removeClass("visible")},5e3)}else i.bind("close",()=>i.removeClass("visible"))}$(".owl-carousel").owlCarousel({items:1,loop:!0,autoPlay:!0,center:!0,nav:!0,navText:['<div class="mobile-gallery__prev"><i class="fa-solid fa-backward"></i></div>','<div class="mobile-gallery__next"><i class="fa-solid fa-forward"></i></div>']}),$("#prev").click(function(){owl.trigger("owl.prev")}),$("#next").click(function(){owl.trigger("owl.next")}),$(window).resize(function(){t()}),t();const i=$(".info"),a=$(".info-callToPhones"),n=$(".info-callToPhones__button"),l=$(".info__result"),r=$(".info__saved"),o=$(".info__saved button"),v=$(".menu__open"),d=$(".menu__close"),c=$(".menu__list"),m=$(".menu__item");$("i").each(function(){let t=$(this),e=setTimeout(function s(){t.animate({borderSpacing:-360},{step:function(t,e){$(this).css("transform","rotate("+t+"deg)")},duration:1e3},"linear");e=setTimeout(s,5e3)},5e3)}),$(".form-reviews__input").each(function(){let t=$(this);t.keypress(()=>t.css("transform","scale(1.02)")),t.keyup(()=>t.css("transform","scale(1)"))}),$(".contacts__button").click(()=>{s(a,"","yes")}),n.click(()=>{i.removeClass("visible"),a.removeClass("visible")});const _=$(".reviews__items"),u=($(".info-reviews__savedChanges"),$(".item-reviews--changer")),w=$(".item-reviews__name"),f=$(".item-reviews__surname"),h=$(".item-reviews__review");changer_date=$(".item-reviews__date"),$(document).on("click",".item-reviews__change",function(){let t=$(this).parents(".item-reviews"),e=t.attr("data-id"),a=t.find(".item-reviews__name").text(),n=t.find(".item-reviews__surname").text(),v=t.find(".item-reviews__review").text(),d=t.find(".item-reviews__date").text();t.addClass("hidden"),u.addClass("visible"),w.val(a),f.val(n),h.val(v),changer_date.val(d),s(r,"",""),o.click(()=>{t.removeClass("hidden");let a=$(".item-reviews--changer .item-reviews__name").val(),n=$(".item-reviews--changer .item-reviews__surname").val(),r=$(".item-reviews--changer .item-reviews__review").val();$.ajax({url:"../../php/reviews/changeReview.php",type:"post",dataType:"json",data:{id:e,new_name:a,new_surname:n,new_review:r},success:function(t){console.log(_.find(`[data-id=${e}]`)),_.find(`[data-id=${e}]`).html(`\n\t\t\t\t\t<div class="item-reviews__header">\n\t\t\t\t\t\t<div class="item-reviews__fio">\n\t\t\t\t\t\t\t<div class="item-reviews__name">${t[0].name}</div>\n\t\t\t\t\t\t\t<div class="item-reviews__surname">${t[0].surname}</div>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t<div class="item-reviews__info">\n\t\t\t\t\t\t\t<div class="item-reviews__date">${t[0].date}</div>\n\t\t\t\t\t\t\t<div class="item-reviews__buttons">\n\t\t\t\t\t\t\t\t<button class="item-reviews__delete btn"></button>\n\t\t\t\t\t\t\t\t<button class="item-reviews__change btn"></button>\n\t\t\t\t\t\t\t</div>\t\n\n\t\t\t\t\t\t\t<div class="item-reviews__settings"><i class="fa-solid fa-ellipsis-vertical"></i></div>\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\n\n\t\t\t\t\t<div class="item-reviews__review">${t[0].review}</div>\t\t\t\t\t\n\t\t\t\t`),u.removeClass("visible"),i.trigger("close"),s(l,["Отзыв изменен!","succ"],"yes")}})})}),$(document).on("click",".item-reviews__delete",function(){let t=$(this).parents(".item-reviews"),e=t.attr("data-id");$.ajax({url:"../../php/reviews/deleteReview.php",type:"post",data:{id:e},success:function(e){t.remove(),s(l,["Отзыв удален!","succ"],"yes")}})}),$(document).click(function(t){$(t.target).hasClass("item-reviews__settings")?$(t.target).parents(".item-reviews__header").find(".item-reviews__buttons").addClass("visible"):$(".item-reviews__buttons").each(function(){$(this).removeClass("visible")})});const b=$(".form-reviews__button"),g=$(".form-reviews__inputName"),C=$(".form-reviews__inputSurName"),p=$(".form-reviews__inputReview"),y=$(".reviews__items");$(".reviews__errors");b.click(t=>{t.preventDefault(),$.ajax({url:"../../php/reviews/sendReview.php",type:"post",dataType:"json",data:{name:g.val(),surname:C.val(),review:p.val()},success:function(t){t.errors?s(l,[t.errors,"error"],"yes"):(s(l,["Отзыв добавлен!","succ"],"yes"),y.append(`\n\t\t\t\t\t<div class="reviews__item item-reviews" data-id="${t[0].id}">\n\t\t\t\t\t\t<div class="item-reviews__header">\n\t\t\t\t\t\t\t<div class="item-reviews__fio">\n\t\t\t\t\t\t\t\t<div class="item-reviews__name">${t[0].name}</div>\n\t\t\t\t\t\t\t\t<div class="item-reviews__surname">${t[0].surname}</div>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class="item-reviews__info">\n\t\t\t\t\t\t\t\t<div class="item-reviews__date">${t[0].date}</div>\n\t\t\t\t\t\t\t\t<div class="item-reviews__buttons">\n\t\t\t\t\t\t\t\t\t<button class="item-reviews__delete btn"></button>\n\t\t\t\t\t\t\t\t\t<button class="item-reviews__change btn"></button>\n\t\t\t\t\t\t\t\t</div>\t\n\n\t\t\t\t\t\t\t\t<div class="item-reviews__settings"><i class="fa-solid fa-ellipsis-vertical"></i></div>\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t<div class="item-reviews__review">${t[0].review}</div>\n\t\t\t\t\t</div>\t\n\t\t\t\t`))}})}),v.click(()=>{c.addClass("visible"),d.addClass("visible"),$("body").addClass("lock")}),$(".menu__item:not('.noLine'), .menu__subMenu-item").click(()=>{c.removeClass("visible"),d.removeClass("visible"),$("body").removeClass("lock")}),d.click(()=>{c.removeClass("visible"),d.removeClass("visible"),$("body").removeClass("lock")}),m.on("mouseover",function(){let t=$(this);t.find(".menu__subMenu-list").addClass("visible"),t.find(".menu__icon").addClass("up")}),m.on("mouseout",function(){let t=$(this);t.find(".menu__subMenu-list").removeClass("visible"),t.find(".menu__icon").removeClass("up")}),null==localStorage.getItem("theme")?localStorage.setItem("theme","dark"):"dark"==localStorage.getItem("theme")?($("body").addClass("dark"),$("body").removeClass("light")):"light"==localStorage.getItem("theme")&&($("body").addClass("light"),$("body").removeClass("dark"));let k=$(".toggleTheme__on"),x=$(".toggleTheme__off");x.click(()=>{localStorage.setItem("theme","light"),$("body").addClass("light"),$("body").removeClass("dark"),x.addClass("hidden"),k.removeClass("hidden")}),k.click(()=>{localStorage.setItem("theme","dark"),$("body").addClass("dark"),$("body").removeClass("light"),k.addClass("hidden"),x.removeClass("hidden")})});