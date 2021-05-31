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
    parentListPos: number
  ) {
    super(templateHelper, "AddedCardView");

    this.titleEl = this.currentEl.querySelector(
      ".list__added-card__title"
    )! as HTMLParagraphElement;
    this.titleEl.textContent = content;

    const currentCardPos = CardController.onSetContentInAddedCard(
      parentListPos,
      content
    );

    this.dragDrop = new CardDragDrop(
      this.currentEl,
      parentListPos,
      currentCardPos
    );

    this.init();
  }

  protected init(): void {}

  protected reset(): void {
    //
  }
}
