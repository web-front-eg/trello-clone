import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { AddedCardView } from "./AddedCardView.js";
import { autobind } from "../../decorator/autobind.js";
import * as Templates from "../../template/TemplateNames.js";
import { ViewCache } from "../../controller/ViewCache.js";
import { CardController } from "../../controller/CardController.js";
import { delay } from "../../util/timer.js";

export class AddingCardView extends View<HTMLDivElement> {
  private readonly titleTextareaEl: HTMLTextAreaElement;
  private readonly addBtnEl: HTMLButtonElement;

  constructor(
    templateHelper: TemplateHelper<HTMLDivElement>,
    public parentListPos: number
  ) {
    super(templateHelper, "AddingCardView");

    this.titleTextareaEl = this.currentEl
      .firstElementChild! as HTMLTextAreaElement;

    delay(() => this.titleTextareaEl.focus(), 1);

    this.addBtnEl = this.currentEl.querySelector(".btn")! as HTMLButtonElement;

    this.init();
  }

  protected init(): void {
    ViewCache.setAddingCardView = this;

    this.addBtnEl.addEventListener("click", this.onClickAddCard);
    this.titleTextareaEl.addEventListener("keypress", this.onPressEnterKey);
    this.titleTextareaEl.addEventListener("focusout", this.onFocusOut);

    this.reset();
  }

  protected reset(): void {
    console.log("title Text Area is wiped out!");

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
    console.log("you're losing focus of ", this.titleTextareaEl);

    this.currentEl.style.display = "none";
    CardController.onCloseAddingCard(this.parentListPos);
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
        true
      ),
      this.titleTextareaEl.value
    );

    this.nextView.templateHelper.insertAtManually(
      "beforebegin",
      this.currentEl
    );

    CardController.onAddingCardAdded(this.parentListPos);
    this.reset();
  }

  public onClickAddCardAgain(): void {
    // show and focus adding-card on clicking add-card again
    this.currentEl.style.display = "block";
    delay(() => this.titleTextareaEl.focus(), 1);
  }

  public closeAddingCardForced(): void {
    this.currentEl.style.display = "none";
    this.titleTextareaEl.blur();
  }
}
