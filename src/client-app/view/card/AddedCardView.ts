import { View } from "../View.js";
import { IDraggable } from "../../model/IDraggable";
import { TemplateHelper } from "../../template/TemplateHelper";
import { CardController } from "../../controller/CardController.js";

export class AddedCardView extends View<HTMLDivElement> implements IDraggable {
  /**
   *
   */
  private readonly title: HTMLParagraphElement;

  constructor(
    templateHelper: TemplateHelper<HTMLDivElement>,
    content: string,
    parentListPos: number
  ) {
    super(templateHelper, "AddedCardView");

    this.title = this.currentEl.querySelector(
      ".list__added-card__title"
    )! as HTMLParagraphElement;
    this.title.textContent = content;

    CardController.onSetContentInAddedCard(parentListPos, content);

    this.init();
  }

  protected init(): void {
    //
  }

  protected reset(): void {
    //
  }

  public dragStartHandler(e: DragEvent): void {}

  public dragEndHandler(e: DragEvent): void {}
}
