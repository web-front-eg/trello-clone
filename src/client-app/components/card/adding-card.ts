import { BaseEntity } from "../base-entity.js";
import { TemplateInjector } from "../../template/template-injector.js";
import { ICard } from "../../models/ICard.js";
import { AddedCard } from "./added-card.js";
import { autobind } from "../../decorators/autobind.js";
import * as Templates from "../../template/template-names.js";
import { AddCard } from "./add-card.js";

export class AddingCard
  extends BaseEntity<HTMLDivElement, AddedCard>
  implements ICard
{
  public content: string = "";
  private setContent(newContent: string): void {
    this.content = newContent.trim();
    console.log("content of AddingCard has been set as:", this.content);
  }

  private readonly fixedCurrentListPosition: number;

  private readonly titleTextareaEl: HTMLTextAreaElement;
  private readonly addBtnEl: HTMLButtonElement;

  constructor(
    templateInjector: TemplateInjector<HTMLDivElement>,
    parentPos: number,
    private parentAddCard: AddCard
  ) {
    super(templateInjector, "AddingCard");

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
    this.setContent("");
  }

  @autobind
  private onClickAddCard(_: Event): void {
    this.attachAddedCard();
  }

  @autobind
  private onPressEnterKey(e: Event): void {
    const eventAsKeyboardEvent = e as KeyboardEvent;

    if (!eventAsKeyboardEvent) return;

    if (eventAsKeyboardEvent.key !== "Enter") return;

    this.attachAddedCard();
  }

  @autobind
  private onFocusOut(_: Event): void {
    this.currentEl.style.display = "none";
    this.parentAddCard.onAddingCardClosed();
  }

  private attachAddedCard(): void {
    this.setContent(this.titleTextareaEl.value);

    this.nextEntity = new AddedCard(
      new TemplateInjector<HTMLDivElement>(
        this.templateInjector.getCurElIdOrClassName,
        Templates.addedCard,
        "beforebegin",
        this.fixedCurrentListPosition
      ),
      this.content
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
