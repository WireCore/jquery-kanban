import { List } from "list";

export interface IKanbanboard {
    lists: Array<List>;
    clickCardHandler: Function;
    clickFooterButtonHandler: Function;
    clickHeaderButtonHandler: Function;
    sortCardHandler: Function;
    sortListHandler: Function;
}

export class Kanbanboard implements IKanbanboard {
    
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
			$('.kanban-list-header-button').click(function(e){
				if(initData.clickHeaderButtonHandler !== undefined) {
					initData.clickHeaderButtonHandler(e);
				}
			});
		});
		
		$(function(){
			$(".kanbanboard-list").sortable({
				items: ".kanban-item",
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

        var kanbanboardHtml:string = `
			<div class="kanbanboard">
				<div class="kanbanboard-inline">
					<div class="kanbanboard-container">
                        ${this.createLists()}
					</div>
				</div>
			</div>
		`;
		
		return kanbanboardHtml;

    }

    createLists(){

        var lists: string = "";

        for(let list in this.lists){
            lists += this.lists[list].render();
        }

        return lists;

    }

}