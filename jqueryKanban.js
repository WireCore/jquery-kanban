(function($){
	
	$.fn.jqueryKanban = function(options){

		var board = "";
		
		var test = `
			<div>${tesdt123()}</div> 
		`;
		console.log(test);
		
		$(options['lists']).each(function(index,value){
			board += '<div class="kanban-list">';
			board += '<div class="kanban-list-header"><span class="kanban-list-title">'+value['title']+'</span><button class="kanban-list-button kanban-list-header-button"><i class="fas fa-ellipsis-h"></i></button></div>';
			
			$(value['cards']).each(function(index1,value1){
				board += '<div class="kanban-item">';
				
				// wenn bild vorhanden ist
				if(typeof value1['image'] !== 'undefined'){
					board += '<div class="kanban-item-row"><img src="'+value1['image']+'" class="kanban-item-image" /></div>';
				}
				
				// wenn labels vorhanden sind
				if(typeof value1['labels'] !== 'undefined' && Array.isArray(value1['labels'])){
					
					board += '<div class="kanban-item-row">';
					
					$(value1['labels']).each(function(index_label,value_label){
						
						board += '<span class="kanban-item-label" style="background-color:'+value_label['color']+';"></span>';
						
					});
					
					board += '</div>';
				
				}
				
				board += '<div class="kanban-item-row">'+value1['title']+'</div>';
				
				board += '<div class="kanban-item-row">';
				
				// wenn eine beschreibung vorhanden ist
				if(typeof value1['description'] !== 'undefined' && value1['description'] == true){
					board += '<span class="kanban-item-icon"><i class="fas fa-align-left"></i></span>';
				}
				
				// wenn attachement vorhanden sind
				if(typeof value1['attachements'] !== 'undefined' && value1['attachements'] > 0){
					board += '<span class="kanban-item-icon"><i class="fas fa-paperclip"></i> '+value1['attachements']+'</span>';
				}
				
				// wenn comments vorhanden sind
				if(typeof value1['comments'] !== 'undefined' && value1['comments'] > 0){
					board += '<span class="kanban-item-icon"><i class="far fa-comment"></i> '+value1['comments']+'</span>';
				}
				
				// wenn checklisten vorhanden sind
				if(typeof value1['checklist'] !== 'undefined'){
					board += '<span class="kanban-item-icon"><i class="far fa-check-square"></i> '+value1['checklist']+'</span>';
				}
				
				// wenn eigene Icons vorhanden sind
				if(typeof value1['customIcons'] !== 'undefined'){
					
					$(value1['customIcons']).each(function(ci,customIcon){
						
						board += '<span class="kanban-item-icon">' + customIcon['icon'] + " " + customIcon['text'] + '</span>';
						
					});
					
				}
				
				board += '</div>';
				
				board += '</div>';
			});
			
			board += '<div class="kanban-list-footer"><button class="kanban-list-button kanban-list-footer-button"><i class="fas fa-plus"></i> Eine weitere Karte hinzufügen</button></div>';
			
			board += '</div>';
			
		});
		
		$(function(){
			$('.kanban-list-footer-button').click(function(e){
				if(options.clickFooterButtonHandler !== undefined) {
					options.clickFooterButtonHandler(e);
				}
			});
			$('.kanban-item').click(function(e){
				if(options.clickCardHandler !== undefined) {
					options.clickCardHandler(e);
				}
			});
			$('.kanban-list-header-button').click(function(e){
				if(options.clickHeaderButtonHandler !== undefined) {
					options.clickHeaderButtonHandler(e);
				}
			});
		});
		
		this.append(board);
		this.addClass('kanbanboard');
		
		// activate sortable
		$(function(){
			$(".kanban-list").sortable({
				items: ".kanban-item",
				update: function(event,ui){
					if(options.sortCardHandler !== undefined) {
						options.sortCardHandler(event,ui);
					}
				}
			});
			$(".kanban-list").disableSelection();
			$("#kanbanboard").sortable({
				items: ".kanban-list",
				handle: ".kanban-list-header",
				update: function(event,ui){
					if(options.sortListHandler !== undefined) {
						options.sortListHandler(event,ui);
					}
				}
			});
			$(".kanbanboard").disableSelection();
		});
		
		return this;

	};

}(jQuery));

function tesdt123(){
	return "<p>123456789</p>";
}