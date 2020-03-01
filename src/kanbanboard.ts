import { List, IList } from "./list";

export interface IKanbanboard {
    lists: Array<List>;
    clickCardHandler: Function;
    clickFooterButtonHandler: Function;
    clickHeaderButtonHandler: Function;
    sortCardHandler: Function;
	sortListHandler: Function;
	addCardEvent: Function;
	addListEvent: Function;
}

export class Kanbanboard implements IKanbanboard {
	
	htmlElement: HTMLElement;
    lists: Array<List>;
    clickCardHandler: Function;
    clickFooterButtonHandler: Function;
    clickHeaderButtonHandler: Function;
    sortCardHandler: Function;
	sortListHandler: Function;
	addCardEvent: Function;
	addListEvent: Function;

    constructor(initData: IKanbanboard){

		this.lists = new Array<List>();
		this.addListEvent = initData.addListEvent;

        for(let list in initData.lists){
			initData.lists[list].addCardEvent = initData.addCardEvent;
            this.lists.push(new List(initData.lists[list]));
        }

        // handler
		$(function(){
			$('.kanban-item').click(function(e){
				if(initData.clickCardHandler !== undefined) {
					initData.clickCardHandler(e);
				}
			});
		});
		
		$(function(){
			$(".kanbanboard-list").sortable({
				items: ".kanban-item",
				placeholder: "kanbanboard-sortable-placeholder",
				forcePlaceholderSize: true,
				connectWith: ".kanbanboard-list",
				scroll: false,
				helper: 'clone',
				appendTo: 'body',
				update: function(event,ui){
					if(initData.sortCardHandler !== undefined) {
						initData.sortCardHandler(event,ui);
					}
				}
			});
			$(".kanban-list").disableSelection();
			$(".kanbanboard-container").sortable({
				items: ".kanbanboard-list",
				handle: ".kanban-list-header",
				placeholder: "kanbanboard-sortable-placeholder",
				forcePlaceholderSize: true,
				update: function(event,ui){
					if(initData.sortListHandler !== undefined) {
						initData.sortListHandler(event,ui);
					}
				}
			});
			$(".kanbanboard-container").disableSelection();
		});

    }

    render(){

		var kanbanboardDOM = document.createRange().createContextualFragment(`
			<div class="kanbanboard">
				<div class="kanbanboard-inline">
				</div>
			</div>
		`);

		kanbanboardDOM.querySelector(".kanbanboard-inline").appendChild(this.createLists());

		
		$(kanbanboardDOM).find('.kanbanboard-container').append(this.createAddListButton());

		return kanbanboardDOM;

	}
	
	createAddListButton(){

		var addListButtonDOM = document.createRange().createContextualFragment(`
			<div class="kanbanboard-list">
				<button class="kanbanboard-addListButtonOpen">Add List</button>
				<div class="kanbanboard-addListButton-container">
					<input type="text" class="kanbanbaord-addListButton-input" />
					<button class="kanbanboard-addListButton">Add List</button>
					<button class="kanbanboard-addListButtonCancel"><i class="fas fa-times"></i></button>
				</div>
			</div>
		`);
		
		$(addListButtonDOM).find('.kanbanboard-addListButtonOpen').on("click", function(e:any) {
			$(this).css('display','none');
			$(this).parent().find(".kanbanboard-addListButton-container").css('display','block');
			$(this).parent().find(".kanbanbaord-addListButton-input").focus();
		});

		$(addListButtonDOM).find('.kanbanbaord-addListButton-input').on("keypress", function(e:any) {
            if(e.key === "Enter"){
                this.addListListenerFunction();
                return false;
            }
		}.bind(this));
		
		$(addListButtonDOM).find('.kanbanboard-addListButton').on("click", function(e:any) {
			this.addListListenerFunction();
		}.bind(this));

		$(addListButtonDOM).find('.kanbanboard-addListButtonCancel').on("click",function(e:any){
			$(this).parent().css('display','none');
            $(this).parent().parent().find('.kanbanboard-addListButtonOpen').css('display','block');
		});
		
		return addListButtonDOM;

	}

	addListListenerFunction(){
		var text = $(this.htmlElement).find('.kanbanbaord-addListButton-input').val();
		var list: IList = <IList>{"title":text};
		var addedList = this.addList(list);
		$(this.htmlElement).find('.kanbanbaord-addListButton-input').val('');
		$(this.htmlElement).find('.kanbanbaord-addListButton-input').focus();
		this.addListEvent(addedList);
    }

    createLists(){

		var container: HTMLElement = document.createElement("div");
		container.className = "kanbanboard-container";

		for(let list in this.lists){
			container.append(this.lists[list].render());
		}
		
		this.htmlElement = container;

		return container;

	}
	
	addList(list:IList){
		var newList:List = new List(list);
		this.lists.push(newList);
		$(this.htmlElement).find(".kanbanboard-list")[$(this.htmlElement).find(".kanbanboard-list").length - 2].after(newList.render());
		return newList;
	}

}