import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper";
import { CardController } from "../../controller/CardController.js";
import { CardMover } from "./CardMover.js";

export class AddedCardView extends View<HTMLDivElement> {
  /**
   *
   */
  private readonly titleEl: HTMLParagraphElement;
  // private readonly parentListPos: number;
  // private readonly currentCardPos: number;
  private readonly cardMover: CardMover;

  constructor(
    templateHelper: TemplateHelper<HTMLDivElement>,
    content: string,
    parentListPos: number
  ) {
    super(templateHelper, "AddedCardView");

    // this.parentListPos = parentListPos;

    this.titleEl = this.currentEl.querySelector(
      ".list__added-card__title"
    )! as HTMLParagraphElement;
    this.titleEl.textContent = content;

    const currentCardPos = CardController.onSetContentInAddedCard(
      parentListPos,
      content
    );

    this.cardMover = new CardMover(this.currentEl, currentCardPos);
    this.init();
  }

  protected init(): void {}

  protected reset(): void {
    //
  }
}
