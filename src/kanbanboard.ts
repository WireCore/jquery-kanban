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
        /*$(function(){
            $('.kanban-item').click(function(e){
                if(initData.clickCardHandler !== undefined) {
                    initData.clickCardHandler(e);
                }
            });
        });*/

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

interface IList {
    title: string;
    cards: Array<Card>;
}

class List implements IList {

    title: string;
    cards: Array<Card>;

    constructor(initData: IList){
        this.title = initData.title;
        this.cards = new Array<Card>();

        // cards
        for(let card in initData.cards){
            this.cards.push(new Card(initData.cards[card]));
        }

    }

    render(){
        
        var listHtml = `
			<div class="kanbanboard-list">
				<div class="kanban-list-header">
					<div class="kanban-list-title">
						${this.title}
					</div>
					<div class="kanban-list-header-button">
						<button class="kanban-list-button"><i class="fas fa-ellipsis-h"></i></button>
					</div>
				</div>
				<div class="kanban-list-content">
					${this.createListContent()}
				</div>
				<div class="kanban-list-footer">
					<button class="kanban-list-button kanban-list-footer-button"><i class="fas fa-plus"></i> Add new Card</button>
				</div>
			</div>
		`;
		
		return listHtml;

    }

    createListContent(){

        var cardsHtml: string = "";

        for(let card in this.cards){
            cardsHtml += this.cards[card].render();
        }

        return cardsHtml;
    }

}

interface ICard {
    title: string;
    image: string;
    icons: Array<Icon>;
    labels: Array<Label>;
}

class Card implements ICard {

    title: string;
    image: string;
    icons: Array<Icon>;
    labels: Array<Label>;

    constructor(initData: ICard){

        this.title = initData.title;
        this.image = initData.image;
        this.icons = new Array<Icon>();
        this.labels = new Array<Label>();

        for(let icon in initData.icons){
            this.icons.push(new Icon(initData.icons[icon]));
        }

        for(let label in initData.labels){
            this.labels.push(new Label(initData.labels[label]));
        }

    }

    render(){

        var cardHtml = `
            <div class="kanban-item">
                ${this.renderImage()}
                <div class="kanban-item-row">
                    ${this.renderLabels()}
                </div>
                ${this.title}
                <div class="kanban-item-row">
                    ${this.renderIcons()}
                </div>
            </div>
        `;

        return cardHtml;
    }

    renderImage(){

        var imageHtml = "";

        if(this.image){
            imageHtml = `
                <div class="kanban-item-row">
                    <img src="${this.image}" class="kanban-item-image" />
                </div>
            `;
        }

        return imageHtml;

    }

    renderLabels(){

        var labelHtml = "";

        for(let label in this.labels){
            labelHtml += this.labels[label].render();
        }

        return labelHtml;

    }

    renderIcons(){

        var iconHtml = "";

        for(let icon in this.icons){
            iconHtml += this.icons[icon].render();
        }

        return iconHtml;

    }

}

interface IIcon {
    icon: string;
    text: string;
}

class Icon implements IIcon {

    icon: string;
    text: string;

    constructor(initData: IIcon){
        this.icon = initData.icon;
        this.text = initData.text;
    }

    render(){

        var iconHtml = "";
        iconHtml += `
            <span class="kanban-item-icon">${this.icon} ${this.text}</span>
        `;

        return iconHtml;

    }

}

interface ILabel {
    color: string;
}

class Label implements ILabel {

    color: string;

    constructor(initData: ILabel){
        this.color = initData.color;
    }

    render(){
        
        var labelHtml = "";
        labelHtml += `
            <span class="kanban-item-label" style="background-color:${this.color};"></span>
        `;

        return labelHtml;

    }

}