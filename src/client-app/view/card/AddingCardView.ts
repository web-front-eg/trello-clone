import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { AddedCardView } from "./AddedCardView.js";
import { autobind } from "../../decorator/autobind.js";
import * as Templates from "../../template/TemplateNames.js";
import { AddCardView } from "./AddCardView.js";

export class AddingCardView extends View<HTMLDivElement, AddedCardView> {
  private readonly fixedCurrentListPosition: number;

  private readonly titleTextareaEl: HTMLTextAreaElement;
  private readonly addBtnEl: HTMLButtonElement;

  constructor(
    templateHelper: TemplateHelper<HTMLDivElement>,
    parentPos: number,
    private parentAddCard: AddCardView
  ) {
    super(templateHelper, "AddingCardView");

    this.fixedCurrentListPosition = parentPos;

    this.titleTextareaEl = this.currentEl
      .firstElementChild! as HTMLTextAreaElement;
    this.titleTextareaEl.focus();

    this.addBtnEl = this.currentEl.querySelector(".btn")! as HTMLButtonElement;

    this.init();
  }

  protected init(): void {
    this.addBtnEl.addEventListener("click", this.onClickAddCard);
    this.titleTextareaEl.addEventListener("keypress", this.onPressEnterKey);
    this.currentEl.addEventListener("focusout", this.onFocusOut);
    // this.currentEl.addEventListener("focusin", this.onFocusIn);
  }

  protected reset(): void {
    this.titleTextareaEl.value = "";
  }

  @autobind
  private onClickAddCard(_: Event): void {
    this.addChild();
  }

  @autobind
  private onPressEnterKey(e: Event): void {
    if ((e as KeyboardEvent).key !== "Enter") return;

    this.addChild();
  }

  @autobind
  private onFocusOut(_: Event): void {
    this.currentEl.style.display = "none";
    this.parentAddCard.onAddingCardClosed();
  }

  /**
   * set the content of adding-card, which is the title of added-card
   * with the value of input.
   */
  private addChild(): void {
    this.nextView = new AddedCardView(
      new TemplateHelper<HTMLDivElement>(
        this.templateHelper.getCurElIdOrClassName,
        Templates.addedCard,
        "beforebegin",
        this.fixedCurrentListPosition,
        true
      ),
      this.titleTextareaEl.value
    );

    this.nextView.getTemplateHelper.insertAtManually(
      "beforebegin",
      this.currentEl
    );

    this.parentAddCard.onAddingCardAttached(this);
    this.reset();
  }

  public onAddCardClickedAgain(): void {
    // show and focus adding-card on clicking add-card again
    this.currentEl.style.display = "block";
    this.titleTextareaEl.focus();
  }
}
