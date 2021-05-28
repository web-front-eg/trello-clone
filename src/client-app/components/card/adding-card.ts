import { BaseEntity } from "../base-entity.js";
import { TemplateInjector } from "../../template/template-injector.js";
import { ICard } from "../../models/ICard.js";
import { AddedCard } from "./added-card.js";
import { autobind } from "../../decorators/autobind.js";
import * as Templates from "../../template/template-names.js";

export class AddingCard
  extends BaseEntity<HTMLDivElement, AddedCard>
  implements ICard
{
  public content: string = "";
  private setContent(newContent: string): void {
    this.content = newContent.trim();
    console.log("content of AddingCard has been set as:", this.content);
  }

  private titleTextareaEl: HTMLTextAreaElement;
  private addBtnEl: HTMLButtonElement;

  constructor(templateInjector: TemplateInjector<HTMLDivElement>) {
    super(templateInjector, "AddingCard");

    this.titleTextareaEl = this.currentEl
      .firstElementChild! as HTMLTextAreaElement;
    this.addBtnEl = this.currentEl.querySelector(".btn")! as HTMLButtonElement;
    this.init();
  }

  protected init(): void {
    this.addBtnEl.addEventListener("click", this.onClickAddCard);
    this.titleTextareaEl.addEventListener("keypress", this.onPressEnterKey);
  }

  @autobind
  private onClickAddCard(_: Event): void {
    this.setContent(this.titleTextareaEl.value);

    this.nextEntity = new AddedCard(
      new TemplateInjector<HTMLDivElement>(
        this.templateInjector.getCurElIdOrClassName,
        Templates.addedCard,
        "afterbegin"
      ),
      this.content
    );

    this.setContent("");
  }

  @autobind
  private onPressEnterKey(e: Event): void {
    const eventAsKeyboardEvent = e as KeyboardEvent;
    if (!eventAsKeyboardEvent) return;
    if (eventAsKeyboardEvent.key !== "Enter") return;
    this.setContent(this.titleTextareaEl.value);

    this.nextEntity = new AddedCard(
      new TemplateInjector<HTMLDivElement>(
        this.templateInjector.getCurElIdOrClassName,
        Templates.addedCard,
        "afterbegin"
      ),
      this.content
    );

    this.setContent("");
  }
}
