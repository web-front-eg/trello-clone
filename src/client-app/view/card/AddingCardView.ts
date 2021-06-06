import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { AddedCardView } from "./AddedCardView.js";
import { autobind } from "../../decorator/autobind.js";
import { Template } from "../../template/TemplateNames.js";
import { ViewCache } from "../../controller/ViewCache.js";
import { CardController } from "../../controller/CardController.js";
import { delay, delayFinally } from "../../util/timer.js";

export class AddingCardView extends View<HTMLDivElement> {
  private readonly contentTextareaEl: HTMLTextAreaElement;
  private readonly addBtnEl: HTMLButtonElement;
  private readonly closeIconEl: HTMLElement;

  constructor(
    templateHelper: TemplateHelper<HTMLDivElement>,
    public parentListPos: number
  ) {
    super(templateHelper, "AddingCardView");

    this.contentTextareaEl = this.currentEl
      .firstElementChild! as HTMLTextAreaElement;

    delayFinally(() => this.contentTextareaEl.focus());

    this.addBtnEl = this.currentEl.querySelector(".btn")! as HTMLButtonElement;

    this.closeIconEl = this.currentEl.querySelector(
      ".fa-times"
    )! as HTMLElement;
    this.init();
  }

  protected init() {
    ViewCache.addingCardView = this;

    this.addBtnEl.addEventListener("click", this.onClickAddCard);
    this.contentTextareaEl.addEventListener("keypress", this.onPressEnterKey);
    this.closeIconEl.addEventListener("click", this.closeAddingCardForcely);

    this.reset();
  }

  protected reset() {
    this.contentTextareaEl.value = "";
  }

  public load(newContent: string) {
    this.contentTextareaEl.value = newContent;
  }

  public click() {
    this.addCard(true);
  }

  @autobind
  private onClickAddCard(_: Event) {
    this.addCard();
  }

  @autobind
  private onPressEnterKey(e: Event) {
    if ((e as KeyboardEvent).key !== "Enter") return;

    this.addCard();
  }

  /**
   * set the content of adding-card, which is the title of added-card
   * with the value of input.
   */
  private addCard(isAutoUpdate: boolean = false) {
    // 공백 X
    if (!this.contentTextareaEl.value) {
      return;
    }

    let content: string = this.contentTextareaEl.value;
    // 다음 카드부터, content 앞에 개행문자(\n) 이 있으면 split 해서 없앰
    const splitted = this.contentTextareaEl.value.split("\n");
    if (splitted[1]) {
      content = splitted[1];
    }

    // addedCard 생성
    this.nextView = new AddedCardView(
      new TemplateHelper<HTMLDivElement>(
        this.templateHelper.getCurElIdOrClassName,
        Template.addedCard,
        "beforebegin",
        true
      ),
      content,
      this.parentListPos,
      isAutoUpdate
    );

    // 생성된 added card 에 ID 추가
    this.nextView.templateHelper.getCreatedEl.id = `${this.contentTextareaEl.value}-${this.parentListPos}`;

    // adding card 를 생성된 added card 아래로 이동
    this.nextView.templateHelper.insertAtManually(
      "beforebegin",
      this.currentEl
    );

    // add card 도 생성된 added card 아래로 이동
    CardController.onNewAddedCardAdded(this.parentListPos);

    this.reset();
  }

  public async reopen() {
    // show and focus adding-card on clicking add-card again
    this.currentEl.style.display = "block";

    await delay();

    this.contentTextareaEl.focus();
    this.reset();
  }

  @autobind
  public closeAddingCardForcely() {
    this.currentEl.style.display = "none";
    this.contentTextareaEl.blur();
    CardController.onCloseAddingCard(this.parentListPos);
  }
}
