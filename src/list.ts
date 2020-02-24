import { Card, ICard } from "./card";

export interface IList {
    title: string;
    cards: Array<Card>;
}

export class List implements IList {

    htmlElement: HTMLElement;
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

    patch(options:IList){
        // title
        this.title = options.title;
        $(this.htmlElement).find(".kanban-list-title").html(this.title);
    }

    addCard(card:ICard){
        var newCard:Card = new Card(card);
        this.cards.push(newCard);
        this.htmlElement.append(newCard.render());
    }

    render(){

        var container: HTMLElement = document.createElement("div");
		container.className = "kanbanboard-list";

        var listDOM = document.createRange().createContextualFragment(`
            <div class="kanban-list-header">
                <div class="kanban-list-title">
                    ${this.title}
                </div>
                <div class="kanban-list-header-button">
                    <button class="kanban-list-button"><i class="fas fa-ellipsis-h"></i></button>
                </div>
            </div>
            ${this.createListContent()}
            <div class="kanban-list-footer">
                <button class="kanban-list-button kanban-list-footer-button"><i class="fas fa-plus"></i> Add new Card</button>
            </div>
        `);

        container.append(listDOM);
        this.htmlElement = container;
		return container;

    }

    createListContent(){

        var container: HTMLElement = document.createElement("div");
		container.className = "kanban-list-content";

		for(let card in this.cards){
			container.append(this.cards[card].render());
		}

		return container.innerHTML;

    }

}