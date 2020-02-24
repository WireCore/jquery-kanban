import { Card, ICard } from "./card";
import { Icon } from "./icon";

export interface IList {
    title: string;
    cards: Array<Card>;
}

export class List implements IList {

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
        return newCard.render();
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