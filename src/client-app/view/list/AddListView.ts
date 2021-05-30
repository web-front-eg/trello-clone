import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { autobind } from "../../decorator/autobind.js";
import * as Templates from "../../template/TemplateNames.js";
import { AddingListView } from "./AddingListView.js";
import { ViewCache } from "../../controller/ViewCache.js";

/**
 * Add List -> make a new AddingListView
 *             새로운 AddingListView 를 만듬
 */
export class AddListView extends View<HTMLDivElement> {
  constructor(templateHelper: TemplateHelper<HTMLDivElement>) {
    super(templateHelper, "AddListView");
    this.init();
  }

  protected init(): void {
    // cache instance
    ViewCache.addListView = this;

    this.currentEl.addEventListener("click", this.onClickAddList);
    this.currentEl.addEventListener("focusout", this.onFocusOut);
  }

  protected reset(): void {
    this.currentEl.style.display = "none";
  }

  @autobind
  private onClickAddList(_: Event): void {
    // re-using adding-list
    if (!this.nextView) {
      this.nextView = new AddingListView(
        new TemplateHelper<HTMLDivElement>(
          this.templateHelper.getCurElIdOrClassName,
          Templates.addingList,
          "afterend"
        )
      );
    }

    ViewCache.addingListView.onClickAddListAgain();
    this.reset();
  }

  @autobind
  private onFocusOut(_: Event): void {
    // hide add-list automatically on focusing out
    this.currentEl.style.display = "none";
  }

  public onClose(): void {
    // show add-list on closing adding-card
    this.currentEl.style.display = "block";
  }
}