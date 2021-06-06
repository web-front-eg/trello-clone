import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { AddedCardView } from "./AddedCardView.js";
import { thisbind } from "../../decorator/thisbind.js";
import { TemplateNames } from "../../template/TemplateNames.js";
import { ViewCache } from "../../controller/ViewCache.js";
import { CardController } from "../../controller/CardController.js";
import { delay, delayFinally } from "../../util/timer.js";

export class AddingCardView extends View<HTMLDivElement> {
  private readonly contentTextareaEl = <HTMLTextAreaElement>(
    this.currentEl.firstElementChild!
  );

  private readonly addBtnEl = <HTMLButtonElement>(
    this.currentEl.querySelector(".btn")!
  );

  private readonly closeIconEl = <HTMLElement>(
    this.currentEl.querySelector(".fa-times")!
  );

  constructor(
    templateHelper: TemplateHelper<HTMLDivElement>,
    public parentListPos: number
  ) {
    super(templateHelper, "AddingCardView");

    if (!this.contentTextareaEl) {
      throw new Error("content textarea element is invalid!");
    }

    // focus after call stack is cleared
    delayFinally(() => this.contentTextareaEl.focus());

    if (!this.addBtnEl) {
      throw new Error("add button element is invalid!");
    }

    if (!this.closeIconEl) {
      throw new Error("close icon element is invalid!");
    }

    this.init();
  }

  protected init() {
    ViewCache.addingCardView = this;

    this.addBtnEl.addEventListener("click", this.onClick);
    this.contentTextareaEl.addEventListener("keypress", this.onPressEnterKey);
    this.closeIconEl.addEventListener("click", this.closeAddingCardForcely);
  }

  @thisbind
  protected onClick(e: Event) {
    this.addCard();
  }

  @thisbind
  private onPressEnterKey(e: Event) {
    if ((e as KeyboardEvent).key !== "Enter") return;
    // delete unwanted line break after pressing enter
    e.preventDefault();
    this.addCard();
  }

  /**
   * set the content of adding-card, which is the title of added-card
   * with the value of input.
   * @param isAutoUpdate if true,
   */
  private addCard(isAutoUpdate: boolean = false) {
    // no empty string allowed
    if (!this.contentTextareaEl.value) {
      return;
    }

    let content: string = this.contentTextareaEl.value;
    // as of the next card, '\n' character every in front of string is removed
    const splitted = this.contentTextareaEl.value.split("\n");
    if (splitted[1]) {
      content = splitted[1];
    }

    // create addedCard
    this.nextView = new AddedCardView(
      new TemplateHelper<HTMLDivElement>(
        this.templateHelper.currentElSelector,
        TemplateNames.addedCard,
        "beforebegin",
        true
      ),
      content,
      this.parentListPos,
      isAutoUpdate
    );

    // add ID to the created added-card
    this.nextView.templateHelper.createdEl.id = `${this.contentTextareaEl.value}-${this.parentListPos}`;

    // move down adding-card under the create added-card
    this.nextView.templateHelper.insertAtManually(
      "beforebegin",
      this.currentEl
    );

    // move down add-card as well under the created added-card
    CardController.onNewAddedCardAdded(this.parentListPos);

    this.reset();
  }

  protected reset() {
    this.contentTextareaEl.value = "";
  }

  public loadContent(newContent: string) {
    this.contentTextareaEl.value = newContent;
  }

  public click() {
    this.addCard(true);
  }

  public reopen() {
    // show and focus adding-card on clicking add-card again
    super.reopen();
    delayFinally(() => this.contentTextareaEl.focus());
    this.reset();
  }

  @thisbind
  public closeAddingCardForcely() {
    super.close();
    delayFinally(() => this.contentTextareaEl.blur());
    CardController.onCloseAddingCard(this.parentListPos);
  }
}
