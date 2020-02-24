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

    patch(options:ICard){
        // title
        this.title = options.title;
        $(this.htmlElement).find(".kanban-item-row-title").html(this.title);
        // image
        this.image = options.image;
        $(this.htmlElement).find(".kanban-item-row-image").html(this.renderImage());
    }

    render(){

        var container: HTMLElement = document.createElement("div");
		container.className = "kanban-item";

        var cardDOM = document.createRange().createContextualFragment(`
            <div class="kanban-item-row kanban-item-row-image">
                ${this.renderImage()}
            </div>
            <div class="kanban-item-row">
                ${this.renderLabels()}
            </div>
            <div class="kanban-item-row kanban-item-row-title">
                ${this.title}
            </div>
            <div class="kanban-item-row">
                ${this.renderIcons()}
            </div>
        `);

        container.append(cardDOM);
        this.htmlElement = container;
		return container;

    }

    renderImage(){

        var imageHtml = "";

        if(this.image){
            imageHtml = `
                <img src="${this.image}" class="kanban-item-image" />
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