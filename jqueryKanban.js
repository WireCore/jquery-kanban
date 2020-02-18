(function($){
	
	$.fn.jqueryKanban = function(options){
			
		var board = createKanbanboard(options);
	
		this.append(board);
		
		// handler
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
		
		$(function(){
			$(".kanbanboard-list").sortable({
				items: ".kanban-item",
				update: function(event,ui){
					if(options.sortCardHandler !== undefined) {
						options.sortCardHandler(event,ui);
					}
				}
			});
			$(".kanban-list").disableSelection();
			$(".kanbanboard-container").sortable({
				items: ".kanbanboard-list",
				handle: ".kanban-list-header",
				update: function(event,ui){
					if(options.sortListHandler !== undefined) {
						options.sortListHandler(event,ui);
					}
				}
			});
			$(".kanbanboard-container").disableSelection();
		});
		
		return this;

	};
	
	$.fn.addCard = function(list_index,options){
		var lists = $(this).find('.kanbanboard-list');
		$(lists[list_index]).find(".kanban-list-content").append(createCard(options));
	};
	
	$.fn.addList = function(list_index,options){
		var container = $(this).find('.kanbanboard-container');
		$(container).append(createList(options));
	};
	
	function createKanbanboard(kanbanboard){
				
		var kanbanboard = `
			<div class="kanbanboard">
				<div class="kanbanboard-inline">
					<div class="kanbanboard-container">
						${createLists(kanbanboard.lists)}
					</div>
				</div>
			</div>
		`;
		
		return kanbanboard;
		
	}
	
	// Internal functions
	function createLists(lists){
		
		var listsHtml = "";
		$(lists).each(function(index,value){
			listsHtml += createList(value);
		});
		
		return listsHtml;
	}
	
	function createList(list){
		
		var listHtml = `
			<div class="kanbanboard-list">
				<div class="kanban-list-header">
					<div class="kanban-list-title">
						${list.title}
					</div>
					<div class="kanban-list-header-button">
						<button class="kanban-list-button"><i class="fas fa-ellipsis-h"></i></button>
					</div>
				</div>
				<div class="kanban-list-content">
					${createListContent(list.cards)}
				</div>
				<div class="kanban-list-footer">
					<button class="kanban-list-button kanban-list-footer-button"><i class="fas fa-plus"></i> Add new Card</button>
				</div>
			</div>
		`;
		
		return listHtml;
		
	}
	
	function createListContent(cards){
		
		var cardsHtml = "";
		
		$(cards).each(function(index,value){
			cardsHtml += createCard(value);
		});
		
		return cardsHtml;
		
	}
	
	function createCard(card){
		
		var cardHtml = '<div class="kanban-item">';
		
		if(typeof card.image !== 'undefined'){
			cardHtml += createCardImage(card.image);
		}
		
		if(typeof card['labels'] !== 'undefined' && Array.isArray(card['labels'])){
			
			cardHtml += '<div class="kanban-item-row">';
			
			$(card['labels']).each(function(index,value){
				cardHtml += createCardLabel(value);
			});
			
			cardHtml += '</div>';
			
		}
		
		if(typeof card.title !== 'undefined'){
			cardHtml += createCardTitle(card.title);
		}
		
		if(typeof card['customIcons'] !== 'undefined'){
			
			cardHtml += '<div class="kanban-item-row">';
			
			$(card['customIcons']).each(function(index,value){
				cardHtml += createCardIcon(value.icon,value.text);
			});
			
			cardHtml += '</div>';
			
		}
		
		cardHtml += '</div>';
		
		return cardHtml;
		
	}
	
	function createCardImage(image){
		return `<div class="kanban-item-row">
					<img src="${image}" class="kanban-item-image" />
				</div>`;
	}
	
	function createCardLabel(label){
		return `<span class="kanban-item-label" style="background-color:${label.color};"></span>`;
	}
	
	function createCardTitle(title){
		return `
			<div class="kanban-item-row">${title}</div>
		`;
	}
	
	function createCardIcon(icon,text){
		return `<span class="kanban-item-icon">${icon} ${text}</span>`;
	}

}(jQuery));