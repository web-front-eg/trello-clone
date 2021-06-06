import { View } from "../View.js";
import { TemplateHelper } from "../../template/TemplateHelper.js";
import { thisbind } from "../../decorator/thisbind.js";
import { TemplateNames } from "../../template/TemplateNames.js";
import { AddingListView } from "./AddingListView.js";
import { ViewCache } from "../../controller/ViewCache.js";
import { ListController } from "../../controller/ListController.js";

/**
 * Add List -> make a new AddingListView
 */
export class AddListView extends View<HTMLDivElement> {
  constructor(templateHelper: TemplateHelper<HTMLDivElement>) {
    super(templateHelper, "AddListView");
    this.init();
  }

  protected init() {
    ViewCache.addListView = this;

    this.currentEl.addEventListener("click", this.onClick);
    this.currentEl.addEventListener("focusout", this.onFocusOut);
  }

  @thisbind
  protected onClick() {
    // re-using adding-list
    if (!this.nextView) {
      this.nextView = new AddingListView(
        new TemplateHelper<HTMLDivElement>(
          this.templateHelper.currentElSelector,
          TemplateNames.addingList,
          "afterend"
        )
      );
    }

    // reopen adding-list
    ListController.onClickAddListAgain();
    this.reset();
  }

  @thisbind
  private onFocusOut(_: Event) {
    super.close();
  }
}
