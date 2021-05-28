import { BaseEntity } from "../base-entity.js";
import { TemplateInjector } from "../../template/template-injector.js";
import { IList } from "../../models/IList.js";
import { autobind } from "../../decorators/autobind.js";
import { Lists } from "../lists.js";
import { AddedList } from "./added-list.js";
import * as Templates from "../../template/template-names.js";

export class AddingList
  extends BaseEntity<HTMLDivElement, AddedList>
  implements IList
{
  public content: string = "";
  private setContent(newContent: string): void {
    this.content = newContent.trim();
    console.log("content of AddingList has been set as:", this.content);
  }

  private titleInputEl: HTMLInputElement;
  private saveBtnEl: HTMLButtonElement;

  constructor(templateInjector: TemplateInjector<HTMLDivElement>) {
    super(templateInjector, "AddingList");

    this.titleInputEl = this.currentEl.firstElementChild! as HTMLInputElement;
    this.titleInputEl.focus();

    this.saveBtnEl = this.currentEl.querySelector(".btn")! as HTMLButtonElement;
    this.init();
  }

  protected init(): void {
    // bind clicking the Save button or press enter
    this.saveBtnEl.addEventListener("click", this.onClickSaveBtn);
    this.titleInputEl.addEventListener("keypress", this.onPressEnterKey);
  }

  private reset(): void {
    this.titleInputEl.value = "";
    this.setContent("");
  }

  @autobind
  private onClickSaveBtn(_: Event): void {
    // set the content of adding-list, which is the title of added-list,
    // as the value of input.
    this.setContent(this.titleInputEl.value);
    Lists.onListAdded_addNewList();

    if (this.nextEntity) return;

    this.nextEntity = new AddedList(
      new TemplateInjector<HTMLDivElement>(
        ".list",
        Templates.addedList,
        "beforeend",
        BaseEntity.currentListPosition - 1
      ),
      this.content
    );

    this.reset();
    // this.currentEl?.remove();
    this.currentEl.style.display = "none";
  }

  @autobind
  private onPressEnterKey(e: Event): void {
    // only KeyboardEvent can read the line below
    const eventAsKeyboardEvent = e as KeyboardEvent;
    if (!eventAsKeyboardEvent) return;

    // set the content of adding-list, which is the title of added-list,
    // as the value of input.
    if (eventAsKeyboardEvent.key !== "Enter") return;

    this.setContent(this.titleInputEl.value);
    Lists.onListAdded_addNewList();

    if (this.nextEntity) return;

    this.nextEntity = new AddedList(
      new TemplateInjector<HTMLDivElement>(
        ".list",
        Templates.addedList,
        "beforeend",
        BaseEntity.currentListPosition - 1
      ),
      this.content
    );

    this.reset();
    // this.currentEl?.remove();
    this.currentEl.style.display = "none";
  }
}
