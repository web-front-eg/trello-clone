import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { AddingCardView } from "./AddingCardView.js";
import { autobind } from "../../decorator/autobind.js";
import { Template } from "../../template/TemplateNames.js";
import { ViewCache } from "../../controller/ViewCache.js";
import { CardController } from "../../controller/CardController.js";

export class AddCardView extends View<HTMLDivElement> {
  private readonly fixedAddCardPos: number = View.currentListPosition;

  private static AddingCard: AddingCardView;

  constructor(templateHelper: TemplateHelper<HTMLDivElement>) {
    super(templateHelper, "AddCardView");
    this.init();
  }

  protected init(): void {
    ViewCache.setAddCardView = this;

    this.currentEl.addEventListener("click", this.onClickAddCard);
    // this.currentEl.addEventListener("focusout", this.onFocusOut);
  }

  protected reset(): void {
    this.close();
  }

  @autobind
  private onClickAddCard(_: Event): void {
    // re-using only 1 adding-card
    if (!AddCardView.AddingCard) {
      AddCardView.AddingCard = new AddingCardView(
        new TemplateHelper<HTMLDivElement>(
          this.templateHelper.getCurElIdOrClassName,
          Template.addingCard,
          "afterend",
          true
        ),
        this.fixedAddCardPos
      );
    } else {
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

  // @autobind
  // private onFocusOut(_: Event): void {
  //   // hide add-card automatically on focusing out
  //   this.currentEl.style.display = "none";
  // }  

  public reopen(): void {
    // show add-card on closing adding-card
    this.currentEl.style.display = "block";
  }

  public close(): void {
    this.currentEl.style.display = "none";
  }

  public moveAddCardUnder(addingCardView: AddingCardView): void {
    // attach add-card under adding-card
    addingCardView.currentEl.insertAdjacentElement("afterend", this.currentEl);
  }
}
