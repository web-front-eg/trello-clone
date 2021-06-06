import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { thisbind } from "../../decorator/thisbind.js";
import { AddedListView } from "./AddedListView.js";
import { TemplateNames } from "../../template/TemplateNames.js";
import { ListController } from "../../controller/ListController.js";
import { ViewCache } from "../../controller/ViewCache.js";

export class AddingListView extends View<HTMLDivElement> {
  private readonly titleInputEl = <HTMLInputElement>(
    this.currentEl.firstElementChild!
  );

  private readonly saveBtnEl = <HTMLButtonElement>(
    this.currentEl.querySelector(".btn")!
  );

  private readonly closeBtnEl = <HTMLElement>(
    this.currentEl.querySelector(".fa-times")!
  );

  constructor(templateHelper: TemplateHelper<HTMLDivElement>) {
    super(templateHelper, "AddingListView");

    if (!this.titleInputEl) {
      throw new Error("Title input element is invalid!");
    }

    this.titleInputEl.focus();

    if (!this.saveBtnEl) {
      throw new Error("Save button element is invalid!");
    }

    if (!this.closeBtnEl) {
      throw new Error("Close button element is invalid!");
    }

    this.init();
  }

  protected init() {
    ViewCache.addingListView = this;

    this.saveBtnEl.addEventListener("click", this.onClick);
    this.titleInputEl.addEventListener("keypress", this.onPressEnterKey);
    this.currentEl.addEventListener("focusout", this.onFocusOut);
    this.closeBtnEl.addEventListener("click", this.close);
  }

  @thisbind
  protected onClick(_: Event) {
    this.addChild();
  }

  @thisbind
  private onPressEnterKey(e: Event) {
    if ((e as KeyboardEvent)!.key !== "Enter") return;

    this.addChild();
  }

  @thisbind
  private onFocusOut(_: Event) {
    super.close();
    ListController.onCloseAddingList();
  }

  private addChild(isAutoUpdate: boolean = false) {
    // no empty string allowed
    if (!this.titleInputEl.value) {
      return;
    }

    // add a new lists before adding added-list
    // and move add-list as a child of the new lists
    ListController.onNewListsAdded();

    // create a new AddListView
    this.nextView = new AddedListView(
      new TemplateHelper<HTMLDivElement>(
        ".lists",
        TemplateNames.addedList,
        "beforeend",
        false,
        View.currentListPosition
      ),
      this.titleInputEl.value,
      isAutoUpdate
    );

    this.reset();
  }

  protected reset() {
    this.titleInputEl.value = "";
  }

  public loadTitle(newTitle: string) {
    this.titleInputEl.value = newTitle;
  }

  public click() {
    this.addChild(true);
  }

  public reopen() {
    // show adding-list and auto-focus at the input
    super.reopen();
    this.titleInputEl.focus();
  }

  @thisbind
  public close() {
    super.close();
  }
}
