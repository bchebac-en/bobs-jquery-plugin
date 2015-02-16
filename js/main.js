var page = {
	title: 'Bob\'s practice playground'
},  tooltips = {
	title: ['Default', 'Custom 1', 'Custom 2', 'Custom 3'],
	description: ['This here is supposed to have default behaviour X3. This here is supposed to have default behaviour X3. This here is supposed to have default behaviour X3. ', 'Custom behaviour #1 Custom behaviour #1 Custom behaviour #1 Custom behaviour #1 Custom behaviour #1 ', 'The tooltip custom behaviour #2 The tooltip custom behaviour #2 The tooltip custom behaviour #2 The tooltip custom behaviour #2 The tooltip custom behaviour #2 The tooltip custom behaviour #2 ', 'Last custom behaviour (maybe) #3 Last custom behaviour (maybe) #3 ']
},  pageTemplate = JST['templates/intro-template.hbs'],
	tooltipTemplate = JST['templates/content-template.hbs'],
	html = pageTemplate(page),
	tooltipHtml = tooltipTemplate(tooltips);


$('header').html(html);
$('#tooltip-list').html(tooltipHtml);

$('.tooltip').hide();

$('.tooltip-list-item')
    .hover(function() {

        var containerTop = $(this).offset().top,
        	containerLeft = $(this).offset().left,
        	containerHeight = $(this).height(),
        	containerWidth = $(this).width(),
        	tooltipWidth = $('.tooltip').width(),
        	tooltipIndex = $(this).siblings().html(),
        	ARROWSIZE = 10;

        	$('.tooltip')
        	.show()
        	.offset({top: containerTop + containerHeight + ARROWSIZE, left: (containerLeft + containerWidth / 2) - tooltipWidth / 2 - ARROWSIZE / 2})
        	.html(tooltips.description[tooltipIndex]);

    }, function() {
    	// $('.tooltip').hide();
    });


