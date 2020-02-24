import { Icon } from "./icon";
import { Label } from "./label";

export interface ICard {
    title: string;
    image: string;
    icons: Array<Icon>;
    labels: Array<Label>;
}

export class Card implements ICard {

    htmlElement: HTMLElement;
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

        var cardDOM = document.createRange().createContextualFragment(`
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
        `);

		return cardDOM;

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