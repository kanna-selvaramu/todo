var todoData = [];
var al = 1, active = 2, comp = 3;
function registerEvents(){
	$(".cls_skTodoInp").keyup(function(e){
		if(e.keyCode == 13)
		{
			$(this).trigger("enterKey");
		}
	});
	$(".cls_skTodoInp").bind("enterKey",function(){
		var todoData = JSON.parse(localStorage.getItem("todolist"));
		if($(".cls_skTodoInp").val() != "")
		{
			todoData.push({"id":guid(),"title": $(".cls_skTodoInp").val(),"completed": false});
			localStorage.setItem("todolist",JSON.stringify(todoData));
			$(".cls_skTodoInp").val("");
			renderList(al);
			renderFooter();
		}
		console.log(todoData);
	});
	$(".cls_skAll").on("click",function(){
		$(".cls_skFilters div").removeClass("selected");
		$(this).addClass("selected");
		renderList(al);
	});
	$(".cls_skActive").on("click",function(){
		$(".cls_skFilters div").removeClass("selected");
		$(this).addClass("selected");
		renderList(active);
	});
	$(".cls_skCompleted").on("click",function(){
		$(".cls_skFilters div").removeClass("selected");
		$(this).addClass("selected");
		renderList(comp);
	});
}
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
function renderList(type)
{
	console.log("In renderList");
	var todoData = JSON.parse(localStorage.getItem("todolist"));
	$(".cls_skTodoContentWrapper").show();
	var arrayStr = "";
	if(type == al)
	{
		for(var ctr = 0; ctr < todoData.length; ctr++)
		{
			arrayStr += "<li data-id="+todoData[ctr].id+"><div class='list-content'><input class='compBox"+(todoData[ctr].completed == true?" checked":" ")+"' type='checkbox'><div class='list-title'>"+todoData[ctr].title+"</div><div class='toclear'></div></div></li>";
		}
	}
	else if(type == active)
	{
		for(var ctr = 0; ctr < todoData.length; ctr++)
		{
			if(todoData[ctr].completed == false)
				arrayStr += "<li data-id="+todoData[ctr].id+"><div class='list-content'><input class='compBox' type='checkbox'><div class='list-title'>"+todoData[ctr].title+"</div><div class='toclear'></div></div></li>";
		}
	}
	else if(type == comp)
	{
		for(var ctr = 0; ctr < todoData.length; ctr++)
		{
			if(todoData[ctr].completed == true)
				arrayStr += "<li data-id="+todoData[ctr].id+"><div class='list-content'><input class='compBox checked' type='checkbox'><div class='list-title'>"+todoData[ctr].title+"</div><div class='toclear'></div></div></li>";
		}
	}	
	$("#todo-list").empty();	
	$("#todo-list").append(	arrayStr);
	registerListEvents();
}
function registerListEvents()
{
	var todoData = JSON.parse(localStorage.getItem("todolist"));
	$(".compBox").off("click").on("click",function(){
		$(this).toggleClass("checked");
		var parEl = $(this).parents("li");
		var result = $.grep(todoData, function(ctr){ 
			return ctr.id == $(parEl).attr("data-id"); 
		});
		result[0].completed = $(this).hasClass("checked")?true:false;
		localStorage.setItem("todolist",JSON.stringify(todoData));
		renderFooter();
	});
	$(".toclear").off("click").on("click",function(){
		var parEl = $(this).parents("li");
		for (var ctr =0; ctr< todoData.length; ctr++) {
			if (todoData[ctr].id == $(parEl).attr("data-id")) {
				todoData.splice(ctr, 1);
			}
		}
		localStorage.setItem("todolist",JSON.stringify(todoData));
		renderList(al);
		renderFooter();
	});
}
function renderFooter()
{
	var todoData = JSON.parse(localStorage.getItem("todolist"));
	var result = $.grep(todoData, function(ctr){ 
		return ctr.completed == false; 
	});
	if(todoData.length > 0)
	{
		$(".cls_skCount span").text(result.length);
		$(".cls_skTodoBottomWrapper").show();
	}
	else
	{
		$(".cls_skTodoBottomWrapper").hide();
	}
}
$(document).ready(function(){
	if(localStorage)
	{
		localStorage.setItem("todolist","[]");
		$(".cls_skTodoBottomWrapper").hide();
		$(".cls_skTodoContentWrapper").hide();
	}
	registerEvents();
});