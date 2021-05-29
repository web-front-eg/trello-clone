import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { autobind } from "../../decorator/autobind.js";
import { AddedListView } from "./AddedListView.js";
import * as Templates from "../../template/TemplateNames.js";
import { ListController } from "../../controller/ListController.js";
import { ViewCache } from "../../controller/ViewCache.js";

export class AddingListView extends View<HTMLDivElement> {
  /**
   *
   */
  private readonly titleInputEl: HTMLInputElement;
  /**
   *
   */
  private readonly saveBtnEl: HTMLButtonElement;

  constructor(templateHelper: TemplateHelper<HTMLDivElement>) {
    super(templateHelper, "AddingListView");

    this.titleInputEl = this.currentEl.firstElementChild! as HTMLInputElement;
    this.titleInputEl.focus();

    this.saveBtnEl = this.currentEl.querySelector(".btn")! as HTMLButtonElement;

    this.init();
  }

  protected init(): void {
    ViewCache.addingListView = this;

    // bind clicking the Save button or press enter
    this.saveBtnEl.addEventListener("click", this.onClickSaveBtn);
    this.titleInputEl.addEventListener("keypress", this.onPressEnterKey);
    this.currentEl.addEventListener("focusout", this.onFocusOut);
  }

  protected reset(): void {
    this.titleInputEl.value = "";
  }

  @autobind
  private onClickSaveBtn(_: Event): void {
    this.addChild();
  }

  @autobind
  private onPressEnterKey(e: Event): void {
    if ((e as KeyboardEvent)!.key !== "Enter") return;

    this.addChild();
  }

  @autobind
  private onFocusOut(_: Event): void {
    this.currentEl.style.display = "none";
    ListController.onCloseAddingList();
  }

  private addChild(): void {
    // AddedList 추가 전에 새로운 column 추가
    ListController.addNewColumn();
    // AddList 를 새로운 column 의 child로 이동
    ListController.attachAddListToNewColumn();

    /**
     * create a new AddListView
     */
    this.nextView = new AddedListView(
      new TemplateHelper<HTMLDivElement>(
        ".column",
        Templates.addedList,
        "beforeend",
        false,
        View.currentListPosition
      ),
      this.titleInputEl.value
    );

    this.reset();
  }

  /**
   * show adding-list and auto-focus at the input
   */
  public onClickAddListAgain(): void {
    this.currentEl.style.display = "block";
    this.titleInputEl.focus();
  }
}
