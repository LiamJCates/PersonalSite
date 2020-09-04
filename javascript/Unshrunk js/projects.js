/*  Projects Background */
window.addEventListener("mousemove", function (event)
{
	windowWidth = document.getElementById("background").offsetWidth;
	windowHeight = document.getElementById("background").offsetHeight;

	mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
	mouseYpercentage = Math.round(event.pageY / windowHeight * 100);

	document.getElementById("background").style.background =
		'repeating-radial-gradient(circle at ' +
		(mouseXpercentage - 50) + '%' + (mouseYpercentage - 105) + '%, \
    #fedc00 0, #fedc00 calc(01/35 * 100%),\
    #fcb712 0, #fcb712 calc(02/35 * 100%),\
    #f7921e 0, #f7921e calc(03/35 * 100%),\
    #e87f24 0, #e87f24 calc(04/35 * 100%),\
    #dd6227 0, #dd6227 calc(05/35 * 100%),\
    #dc4c27 0, #dc4c27 calc(06/35 * 100%),\
    #ca3435 0, #ca3435 calc(07/35 * 100%),\
    #b82841 0, #b82841 calc(08/35 * 100%),\
    #953751 0, #953751 calc(09/35 * 100%),\
    #354c88 0, #354c88 calc(10/35 * 100%),\
    #16599d 0, #16599d calc(11/35 * 100%),\
    #02609e 0, #02609e calc(12/35 * 100%),\
    #0073a9 0, #0073a9 calc(13/35 * 100%),\
    #008aa4 0, #008aa4 calc(14/35 * 100%),\
    #239a87 0, #239a87 calc(15/35 * 100%),\
    #7cba6d 0, #7cba6d calc(16/35 * 100%),\
    #becc2f 0, #becc2f calc(17/35 * 100%),\
    #e0d81d 0, #e0d81d calc(18/35 * 100%),\
    #becc2f 0, #becc2f calc(19/35 * 100%),\
    #7cba6d 0, #7cba6d calc(20/35 * 100%),\
    #239a87 0, #239a87 calc(21/35 * 100%),\
    #008aa4 0, #008aa4 calc(22/35 * 100%),\
    #0073a9 0, #0073a9 calc(23/35 * 100%),\
    #02609e 0, #02609e calc(24/35 * 100%),\
    #16599d 0, #16599d calc(25/35 * 100%),\
    #354c88 0, #354c88 calc(26/35 * 100%),\
    #953751 0, #953751 calc(27/35 * 100%),\
    #b82841 0, #b82841 calc(28/35 * 100%),\
    #ca3435 0, #ca3435 calc(29/35 * 100%),\
    #dc4c27 0, #dc4c27 calc(30/35 * 100%),\
    #dd6227 0, #dd6227 calc(31/35 * 100%),\
    #e87f24 0, #e87f24 calc(32/35 * 100%),\
    #f7921e 0, #f7921e calc(33/35 * 100%),\
    #fcb712 0, #fcb712 calc(34/35 * 100%),\
    #fedc00 0, #fedc00 100%),' +
		'repeating-radial-gradient(circle at ' +
		(mouseXpercentage + 50) + '%' + (mouseYpercentage - 105) + '%,\
    #fedc00 0, #fedc00 calc(01/35 * 100%),\
    #fcb712 0, #fcb712 calc(02/35 * 100%),\
    #f7921e 0, #f7921e calc(03/35 * 100%),\
    #e87f24 0, #e87f24 calc(04/35 * 100%),\
    #dd6227 0, #dd6227 calc(05/35 * 100%),\
    #dc4c27 0, #dc4c27 calc(06/35 * 100%),\
    #ca3435 0, #ca3435 calc(07/35 * 100%),\
    #b82841 0, #b82841 calc(08/35 * 100%),\
    #953751 0, #953751 calc(09/35 * 100%),\
    #354c88 0, #354c88 calc(10/35 * 100%),\
    #16599d 0, #16599d calc(11/35 * 100%),\
    #02609e 0, #02609e calc(12/35 * 100%),\
    #0073a9 0, #0073a9 calc(13/35 * 100%),\
    #008aa4 0, #008aa4 calc(14/35 * 100%),\
    #239a87 0, #239a87 calc(15/35 * 100%),\
    #7cba6d 0, #7cba6d calc(16/35 * 100%),\
    #becc2f 0, #becc2f calc(17/35 * 100%),\
    #e0d81d 0, #e0d81d calc(18/35 * 100%),\
    #becc2f 0, #becc2f calc(19/35 * 100%),\
    #7cba6d 0, #7cba6d calc(20/35 * 100%),\
    #239a87 0, #239a87 calc(21/35 * 100%),\
    #008aa4 0, #008aa4 calc(22/35 * 100%),\
    #0073a9 0, #0073a9 calc(23/35 * 100%),\
    #02609e 0, #02609e calc(24/35 * 100%),\
    #16599d 0, #16599d calc(25/35 * 100%),\
    #354c88 0, #354c88 calc(26/35 * 100%),\
    #953751 0, #953751 calc(27/35 * 100%),\
    #b82841 0, #b82841 calc(28/35 * 100%),\
    #ca3435 0, #ca3435 calc(29/35 * 100%),\
    #dc4c27 0, #dc4c27 calc(30/35 * 100%),\
    #dd6227 0, #dd6227 calc(31/35 * 100%),\
    #e87f24 0, #e87f24 calc(32/35 * 100%),\
    #f7921e 0, #f7921e calc(33/35 * 100%),\
    #fcb712 0, #fcb712 calc(34/35 * 100%),\
    #fedc00 0, #fedc00 100%)'
});


/* Tiles */
function updateReflection(project)
{
	var element = document.getElementById(project);
	var backgroundFilePath = "images/";
	var backgroundFileName = "-background.png";
	var imgUrl = backgroundFilePath + project + backgroundFileName;

	var bodyRect = document.body.getBoundingClientRect(),
		elemRect = element.getBoundingClientRect(),
		offset = elemRect.top - bodyRect.top;

	let adjustedX = event.pageX - elemRect.left;
	let adjustedY = event.pageY - offset;
	let halfWidth = element.clientWidth / 2;
	let halfHeight = element.clientHeight / 2;
	let xdeg = (adjustedX - halfWidth) / halfWidth;
	let ydeg = (adjustedY - halfHeight) / halfHeight;

	element.style.transform = `rotateX(${ydeg * 15}deg) rotateY(${xdeg * 15}deg)`;

	let degree = ydeg * 180;
	let percentage = xdeg * 100;
	element.style.background = `linear-gradient(${degree}deg, rgba(255,255,255,0) 0%,rgba(255,255,255,0.5) ${percentage}%,rgba(255,255,255,0) 100%), url('${imgUrl}')`;

	element.style.backgroundSize = "cover";
	element.style.backgroundPosition = "center";
}

function resetReflection(project)
{
	var element = document.getElementById(project);
	element.style.transform = `rotateX(0deg) rotateY(0deg)`;
	element.style.background = 'transparent';
}