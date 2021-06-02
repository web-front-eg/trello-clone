import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { AddedCardView } from "./AddedCardView.js";
import { autobind } from "../../decorator/autobind.js";
import { Template } from "../../template/TemplateNames.js";
import { ViewCache } from "../../controller/ViewCache.js";
import { CardController } from "../../controller/CardController.js";
import { delay } from "../../util/timer.js";

export class AddingCardView extends View<HTMLDivElement> {
  private readonly titleTextareaEl: HTMLTextAreaElement;
  private readonly addBtnEl: HTMLButtonElement;
  private readonly closeIconEl: HTMLElement;

  constructor(
    templateHelper: TemplateHelper<HTMLDivElement>,
    public parentListPos: number
  ) {
    super(templateHelper, "AddingCardView");

    this.titleTextareaEl = this.currentEl
      .firstElementChild! as HTMLTextAreaElement;

    delay(() => this.titleTextareaEl.focus(), 1);

    this.addBtnEl = this.currentEl.querySelector(".btn")! as HTMLButtonElement;

    this.closeIconEl = this.currentEl.querySelector(
      ".fa-times"
    )! as HTMLElement;
    this.init();
  }

  protected init(): void {
    ViewCache.addingCardView = this;

    this.addBtnEl.addEventListener("click", this.onClickAddCard);
    this.titleTextareaEl.addEventListener("keypress", this.onPressEnterKey);
    // this.currentEl.addEventListener("focusout", this.onFocusOut);
    // this.addBtnEl.addEventListener("focusout", this.onFocusOut);
    this.closeIconEl.addEventListener("click", this.closeAddingCardForcely);

    this.reset();
  }

  protected reset(): void {
    this.titleTextareaEl.value = "";
  }

  @autobind
  private onClickAddCard(_: Event): void {
    this.addCard();
  }

  @autobind
  private onPressEnterKey(e: Event): void {
    if ((e as KeyboardEvent).key !== "Enter") return;

    this.addCard();
  }

  // @autobind
  // private onFocusOut(_: Event): void {
  //   this.currentEl.style.display = "none";
  //   CardController.onCloseAddingCard(this.parentListPos);
  // }

  /**
   * set the content of adding-card, which is the title of added-card
   * with the value of input.
   */
  private addCard(): void {
    // 공백 X
    if (!this.titleTextareaEl.value) {
      return;
    }

    let content: string = this.titleTextareaEl.value;
    // 다음 카드부터, content 앞에 개행문자(\n) 이 있으면 split 해서 없앰
    const splitted = this.titleTextareaEl.value.split("\n");
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
      this.parentListPos
    );

    // 생성된 added card 에 ID 추가
    this.nextView.templateHelper.getCreatedEl.id = `${this.titleTextareaEl.value}-${this.parentListPos}`;

    // adding card 를 생성된 added card 아래로 이동
    this.nextView.templateHelper.insertAtManually(
      "beforebegin",
      this.currentEl
    );

    // add card 도 생성된 added card 아래로 이동
    CardController.onNewAddedCardAdded(this.parentListPos);

    this.reset();
  }

  public reopen(): void {
    // show and focus adding-card on clicking add-card again
    this.currentEl.style.display = "block";
    delay(() => {
      this.titleTextareaEl.focus();
      this.reset();
    }, 1);
  }

  @autobind
  public closeAddingCardForcely(): void {
    this.currentEl.style.display = "none";
    this.titleTextareaEl.blur();
    CardController.onCloseAddingCard(this.parentListPos);
  }
}
