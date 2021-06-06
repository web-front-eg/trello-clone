import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper";
import { CardController } from "../../controller/CardController.js";
import { CardDragDrop } from "../drag-drop/CardDragDrop.js";

export class AddedCardView extends View<HTMLDivElement> {
  private readonly titleEl = <HTMLParagraphElement>(
    this.currentEl.querySelector(".list__added-card__title")!
  );

  private readonly dragDrop: CardDragDrop = new CardDragDrop(this.currentEl);

  constructor(
    templateHelper: TemplateHelper<HTMLDivElement>,
    content: string,
    parentListPos: number,
    isAutoUpdate: boolean
  ) {
    super(templateHelper, "AddedCardView");

    if (!this.titleEl) {
      throw new Error("title element is invalid!");
    }

    this.titleEl.textContent = content;

    // add new card to data set
    CardController.onSetContentInAddedCard(
      parentListPos,
      content,
      isAutoUpdate
    );
  }

  protected init() {}

  protected reset() {}
}
