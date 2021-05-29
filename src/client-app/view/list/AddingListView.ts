import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { IList } from "../../model/IList.js";
import { autobind } from "../../decorator/autobind.js";
import { ColumnsView } from "../ColumnsView.js";
import { AddedListView } from "./AddedListView.js";
import * as Templates from "../../template/TemplateNames.js";
import { AddListView } from "./AddListView.js";

export class AddingListView
  extends View<HTMLDivElement, AddedListView>
  implements IList
{
  public content: string = "";
  private setContent(newContent: string): void {
    this.content = newContent.trim();
  }

  private readonly titleInputEl: HTMLInputElement;
  private readonly saveBtnEl: HTMLButtonElement;

  constructor(
    templateHelper: TemplateHelper<HTMLDivElement>,
    private parentAddList: AddListView
  ) {
    super(templateHelper, "AddingListView");

    this.titleInputEl = this.currentEl.firstElementChild! as HTMLInputElement;
    this.titleInputEl.focus();

    this.saveBtnEl = this.currentEl.querySelector(".btn")! as HTMLButtonElement;

    this.init();
  }

  protected init(): void {
    // bind clicking the Save button or press enter
    this.saveBtnEl.addEventListener("click", this.onClickSaveBtn);
    this.titleInputEl.addEventListener("keypress", this.onPressEnterKey);
    this.currentEl.addEventListener("focusout", this.onFocusOut);
  }

  protected reset(): void {
    this.titleInputEl.value = "";
    this.setContent("");
  }

  @autobind
  private onClickSaveBtn(_: Event): void {
    // set the content of adding-list, which is the title of added-list,
    // as the value of input.
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
    this.parentAddList.onAddingListClosed();
  }

  /**
   * set the content of adding-list, which is the title of added-list
   * with the value of input.
   */
  private addChild(): void {
    this.setContent(this.titleInputEl.value);

    ColumnsView.onListAdded();

    this.nextView = new AddedListView(
      new TemplateHelper<HTMLDivElement>(
        ".list",
        Templates.addedList,
        "beforeend",
        View.currentListPosition - 1
      ),
      this.content
    );

    this.reset();
  }

  /**
   * show adding-list and auto-focus at the input
   */
  public onAddListClickedAgain(): void {
    this.currentEl.style.display = "block";
    this.titleInputEl.focus();
  }
}
