import { View } from "../View.js";
import { ICard } from "../../model/ICard.js";
import { IDraggable } from "../../model/IDraggable";
import { TemplateHelper } from "../../template/TemplateHelper";

export class AddedCardView
  extends View<HTMLDivElement>
  implements IDraggable, ICard
{
  public content: string;
  constructor(
    templateHelper: TemplateHelper<HTMLDivElement>,
    content: string
  ) {
    super(templateHelper, "AddedCardView");
    this.content = content;
    this.init();
  }

  protected init(): void {}

  protected reset(): void {
    //
  }

  public dragStartHandler(e: DragEvent): void {}

  public dragEndHandler(e: DragEvent): void {}
}
