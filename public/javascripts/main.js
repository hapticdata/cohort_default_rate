require([
	'jquery',
	'domReady'
],function($, domReady){



	var vimeo = {
		init: function(){

			$('.nav').find('li').each(function(){
				$(this).click(function(){
					this.$element.parent().find('.active').removeClass('active');
					this.$element.toggleClass('active');
				});
			});

			//resize vimeos
			$vimeos =	$('iframe[src^="http://player.vimeo.com"]');

			$vimeos.each(function(){
				$(this).data('ratio', this.width / this.height)
					.removeAttr('width')
					.removeAttr('height');
			});
			this.resize();
		},

		resize:	function(){
			var containerWidth = $('.vimeo').width();
			$vimeos.each(function(){
				console.log("ratio: "+$(this).data('ratio'));
				var newHeight = containerWidth / $(this).data('ratio');
				$(this).width(containerWidth)
				$(this).height(newHeight);
				console.log("new height: "+newHeight);
			});
		}
	};

	var initElements = function(){
		$('.full').each(function(i,ell){
			$(this).data({ ratio: $(this).height() / $(this).width()});
		});


/*
		var	canvas = document.getElementById('background'),
			ctx = canvas.getContext('2d');
		
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.fillStyle = "#efefef";
		ctx.strokeStyle = "#999999";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();
		ctx.arc(canvas.width/2,canvas.height/2,25,0,Math.PI*2);
		ctx.closePath();
		ctx.stroke();
*/

		adjustElements();
	};

	var adjustElements = function(){
		$('.full').height(window.innerHeight);
		$('.scale').each(function(i,el){
			$(this).css({
				width: $(this).width($(this).parent().width()),
				height: $(this).width() * Number($(this).data('ratio'))
			});
		});
	};

	var hasMinimized = false;
	var updateNavbars = function(){
		if($('body').width() <= 640){
			hasMinimized = true;
			var offset = Math.min($('body').scrollTop(),40);
			$("#logo").height(40 - offset);
			$('.navbar').height(80 - offset);
			$('.subnav-fixed').css('top',80 - offset);
		} else if(hasMinimized){
			$("#logo").height(40);
			$('.navbar').height(40);
			$('.subnav-fixed').css('top',40);
			hasMinimized = false;
		}
	};

	domReady(function(){
		initElements();
		vimeo.init();
		$(window).resize(function(){
			adjustElements();
			vimeo.resize();
			updateNavbars();
		});

		
		$(window).scroll(updateNavbars);
	});
});