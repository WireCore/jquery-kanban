interface IIcon {
    icon: string;
    text: string;
}

export class Icon implements IIcon {

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