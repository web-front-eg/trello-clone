import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { AddingCardView } from "./AddingCardView.js";
import { autobind } from "../../decorator/autobind.js";
import * as Templates from "../../template/TemplateNames.js";
import { ViewCache } from "../../controller/ViewCache.js";
import { CardController } from "../../controller/CardController.js";

export class AddCardView extends View<HTMLDivElement> {
  private readonly fixedAddCardPos: number = View.currentListPosition;
  constructor(templateHelper: TemplateHelper<HTMLDivElement>) {
    super(templateHelper, "AddCardView");
    this.init();
  }

  protected init(): void {
    ViewCache.setAddCardView = this;

    this.currentEl.addEventListener("click", this.onClickAddCard);
    this.currentEl.addEventListener("focusout", this.onFocusOut);
  }

  protected reset(): void {
    this.currentEl.style.display = "none";
  }

  @autobind
  private onClickAddCard(_: Event): void {
    // re-using adding-card
    if (!this.nextView) {
      this.nextView = new AddingCardView(
        new TemplateHelper<HTMLDivElement>(
          this.templateHelper.getCurElIdOrClassName,
          Templates.addingCard,
          "afterend",
          true
        ),
        this.fixedAddCardPos
      );
    } else {
      CardController.onClickAddCardAgain(this.fixedAddCardPos);
    }

    this.nextView.templateHelper.insertAtManually("afterend", this.currentEl);
    this.reset();
  }

  @autobind
  private onFocusOut(_: Event): void {
    // hide add-card automatically on focusing out
    this.currentEl.style.display = "none";
  }

  public onCloseAddingCard(): void {
    // show add-card on closing adding-card
    this.currentEl.style.display = "block";
  }

  public onAddingCardAdded(addingCardView: AddingCardView): void {
    // attach add-card under the attached adding-card
    addingCardView.currentEl.insertAdjacentElement("afterend", this.currentEl);
  }
}
