import { List, IList } from "./list";

export interface IKanbanboard {
    lists: Array<List>;
    clickCardHandler: Function;
    clickFooterButtonHandler: Function;
    clickHeaderButtonHandler: Function;
    sortCardHandler: Function;
    sortListHandler: Function;
}

export class Kanbanboard implements IKanbanboard {
	
	htmlElement: HTMLElement;
    lists: Array<List>;
    clickCardHandler: Function;
    clickFooterButtonHandler: Function;
    clickHeaderButtonHandler: Function;
    sortCardHandler: Function;
	sortListHandler: Function;

    constructor(initData: IKanbanboard){

        this.lists = new Array<List>();

        for(let list in initData.lists){
            this.lists.push(new List(initData.lists[list]));
        }

        // handler
		$(function(){
			$('.kanban-list-footer-button').click(function(e){
				if(initData.clickFooterButtonHandler !== undefined) {
					initData.clickFooterButtonHandler(e);
				}
			});
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

		return kanbanboardDOM;

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
		this.htmlElement.appendChild(newList.render());
	}

}