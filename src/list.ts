import { Card, ICard } from "./card";
import { Icon } from "./icon";

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

    addCard(card:ICard){
        var newCard:Card = new Card(card);
        this.cards.push(newCard);
        this.htmlElement.append(newCard.render());
    }

    render(){

        var listDOM = document.createRange().createContextualFragment(`
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
                </div>
                <div class="kanban-list-footer">
                    <button class="kanban-list-button kanban-list-footer-button"><i class="fas fa-plus"></i> Add new Card</button>
                </div>
            </div>
        `);

		listDOM.querySelector(".kanban-list-content").appendChild(this.createListContent());

		return listDOM;

    }

    createListContent(){

        var container: HTMLElement = document.createElement("div");
		container.className = "kanban-list-content";

		for(let card in this.cards){
			container.append(this.cards[card].render());
		}
		
		this.htmlElement = container;

		return container;

    }

}