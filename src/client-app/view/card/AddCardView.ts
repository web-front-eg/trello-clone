import { TemplateHelper } from "../../template/TemplateHelper.js";
import { View } from "../View.js";
import { ViewCache } from "../../controller/ViewCache.js";
import { AddingCardView } from "./AddingCardView.js";
import { thisbind } from "../../decorator/thisbind.js";
import { TemplateNames } from "../../template/TemplateNames.js";
import { CardController } from "../../controller/CardController.js";

export class AddCardView extends View<HTMLDivElement> {
  /**
   * card must have a fixed list pos when it's created
   */
  private readonly fixedAddCardPos: number = View.currentListPosition;

  /**
   * only one adding-card can be created
   */
  private static AddingCard: AddingCardView;

  constructor(templateHelper: TemplateHelper<HTMLDivElement>) {
    super(templateHelper, "AddCardView");
    this.init();
  }

  protected init() {
    ViewCache.setAddCardView = this;

    this.currentEl.addEventListener("click", this.onClick);
  }

  @thisbind
  protected onClick() {
    // re-using only 1 adding-card
    if (!AddCardView.AddingCard) {
      AddCardView.AddingCard = new AddingCardView(
        new TemplateHelper<HTMLDivElement>(
          this.templateHelper.currentElSelector,
          TemplateNames.addingCard,
          "afterend",
          true
        ),
        this.fixedAddCardPos
      );
    } else {
      // update parent list pos of adding-card after clicking other add-card
      AddCardView.AddingCard.parentListPos = this.fixedAddCardPos;
      CardController.onClickAddCardAgain(this.fixedAddCardPos);
    }

    // insert adding card into the current add card!
    AddCardView.AddingCard.templateHelper.insertAtManually(
      "afterend",
      this.currentEl
    );

    this.reset();
  }

  public moveAddCardUnderAddingCard() {
    // attach add-card under adding-card
    AddCardView.AddingCard.currentEl.insertAdjacentElement(
      "afterend",
      this.currentEl
    );
  }
}
