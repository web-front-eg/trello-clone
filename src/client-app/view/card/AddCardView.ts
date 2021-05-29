import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { AddingCardView } from "./AddingCardView.js";
import { autobind } from "../../decorator/autobind.js";
import * as Templates from "../../template/TemplateNames.js";

export class AddCardView extends View<HTMLDivElement> {
  private readonly fixedCurrentListPosition: number;

  constructor(templateHelper: TemplateHelper<HTMLDivElement>) {
    super(templateHelper, "AddCardView");
    this.fixedCurrentListPosition = View.currentListPosition - 1;

    this.init();
  }

  protected init(): void {
    this.currentEl.addEventListener("click", this.onClickAddCard);
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
          this.fixedCurrentListPosition
        ),
        this.fixedCurrentListPosition,
        this
      );
    } else {
      (this.nextView as AddingCardView).onAddCardClickedAgain();
    }
    this.reset();
  }

  public onAddingCardClosed(): void {
    // show add-card on closing adding-card
    this.currentEl.style.display = "block";
  }

  public onAddingCardAttached(addingCard: AddingCardView): void {
    // attach add-card under the attached adding-card
    addingCard.templateHelper.getCreatedEl.insertAdjacentElement(
      "afterend",
      this.currentEl
    );
  }
}
