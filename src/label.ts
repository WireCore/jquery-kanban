interface ILabel {
    color: string;
}

export class Label implements ILabel {

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