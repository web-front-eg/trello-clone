import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { autobind } from "../../decorator/autobind.js";
import { Template } from "../../template/TemplateNames.js";
import { AddingListView } from "./AddingListView.js";
import { ViewCache } from "../../controller/ViewCache.js";
import { ListController } from "../../controller/ListController.js";

/**
 * Add List -> make a new AddingListView
 *             새로운 AddingListView 를 만듬
 */
export class AddListView extends View<HTMLDivElement> {
  constructor(templateHelper: TemplateHelper<HTMLDivElement>) {
    super(templateHelper, "AddListView");
    this.init();
  }

  protected init() {
    // cache instance
    ViewCache.addListView = this;

    this.currentEl.addEventListener("click", this.onClick);
    this.currentEl.addEventListener("focusout", this.onFocusOut);
  }

  protected reset() {
    this.currentEl.style.display = "none";
  }

  public click() {
    this.onClick();
  }

  @autobind
  private onClick() {
    // re-using adding-list
    if (!this.nextView) {
      this.nextView = new AddingListView(
        new TemplateHelper<HTMLDivElement>(
          this.templateHelper.getCurElIdOrClassName,
          Template.addingList,
          "afterend"
        )
      );
    }

    ListController.onClickAddListAgain();
    this.reset();
  }

  @autobind
  private onFocusOut(_: Event) {
    // hide add-list automatically on focusing out
    this.currentEl.style.display = "none";
  }

  public reopen() {
    // show add-list on closing adding-card
    this.currentEl.style.display = "block";
  }
}
