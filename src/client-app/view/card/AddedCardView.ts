import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper";
import { CardController } from "../../controller/CardController.js";
import { CardDragDrop } from "../drag-drop/CardDragDrop.js";

export class AddedCardView extends View<HTMLDivElement> {
  /**
   *
   */
  private readonly titleEl: HTMLParagraphElement;
  private readonly dragDrop: CardDragDrop;

  constructor(
    templateHelper: TemplateHelper<HTMLDivElement>,
    content: string,
    parentListPos: number,
    isAutoUpdate: boolean
  ) {
    super(templateHelper, "AddedCardView");

    this.titleEl = this.currentEl.querySelector(
      ".list__added-card__title"
    )! as HTMLParagraphElement;
    this.titleEl.textContent = content;

    this.dragDrop = new CardDragDrop(this.currentEl);

    CardController.onSetContentInAddedCard(
      parentListPos,
      content,
      isAutoUpdate
    );
  }

  protected init() {}

  protected reset() {}
}
